<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-7">
      <fipugram-card
        v-for="card in filteredCards"
        :key="card.url"
        :info="card"
      />
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title text-muted">
            <strong>Stories</strong>
          </h6>
          <story v-for="story in stories" :key="story" :info="story" />
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <h6 class="card-title text-muted">
            <strong>Suggestions for you</strong>
          </h6>
          <suggestion
            v-for="suggestion in suggestions"
            :key="suggestion"
            :info="suggestion"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Suggestion from "@/components/Suggestion.vue";
import Story from "@/components/Story.vue";
import FipugramCard from "@/components/FipugramCard.vue";
import store from "@/store";

let cards = [];
let suggestions = [];
let stories = [];

stories = [
  {
    user: "username1",
    url: "https://picsum.photos/id/1015/800",
  },
  {
    user: "username2",
    url: "https://picsum.photos/id/1051/800",
  },
  {
    user: "username3",
    url: "https://picsum.photos/id/1056/800",
  },
];

suggestions = [
  {
    user: "username1",
    url: "https://picsum.photos/id/1015/800",
  },
  {
    user: "username2",
    url: "https://picsum.photos/id/1051/800",
  },
  {
    user: "username3",
    url: "https://picsum.photos/id/1056/800",
  },
];

cards = [
  {
    url: "https://picsum.photos/id/1015/800",
    user: "username1",
    pic: "@/assets/44.jpg",
    time: "1 DAY AGO",
  },
  {
    url: "https://picsum.photos/id/1051/800",
    user: "username2",
    pic: "@/assets/51.jpg",
    time: "2 DAYS AGO",
  },
  {
    url: "https://picsum.photos/id/1056/800",
    user: "username3",
    pic: "@/assets/92.jpg",
    time: "3 DAYS AGO",
  },
];

export default {
  name: "Home",
  data: function() {
    return {
      cards,
      suggestions,
      stories,
      store,
    };
  },
  computed: {
    filteredCards() {
      let termin = this.store.searchTerm;
      let newCards = [];

      for (let card of this.cards) {
        if (card.user.indexOf(termin) >= 0) {
          newCards.push(card);
        }
      }
      return newCards;
    },
  },
  components: {
    FipugramCard,
    Story,
    Suggestion,
  },
};
</script>
