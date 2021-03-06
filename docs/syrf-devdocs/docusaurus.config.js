const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'SYRF Developer Guides and API Reference',
  tagline: 'Build the future of sailing sports.',
  url: 'https://sailing-yacht-research-foundation.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  plugins: [
    require.resolve('@cmfcmf/docusaurus-search-local')
  ],
  scripts:['https://developers.syrf.io/umami.js', {src:'https://analytics.syrf.io/umami.js', async: true, 'data-website-id':'d9c6bc6c-4456-4d65-ac9a-cd8a579d76e4'}],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'sailing-yacht-research-foundation', // Usually your GitHub org/user name.
  projectName: 'sailing-yacht-research-foundation.github.io', // Usually your repo name.
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
        {to: '/blog', label: 'Updates', position: 'left'},
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
        },
        {
          title: 'Analytics',
          items:[
            {
              label:'Useage',
              href:'https://analytics.syrf.io/share/l6RXRJYi/Developer%20Documentation'
            }
          ]
        }
      ],
      copyright: `Copyright ?? ${new Date().getFullYear()} <a href='https://www.sailyachtresearch.org'>Sailing Yacht Research Foundation.</a>`,
    },
    announcementBar: {
      id: 'announcementBar-1', // Increment on change
      backgroundColor: '#ff0000', // Defaults to `#fff`.
      textColor: '#ffffff', // Defaults to `#000`.
      isCloseable: false, // Defaults to `true`.
      content:
        'This is the alpha version of our docs. Do not assume any accuracy.',
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
