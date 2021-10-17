<template>
  <div class="about text-center mt-5 pt-5">
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
                v-model="password"
                type="password"
                class="form-control bg-light"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button
              v-if="enable"
              type="button"
              @click="login()"
              class="btn btn-primary"
              style="font-size: 13px; font-weight:600; width:250px;"
            >
              Log In
            </button>
            <button
              v-if="!enable"
              type="button"
              @click="login()"
              class="btn btn-primary"
              style="font-size: 13px; font-weight:600; width:250px;"
              disabled
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 mx-auto mt-3 border" style="width:350px">
      Don't have an account?
      <a href="signup" class="primary" style="font-weight:600">Sign up</a>
    </div>
  </div>
</template>
<script>
import firebase from "@/firebase";

let enable = false;

export default {
  name: "Login",
  data() {
    return {
      enable,
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login..." + this.username + this.password);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then((result) => {
          console.log("Uspjesna prijava", result);
          //this.$router.replace({ name: "Home" });
        })
        .catch(function(error) {
          console.log("Greska", error);
        });
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
