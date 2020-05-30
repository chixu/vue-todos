<template>
  <div>
    <AddTodoDialog />
    <v-app-bar flat color="green" dark>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showAddTodo">
        <v-icon>{{addSvgPath}}</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mdiPlus } from "@mdi/js";
import AddTodoDialog from "./AddTodoDialog.vue";

export default {
  components: {
    AddTodoDialog
  },
  methods: {
    ...mapActions("todos", ["toggleMenu", "showAddTodo"])
  },
  data: () => ({
    // dialog: true,
    dialog: false,
    addSvgPath: mdiPlus
  })
};
</script>

