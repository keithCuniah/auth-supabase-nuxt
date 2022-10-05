<template>
  <!-- <div>Authentification</div> -->
  <div class="authentification">
    <!-- <button @click="deleteUser">Delete user</button> -->
    <button @click="isSignUp = !isSignUp">
      <span v-if="isSignUp">Sign up</span>
      <span v-else>Sign in</span>
    </button>
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
      const { user, error } = await this.$supabase.auth.signUp({
        ...this.credential,
      });
      this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
      console.log('signUp', user, error);
    },
    async login() {
      try {
        const { user, error } = await this.$supabase.auth.signIn({
          ...this.credential,
        });
        if (error) {
          alert(`Error ${error.status}: ${error.message}`);
        }
        if (user) {
          this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
        }
        console.log('signIn', user, error);
      } catch (err) {
        alert(err);
      }
    },
  },
};
</script>

<style scoped>
.authentification {
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
