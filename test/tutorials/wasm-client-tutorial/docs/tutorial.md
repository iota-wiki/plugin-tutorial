# Tutorial for the iota.rs WASM bindings

![iota_client_wasm](/iota_client.png "Click to see the full-size image.")

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Dr-Electron/identity-iota-svelte-example/tree/gitpod-integration)

In this tutorial you will setup a basic Svelte website with the WASM bindings.

# Prerequisites

- npm


# Setup

Install the dependencies...

```bash
npm i
```

# Run

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).