module.exports = {
  source: {
    include: ['src/server'],
    exclude: ['node_modules', 'docs'],
    includePattern: '.+\\.js(x)?$',
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
