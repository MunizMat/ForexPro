<h1 align="center">ForexPro</h1>



https://github.com/user-attachments/assets/ca95b5db-b168-42a0-bd93-aa8f7a567885



ForexPro is a foreign exchange web application for performing mock (simulated) trades for the GBP/USD and USD/GBP currency pairs, using real-time data for the exchange rates of each of them. The application provides a dashboard where users can select a currency pair, insert a desired amount for buy or sell, and execute the mock trade. Each user starts with a default account balance of $5000 and £5000 and each user has a trade history listing all their past trades. 

## Table of Contents
- [Live Demo](#live-demo)
- [Technologies](#technologies)
- [Features](#features)
- [Pending Improvements](#pending-improvements)

## Live Demo
A live demo of this project is publically accessible at https://forex-pro-six.vercel.app/en-US

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

## Pending Improvements
While functional, this project still has pending improvements to be addressed / implemented:
- Unit testing
- Optimisation of DB queries
