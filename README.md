[English](#english) | [Português](#portugues)

<a name="english"></a>

# ForexPro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A simulated forex trading web app for GBP/USD and USD/GBP pairs using real-time rates, $5,000/£5,000 starter balances, and complete trade history tracking

<video src="https://github.com/user-attachments/assets/ca95b5db-b168-42a0-bd93-aa8f7a567885"></video>

## Table of Contents

*   [About The Project](#about-the-project)
    *   [Built With](#built-with)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Usage](#usage)

---

## About The Project

ForexPro is a foreign exchange web application for performing mock (simulated) trades for the GBP/USD and USD/GBP currency pairs, using real-time data for the exchange rates of each of them. The application provides a dashboard where users can select a currency pair, insert a desired amount for buy or sell, and execute the mock trade. Each user starts with a default account balance of $5000 and £5000 and each user has a trade history listing all their past trades. 

### Built With

*   [Java](https://www.java.com/en/)
*   [Node.js](https://nodejs.org/) 
*   [Next.js](https://nextjs.org/)
*   [Maven](https://maven.apache.org/)
*   [Yarn](https://yarnpkg.com/)
*   [AllTick](https://alltick.co/en-US)
*   [Spring](https://spring.io/)
*   [SpringBoot](https://spring.io/projects/spring-boot)
*   [WebSockets](https://en.wikipedia.org/wiki/WebSocket)
*   [RabbitMQ](https://www.rabbitmq.com/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Docker](https://www.docker.com/)


---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

*   Docker
*   An AllTick account *configured*

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/MunizMat/ForexPro.git
    ```
2.  Navigate to the project directory
    ```sh
    cd ForexPro
    ```

### Usage
For local usage, take the following ste´ps:

1.  Create a `.env` file with the following contents inside the the `client` directory:
    ```sh
    NEXT_PUBLIC_API_URL=http://localhost:3001
    NEXT_PUBLIC_WS_URL=ws://localhost:3001
    ```
2.  Create a `.env` file with the following contents inside the `server` directory:
    ```sh
    JWT_SECRET=<YOUR_JWT_SECRET>
    FOREX_API_TOKEN=<YOUR_ALL_TICK_API_TOKEN>

    POSTGRES_HOSTNAME=postgres
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=forexpro

    RABBIT_MQ_HOSTNAME=rabbitmq
    RABBIT_MQ_USER=guest
    RABBIT_MQ_PASSWORD=guest
    ```
    Your AllTick API token is available in the [AllTick dashboard](https://alltick.co/en-US/dashboard).
    You can generate your a JWT secret [here](https://jwtsecret.com/generate) (must have 256 length)
3.  Run the project with docker compose
    ```sh
    docker compose up
    ```
    Your local instance should now be running at `http://localhost:3000`.
