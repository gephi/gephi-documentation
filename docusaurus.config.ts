import { themes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const config: Config = {
  title: "Gephi Documentation",
  tagline: "The Open Graph Viz Platform",
  url: "https://docs.gephi.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "gephi", // Usually your GitHub org/user name.
  projectName: "gephi", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
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
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Gephi Documentation",
      logo: {
        alt: "Gephi logo",
        src: "img/logo.svg",
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
          href: "https://github.com/gephi/gephi",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Facebook",
              href: "https://www.facebook.com/groups/gephi",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/gephi",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Official Website",
              to: "https://gephi.org/",
            },
            {
              label: "Blog",
              to: "https://gephi.wordpress.com/",
            },
            {
              label: "GitHub",
              href: "https://github.com/gephi/gephi",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gephi. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["java"],
    },
  },
};

module.exports = config;
