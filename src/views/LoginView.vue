<script setup>
import { onMounted, ref } from "vue";
import axios from "../utils/axios.js";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const router = useRouter();

const currentUser = useUserStore();

const formData = ref({
  email: "",
  password: "",
});

const errorMesssage = ref("");

const loginFormSubmit = async () => {
  const URL = "login/";

  try {
    const response = await axios.post(URL, formData.value);

    if (response.data.status === "ok") {
      const { token, user } = response.data;

      currentUser.login(user);
      token && localStorage.setItem("auth", token);

      errorMesssage.value = "";
      formData.value.email = "";
      formData.value.password = "";

      router.push("/");
    }

    if (response.data.status === "error") {
      errorMesssage.value = response.data.message;
    }
  } catch (error) {
    console.log("Login error: ", error);
  }
};

onMounted(async () => {
  if (localStorage.getItem("auth")) {
    await currentUser.auth();
  }
});
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
      <div class="checkbox mb-3">
        <div class="invalid-feedback">
          {{ errorMesssage }}
        </div>
        <label class="visually-hidden">
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

.invalid-feedback {
  display: block;
  min-height: 21px;
}
</style>
