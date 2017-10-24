module.exports = {
  source: {
    includePattern: '.+\\.js(x)?$',
    excludePattern: '(node_modules/|docs)',
  },
  sourceType: 'module',
  opts: {
    template: 'node_modules/minami',
    encoding: 'utf8',
    destination: 'docs/',
    recurse: true,
  },
  recurseDepth: 10,
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc'],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: true,
    useLongnameInNav: false,
    showInheritedInNav: true,
  },
  plugins: [
    'plugins/markdown',
  ],
};
