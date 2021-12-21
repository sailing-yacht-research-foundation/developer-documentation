#!/bin/bash

# give permission to the files inside /secure_docs directory

chmod -R 777 /home/ubuntu/

# navigate into current working directory

cd /home/ubuntu/developer-documentation/docs/syrf-devdocs/


# run docker command to build the application
docker build -t developer .

# stop existing container
docker stop dev

# removed stopped container
docker rm dev

# run docker command to start the application
docker run -d --restart unless-stopped -p 3000:3000 --name dev developer:latest


#delete unused images
#docker rmi -f $(docker images -q -f dangling=true)
