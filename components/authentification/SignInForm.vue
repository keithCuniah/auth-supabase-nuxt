<template>
  <form @submit.prevent="() => onSubmit()">
    <h1>Please sign in</h1>

    <div class="form-floating">
      <input
        v-model="credential.email"
        type="email"
        class="form-control"
        placeholder="name@example.com"
      />
    </div>
    <div class="form-floating">
      <input
        v-model="credential.password"
        type="password"
        class="form-control"
        placeholder="Password"
      />
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script>
export default {
  name: 'SignInForm',
  data() {
    return { credential: { email: '', password: '' } };
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.credential);
    },
  },
};
</script>

<style scoped>
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
