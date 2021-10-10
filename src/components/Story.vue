<template>
  <div>
    <img :src="info.url" width="45" class="rounded-circle mt-2 mb-2" />
    <strong class="ml-3">{{ info.user }}</strong>
  </div>
</template>

<script>
export default {
  props: ["info"],
  name: "Story",
};
</script>
