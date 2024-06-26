# micro-frontends

## Description
This micro-monolith repository shows how you can create micro-frontends using module-federations. Cross micro-frontend communications are done using Custom DOM events.

This is a small sample application which has a container application, and 2 remote micro-frontends.

1. **Container** - The host application to which the micro-frontends are injected
2. **Messanger** - Sends CustomEvents with a message payload
    > Publish:  *microfrontend:messange:send*
3. **Receiver** - Listens for CustomEvents sent from the **Messanger**
    > Subscribe: *microfrontend:messange:send*

## Technologies
- **[React](https://react.dev/)**
- **[Tailwindcss](https://tailwindcss.com/)**
- **[Module Federations](https://module-federation.io/)**
- **[Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)**

## Prerequisites
1. Docker
2. Docker-compose
3. NodeJS for `npm`

## Getting Started
1. Pull Repository
2. Run the following command on the `container`, `messanger`, and `receiver` directories
    ```bash
    npm install
    ```
3. In the root directory execute the same command
    ```bash
    npm install
    ```
4. To start the entire system run this is the root directory
    ```bash
    npm run start:all
    ```

## Whats next

- [x] Create an API and database where messages are sent to and stored ([#1](https://github.com/StefanWellhoner/micro-frontends/pull/1))
- [ ] Inject data coming from each micro-frontend into a single table on `container`