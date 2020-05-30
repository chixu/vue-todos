<template>
  <div class="today">
    <h3>Today</h3>
    <v-list two-line>
      <v-divider></v-divider>
      <template v-for="todo in allTodos">
        <v-list-item class="item" v-bind:key="todo.id">
          <div class="d-flex flex-column" style="width:100%">
            <div
              class="item-content justify-space-between align-center"
              :style="{display: todo.id==editingId?'none':'flex'}"
            >
              <v-checkbox @change="doTask(todo.id)" class="mx-2">
                <template v-slot:label>
                  <div class="label">{{todo.name + (todo.repeat?(" (every"+todo.repeat+")"):"")}}</div>
                </template>
              </v-checkbox>
              <!-- <v-spacer /> -->
              <div class="command">
                <v-btn icon @click="editHandler(todo.id)">
                  <v-icon>{{editSvgPath}}</v-icon>
                </v-btn>
                <v-btn icon @click="deleteHandler(todo.id)">
                  <v-icon>{{deleteSvgPath}}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="item-edit" :style="{display: todo.id==editingId?'block':'none'}">
              <div class="input-wrapper">
                <input v-model="editingTitle" />
              </div>
              <div class="item-edit-command mt-2">
                <v-btn class="ml-3" small color="primary" @click="saveEditHandler(todo.id)">Save</v-btn>
                <v-btn class="ml-1" small text color="primary" @click="cancelEditHandler()">Cancel</v-btn>
              </div>
            </div>
          </div>
        </v-list-item>
        <v-divider v-bind:key="'d'+todo.id"></v-divider>
      </template>
      <v-list-item id="addTask" class="addTask" :ripple="false" @click="showAddTodo">
        <v-icon class="ml-2" color="primary">{{addSvgPath}}</v-icon>
        <div class="ml-2" :style="cssProps">Add Task</div>
        <v-spacer />
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title />
        <v-card-text>Are you sure you want to delete {{deleteDialogText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteTask()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { mdiPlus } from "@mdi/js";
import { globals } from "../constant";
import { mdiSquareEditOutline, mdiTrashCanOutline } from "@mdi/js";

export default {
  data() {
    return {
      editSvgPath: mdiSquareEditOutline,
      deleteSvgPath: mdiTrashCanOutline,
      editingId: null,
      editingTitle: "",
      dialog: false,
      deleteDialogText: "",
      deletingId: null,
      addSvgPath: mdiPlus
    };
  },
  computed: {
    ...mapGetters("todos", ["allTodos"]),
    // primaryColor() {
    //   return globals.color.primary;
    // },
    cssProps() {
      console.log("cssProps", globals);
      return {
        "--primary-color": globals.color.primary
      };
    }
  },
  methods: {
    ...mapActions("todos", [
      "getTodos",
      "doTask",
      "showAddTodo",
      "updateTodo",
      "deleteTodo"
    ]),
    // mouseenter(e) {
    //   console.log("mouseenter", e, this);
    // },
    // mouseleave(e) {
    //   console.log("mouseleave", e, this);
    // }
    saveEditHandler(taskid) {
      this.updateTodo({
        id: taskid,
        name: this.editingTitle
      }).then(() => this.cancelEditHandler());
    },
    cancelEditHandler() {
      this.editingId = null;
    },
    editHandler(taskid) {
      let task = this.allTodos.find(v => v.id == taskid);
      this.editingTitle = task.name;
      // task.editing = true;
      this.editingId = taskid;
    },
    deleteHandler(taskid) {
      let task = this.allTodos.find(v => v.id == taskid);
      this.deleteDialogText = task.name;
      this.deletingId = taskid;
      this.dialog = true;
    },
    deleteTask() {
      this.deleteTodo({ id: this.deletingId }).then(
        () => (this.dialog = false)
      );
    }
  },
  mounted() {
    // console.log(this);
    this.getTodos();
  }
};
</script>
<style scoped>
.today {
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
}
.shown {
  display: block;
}
.hide {
  display: none;
}
.label {
  color: rgba(0, 0, 0, 0.8);
}
.input-wrapper {
  border: rgba(0, 0, 0, 0.2) solid 1px;
  border-radius: 3px;
  padding: 0 10px;
  margin-left: 10px;
}
.item-edit {
  width: 100%;
  padding: 12px 0;
}
.item-edit input {
  width: 100%;
  height: 40px;
  /* border-color: #666; */
  outline: none;
}
.item-content {
  width: 100%;
}
.item .command {
  display: none;
}
.item:hover .command {
  display: block;
}
.addTask {
  cursor: pointer;
}
#addTask:hover:before {
  opacity: 0;
}
.addTask div {
  color: rgba(0, 0, 0, 0.6);
  /* color: var(--primary-color); */
}
.addTask:hover div {
  color: var(--primary-color);
  /* color: green; */
}
</style>