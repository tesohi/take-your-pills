<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
        >
        <label for="description">Имя</label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: ''
  }),
  methods: {
    async submitHandler() {
      if (this.name === '') {
        this.$message('Поле не должно быть пустым')
        return
      }

      try {
        await this.$store.dispatch('updateInfo', {name: this.name})
      } catch (e) {}

      this.name = ''

      this.$message('Выполнено')
    }
  }
}
</script>