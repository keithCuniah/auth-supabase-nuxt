<template>
  <div>
    <h1 v-if="currentUser">
      Welcome mister <em>{{ currentUser.id }}</em>
    </h1>
    <div v-if="!error" class="smoothies">
      <h3>Smoothies :</h3>
      <ul v-for="smoothie in smoothies" :key="smoothie.id" class="smoothies">
        <li>{{ smoothie.title }}</li>
      </ul>
    </div>
    <span v-else class="error-description">
      {{ error.message }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'auth',
  data() {
    return {
      smoothies: null,
      error: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      const { data, error } = await this.$supabase
        .from('smoothies')
        .select('*');
      this.smoothies = data;
      this.error = error;
    },
  },
};
</script>
