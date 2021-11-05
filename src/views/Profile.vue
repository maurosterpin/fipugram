<template>
  <div class="about text-center mt-5 pt-5">
    <div class="container">
      <div v-if="!upload" class="profileHeader">
        <img
          v-on:click="uploadPfp"
          class="pfp"
          v-bind:src="this.pfp"
          alt="profilePhoto"
        />
        <h5 class="mb-4 pfpName">Username</h5>
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

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      imageReference: null,
      newProfileUrl: "",
      upload: false,
      pfp: null,
    };
  },
  mounted() {
    this.pfp = store.profilePic;
    console.log("IMGHOLDER", this.pfp);
  },
  methods: {
    uploadPfp() {
      this.upload = !this.upload;
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
              .doc(user.uid)
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
  },
  computed: {},
};
</script>

<style>
body {
  font-size: 14px;
}

.profileHeader {
  display: flex;
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
