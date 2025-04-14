import { PrismaClient } from '@prisma/client';

// Create a singleton Prisma client instance, logs all db interactions
const prisma = new PrismaClient({ 
	log: ['query', 'info', 'warn'],
});

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