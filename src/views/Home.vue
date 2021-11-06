<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-8">
      <!-- listanje kartica -->
      <fipugram-card
        v-for="card in filteredCards"
        :key="card.id"
        :info="card"
      />
    </div>
    <div class="col-2"></div>
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
    this.store.currentUserUid = user.uid;

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

            uid: UIDtest,
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
              uid: data.uid,
            });
          });
        });
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
