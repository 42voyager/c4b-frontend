#!/usr/bin/env bash

# primeiro atualizar o ambiente
sudo apt update && sudo apt upgrade

# Alguns pacotes necessários á intalação do Docker
sudo apt-get install apt-transport-https ca-certificates curl gnupg software-properties-common

# Adicionar a chave GPG do repositório do Docker, isso serve para adicionar ainda mais segurança
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# adicionar o repositório do docker
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Instalar o docker
sudo apt install docker-ce

# Habilitar 
sudo systemctl enable docker

# startar
sudo systemctl start docker

# caso queira ver o status do docker
#sudo systemctl status docker

# version
docker -v

