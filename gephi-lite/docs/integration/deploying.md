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


## Build from Source

Gephi Lite is a [React](https://react.dev/) application. To build it, you need [npm](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads) installed on your computer.

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
By default, the build process creates a website that must be served under the `/gephi-lite` path (e.g. [http://localhost/gephi-lite/](http://localhost/gephi-lite/)).  

In the example above, we set the environment variable `BASE_URL` to `/` so the application can be served at the root of the domain.  
You can adjust it to any path you prefer.
:::

4. The static files of the Gephi Lite application are built in the folder:

```
./packages/gephi-lite/build/
```

You can copy these files to any location, for example `/var/www/html/gephi-lite`.

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
