<template>
  <!-- <div>Authentification</div> -->
  <div class="">
    <!-- <button @click="deleteUser">Delete user</button> -->
    <form
      class="formular"
      @submit.prevent="() => (isSignUp ? signUp() : login())"
    >
      <input v-model="credential.email" type="text" placeholder="Email" />
      <input
        v-model="credential.password"
        type="password"
        placeholder="Password"
      />

      <button type="submit" class="submit-button">Submit</button>
    </form>
    <button @click="isSignUp = !isSignUp">
      <span v-if="isSignUp">Have an account? Log in instead</span>
      <span v-else>Create a new account</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Authentification',
  data() {
    return {
      isSignUp: true,
      credential: { email: '', password: '' },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  watch: {
    currentUser(newUser) {
      if (newUser) {
        this.$router.push({
          name: 'index',
        });
      }
    },
  },
  methods: {
    async signUp() {
      const { user, error } = await this.$supabase.auth.signUp(this.credential);
      console.log({ ...this.credential });
      this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
      console.log('signUp', user, error);
    },
    async login() {
      const { user, error } = await this.$supabase.auth.signIn(this.credential);
      console.log('signIn', user, error);
    },
  },
};
</script>

<style scoped>
.formular {
  display: flex;
  flex-direction: column;
  max-width: 50em;
  gap: 2em;
}

input {
  padding: 2em;
  background-color: #ddd;
  border-radius: 20px;
}
.submit-button {
  padding: 2em;
  background-color: green;
  border-radius: 20px;
}
</style>
