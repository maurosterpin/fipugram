<template>
  <div class="about text-center mt-5 pt-5">
    <div class="container">
      <div v-if="!upload" class="profileHeader">
        <img
          v-if="myProfile"
          v-on:click="uploadPfp"
          class="pfp"
          v-bind:src="this.pfp"
          alt="profilePhoto"
        />
        <img
          v-if="!myProfile"
          class="pfp"
          v-bind:src="this.pfp"
          alt="profilePhoto"
        />
        <h5 class="mb-4 pfpName">{{ this.name }}</h5>
      </div>

      <div class="posts" v-for="(item, index) in cards" :key="index">
        <img v-if="!upload" :src="item" />
      </div>

      <div
        v-if="upload"
        class="bg-white p-5 mx-auto border"
        style="width:350px"
      >
        <h3 class="mb-4">Profile photo</h3>
        <form @submit.prevent="postNewProfilePic" class="mb-4">
          <div class="form-group">
            <croppa
              :width="200"
              :height="200"
              placeholder="Upload img"
              v-model="imageReference"
            ></croppa>
          </div>
          <button type="submit" class="btn btn-primary ml-2">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { db, storage } from "@/firebase";
import firebase from "@/firebase";
import router from "@/router";

export default {
  name: "Profile",
  data() {
    return {
      name: null,
      imageReference: null,
      newProfileUrl: "",
      upload: false,
      pfp: null,
      cards: [],
      myProfile: null,
    };
  },
  mounted() {
    if (store.currentUserUid == store.visitedProfile) {
      router.push({ name: "myProfile" });
    }
    console.log("UID I UID", store.currentUserUid, store.visitedProfile);
    this.getUserdata();
    db.collection("users")
      .doc(store.visitedProfile)
      .get()
      .then((doc) => {
        this.name = doc.data().username;
        this.pfp = doc.data().profilePic;
      });
    this.getPosts();
  },
  methods: {
    uploadPfp() {
      this.upload = !this.upload;
    },
    getUserdata() {
      if (store.currentUserUid == store.visitedProfile) {
        this.myProfile = true;
      } else {
        this.myProfile = false;
      }
    },
    async getPosts() {
      console.log("Firebase dohvat postova");

      await db
        .collection("users")
        .doc(store.visitedProfile)
        .collection("posts")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();
            console.log("Post", data.url);
            this.cards.push(data.url);
          });
        });
      console.log(this.cards[0]);
    },
    getImage() {
      return new Promise((resolveFn, errorFn) => {
        this.imageReference.generateBlob((data) => {
          resolveFn(data);
        });
      });
    },
  },
  // computed: {
  //   name() {
  //     db.collection("users")
  //       .doc(store.visitedProfile)
  //       .get()
  //       .then((doc) => {
  //         return doc.data().username;
  //       });
  //   },
  // },
  watch: {
    name() {},
  },
};
</script>

<style>
body {
  font-size: 14px;
  min-height: 118vh;
  overflow-x: hidden;
}

.posts img {
  width: 350px;
  height: 350px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

.profileHeader {
  display: flex;
}

.pfp {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.pfpName {
  margin-top: 13px;
  margin-left: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input,
input::-webkit-input-placeholder {
  font-size: 12px;
}
</style>
