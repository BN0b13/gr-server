#!/bin/bash

# Raspberry Pi set-up
# Command to link up GPIO pins with the internal number
# cat /sys/kernel/debug/gpio


## SET UP
# Node

echo Installing Node
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg
sudo curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
NODE_MAJOR=20
sudo echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update -y
sudo apt install nodejs -y
sudo apt install build-essential

# Docker

echo Installing Docker
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Docker-Compose

echo Installing Docker-Compose
sudo curl -L https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-`uname -s`-`uname -m` > docker-compose
sudo mv docker-compose /usr/bin/
sudo chown root: /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

# PM2
echo Installing PM2
sudo npm install -g pm2
pm2 startup

# Set up repo - Manually add in .env file

echo Installing server NPM Packages and setting up Database
cd gr-server
sudo npm install -y
sudo npm run up
sudo npm run migrate

# Start Server

echo Starting server with PM2 and ensuring it starts on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u bnoble --hp /home/bnoble
sudo pm2 start app.js --name GR-Sever
sudo pm2 save

echo Rebooting Raspberry Pi
sudo reboot