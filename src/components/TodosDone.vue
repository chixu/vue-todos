<template>
  <div class="done">
    <h3>Todos Done</h3>
    <v-list two-line>
      <v-divider></v-divider>
      <template v-for="todo in allTodosDone">
        <!-- <v-list-item v-bind:key="todo.id">{{todo.name}}</v-list-item> -->
        <v-col class="item-mobile" v-if="mobile" v-bind:key="todo.id">
          <v-checkbox @change="undoTask({taskid: todo.id, date: todo.date})" class="checkbox mx-2">
            <template v-slot:label>
              <div class="label">{{todo.name + (todo.repeat?(" (every"+todo.repeat+")"):"")}}</div>
            </template>
          </v-checkbox>
          <div class="date-mobile">Done by {{parseDate(todo.donetime)}}</div>
        </v-col>
        <v-row v-else v-bind:key="todo.id">
          <v-checkbox @change="undoTask({taskid: todo.id, date: todo.date})" class="checkbox mx-2">
            <template v-slot:label>
              <div class="label">{{todo.name + (todo.repeat?(" (every"+todo.repeat+")"):"")}}</div>
            </template>
          </v-checkbox>
          <div class="date">Done by {{parseDate(todo.donetime)}}</div>
        </v-row>
        <v-divider v-bind:key="'d'+todo.id"></v-divider>
      </template>
    </v-list>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("todos", ["allTodosDone"]),
    mobile() {
      return this.$vuetify.breakpoint.xs;
    }
  },
  methods: {
    ...mapActions("todos", ["getTodosDone", "undoTask"]),
    parseDate(str) {
      return `${str.substr(4, 2)}-${str.substr(6, 2)} ${str.substr(
        8,
        2
      )}:${str.substr(10, 2)}`;
    }
  },
  mounted() {
    // console.log(this);
    this.getTodosDone();
  }
};
</script>
<style scoped>
.item-mobile {
  margin: 0;
  padding: 0;
}
.done {
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
}
.date {
  height: 100%;
  line-height: 66px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
}
.date-mobile {
  /* height: 100%;
  line-height: 66px; */
  text-align: right;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 4px;
}
.label {
  color: rgba(0, 0, 0, 0.8);
}
.checkbox {
  flex-grow: 1 !important;
}
</style>