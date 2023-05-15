#!/bin/bash

sudo amazon-linux-extras install -y nginx1
sudo systemctl start nginx
sudo systemctl enable nginx

nvm install 16.0

cd ~/inzynierka/lib/shared
yarn build

cd ~/inzynierka/apps/backend
yarn build
yarn migration:run
yarn start