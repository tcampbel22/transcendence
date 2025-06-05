import { prisma } from "../../database/db.js";
import axios from "axios";
import fs from "fs";
import https from "https";
import {
  ErrorConflict,
  ErrorNotFound,
  ErrorCustom,
  ErrorUnAuthorized,
  ErrorBadRequest,
} from "@app/errors";
import logger from "@eleekku/logger";

const isProduction = process.env.NODE_ENV === "production";
const SERVICE_URL = isProduction
  ? "https://nginx:4433/users"
  : "http://localhost:3002/api";

let agent;
if (isProduction) {
  try {
  	agent = new https.Agent({
  	ca: fs.readFileSync("ssl/nginx.cert.pem"), // Path to the Nginx certificate
  });
  } catch (err) {
  	logger.error("Failed to find SSL certificates", 502);
  };
}
const axiosConfig = isProduction ? { httpsAgent: agent } : {};

export const gameService = {
  async startGame(player1Id, player2Id)
  {
    try {
      const p1Response = await axios.get(
        `${SERVICE_URL}/validate/${player1Id}`,
        {
          headers: { "x-internal-key": process.env.INTERNAL_KEY },
          ...axiosConfig
        }
      );
      if (p1Response.status !== 200)
      {
        logger.error(`Error retrieving player ${player1Id}`, p1Response.status);
        throw new ErrorCustom(`Error retrieving player`, p1Response.status);
      }

	  const p2Response = await axios.get(`${SERVICE_URL}/validate/${player2Id}`, axiosConfig );
      if (p2Response.status !== 200)
      {
        logger.error(`Error retrieving player ${player2Id}`, p2Response.status);
        throw new ErrorCustom(`Error retrieving player`, p2Response.status);
      }

	  //Create default game row
      logger.info(`Creating game for players ${player1Id} and ${player2Id}`);
      const newGame = await prisma.game.create({
        data: {
          player1Id: player1Id,
          player2Id: player2Id,
          player1Score: 0,
          player2Score: 0,
          winnerId: null,
        },
      });
      return newGame;
    } catch (err) {
      logger.error("Game creation failed:", err.message);
      console.error("Game creation failed");
      throw err;
    }
  },

  async finishGame(id, p1score, p2score, winnerId) {
    try {
      //Check if game exists
      const game = await prisma.game.findUnique({
        where: { id: id },
        select: {
          player1Id: true,
          player2Id: true,
        },
      });
      if (!game) throw new ErrorNotFound(`Game ${id} not found`);
      //Update game
      const updatedGame = await prisma.game.update({
        where: { id: id },
        data: {
          player1Score: p1score,
          player2Score: p2score,
          winnerId: winnerId,
        },
      });

      //Update P1 userstats
      try {
        await axios.patch(`${SERVICE_URL}/${game.player1Id}/update-stats`,
          {
            isWinner: game.player1Id === winnerId,
            gameId: id,
          },
		  axiosConfig
        );
      } catch (err) {
        console.log(`Failed to update player 1's stats`);
        logger.error(`Failed to update player 1's stats`, err.message);
      }

      //Update P2 userstats, if it exists
      if (game.player2Id) {
        try {
          await axios.patch(
            `${SERVICE_URL}/${game.player2Id}/update-stats`,
            {
              isWinner: game.player2Id === winnerId,
              gameId: id,
            },
            {
              headers: {
                "x-internal-key": process.env.INTERNAL_KEY,
              },
              ...axiosConfig
            }
          );
        } catch (err) {
          console.log(`Failed to update player 2's stats`);
          logger.error(`Failed to update player 2's stats`, err.message);
        }
      }
      return updatedGame;
    } catch (err) {
      console.error("Failed to finish game");
      logger.error("Failed to finish game: ", err.message);
      throw ErrorCustom(err.message, err.status);
    }
  },
  // Fetches a specific game by id
  async getGameById(gameId) {
    const game = await prisma.game.findUnique({
      where: { id: parseInt(gameId) },
    });
    if (!game)
      throw new ErrorNotFound(`getGameById: gameId ${gameId} does not exist`);
    return game;
  },

  // Fetches all games a user has played in
  async getUserGames(userId) {
    const games = await prisma.game.findMany({
      where: {
        OR: [{ player1Id: parseInt(userId) }, { player2Id: parseInt(userId) }],
      },
      orderBy: { createdAt: "desc" },
    });
    return games;
  },
};
