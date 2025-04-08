import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma client instance
const prisma = new PrismaClient();

// Test the database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

export { prisma, testConnection };