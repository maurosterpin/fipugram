<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <img src="@/assets/44.jpg" width="35" class="rounded-circle" />
      <strong class="ml-3">username</strong>
    </div>
    <div class="card-body p-0"></div>
    <img src="https://picsum.photos/800" />
    <div class="card-img-top card-footer text-muted bg-transparent">
      2 days ago
    </div>
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control"
        placeholder="Add a comment..."
        aria-label="Comment"
        aria-describedby="button-addon2"
      />
      <div class="input-group-append bg-transparent">
        <button
          class="btn bg-transparent border text-muted"
          type="button"
          id="button-addon2"
          style="font-weight: 600; font-size: 15px;"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-input-placeholder {
  font-size: 15px !important;
  font-weight: 600;
  color: gray;
}
</style>

<script>
export default {
  name: "FipugramCard",
  props: {
    msg: String,
  },
};
</script>
