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

## Getting Started
1. Pull Repository
2. Run the following command on the `Container`, `Messanger`, `Receiver`
    ```bash
    npm install
    ```
3. Run the applications on you local in the following order
    - Receiver
    - Messanger
    - Container

## Whats next

[ ] Create an API and database where messages are sent to and stored