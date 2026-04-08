// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pixellot SDK Docs',
  tagline: 'Integrate Pixellot video capabilities into your mobile application.',
  favicon: 'img/favicon.ico',

  url: 'https://pixellot.github.io',
  baseUrl: '/player-sdk-spm/',

  organizationName: 'Pixellot LTD',
  projectName: 'player-sdk-spm',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./docs/sidebars.js'),
          routeBasePath: '/', // serve docs at root
        },
        blog: false,          // we don't need a blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Pixellot SDK',
        // logo: {
        //   alt: 'Pixellot Logo',
        //   src: 'img/logo.svg',
        // },
        items: [],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['swift', 'kotlin', 'ruby', 'bash'],
      },
      footer: {
        style: 'light',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Pixellot.`,
      },
    }),
};

module.exports = config;
