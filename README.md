# Restaurant App

This is the restaurant app for Glints.

## Usage

Rename the .env.example to .env and add your environment varaibles

### Install dependencies

```
# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
```

### Generate data

```
npm run data
```

### Run migrations

```
cd backend
npx dotenv -e ../.env sequelize-cli db:migrate
```

### Run seeds

```
cd backend
npx dotenv -e ../.env sequelize-cli db:seed:all
```

### Run both server and client at the same time

```
npm run dev
```

### Run server

```
npm run server
```

### Run client

```
npm run client
```

## Demo

https://restaurant-app-glints.herokuapp.com/
