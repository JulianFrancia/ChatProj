cd chat-proj
svn update
docker-compose build
docker-compose up -d
docker ps
docker logs -t chat-proj 
