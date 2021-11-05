<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-5">
      <!-- nova forma za post -->
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
      <!-- listanje kartica -->
      <fipugram-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
      />
    </div>
    <div class="col-5"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Suggestion from "@/components/Suggestion.vue";
import Story from "@/components/Story.vue";
import FipugramCard from "@/components/FipugramCard.vue";
import store from "@/store";
import { db, storage } from "@/firebase";
import firebase from "@/firebase";

//let cards = [];
let suggestions = [];
let stories = [];

export default {
  name: "Home",
  data: function() {
    return {
      cards: [],
      suggestions,
      stories,
      store,
      newImageUrl: "",
      imageReference: null,
    };
  },
  mounted() {
    const user = firebase.auth().currentUser;

    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("User exists!");
          store.displayName = doc.data().username;
          store.profilePic = doc.data().profilePic;
        } else {
          const dataBase = db.collection("users").doc(user.uid);
          const UIDtest = user.uid;
          console.log("User UID STRING!", UIDtest);
          dataBase.set({
            username: store.displayName,
            profilePic: store.profilePic,
            posts: [],
          });
          console.log("User added!");
        }
      });

    console.log("TEST!!!", this.getPosts());
    /*db.collection("posts")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          //store.displayName = doc.data().username;
          console.log(store.displayName);
          //store.profilePic = doc.data().profilePic;
        });
      });*/
  },
  methods: {
    getPosts() {
      console.log("Firebase dohvat");

      db.collection("posts")
        .orderBy("posted_at", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            //console.log("ID: ", doc.id);
            //console.log("Podaci: ", doc.data());
            const data = doc.data();
            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              url: data.url,
              user: data.displayName,
              pic: data.pic,
            });
          });
        });
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
        });
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            posts: url,
          });
        console.log("Spremljeno", doc);
        console.log("LINK!!!", store.profilePic);
        this.newImageUrl = "";
        this.imageReference.remove();
        this.getPosts();
      } catch (e) {
        console.error("Error", e);
      }
    },
  },

  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;

      return this.cards.filter((card) => card.user.includes(termin));
    },
  },
  components: {
    FipugramCard,
    Story,
    Suggestion,
  },
};
</script>
