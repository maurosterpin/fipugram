<template>
  <div class="about text-center mt-5 pt-5">
    <div class="container">
      <div v-if="!upload && !post" class="profileHeader">
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
        <h6 class="postImg">
          <span class="postNew" @click="postNew">Post image</span>
        </h6>
      </div>

      <div class="posts" v-for="(item, index) in computedPosts" :key="index">
        <img v-if="!upload && !post" :src="item" />
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
      <!-- nova forma za post -->
      <div
        v-if="post"
        class="bg-white p-5 mx-auto border"
        style="width:500px; height: 620px"
      >
        <h3 class="mb-4"><span class="postImage">Post image</span></h3>
        <form @submit.prevent="postNewImage" class="mb-5">
          <div class="form-group">
            <croppa
              :width="400"
              :height="400"
              placeholder="Upload img"
              v-model="imageReference"
            ></croppa>
          </div>
          <button type="submit" class="btn btn-primary ml-2">Post image</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { db, storage } from "@/firebase";
import firebase from "@/firebase";

export default {
  name: "Profile",
  data() {
    return {
      name: null,
      imageReference: null,
      newProfileUrl: "",
      upload: false,
      post: false,
      pfp: null,
      cards: [],
      myProfile: null,
    };
  },
  mounted() {
    this.getUserdata();
    db.collection("users")
      .doc(store.currentUserUid)
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
    postNew() {
      this.post = !this.post;
      console.log("POST TEST");
    },
    getUserdata() {
      if (store.currentUserUid == store.currentUserUid) {
        this.myProfile = true;
      } else {
        this.myProfile = false;
      }
    },
    async getPosts() {
      console.log("Firebase dohvat postova");

      await db
        .collection("users")
        .doc(store.currentUserUid)
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
    async postNewProfilePic() {
      try {
        let blobData = await this.getImage();
        let imageName =
          "profilePics/" + store.currentUser + "/" + Date.now() + ".png";
        let result = await storage.ref(imageName).put(blobData);
        let url = await result.ref.getDownloadURL();
        const profileImg = url;
        store.profilePic = profileImg;
        console.log("LINK!!!!!", store.profilePic);
        console.log("Public link: ", url);
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            db.collection("users")
              .doc(store.currentUserUid)
              .update({
                profilePic: url,
              });
            console.log("Uspjesno novi pfp!");
            store.profilePic = url;
            this.pfp = store.profilePic;
            this.upload = !this.upload;
          }
        });

        console.log("Spremljeno", doc);
        this.imageReference.remove();
      } catch (e) {
        console.error("Error", e);
      }
    },
    getImage() {
      return new Promise((resolveFn, errorFn) => {
        this.imageReference.generateBlob((data) => {
          resolveFn(data);
        });
      });
    },
    async postNewImage() {
      try {
        let blobData = await this.getImage();
        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";
        let result = await storage.ref(imageName).put(blobData);
        let url = await result.ref.getDownloadURL();
        console.log("Public link: ", url);
        const imageUrl = this.newImageUrl;
        let doc = await db.collection("posts").add({
          url: url,
          user: store.currentUser,
          displayName: store.displayName,
          posted_at: Date.now(),
          pic: store.profilePic,
          uid: firebase.auth().currentUser.uid,
        });
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("posts")
          .add({
            url: url,
          });
        console.log("Spremljeno", doc);
        console.log("LINK!!!", store.profilePic);
        this.newImageUrl = "";
        this.imageReference.remove();
        this.getPosts();
      } catch (e) {
        console.error("Error", e);
      }
      this.post = !this.post;
    },
  },
  computed: {
    computedPosts() {
      return this.cards;
    },
  },
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
.posts {
  margin: auto;
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

.postImg {
  cursor: pointer;
  margin-left: 75%;
}

.pfp {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
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
