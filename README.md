  <p align="center">
  <a href="https://vixaticaicons.vercel.app/#" target="_blank">
    <img src="https://raw.githubusercontent.com/njirolu/vixatica-icons/main/static/img/logo.svg" alt="Vixaticaicons" width="300">
  </a>
</p>

<p align="center">
  Exclusive Icon library for Various UI Needs! <br>Offered as fundamental SVG icons and through official libraries for <a href="#react">React</a>, <a href="#vue">Vue</a>, <a href="#svelte">Svelte</a> and <a href="#solid">Solid</a> libraries.
<p>

<p align="center">
  <a href="https://vixaticaicons.vercel.app/"><strong>Browse at Vixatica Icons &rarr;</strong></a>
</p>


## React

First, install `@vixatica-icons/react` from npm:

```sh
npm install @vixatica-icons/react
```

Now each icon can be imported individually as a React component:

```js
import { AddOutline } from '@vixatica-icons/react'

function MyComponent() {
  return (
    <div>
      <AddOutline color={'red'} height={1000} width={1000} />
      <p>...</p>
    </div>
  )
}
```

## Vue

_Note that this library currently only supports Vue 3._

First, install `@vixatica-icons/vue` from npm:

```sh
npm install @vixatica-icons/vue
```

Now each icon can be imported individually as a Vue component:

```vue
<template>
  <div>
     <AddOutline :height="1000" :width="1000" :color="'red'" />
    <p>...</p>
  </div>
</template>

<script setup>
import { AddOutline } from '@vixatica-icons/vue'
</script>
```

## Svelte

First, install `@vixatica-icons/svelte` from npm:

```sh
npm install @vixatica-icons/svelte
```

Now each icon can be imported individually as a Svelte component:

```svelte
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<AddOutline color='red' height={32} width={32} />

<script lang="ts">
    import { AddOutline } from "@cavitiaxaicons/svelte";
</script>
```

## Solid

First, install `@vixatica-icons/solid` from npm:

```sh
npm install @vixatica-icons/solid
```

Now each icon can be imported individually as a Solid component:

```js
import { AddOutline } from '@vixatica-icons/solid'

function MyComponent() {
  return (
    <div>
      <AddOutline color={'red'} height={1000} width={1000} />
      <p>...</p>
    </div>
  )
}
```

## License

This library is MIT licensed.
