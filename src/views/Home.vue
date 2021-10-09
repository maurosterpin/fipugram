<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-7">
      <fipugram-card />
    </div>
    <div class="col-3">
      ... ovdje ide desni stupac!
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FipugramCard from "@/components/FipugramCard.vue";

export default {
  name: "Home",
  components: {
    FipugramCard,
  },
};
</script>
