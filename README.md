To run this app:

Install

nvm (Node Version Manager)
nvm

run-rs
run-rs
npm install run-rs -g

mongo-express
mongo-express
npm install -g mongo-express

Download npm dependencies
At the project root folder run
npm install

Run
Start mongodb with replica sets
run-rs
Start node app
npm run dev
To test the GraphQL queries through GraphiQL access to
localhost:3000/graphql

Extras
To interact with mongodb you can use mongo-express
mongo-express -U "mongodb://localhost:27017,localhost:27018,localhost:27019/example?replicaSet=rs"