---
title: Deploying Gephi Lite
sidebar_position: 2
---

You can easily deploy **Gephi Lite** in your environment.  
This guide explains several ways to do it.

## Using Docker

We provide an official Docker image of Gephi Lite: [Docker Hub - ouestware/gephi-lite](https://hub.docker.com/r/ouestware/gephi-lite)

The image contains a built version of Gephi Lite, served by [Nginx](https://nginx.org/) on port `80`.

To use it, open your terminal and run the following commands:

```sh
docker pull ouestware/gephi-lite:latest
docker run --name gephi-lite -d -p 80:80 ouestware/gephi-lite:latest
```

Then open [http://localhost](http://localhost) in your browser.

## Using Docker Compose (local development)

The Gephi Lite repository also provides a `docker-compose.yml` file. It runs Gephi Lite directly from the sources, in
development mode, without installing Node.js on your computer. It is designed for **local development**, not for
production.

From a clone of the repository (see below), run:

```sh
docker compose up
```

Then open [http://localhost:5173/gephi-lite/](http://localhost:5173/gephi-lite/) in your browser. Run
`docker compose down` to stop it.

:::info
The sources folder is mounted with the `:z` option, so this also works on SELinux systems (Fedora, etc.).
:::

## Build from Source

Gephi Lite is a [React](https://react.dev/) application. To build it, you need [Node.js](https://nodejs.org/en/download)
(version 24, with npm) and [Git](https://git-scm.com/downloads) installed on your computer.

1. Clone the repository:

```sh
git clone https://github.com/gephi/gephi-lite.git
cd gephi-lite
```

2. Install dependencies:

```sh
npm install
```

3. Build the project:

```sh
export BASE_URL=/ && npm run build
```

:::info
By default, the build process creates a website that must be served under the `/gephi-lite` path (e.g.
[http://localhost/gephi-lite/](http://localhost/gephi-lite/)).

In the example above, we set the environment variable `BASE_URL` to `/` so the application can be served at the root of
the domain. You can adjust it to any path you prefer.
:::

Other environment variables can be set at build time:

- `VITE_GITHUB_PROXY`: URL of the GitHub proxy used for the [GitHub integration](../user-manual/github-auth.md)
  (default: `/_github`, see the Nginx example below)
- `VITE_CHECK_LATEST_VERSION`: set it to `true` to show a message on the welcome modal when a newer Gephi Lite version
  is available (default: `false`)
- `VITE_VERSION_URL`: URL of the JSON file listing Gephi Lite versions, used by the previous option (default:
  `https://lite.gephi.org/versions.json`)

4. The static files of the Gephi Lite application are built in the folder:

```
./packages/gephi-lite/build/
```

You can copy these files to any location, for example `/var/www/html/gephi-lite` or start a web server in this directory:

With python

```bash
python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

With NPM

```bash
npx http-serve
Starting up http-serve for ./
Available on:
  http://127.0.0.1:8081
```

5. Configure your web server (Apache, Nginx, etc.) to serve this folder.  
   Here’s an **Nginx example**:

```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;

  # Replace this location with the one where you placed the Gephi Lite files
  root /var/www/html/gephi-lite;

  # Required for React applications
  location / {
    try_files $uri $uri/ =404;
  }

  # For GitHub authentication to work
  # We need to create a GitHub proxy to `https://github.com/login` that accepts CORS
  location /_github/login {
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, user-agent";

    if ($request_method = OPTIONS) {
      return 204;
    }

    proxy_pass https://github.com/login;
  }
}
```

## External resources

Gephi Lite runs fully in the browser, but some features load resources from other servers:

- The [map background](../user-manual/map.md) loads its tiles from
  [MapLibre demo tiles](https://demotiles.maplibre.org/) by default. Users can point the
  [map style](../user-manual/map.md#map-style) to other tiles, for instance ones hosted on your own servers.
- The [GitHub integration](../user-manual/github-auth.md) needs the GitHub proxy described above.
- The new version message calls `VITE_VERSION_URL`, if `VITE_CHECK_LATEST_VERSION` is `true`.
