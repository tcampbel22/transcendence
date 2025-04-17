if you wanna test node in a container:
docker build -t backend . 
docker run -d -p 3000:3000 --name backend backend

# Database instructions
### The database currently only accepts the params from the register page
### If you fill the register page with information you can check to see if it was succcessful with curl 

```curl -k -X GET https://localhost:4433/api/register```

### If you want to reset the database in testing env just run 

```make db_clean```

### This will wipe the db file and when you build the project again it will be a fresh file

## .env is not pushed to the repo but a sample one is in this directory, which you can fill out yourself
