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
                type="text"
                v-model="name"
                class="form-control bg-light"
                id="exampleInputUsername1"
                aria-describedby="usernameHelp"
                placeholder="Username"
              />
            </div>
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
                @click="checkEnabled"
                v-model="passwordRepeat"
                class="form-control bg-light"
                id="exampleInputPassword2"
                placeholder="Repeat Password"
              />
            </div>
            <button
              v-if="enable"
              type="button"
              @click="signup"
              class="btn btn-primary"
              style="font-size: 13px; font-weight:600; width:250px;"
            >
              Sign Up
            </button>
            <button
              v-if="!enable"
              type="button"
              @click="signup"
              class="btn btn-primary"
              style="font-size: 13px; font-weight:600; width:250px;"
              disabled
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
import store from "@/store";
import { db, storage } from "@/firebase";

let enable = false;

export default {
  name: "Signup",
  data() {
    return {
      enable,
      name: "",
      username: "",
      password: "",
      passwordRepeat: "",
      profilePic:
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      posts: [],
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
            this.passwordRepeat,
            this.name
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
      store.displayName = this.name;
      store.profilePic =
        "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
      console.log(this.name);
    },
    checkEnabled() {
      if (this.password != "") {
        this.enable = true;
      }
    },
  },
};
</script>

<style>
body {
  font-size: 14px;
}
input[type="text"],
input[type="email"],
input[type="password"],
input,
input::-webkit-input-placeholder {
  font-size: 12px;
}
</style>
