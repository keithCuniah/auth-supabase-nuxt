<template>
  <div class="authentification">
    <button @click="isSignUp = !isSignUp">
      <span v-if="isSignUp">Sign up</span>
      <span v-else>Sign in</span>
    </button>

    <SignUpForm v-if="isSignUp" @onSubmit="signUp" />
    <SignInForm v-if="!isSignUp" @onSubmit="login" />
  </div>
</template>

<script>
import SignUpForm from '~/components/authentification/SignUpForm.vue';
import SignInForm from '~/components/authentification/SignInForm.vue';
export default {
  name: 'Authentification',
  components: { SignUpForm, SignInForm },
  data() {
    return {
      isSignUp: true,
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
    async signUp({ email, password }) {
      const { user, error } = await this.$supabase.auth.signUp({
        email,
        password,
      });
      this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
      console.log('signUp', user, error);
    },
    async login({ email, password }) {
      try {
        const { user, error } = await this.$supabase.auth.signIn({
          email,
          password,
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

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
