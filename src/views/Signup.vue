<template>
  <div class="about text-center">
    <div class="container">
      <div>
        <div class="bg-white p-5 mx-auto border" style="width:350px">
          <img
            src="@/assets/fipu_logo.png"
            height="80"
            class="d-inline-block align-top mb-5"
            alt=""
            loading="lazy"
          />
          <form>
            <div class="form-group">
              <input
                type="email"
                v-model="username"
                class="form-control bg-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email address"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="password"
                class="form-control bg-light"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                v-model="passwordRepeat"
                class="form-control bg-light"
                id="exampleInputPassword2"
                placeholder="Repeat Password"
              />
            </div>
            <button
              type="button"
              @click="signup"
              class="btn btn-primary"
              style="font-size: 13px; font-weight:600;"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 mx-auto mt-3 border" style="width:350px">
      Have an account?
      <a href="login" class="primary" style="font-weight:600">Log in</a>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      passwordRepeat: "",
    };
  },
  methods: {
    signup() {
      if (this.password === this.passwordRepeat) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.username,
            this.password,
            this.passwordRepeat
          )
          .then(function() {
            console.log("Uspjesna registracija");
          })
          .catch(function(error) {
            console.log("Doslo je do greske", error);
            alert(error);
          });
        console.log("Nastavak");
      } else {
        alert("Repeat password doesn't match password!");
      }
    },
  },
};
</script>

<style>
body {
  font-size: 14px;
}
input[type="email"],
input[type="password"],
input,
input::-webkit-input-placeholder {
  font-size: 12px;
}
</style>
