<h1 align="center">ForexPro</h1>

<video width="740" autoplay loopd alt="Captura de Tela 2023-06-19 às 09 16 51">
  <source src="https://portfolio-2f53f46g.s3.amazonaws.com/videos/ForexPro.mp4" />
</video>

ForexPro is a foreign exchange web application for performing mock (simulated) trades for the GBP/USD and USD/GBP currency pairs, using real-time data for the exchange rates of each of them. The application provides a dashboard where users can select a currency pair, insert a desired amount for buy or sell, and execute the mock trade. Each user starts with a default account balance of $5000 and £5000 and each user has a trade history listing all their past trades. 

## Table of Contents
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Features](#features)
- [Testing](#testing)

## Getting Started

### Prerequisites
To install and run the project on your local machine you will need to:
1. Install [Docker](https://www.docker.com/) on your local machine 


2. Create an account on [AllTick](https://alltick.co/en-US) and generate an API token for free.


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
JWT_SECRET=<YOUR_JWT_SECRET>
FOREX_API_TOKEN=<YOUR_ALLTICK_API_TOKEN>
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
- Java
- Spring
- SpringBoot
- WebSockets
- RabbitMQ
- Typescript
- NextJS 
- PostgreSQL
- [AllTick](https://alltick.co/en-US)
- Jest

## Features 
- Real-time forex exchange rates (through websockets)
- Internationalization (support for pt-BR and en-US)
- Queue system for handling the trades
- Dashboard for mock trading
- Trade History

## Testing 
- [Using Docker](#using-docker-1)


## Using Docker
In the root directory of the project, run the following commands:

```shell 
docker-compose -f docker-compose.test.yml build
docker-compose -f docker-compose.test.yml up
```



