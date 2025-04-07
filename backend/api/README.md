if you wanna test node in a container:
docker build -t backend . 
docker run -d -p 3000:3000 --name backend backend
