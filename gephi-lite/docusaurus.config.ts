import { themes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import defaultConfig from "../docusaurus.common";

const config: Config = {
  ...defaultConfig,
  title: "Gephi Lite Documentation",
  tagline: "The Open Graph Viz Platform",
  url: "https://docs.gephi.org/",
  baseUrl: "/lite",
};

config.presets = [
  [
    "classic",
    {
      docs: {
        routeBasePath: "/",
        sidebarPath: require.resolve("./sidebars.ts"),
        // Please change this to your repo.
        // Remove this to remove the "edit this page" links.
        editUrl: "https://github.com/gephi/gephi-documentation/docs",
      },
      theme: {
        customCss: require.resolve("./../public/style.css"),
      },
    },
  ],
];

config.themeConfig.navbar = {
  title: "Gephi-Lite",
  logo: {
    alt: "Gephi Lite",
    src: "img/logo.svg",
  },
  items: [
    {
      href: "http://docs.gephi.org/",
      label: "Gephi Documentations",
      position: "right",
    },
    {
      href: "https://github.com/gephi/gephi-lite",
      label: "GitHub",
      position: "right",
    },
  ],
};

module.exports = config;
