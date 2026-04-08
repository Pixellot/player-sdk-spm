/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Getting Started',
    },
    {
      type: 'category',
      label: 'Project Setup',
      collapsible: false,
      items: [
        'project-setup/project-creation',
        'project-setup/project-activation',
        'project-setup/user-authentication',
      ],
    },
    {
      type: 'category',
      label: 'Project Usage',
      collapsible: false,
      items: ['project-usage/events-and-hooks'],
    },
    {
      type: 'category',
      label: 'Player SDK',
      collapsible: false,
      items: [
        'player-sdk/ios',
        'player-sdk/android',
      ],
    },
  ],
};

module.exports = sidebars;
