<template>
  <div id="app">
    <nav
      v-if="store.currentUser"
      id="nav"
      class="navbar navbar-expand-lg navbar-light bg-white mb-4 border"
    >
      <router-link to="/" class="nav-link">
        <img
          v-if="store.currentUser"
          src="@/assets/fipu_logo.png"
          height="40"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <form v-if="store.currentUser" class="form-inline test">
          <input
            v-model="store.searchTerm"
            class="form-control bg-light"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <ul class="navbar-nav ml-auto">
          <!--<li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li v-if="!store.currentUser" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="!store.currentUser" class="nav-item">
            <router-link to="/signup" class="nav-link">Signup</router-link>
          </li>-->
          <li v-if="store.currentUser" class="nav-item">
            <router-link
              :to="{
                name: 'myProfile',
              }"
              class="nav-link"
              ><span @click="setCurrentUser">Profile</span></router-link
            >
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <a href="#" @click="logout" class="nav-link">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import store from "@/store";
import firebase from "@/firebase";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    console.log(user.email);
    store.currentUser = user.email;
    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    console.log("No user");
    store.currentUser = null;

    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "app",
  data() {
    return {
      store,
    };
  },
  methods: {
    setCurrentUser() {
      store.visitedProfile = store.currentUserUid;

      console.log("UID I UID", store.currentUserUid, store.visitedProfile);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  overflow-x: hidden;
}
body {
  position: relative;
}

.test {
  margin-left: 37%;
}

@media screen and (max-width: 1220px) {
  .test {
    margin-left: 30%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
