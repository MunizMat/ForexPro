[English](#english) | [Português](#portugues)

<a name="english"></a>

# ForexPro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A simulated forex trading web app for GBP/USD and USD/GBP pairs using real-time rates, $5,000/£5,000 starter balances, and complete trade history tracking.

<video src="https://github.com/user-attachments/assets/ca95b5db-b168-42a0-bd93-aa8f7a567885"></video>
*The video above demonstrates the core functionalities of ForexPro, including real-time exchange rates, executing mock buy/sell trades for GBP/USD and USD/GBP, and viewing the updated account balances and trade history.*

## Table of Contents

*   [About The Project](#about-the-project)
    *   [Key Features](#key-features)
    *   [Built With](#built-with)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Configuration](#configuration)
    *   [Running the Application](#running-the-application)
*   [Usage](#usage)

---

## About The Project

ForexPro is a foreign exchange web application designed for performing mock (simulated) trades for the GBP/USD and USD/GBP currency pairs. It utilizes real-time data for the exchange rates, providing a realistic trading experience. The application features a user-friendly dashboard where users can select a currency pair, input a desired amount for a buy or sell order, and execute the simulated trade.

### Key Features:

*   **Real-Time Rates:** Fetches live exchange rates for GBP/USD and USD/GBP.
*   **Simulated Trading:** Allows users to practice trading without financial risk.
*   **Starter Balances:** Each user begins with a default account balance of $5000 and £5000.
*   **Trade History:** Maintains a comprehensive record of all past trades for each user.
*   **User Authentication:** Secure login and registration for individual user accounts.

### Built With

*   [Java](https://www.java.com/en/)
*   [Node.js](https://nodejs.org/)
*   [Next.js](https://nextjs.org/) (Frontend Framework)
*   [Spring Boot](https://spring.io/projects/spring-boot) (Backend Framework)
*   [Spring Framework](https://spring.io/)
*   [Maven](https://maven.apache.org/) (Java Project Management)
*   [Yarn](https://yarnpkg.com/) (JavaScript Package Manager)
*   [AllTick](https://alltick.co/en-US) (Real-time Forex Data API)
*   [WebSockets](https://en.wikipedia.org/wiki/WebSocket) (Real-time Communication)
*   [RabbitMQ](https://www.rabbitmq.com/) (Message Broker)
*   [PostgreSQL](https://www.postgresql.org/) (Database)
*   [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Containerization)

---

## Getting Started

Follow these steps to get a local copy of ForexPro up and running on your machine.

### Prerequisites

Before you begin, ensure you have the following installed and configured:

*   **Docker and Docker Compose:** Necessary for running the application and its services in containers. Download from [Docker's official website](https://www.docker.com/products/docker-desktop/).
*   **An AllTick Account & API Key:** ForexPro uses AllTick to fetch real-time exchange rates.
    *   Sign up for a free account at [AllTick](https://alltick.co/en-US).
    *   Obtain your API token from the [AllTick dashboard](https://alltick.co/en-US/dashboard). This token is required in the configuration steps. No other specific AllTick account configuration is needed beyond having an active account and API key.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/MunizMat/ForexPro.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd ForexPro
    ```

### Configuration

You'll need to set up environment variables for both the client (frontend) and server (backend) projects.

1.  **Client Configuration:**
    Create a `.env` file inside the `ForexPro/client/` directory with the following content:
    ```sh
    NEXT_PUBLIC_API_URL=http://localhost:3001
    NEXT_PUBLIC_WS_URL=ws://localhost:3001
    ```

2.  **Server Configuration:**
    Create a `.env` file inside the `ForexPro/server/` directory with the following content:
    ```sh
    # JWT Configuration
    JWT_SECRET=<YOUR_JWT_SECRET> # Generate a strong secret (256-bit strength)

    # Forex API Configuration
    FOREX_API_TOKEN=<YOUR_ALL_TICK_API_TOKEN> # Your API token from AllTick

    # PostgreSQL Database Configuration
    POSTGRES_HOSTNAME=postgres
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres # Consider changing for production
    POSTGRES_DB=forexpro

    # RabbitMQ Configuration
    RABBIT_MQ_HOSTNAME=rabbitmq
    RABBIT_MQ_USER=guest       # Default user, consider changing for production
    RABBIT_MQ_PASSWORD=guest   # Default password, consider changing for production
    ```
    *   **JWT Secret:** You can generate a secure JWT secret using a tool like [jwtsecret.com](https://jwtsecret.com/generate). The secret must be at least 256-bit in size.
    *   **AllTick API Token:** As mentioned in prerequisites, this is available in your [AllTick dashboard](https://alltick.co/en-US/dashboard).

### Running the Application

Once the prerequisites are met and configuration is complete:

1.  **Start the application using Docker Compose:**
    From the root `ForexPro` directory (the one containing `compose.yml`), run:
    ```sh
    docker compose up --build
    ```
    The `--build` flag ensures images are built if they don't exist or if Dockerfiles have changed. You can omit it for subsequent runs if no code affecting the Docker image has changed.

2.  **Access ForexPro:**
    After the containers start up successfully (you should see logs from various services like `postgres`, `rabbitmq`, `server`, and `client` in your terminal), open your web browser and navigate to:
    `http://localhost:3000`

    You should now be able to register a new user and start using the ForexPro application.

---

## Usage

Once the application is running locally:

1.  Navigate to `http://localhost:3000` in your web browser.
2.  Register for a new account or log in if you already have one.
3.  Explore the dashboard to view current exchange rates.
4.  Select a currency pair (GBP/USD or USD/GBP).
5.  Enter the amount you wish to buy or sell.
6.  Execute the trade.
7.  View your updated balances and check your trade history.

---
<a name="portugues"></a>

# ForexPro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Uma aplicação web de simulação de negociação forex para os pares GBP/USD e USD/GBP usando taxas em tempo real, saldos iniciais de $5.000/£5.000 e acompanhamento completo do histórico de transações.

<video src="https://github.com/user-attachments/assets/ca95b5db-b168-42a0-bd93-aa8f7a567885"></video>
*O vídeo acima demonstra as funcionalidades principais do ForexPro, incluindo taxas de câmbio em tempo real, execução de ordens simuladas de compra/venda para GBP/USD e USD/GBP, e visualização dos saldos atualizados da conta e histórico de transações.*

## Índice

*   [Sobre O Projeto](#sobre-o-projeto)
    *   [Principais Funcionalidades](#principais-funcionalidades)
    *   [Tecnologias Utilizadas](#tecnologias-utilizadas)
*   [Começando](#comecando)
    *   [Pré-requisitos](#pre-requisitos)
    *   [Instalação](#instalacao)
    *   [Configuração](#configuracao)
    *   [Executando a Aplicação](#executando-a-aplicacao)
*   [Uso](#uso)

---

## Sobre O Projeto

O ForexPro é uma aplicação web de câmbio de moeda estrangeira (forex) projetada para realizar transações simuladas para os pares de moeda GBP/USD e USD/GBP. Utiliza dados em tempo real para as taxas de câmbio, proporcionando uma experiência de negociação realista. A aplicação possui um painel de controle amigável onde os usuários podem selecionar um par de moedas, inserir o valor desejado para uma ordem de compra ou venda e executar a transação simulada.

### Principais Funcionalidades:

*   **Taxas em Tempo Real:** Busca taxas de câmbio ao vivo para GBP/USD e USD/GBP.
*   **Negociação Simulada:** Permite que os usuários pratiquem negociação sem risco financeiro.
*   **Saldos Iniciais:** Cada usuário começa com um saldo padrão de $5000 e £5000.
*   **Histórico de Transações:** Mantém um registro completo de todas as transações passadas de cada usuário.
*   **Autenticação de Usuário:** Login e registro seguros para contas de usuário individuais.

### Tecnologias Utilizadas

*   [Java](https://www.java.com/en/)
*   [Node.js](https://nodejs.org/)
*   [Next.js](https://nextjs.org/) (Framework Frontend)
*   [Spring Boot](https://spring.io/projects/spring-boot) (Framework Backend)
*   [Spring Framework](https://spring.io/)
*   [Maven](https://maven.apache.org/) (Gerenciamento de Projetos Java)
*   [Yarn](https://yarnpkg.com/) (Gerenciador de Pacotes JavaScript)
*   [AllTick](https://alltick.co/en-US) (API de Dados Forex em Tempo Real)
*   [WebSockets](https://en.wikipedia.org/wiki/WebSocket) (Comunicação em Tempo Real)
*   [RabbitMQ](https://www.rabbitmq.com/) (Corretor de Mensagens)
*   [PostgreSQL](https://www.postgresql.org/) (Banco de Dados)
*   [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Conteinerização)

---

## Começando

Siga estes passos para obter uma cópia local do ForexPro em execução na sua máquina.

### Pré-requisitos

Antes de começar, certifique-se de que tem o seguinte instalado e configurado:

*   **Docker e Docker Compose:** Necessários para executar a aplicação e os seus serviços em contêineres. Faça o download no [site oficial do Docker](https://www.docker.com/products/docker-desktop/).
*   **Uma Conta AllTick e Chave de API:** O ForexPro usa o AllTick para buscar taxas de câmbio em tempo real.
    *   Crie uma conta gratuita em [AllTick](https://alltick.co/en-US).
    *   Obtenha o seu token de API no [painel do AllTick](https://alltick.co/en-US/dashboard). Este token é necessário nos passos de configuração. Nenhuma outra configuração específica da conta AllTick é necessária além de ter uma conta ativa e uma chave de API.

### Instalação

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/MunizMat/ForexPro.git
    ```
2.  **Navegue para o diretório do projeto:**
    ```sh
    cd ForexPro
    ```

### Configuração

Será necessário configurar variáveis de ambiente para os projetos cliente (frontend) e servidor (backend).

1.  **Configuração do Cliente:**
    Crie um arquivo `.env` dentro do diretório `ForexPro/client/` com o seguinte conteúdo:
    ```sh
    NEXT_PUBLIC_API_URL=http://localhost:3001
    NEXT_PUBLIC_WS_URL=ws://localhost:3001
    ```

2.  **Configuração do Servidor:**
    Crie um arquivo `.env` dentro do diretório `ForexPro/server/` com o seguinte conteúdo:
    ```sh
    # Configuração JWT
    JWT_SECRET=<SEU_SEGREDO_JWT> # Gere um segredo forte (256 bits de força)

    # Configuração da API Forex
    FOREX_API_TOKEN=<SEU_TOKEN_API_ALL_TICK> # Seu token de API do AllTick

    # Configuração do Banco de Dados PostgreSQL
    POSTGRES_HOSTNAME=postgres
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres # Considere alterar para produção
    POSTGRES_DB=forexpro

    # Configuração do RabbitMQ
    RABBIT_MQ_HOSTNAME=rabbitmq
    RABBIT_MQ_USER=guest       # Usuário padrão, considere alterar para produção
    RABBIT_MQ_PASSWORD=guest   # Senha padrão, considere alterar para produção
    ```
    *   **Segredo JWT:** Pode gerar um segredo JWT seguro usando uma ferramenta como [jwtsecret.com](https://jwtsecret.com/generate). O segredo deve ter pelo menos 256 bits de tamanho.
    *   **Token da API AllTick:** Conforme mencionado nos pré-requisitos, está disponível no seu [painel do AllTick](https://alltick.co/en-US/dashboard).

### Executando a Aplicação

Assim que os pré-requisitos forem atendidos e a configuração estiver completa:

1.  **Inicie a aplicação usando o Docker Compose:**
    A partir do diretório raiz `ForexPro` (aquele que contém `compose.yml`), execute:
    ```sh
    docker compose up --build
    ```
    A flag `--build` garante que as imagens sejam construídas caso não existam ou se os Dockerfiles tiverem sido alterados. Pode omiti-la em execuções subsequentes se nenhum código que afete a imagem Docker tiver sido alterado.

2.  **Aceder ao ForexPro:**
    Após os contêineres iniciarem com sucesso (deverá ver logs de vários serviços como `postgres`, `rabbitmq`, `server` e `client` no seu terminal), abra o seu navegador web e navegue para:
    `http://localhost:3000`

    Deverá agora conseguir registar um novo utilizador e começar a usar a aplicação ForexPro.

---

## Uso

Assim que a aplicação estiver a ser executada localmente:

1.  Navegue para `http://localhost:3000` no seu navegador web.
2.  Registe-se para uma nova conta ou faça login se já tiver uma.
3.  Explore o painel de controle para visualizar as taxas de câmbio atuais.
4.  Selecione um par de moedas (GBP/USD ou USD/GBP).
5.  Insira o valor que deseja comprar ou vender.
6.  Execute a transação.
7.  Visualize os seus saldos atualizados e verifique o seu histórico de transações.