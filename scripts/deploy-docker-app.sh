#!/usr/bin/env bash

# Excluir o container
#sudo docker stop id-do-container

# deleta image antiga
docker rmi voyager-front

# criando a imagem
docker build -t voyager-front ../.

# executando a aplicação
docker run -it -p 80:80 -p 443:443 --rm --name voyager-front-container voyager-front

