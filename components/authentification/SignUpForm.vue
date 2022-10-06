<template>
  <div class="form-signup">
    <h1>Please sign up</h1>
    <form @submit.prevent="() => onSubmit()" @change="$emit('on-update-form')">
      <div class="form-group">
        <input
          v-model="credential.firstName"
          type="text"
          class="form-control"
          placeholder="Julio"
        />
      </div>
      <div class="form-group">
        <input
          v-model="credential.lastName"
          type="text"
          class="form-control"
          placeholder="IGLESIAS"
        />
      </div>
      <div class="form-group">
        <input
          v-model="credential.email"
          type="email"
          class="form-control"
          :class="{
            'is-invalid': $v.credential.email.$invalid & $v.credential.$dirty,
            'is-valid': !$v.credential.email.$invalid,
          }"
          placeholder="name@example.com"
          @blur="triggerVuelidateDirtyState"
        />
        <div class="error-desc">
          <em v-if="$v.credential.email.$invalid & $v.credential.$dirty">
            Please right a valid email example@domain.es
          </em>
        </div>
      </div>
      <div class="form-group">
        <input
          v-model="credential.password"
          type="password"
          :class="{
            'is-invalid':
              $v.credential.password.$invalid & $v.credential.$dirty,
            'is-valid': !$v.credential.password.$invalid,
          }"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          @blur="triggerVuelidateDirtyState"
        />
        <div class="error-desc">
          <em v-if="$v.credential.password.$invalid & $v.credential.$dirty">
            Please right a valid password. More than
            {{ $v.credential.password.$params.minLength.min }} charaters
          </em>
        </div>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        :disabled="isSubmitDisabled"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'SignUpForm',
  props: {
    disabledSubmitBtn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      credential: { firstName: '', lastName: '', email: '', password: '' },
    };
  },
  validations: {
    credential: {
      email: {
        required,
        email,
      },
      password: { required, minLength: minLength(6) },
    },
  },
  computed: {
    isSubmitDisabled() {
      return this.$v.credential.$invalid || this.disabledSubmitBtn;
    },
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.credential);
    },
    triggerVuelidateDirtyState() {
      this.$v.$touch();
    },
  },
};
</script>

<style scoped>
.form-signup {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

form {
  display: flex;
  width: min-content;
  flex-direction: column;
  gap: 2em;
}

.form-group {
  display: inline-flex;
  flex-direction: column;
}

form .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
form .form-control:focus {
  z-index: 2;
}

.is-invalid {
  border-color: red;
}
</style>
