<template>
  <v-app>
    <Topbar />
    <v-content>
      <Menu />
      <div class="main-content" :class="{ 'main-content-showmenu': showMenu}">
        <!-- <keep-alive>
          <component v-bind:is="currentTabComponent"></component>
        </keep-alive>-->
        <Today :class="{'d-none': currentTab !== 'Today'}" />
        <Calendar :class="{'d-none': currentTab !== 'Calendar'}" />
        <TodosDone :class="{'d-none': currentTab !== 'Done'}" />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Todos from "./Todos.vue";
import Today from "./Today.vue";
import TodosDone from "./TodosDone.vue";
import Calendar from "./Calendar.vue";
import Menu from "./Menu.vue";
import Topbar from "./Topbar.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState("todos", ["currentTab", "showMenu"]),
    currentTabComponent() {
      return Calendar;
      // if (this.currentTab === "Today") return Today;
      // else return Todos;
    }
  },
  components: {
    Todos,
    Today,
    Menu,
    Topbar,
    Calendar,
    TodosDone
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

@media screen and (max-width: 600px) {
  .main-content-showmenu {
    display: none;
  }
}
</style>
