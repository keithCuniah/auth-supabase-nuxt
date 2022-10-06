<template>
  <div class="authentification">
    <button @click="isSignUp = !isSignUp">
      <span v-if="isSignUp">Sign up</span>
      <span v-else>Sign in</span>
    </button>

    <SignUpForm v-if="isSignUp" @onSubmit="signUp" />
    <SignInForm
      v-if="!isSignUp"
      :disabledSubmitBtn="errorLogin"
      @onSubmit="login"
      @on-update-form="resetErrorLogin"
    />
    <!-- <button @click="signInWithGithub">Sign in with github?</button> -->
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
      errorLogin: false,
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
    async signUp({ firstName, lastName, email, password }) {
      const { user, error } = await this.$supabase.auth.signUp({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);

      const { data: profile, error: errorInsert } = await this.$supabase
        .from('profile')
        .upsert([{ id: user.id, first_name: firstName, last_name: lastName }]);

      console.log(profile, errorInsert);
      console.log('signUp', user, error);
    },
    async login({ email, password }) {
      try {
        const { user, error: errorLogin } = await this.$supabase.auth.signIn({
          email,
          password,
        });
        if (errorLogin) {
          alert(`Error ${errorLogin.status}: ${errorLogin.message}`);
          this.errorLogin = true;
        }
        if (user) {
          this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
          this.resetErrorLogin = false;
        }
        console.log('signIn', user, errorLogin);
      } catch (err) {
        alert(err);
      }
    },
    async signInWithGithub() {
      const { user, error } = await this.$supabase.auth.signUp({
        provider: 'github',
        password: 'need to have the password from github ',
        email: 'need to have the password from github',
      });
      if (error) {
        alert(`Error ${error.status}: ${error.message}`);
      }
      console.log(user, error);
      if (user) {
        this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
      }
    },
    resetErrorLogin() {
      this.errorLogin = false;
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
</style>
