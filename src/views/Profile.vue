<template>
  <div class="about text-center mt-5 pt-5">
    <div class="container">
      <div>
        <div class="bg-white p-5 mx-auto border" style="width:350px">
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
  </div>
</template>

<script>
import store from "@/store";
import { db, storage } from "@/firebase";

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      imageReference: null,
      newProfileUrl: "",
    };
  },
  methods: {
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
        let doc = await db.collection("profilePics").add({
          url: url,
          user: store.currentUser,
          displayName: store.displayName,
          posted_at: Date.now(),
        });
        console.log("Spremljeno", doc);
        this.imageReference.remove();
      } catch (e) {
        console.error("Error", e);
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
