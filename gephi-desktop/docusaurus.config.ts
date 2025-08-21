import { themes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import defaultConfig from "../docusaurus.common";

const config: Config = {
  ...defaultConfig,
  title: "Gephi Desktop Documentation",
  tagline: "The Open Graph Viz Platform",
  url: "https://docs.gephi.org/",
  baseUrl: "/desktop",
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
        customCss: require.resolve("../public/style.css"),
      },
    },
  ],
];

config.themeConfig.navbar = {
  title: "Gephi",
  logo: {
    alt: "Gephi",
    src: "img/logo.svg",
    height: "32px",
    width: "32px",
  },
  items: [
    {
      to: "/",
      activeBasePath: "docs",
      label: "User Manual",
      position: "left",
    },
    {
      to: "Developer_Documentation",
      label: "Developer Documentation",
      position: "left",
    },
    {
      to: "Plugins",
      label: "Plugin Development",
      position: "left",
    },
    {
      href: "http://docs.gephi.org/",
      label: "Gephi Documentations",
      position: "right",
    },
    {
      href: "https://gephi.org",
      label: "Gephi Website",
      position: "right",
    },
    {
      href: "https://github.com/gephi/gephi",
      label: "GitHub",
      position: "right",
    },
  ],
};

module.exports = config;
