<template>
  <div class="mb-1 mt-3">
    <img :src="info.url" width="35" class="rounded-circle" />
    <strong class="ml-3">{{ info.user }}</strong>
    <strong class="float-right text-primary mt-1" style="opacity: 0.7;"
      >Follow
    </strong>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "Suggestion",
};
</script>
