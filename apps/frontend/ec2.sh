#!/bin/bash

sudo amazon-linux-extras install -y nginx1
sudo systemctl start nginx
sudo systemctl enable nginx

sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
sudo . ~/.nvm/nvm.sh
nvm install 16.0

cd ~/inzynierka/lib/shared
yarn build

cd ~/inzynierka/apps/frontend
yarn build
yarn start