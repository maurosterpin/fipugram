<template>
  <div class="commentHeader">
    <img :src="info.pic" width="35" class="rounded-circle" />
    <strong class="ml-3">{{ info.name }}</strong>
    <span class="timeRight">{{ postedFromNow }}</span>
    <div class="comment">{{ info.content }}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["info"],
  name: "Comment",
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
};
</script>

<style>
.commentHeader {
  padding: 25px 30px 0px;
}

.comments {
  height: 898px;
}

.comment {
  padding: 5px 0px;
}

.timeRight {
  margin-top: 5px;
  float: right;
}
</style>
