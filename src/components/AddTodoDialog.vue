<template>
  <v-dialog :value="showAddTodo" persistent @input="$emit('update:dialog', $event)" max-width="600">
    <v-card>
      <v-card-title class="headline">
        Add Task
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>{{closeSvg}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-form ref="form">
        <v-card-text>
          <v-text-field v-model="taskName" placeholder="Task Name" :rules="nameRules" required></v-text-field>
          <v-checkbox class="mt-0" v-model="repeat" value="1" label="Repeat" type="checkbox"></v-checkbox>
          <div v-if="repeat">
            <v-radio-group class="mt-0" v-model="repeatOption" row>
              <v-radio v-for="o in repeatOptions" :key="o.value" :label="o.text" :value="o.value"></v-radio>
            </v-radio-group>
          </div>
          <v-row class="mx-0" v-else>
            <v-text-field
              cols="6"
              sm="12"
              :class="{'mr-5':showPicker }"
              v-model="dateRangeText"
              @focus="onDateFocus(true)"
              label="Date range"
              :prepend-icon="calendarSvg"
              readonly
            ></v-text-field>
            <v-date-picker cols="6" sm="12" v-if="showPicker" v-model="dates" range no-title></v-date-picker>
            <!-- <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Picker in menu"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
            </v-menu>-->
          </v-row>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="saveDialog">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCalendar, mdiClose } from "@mdi/js";
import { mapActions, mapState } from "vuex";
export default {
  name: "AddTodoDialog",
  computed: {
    ...mapState("todos", ["showAddTodo"]),
    dateRangeText() {
      console.log("dateRangeText");
      // if (this.dates === undefined) return "";
      if (this.dates.length === 2) {
        let first = this.dates[0];
        let second = this.dates[1];
        this.fromDate = first < second ? first : second;
        this.toDate = first < second ? second : first;
        return this.fromDate === this.toDate
          ? this.fromDate
          : this.fromDate + "~ " + this.toDate;
      } else if (this.dates.length === 1) {
        this.fromDate = this.toDate = this.dates[0];
        return this.fromDate;
      }
    }
  },
  data() {
    let today = new Date().toISOString().substr(0, 10);
    return {
      valid: false,
      nameRules: [v => !!v || "Task Name is required"],
      calendarSvg: mdiCalendar,
      closeSvg: mdiClose,
      // date: today,
      fromDate: today,
      toDate: today,
      dates: [today, today],
      menu: false,
      showPicker: false,
      taskName: "",
      repeat: false,
      repeatOption: "day",
      repeatOptions: [
        { text: "Everyday", value: "day" }
        // { text: "Every weekdays", value: "weekdays" },
        // { text: "Every weekends", value: "weekends" }
      ]
    };
  },
  methods: {
    ...mapActions("todos", ["addTodo", "hideAddTodo"]),
    onDateFocus() {
      // console.log(e, v);
      this.showPicker = true;
    },
    onDatePickerFocus(isfocus) {
      console.log("onDatePickerFocus", isfocus);
    },
    closeDialog() {
      // this.$emit("update:dialog", false);
      this.hideAddTodo();
    },
    saveDialog() {
      if (this.$refs.form.validate()) {
        this.addTodo({
          name: this.taskName,
          from: this.repeat ? "" : this.fromDate.replace(/-/g, ""),
          to: this.repeat ? "" : this.toDate.replace(/-/g, ""),
          repeat: this.repeat ? this.repeatOption : ""
        });
      }
    }
  },
  // created() {
  //   let today = new Date().toISOString().substr(0, 10);
  //   this._dates = [today, today];
  // },
  mounted() {
    console.log(this.dialog);
  }
};
</script>