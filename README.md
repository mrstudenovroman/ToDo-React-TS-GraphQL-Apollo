prerequisites: docker pricma cli

brew tap prisma/prisma
brew install prisma

docker-compose up -d

prisma deploy

cd front && yarn && yarn start
