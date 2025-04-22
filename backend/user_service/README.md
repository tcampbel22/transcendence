Make the dev enviroment for the backend to work propperly: User_management


.env -- add this to database/prisma/ with the information bellow.
DATABASE_URL="file:./user.db"




run this in the database/prisma file to create the migrations:
npx prisma migrate dev --name init

This command will:
Create a new SQLite database file (if it doesn’t exist yet)
Generate the necessary tables based on the schema.prisma file
Apply the migration so your database is ready to use
You only need to run this once — unless the schema changes and you want to update the DB.


then:

npm run dev either in the root of the project or in the user_service.

note this only runs user_services in the development environment skipping nginx.