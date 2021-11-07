<template>
  <div class="postContainer">
    <div class="card left mb-4">
      <div @click="getUid" class="card-header bg-transparent">
        <img :src="info.pic" width="35" class="rounded-circle" />
        <strong class="ml-3">{{ info.user }}</strong>
      </div>

      <div class="card-body p-0"></div>
      <img :src="info.url" />
      <div class="card-img-top card-footer text-muted bg-transparent">
        <span v-for="(item, index) in computedLikes" :key="index">
          <svg
            v-if="item.user == displayName && computedIsLiked == true"
            @click="removeLike"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            class="bi bi-heart"
            viewBox="0 0 16 16"
            cursor="pointer"
          >
            <path
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
            />
          </svg>
        </span>
        <svg
          v-if="computedIsLiked != true"
          @click="likePost"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
          cursor="pointer"
        >
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
          />
        </svg>

        <!--<svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-chat ml-4 mb-0.5"
          viewBox="0 0 16 16"
          cursor="pointer"
        >
          <path
            d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-bookmark float-right"
          viewBox="0 0 16 16"
          cursor="pointer"
        >
          <path
            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
          />
        </svg>-->
        <div v-if="this.likes.length > 0">
          Liked by <strong>{{ this.likes[0].user }}</strong
          ><span class="showOthers" v-if="this.likes.length > 1">
            and <strong>others</strong></span
          >
          <div class="cardLikes">
            <span v-for="(item, index) in likes" :key="index">{{
              `${item.user} `
            }}</span>
          </div>
        </div>
        <div>{{ postedFromNow }}</div>
      </div>
      <div class="input-group input-group-lg">
        <input
          v-model="commentContent"
          type="text"
          class="form-control"
          placeholder="Add a comment..."
          aria-label="Comment"
          aria-describedby="button-addon2"
        />

        <div class="input-group-append bg-transparent">
          <button
            class="btn bg-transparent border text-primary"
            type="button"
            id="button-addon2"
            style="font-weight: 600; font-size: 15px;"
          >
            <span @click="postComment" style="opacity: 0.5;">Post</span>
          </button>
        </div>
      </div>

      <div class="card right">
        <span class="rightHeader"><strong class="ml-3">Comments </strong></span>
        <div class="comments">
          <Comment
            v-for="(item, index) in filteredComments"
            :key="index"
            :info="item"
          />
        </div>
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

.link {
  text-decoration: none;
  color: #2c3e50;
}

.cardLikes {
  position: absolute;
  margin-left: 25px;
  display: none;
}

.showOthers {
  cursor: pointer;
}

.showOthers:hover + .cardLikes {
  display: inline;
}

.left {
  float: left;
  width: 60%;
}

.card-header {
  cursor: pointer;
}

.right {
  position: absolute;
  width: 65%;
  height: 100%;
  margin-left: 102%;
}

@media screen and (max-width: 1030px) {
  .left {
    width: 100%;
  }

  .right {
    position: relative;
    width: 100%;
    max-height: 350px;
    height: 100%;
    margin-left: 0;
  }
}

.rightHeader {
  padding: 19px;
  border-bottom: 1px solid lightgray;
}

.commentHeader {
  padding: 25px 30px 0px;
}

.comments {
  overflow-y: auto;
}

.comment {
  padding: 5px 0px;
}

.timeRight {
  float: right;
}
</style>

<script>
import moment from "moment";
import { db, storage } from "@/firebase";
import firebase from "@/firebase";
import store from "@/store";
import router from "@/router";
import Comment from "@/components/Comment.vue";

const user = firebase.auth().currentUser;
console.log("FipugramCARDUSER", user);

export default {
  data() {
    return {
      comments: [],
      likes: [],
      commentContent: "",
      isLiked: null,
      displayName: "",
    };
  },
  props: ["info"],
  name: "FipugramCard",
  mounted() {
    this.getComments();
    this.getLikes();
    this.checkLiked();
    this.displayName = store.displayName;
  },
  methods: {
    async getUid() {
      store.visitedProfile = this.info.uid;
      console.log("GETUID RUN!", store.visitedProfile);

      router.push({
        name: "Profile",
        params: { profileUid: store.visitedProfile },
      });
    },
    postComment() {
      console.log("TEST POST COMMENT");
      db.collection("posts")
        .doc(this.info.id)
        .collection("comments")
        .add({
          content: this.commentContent,
          pfp: store.profilePic,
          username: store.displayName,
          posted_at: Date.now(),
        });
      this.commentContent = "";
      this.getComments();
    },
    getComments() {
      db.collection("posts")
        .doc(this.info.id)
        .collection("comments")
        .orderBy("posted_at")
        .get()
        .then((query) => {
          this.comments = [];
          query.forEach((doc) => {
            //console.log("ID: ", doc.id);
            //console.log("Podaci: ", doc.data());
            const data = doc.data();

            this.comments.push({
              pic: data.pfp,
              name: data.username,
              content: data.content,
              time: data.posted_at,
            });
          });
        });
    },
    removeLike() {
      db.collection("posts")
        .doc(this.info.id)
        .collection("likes")
        .doc(store.currentUserUid)
        .delete();
      this.getLikes();
      this.isLiked = false;
    },
    likePost() {
      console.log("LikePost");
      db.collection("posts")
        .doc(this.info.id)
        .collection("likes")
        .doc(store.currentUserUid)
        .set({
          user: store.displayName,
          liked_at: Date.now(),
          liked: true,
        });
      this.getLikes();
    },
    getLikes() {
      db.collection("posts")
        .doc(this.info.id)
        .collection("likes")
        .orderBy("liked_at")
        .get()
        .then((query) => {
          this.likes = [];
          query.forEach((doc) => {
            const data = doc.data();
            if (data.user == store.displayName) {
              this.isLiked = data.liked;
            }
            this.likes.push({
              user: data.user,
              time: data.liked_at,
            });
          });
        });
    },
    checkLiked() {
      console.log("TEST LIKED");
      /*for (let i; i < likes.length; i++) {
        if (likes[i].name == store.displayName) {
          this.isLiked = true;
          return;
        }
      }
      this.isLiked = false;
      return;*/
    },
  },
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
    filteredComments() {
      return this.comments;
    },
    computedLikes() {
      return this.likes;
    },
    computedIsLiked() {
      return this.isLiked;
    },
  },
  components: {
    Comment,
  },
};
</script>
