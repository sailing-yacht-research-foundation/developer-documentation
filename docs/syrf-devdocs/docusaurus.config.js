const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'SYRF Developer Guides and API Reference',
  tagline: 'Build the future of sailing sports.',
  url: 'https://developers.syrf.io/documentation',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'sailing-yacht-research-foundation', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'SYRF Developer Guides and API Reference',
      logo: {
        alt: 'SYRFLogo',
        src: 'img/syrf_logo.png',
      },
      items: [
        {type: 'docsVersionDropdown'},
        {
          type: 'doc',
          docId: 'guides/intro',
          position: 'left',
          label: 'Guides',
        },
        {type: 'doc', docId:'ios/intro', label:'iOS SDK', position:'left'},
        {type: 'doc', docId:'android/intro', label:'Android SDK', position:'left'},
        {type: 'doc', docId:'react-native/intro', label:'React Native SDK', position:'left'},
        {type: 'doc', docId:'rest/intro', label:'Websockets & REST', position:'left'},
        {to: '/blog', label: 'Release Notes', position: 'left'},
        {to: '/showcase', label: 'Showcase', position: 'left'},
        {
          href: 'https://github.com/sailing-yacht-research-foundation',
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
              label: 'Guides',
              to: '/docs/guides/intro',
            },
            {
              label: 'iOS',
              to: '/docs/ios/intro',
            },
            {
              label: 'Android',
              to: '/docs/android/intro',
            },
            {
              label: 'React Native',
              to: '/docs/react-native/intro',
            },
            {
              label: 'REST',
              to: '/docs/rest/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/syrfio',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/EfvufEsDua',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/sailing-yacht-research-foundation',
            },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sailing Yacht Research Foundation.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        ios: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
