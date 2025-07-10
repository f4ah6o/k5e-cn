// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '@k5e/cn',
  tagline: 'A shadcn/ui-inspired component library for kintone customization',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://f4ah6o.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/k5e-cn/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'f4ah6o', // Usually your GitHub org/user name.
  projectName: 'k5e-cn', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/f4ah6o/k5e-cn/tree/main/apps/www/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.svg',
      navbar: {
        title: '@k5e/cn',
        logo: {
          alt: '@k5e/cn Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/f4ah6o/k5e-cn',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Components',
                to: '/docs/category/components',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/f4ah6o/k5e-cn',
              },
              {
                label: 'Issues',
                href: 'https://github.com/f4ah6o/k5e-cn/issues',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'kintone Developer Program',
                href: 'https://developer.cybozu.io/hc/ja',
              },
              {
                label: 'shadcn/ui',
                href: 'https://ui.shadcn.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} @k5e/cn contributors. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
}

export default config
