<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-7">
      <fipugram-card />
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title text-muted">
            <strong>Stories</strong>
          </h6>
          <story />
          <story />
          <story />
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-body">
          <h6 class="card-title text-muted">
            <strong>Suggestions for you</strong>
          </h6>
          <suggestion />
          <suggestion />
          <suggestion />
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

let hello = "world";

export default {
  name: "Home",
  data: function() {
    return {
      hello: hello,
    };
  },
  components: {
    FipugramCard,
    Story,
    Suggestion,
  },
};
</script>
