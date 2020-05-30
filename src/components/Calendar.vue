<template>
  <div>
    <!-- <v-toolbar flat color="white">
      <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-5 font-weight-bold">{{ title }}</v-toolbar-title>
    </v-toolbar>-->
    <h3 :style="{margin: '20px 0 15px 50px'}">{{ title }}</h3>
    <v-calendar
      ref="calendar"
      v-model="focus"
      :event-more="false"
      color="primary"
      :events="calendarEvents"
      :now="today"
      :event-color="getEventColor"
      :type="type"
      @click:event="showEvent"
      @change="updateRange"
    ></v-calendar>
  </div>
  <!-- :now="today"
      
      
  -->

  <!-- :show-interval-label="showIntervalLabel" 
    :event-color="getEventColor"
  @change="getEvents"-->
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import * as date from "../utils/date";
import { api } from "../utils/http";
// const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

// const intervalsDefault = {
//   first: 0,
//   minutes: 60,
//   count: 24,
//   height: 48
// };

// const stylings = {
//   default(interval) {
//     return undefined;
//   },
//   workday(interval) {
//     const inactive =
//       interval.weekday === 0 ||
//       interval.weekday === 6 ||
//       interval.hour < 9 ||
//       interval.hour >= 17;
//     const startOfHour = interval.minute === 0;
//     const dark = this.dark;
//     const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

//     return {
//       backgroundColor: inactive
//         ? dark
//           ? "rgba(0,0,0,0.4)"
//           : "rgba(0,0,0,0.05)"
//         : undefined,
//       borderTop: startOfHour ? undefined : "1px dashed " + mid
//     };
//   },
//   past(interval) {
//     return {
//       backgroundColor: interval.past
//         ? this.dark
//           ? "rgba(0,0,0,0.4)"
//           : "rgba(0,0,0,0.05)"
//         : undefined
//     };
//   }
// };
export default {
  data: () => ({
    focus: "",
    type: "month",
    today: date.format(new Date()),
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  computed: {
    ...mapState("todos", ["calendarEvents"]),
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    ...mapActions("todos", ["getCalendar"]),
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      console.log("showEvent");
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      console.log("updateRange", start.date, end.date);
      // const events = [];
      // let today = date.toYYYYMMDD(new Date());
      // let todayInt = parseInt(today);
      // let futureTodoColor = "grey lighten-1";
      // let undoTodoColor = "grey darken-1";
      // let doneTodoColor = "green";

      // api("getcalendar", {
      //   from: start.date.replace(/-/g, ""),
      //   to: end.date.replace(/-/g, "")
      // }).then(res => {
      //   console.log("calendar gettodos", res);
      //   let todos = res.todos;
      //   let todosdone = res.todosdone;
      //   for (let i = 0; i < todos.length; i++) {
      //     let from = todos[i].from;
      //     let to = todos[i].to;
      //     let todo = todos[i];
      //     let color;
      //     if (todo.repeat) {
      //       let jstart = parseInt(todo.createddatetime.substr(0, 8));
      //       let jend = parseInt(end.date.replace(/-/g, ""));
      //       for (let j = jstart; j <= jend; j++) {
      //         if (todayInt < j) {
      //           color = futureTodoColor;
      //         } else {
      //           color = this.isTodoDone(todo, todosdone, j.toString())
      //             ? doneTodoColor
      //             : undoTodoColor;
      //         }
      //         events.push({
      //           name: todo.name,
      //           start: date.addDashYYYYMMDD(j),
      //           end: date.addDashYYYYMMDD(j),
      //           color
      //         });
      //       }
      //     } else {
      //       if (todayInt < from) {
      //         color = futureTodoColor;
      //       } else {
      //         color = this.isTodoDone(todo, todosdone)
      //           ? doneTodoColor
      //           : undoTodoColor;
      //       }
      //       events.push({
      //         name: todo.name,
      //         start: date.addDashYYYYMMDD(from),
      //         end: date.addDashYYYYMMDD(to),
      //         color
      //       });
      //     }
      //     this.events = events;
      //   }
      // });
      this.getCalendar({ start, end });
      this.start = start;
      this.end = end;
    },
    isTodoDone(todo, todosDone, date) {
      if (todo.repeat) {
        return todosDone.find(v => v.id == todo.id && v.date == date);
      } else {
        return todosDone.find(v => v.id == todo.id);
      }
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    }
  },
  mounted() {
    // console.log(this);
    // this.getTodos();
  }
};
</script>
<style>
.v-calendar .v-calendar-weekly__day-label {
  margin: 0px;
}
.v-calendar .v-calendar-weekly__day {
  padding: 8px 0;
}
</style>