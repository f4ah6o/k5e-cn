// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/table-filter',
        'components/form-validator',
        'components/conditional-fields',
        'components/bulk-update',
        'components/export-enhanced',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/customization', 'guides/typescript', 'guides/best-practices'],
    },
  ],
};

export default sidebars;