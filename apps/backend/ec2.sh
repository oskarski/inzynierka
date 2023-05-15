#!/bin/bash

sudo amazon-linux-extras install -y nginx1
sudo systemctl start nginx
sudo systemctl enable nginx

sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.0
npm install -g yarn
yarn config set ignore-engines true

cd ~/inzynierka
yarn install

cd ~/inzynierka/lib/shared
yarn build

cd ~/inzynierka/apps/backend
yarn build
yarn migration:run
yarn start