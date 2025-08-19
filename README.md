# Gephi documentations websites

This repository is for the gephi projects documentation, with one site for Gephi (desktop) and an other one for Gephi-Lite.
In the futur, we can have others. 

Each of those sites are a docusaurus instance. 

## How to use it 

It's a javascript mono-repo project.

Before all, you need to install the project's dependencies
```
$> npm install
```

There are 3 main commands in the project

### npm start

```
$> npm start
```

It starts the project in dev mode, so you will have the hot reload feature.
Under the hood, it starts the docusaurus instance for geph & gephi-lite, as well as a vite server that serves the root index.html files and has a proxy for each docusaurus instance.

Open the url http://localhost:5173

### npm run build

It builds the static website inside the `/build` directory. 

```
$> npm run build
```

### npm run preview

It runs a webserver that serves the `/build` directory. So it should be used after a `npm run build` to preview the build

```
$> npm run preview
```

Open the url http://localhost:5174