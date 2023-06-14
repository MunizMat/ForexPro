<h1 align="center">ForexPro</h1>

ForexPro is a foreign exchange web application for performing mock (simulated) trades for the GBP/USD and USD/GBP currency pairs, using real-time data for the exchange rates of each of them. The application provides a dashboard where users can select a currency pair, insert a desired amount for buy or sell, and execute the mock trade. Each user starts with a default account balance of $5000 and £5000 and each user has a trade history listing all their past trades. 

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)

## Getting Started

### Prerequisites
To install the project on your local machine you will need to:
1. Visit [Docker's website](https://www.docker.com/) and install Docker on your local machine
2. Visit [MetaApi](https://metaapi.cloud/) and create an account. After creating your account, navigate to 'API Access' and generate an API access token for free.

### Installation
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
- [MetaApi](https://metaapi.cloud/sdks)
- Jest

## Features 
- Real-time forex exchange rates (through websockets)
- Internationalization (support for pt-BR and en-US)
- Queue system for handling the trades
- Dashboard for mock trading
- Trade History
