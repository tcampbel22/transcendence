Ensure docker is installed and run following command in frontend root dir:
docker build -t frontend .
docker run -d -p 8080:80 --name frontend frontend

Stop docker
docker stop frontend  
docker rm frontend  
