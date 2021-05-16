<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link> 
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Напоминания', url: '/', exact: true},
      {title: 'Заметки', url: '/notes'},
      {title: 'Препараты и процедуры', url: '/pills'},
      {title: 'Анализы и обследования', url: '/analyzes'},
      {title: 'Рекомендации врачей', url: '/recommendations'}
    ]
  })
}
</script>