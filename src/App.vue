<template>
  <v-app>
    <!-- <TodoMain /> -->
    <TodoMain v-if="logined" />
    <Login v-else />
  </v-app>
</template>

<script>
import TodoMain from "./components/TodoMain.vue";
import Login from "./components/Login.vue";
// import Today from "./components/Today.vue";
// import Calendar from "./components/Calendar.vue";
// import Menu from "./components/Menu.vue";
// import Topbar from "./components/Topbar.vue";
import { mapState, mapActions } from "vuex";
import { api } from "./utils/http";

export default {
  name: "App",
  computed: {
    ...mapState("user", ["logined"])
  },
  components: {
    TodoMain,
    Login
  },
  methods: {
    ...mapActions("user", ["login"])
  },
  mounted() {
    api("connect")
      .then(res => {
        console.log("connected", res);
        this.login(res);
      })
      .catch(err => {
        console.warn(err);
      });
  }
};
</script>

<style scoped>
.main-content {
  margin-left: 0px;
  transition: margin-left 0.2s;
}

.main-content-showmenu {
  margin-left: 256px;
}
</style>
