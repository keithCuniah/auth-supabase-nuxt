<template>
  <div>
    <h1 v-if="currentUser">
      Welcome mister <em>{{ currentUser.id }}</em>
    </h1>
    <div v-if="!error" class="smoothies">
      <h3>Smoothies :</h3>

      <table>
        <tr>
          <th>Smoothie</th>
          <th>Method</th>
          <th>Rating</th>
        </tr>
        <tr v-for="smoothie in smoothies" :key="smoothie.id">
          <td>{{ smoothie.title }}</td>
          <td>{{ smoothie.method }}</td>
          <td>{{ smoothie.rating }}</td>
        </tr>
      </table>
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
<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
