cd ChatProj/chat-proj
git push
docker-compose build
docker-compose --compatibility up -d
docker ps
docker logs -t chat-proj-api
