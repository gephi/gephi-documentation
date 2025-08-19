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
  favicon: "img/logo.svg",

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
  themeConfig: {
    navbar: {},
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

export default config;
