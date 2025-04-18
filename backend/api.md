# 📘 API Routes Documentation

## 👤 User Routes (`/users/`)

| Method | Endpoint                        | Description                            | Controller Method                      |
|--------|---------------------------------|----------------------------------------|----------------------------------------|
| GET    | `/users/:id`                    | Get user profile                       | `profileController.getUser`            |
| PUT    | `/users/:id`                    | Update user name                       | `profileController.updateUsername`     |
| PUT    | `/users/:id/picture`            | Update user profile picture            | `profileController.updatePicture`      |
| PUT    | `/users/:id/reset-password`     | Update user password                   | `profileController.updatePassword`     |
| GET    | `/users/:id/stats`              | Get user stats (wins, losses, etc.)    | `profileController.getStats`           |
| GET    | `/users/:id/match-history`      | Get user's full match history          | `profileController.getMatchHistory`    |
| DELETE | `/users/:id/delete-user`        | Delete user account                    | `profileController.deleteUser`         |
| GET    | `/users/:id/friends`            | Get user's friends list                | `profileController.getFriendsList`     |
| POST   | `/users/:id/friends`            | Add friend to user's friends list      | `profileController.addFriend`          |
| DELETE | `/users/:id/delete-friend`      | Remove friend from user's friends list | `profileController.deleteFriend`       |

## 🔐 Auth & Registration (`/users/`)

# These will be changed /auth/ when JWT is ready

| Method | Endpoint             | Description                        | Controller Method                 |
|--------|----------------------|------------------------------------|-----------------------------------|
| POST   | `/users/register`    | Register a new user                | `registerController.registerUser` |
| POST   | `/users/login`       | Log in user                        | `loginController.loginUser`       |

## 🎮 Game Routes (`/games/`)

| Method | Endpoint                 | Description                              | Controller Method            |
|--------|--------------------------|------------------------------------------|------------------------------|
| POST   | `/games/create-game`     | Create a new game instance               | `gameController.createGame`  |
| PATCH  | `/games/:id/finish-game` | Record game results and winner           | `gameController.finishGame`  |
| GET    | `/games/:id`             | Get game details by game ID              | `gameController.getGame`     |
| GET    | `/games/user/:id`        | Get a user’s full game history (RAW)     | `gameController.getUserGames`|

