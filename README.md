<h1 align="center">ForexPro</h1>

ForexPro is a foreign exchange web application for performing mock (simulated) trades for the GBP/USD and USD/GBP currency pairs, using real-time data for the exchange rates of each of them. The application provides a dashboard where users can select a currency pair, insert a desired amount for buy or sell, and execute the mock trade. Each user starts with a default account balance of $5000 and £5000 and each user has a trade history listing all their past trades. 

## Table of Contents
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Features](#features)
- [Testing](#testing)

## Getting Started

### Prerequisites
To install the project on your local machine you will need to:
1. Install [Docker](https://www.docker.com/) or [Node.js](https://nodejs.org/en) on your local machine 

ps: Docker is recommended for installation, because installation with node will require you to have Redis and PostgreSQL setup and installed on your local machine

2. Visit [MetaApi](https://metaapi.cloud/) and create an account. After creating your account, navigate to 'API Access' and generate an API access token for free.

ps: Docker is the recommended way to install the project locally. Installation using node will require you to have Redis and PostgreSQL setup and installed on your local machine

### Installation
#### Using Docker
1. Clone this repository to your local machine:
```shell 
git clone https://github.com/MunizMat/ForexPro.git
```

2. Navigate to the 'server' directory:
```shell 
cd ForexPro/server
```

3. Create a .env file:
```shell 
nano .env
```

Paste the following: 

```shell 
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/forex-pro?schema=public"
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET_KEY={YOUR_JWT_SECRET_KEY}
META_API_TOKEN={YOUR_META_API_TOKEN}
META_API_ACCOUNT_ID={YOUR_META_API_ACCOUNT_ID}
```

4. Navigate back to the project directory:
```shell 
cd ..
```
 
5. Build the docker images:
```shell 
docker compose build
```

6. Run the docker containers:
```shell 
docker compose up
```

#### Using Node.js
1. Clone this repository to your local machine:
```shell 
git clone https://github.com/MunizMat/ForexPro.git
```

2. Navigate to the 'server' directory:
```shell 
cd ForexPro/server
```

3. Create a .env file:
```shell 
nano .env
```

Paste the following: 

```shell 
PORT=3000
DATABASE_URL="postgresql://{YOUR_POSTGRES_USER}:{YOUR_POSTGRES_PASSWORD}@localhost:5432/forex-pro?schema=public"
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
JWT_SECRET_KEY={YOUR_JWT_SECRET_KEY}
META_API_TOKEN={YOUR_META_API_TOKEN}
META_API_ACCOUNT_ID={YOUR_META_API_ACCOUNT_ID}
```

4. Install the dependencies for the 'server' directory:
```shell 
npm install
```
 
5. Install the dependencies for the 'client' directory:
```shell 
cd ../client
npm install
```

6. Setup the database migrations using Prisma:
```shell 
cd ../server
npx prisma generate
npx prisma migrate dev --name init
```

7. On a separate Terminal window, run Redis:
```shell 
redis-server
```

. Run the backend: 
```shell 
npm run start
```
8. On a separate Teminal window, run the frontend: 
```shell 
cd client
npm run dev
```




## Technologies
- Typescript
- ReactJS
- NextJS 
- Bootstrap
- NodeJS
- PostgreSQL
- Socket.io
- Zod
- BullMQ
- Redis
- [MetaApi](https://metaapi.cloud/sdks)
- Jest

## Features 
- Real-time forex exchange rates (through websockets)
- Internationalization (support for pt-BR and en-US)
- Queue system for handling the trades
- Dashboard for mock trading
- Trade History

## Testing 

To run the application's unit tests follow these steps: 

1. Select the service (frontend/backend) you would like to test first, and navigate to it's directory:

For the backend: 
```shell 
cd server
```
For the frontend: 
```shell 
cd client
```

2. Run the test script as follows: 
```shell 
npm test
```

For code coverage reports you can use the following script:
```shell 
npm run test:coverage
```




