<template>
  <div class="authentification">
    <button @click="isSignUp = !isSignUp">
      <span v-if="isSignUp">Sign up</span>
      <span v-else>Sign in</span>
    </button>

    <SignUpForm
      v-if="isSignUp"
      :disabledSubmitBtn="isErrorSignUp"
      @onSubmit="signUp"
      @on-update-form="updateErrorSignUp"
    />
    <SignInForm
      v-if="!isSignUp"
      :disabledSubmitBtn="isErrorLogin"
      @onSubmit="login"
      @on-update-form="updateErrorLogin"
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
      isErrorLogin: false,
      isErrorSignUp: false,
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
      const { user, error: errorSignUp } = await this.$supabase.auth.signUp({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      // const { data: profile, error: errorInsert } = await this.$supabase
      //   .from('profile')
      //   .upsert([{ id: user.id, first_name: firstName, last_name: lastName }]);

      // console.log(profile, errorInsert);
      if (errorSignUp) {
        alert(`Error ${errorSignUp.status}: ${errorSignUp.message}`);
      }
      if (user) {
        this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
      }
      this.updateErrorLogin(errorSignUp);
    },
    async login({ email, password }) {
      try {
        const { user, error: errorLogin } = await this.$supabase.auth.signIn({
          email,
          password,
        });
        if (errorLogin) {
          alert(`Error ${errorLogin.status}: ${errorLogin.message}`);
        }

        this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
        this.updateErrorLogin(errorLogin);
        console.log('signIn', user, errorLogin);
      } catch (err) {
        alert(err);
      }
    },
    async signInWithGithub() {
      // FIXME : the OATH2 is not working yet
      const { user, error } = await this.$supabase.auth.signUp({
        provider: 'github',
        password: 'need to have the password from github ',
        email: 'need to have the password from github',
      });
      if (error) {
        alert(`Error ${error.status}: ${error.message}`);
      }
      console.log(user, error);

      this.$store.commit('ON_AUTH_STATE_CHANGED_MUTATION', user);
    },
    updateErrorLogin(value) {
      this.isErrorLogin = !!value;
    },
    updateErrorSignUp(value) {
      this.isErrorSignUp = !!value;
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
