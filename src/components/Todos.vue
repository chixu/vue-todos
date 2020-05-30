<template>
  <div>
    TODOS 
    <div v-bind:key="todo.id" v-for="todo in allTodos">{{todo.title}}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  // computed: {
  //   ...mapGetters("todos", ["allTodos"])
  // },
  // methods: {
  //   ...mapActions("todos", ["getTodos"])
  // },
  mounted() {
    console.log("todos mounted");
  }
};
</script>
<style scoped>
</style>