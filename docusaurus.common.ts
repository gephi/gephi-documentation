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
          title: "Project",
          items: [
            {
              label: "About",
              href: "https://gephi.org/about",
            },
            {
              label: "Get some help",
              href: "https://gephi.org/help",
            },
            {
              label: "Contribute",
              href: "https://gephi.org/contribute",
            },
            {
              label: "Documentation",
              href: "https://docs.gephi.org",
            },
            {
              label: "Blog",
              href: "https://gephi.wordpress.com/",
            },
            {
              label: "Donate",
              href: "https://opencollective.com/gephi/donate?interval=oneTime&amount=5&name=&legalName=&email=",
            },
          ],
        },
        {
          title: "Applications",
          items: [
            {
              label: "Gephi",
              href: "https://gephi.org/desktop",
            },
            {
              label: "Gephi Lite",
              href: "https://gephi.org/lite",
            },
            {
              label: "Gephi Toolkit",
              href: "https://gephi.org/toolkit",
            },
            {
              label: "Gephisto",
              href: "https://gephi.org/gephisto",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Open Collective",
              to: "https://opencollective.com/gephi",
            },
            {
              label: "GitHub",
              to: "https://github.com/gephi",
            },
            {
              label: "Mastodon",
              href: "https://vis.social/@Gephi",
            },
            {
              label: "Reddit",
              href: "https://reddit.com/r/gephi",
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
