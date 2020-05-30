<template>
  <v-navigation-drawer
    v-model="showMenuModel"
    :stateless="showMenuModel"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :hide-overlay="true"
    :right="right"
    absolute
    dark
  >
    <div class="item-list">
      <!-- <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>-->

      <div
        v-for="item in items"
        :key="item.title"
        class="item"
        :class="{'item-selected':item.title===currentTab}"
        link
        @click="itemClickHandler(item.title)"
      >
        <!-- <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>-->

        <div class="item-content">{{ item.title }}</div>
      </div>
      <v-spacer />
      <div class="item-content logout grey--text" @click="logout">
        <v-icon class="mr-2" color="grey lighten-1">{{logoutSvgPath}}</v-icon>Log out
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { mdiLogout } from "@mdi/js";

export default {
  computed: {
    ...mapState("todos", ["showMenu", "currentTab"]),
    showMenuModel: {
      get() {
        return this.showMenu;
      },
      set(v) {
        this.$store.commit("todos/setShowMenu", v);
      }
    }
  },
  methods: {
    ...mapActions("todos", ["setCurrentTab", "toggleMenu"]),
    ...mapActions("user", ["logout"]),
    itemClickHandler(title) {
      this.setCurrentTab(title);
      if (this.$vuetify.breakpoint.xs) this.toggleMenu();
    }
  },
  data() {
    return {
      // currentTab: "Today",
      drawer: true,
      items: [
        { title: "Today", icon: "mdi-view-dashboard" },
        { title: "Calendar", icon: "mdi-image" },
        { title: "Done", icon: "mdi-help-box" }
      ],
      color: "#eee",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      miniVariant: false,
      expandOnHover: false,
      logoutSvgPath: mdiLogout,
      background: false
    };
  }
};
</script>

<style scoped>
.item-list {
  padding-top: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.item-content {
  line-height: 50px;
  margin-left: 70px;
  font-size: 14px;
  color: #666;
}
.logout {
  margin-left: 0px;
  padding-left: 60px;
  cursor: pointer;
  /* border-top: solid #888 1px; */
  border-right: solid #eee 1px;
  /* background-color: white; */
}
.item {
  box-sizing: border-box;
  height: 50px;
  cursor: pointer;
}
.item-selected {
  background-color: white;
  border-left: #4caf50 solid 5px;
}

.item-selected .item-content {
  margin-left: 65px;
  font-weight: bold;
  color: #111;
}
</style>