<script setup>
import { ref } from "vue";

const formData = ref({
  email: "",
  password: "",
});

const loginFormSubmit = () => {
  console.log(formData.value);
};
</script>
<template>
  <main class="form-signin w-100 m-auto text-center">
    <form>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="formData.email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="formData.password"
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="checkbox mb-3 visually-hidden">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        @click.prevent="loginFormSubmit"
      >
        Sign in
      </button>
    </form>
  </main>
</template>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
