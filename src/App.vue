<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + "-layout";
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';

.dropdown-content {
  top: -66px;
}

.my-spinner-colour {
  border-color: rgb(97, 158, 187);
}

.my-bg-colour {
  background-color: rgb(97, 158, 187);
}

.btn, .btn-large, .btn-small {
  background-color: rgb(97, 158, 187);
}

.btn:focus, .btn-large:focus, .btn-small:focus,
.btn-floating:focus {
  background-color: rgb(97, 158, 187);
}

.btn:hover, .btn-large:hover, .btn-small:hover {
  background-color: rgb(97, 158, 187);
}

.fixed-action-btn .fab-backdrop {
  background-color: rgb(97, 158, 187);
}

.btn-floating {
  background-color: rgb(97, 158, 187);
}
</style>
