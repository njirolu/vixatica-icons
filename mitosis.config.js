/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  targets: ['svelte', 'react', 'solid', 'vue3'],
  dest: 'packages/',
  options: {
    react: {
      typescript: true,
      addUseClientDirectiveIfNeeded: false
    },
    svelte: {
      typescript: true
    },
    solid: {
      typescript: true
    },
    vue3: {
      typescript: true,
      api: 'composition',
      defineComponent: true
    }
  },
  getTargetPath: ({ target }) => {
    switch (target) {
      case 'react':
        return 'react/';
      case 'solid':
        return 'solid/';
      case 'svelte':
        return 'svelte/';
      case 'vue3':
        return 'vue/';
    }
  }
};
