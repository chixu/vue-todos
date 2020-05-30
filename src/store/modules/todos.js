import { api } from "../../utils/http";
import * as date from "../../utils/date";
// initial state
const state = {
  todos: [],
  todosDone: [],
  calendarEvents: [],
  calendarStart: "",
  calendarEnd: "",
  showMenu: true,
  showAddTodo: false,
  currentTab: "Today",
  calendarShouldUpdate: true,
}

// getters
const getters = {
  allTodos: state => state.todos,
  allTodosDone: state => state.todosDone
}

// actions
const actions = {
  showAddTodo({ commit }) {
    commit('setAddTodo', true);
  },
  hideAddTodo({ commit }) {
    commit('setAddTodo', false);
  },
  deleteTodo({ commit, dispatch }, data) {
    console.log('deleteTodo', data);
    api('deletetodo', data).then(res => {
      commit('setTodos', res);
      dispatch('getCalendar');
    });
  },
  addTodo({ commit, dispatch }, data) {
    console.log('addTodo', data);
    api('addtodo', data).then(res => {
      commit('setAddTodo', false);
      commit('setTodos', res);
      dispatch('getTodosDone');
      dispatch('getCalendar');
    });
  },
  toggleMenu({ commit }) {
    commit('toggleMenu')
  },
  doTask({ commit, dispatch }, id) {
    api('dotask', { id }).then(res => {
      console.log('dotask', res);
      commit('setTodos', res);
      dispatch('getCalendar');
    });
  },
  undoTask({ commit, dispatch }, data) {
    api('undotask', data).then(res => {
      console.log('undotask', res);
      commit('setTodosDone', res);
      dispatch('getTodos');
      dispatch('getCalendar');
    });
  },
  updateTodo({ commit, dispatch }, data) {
    api('updatetodo', data).then(res => {
      console.log('updatetodo', res);
      commit('setTodos', res);
      dispatch('getCalendar');
    });
  },
  getTodosDone({ commit }) {
    api('gettodosdone').then(res => {
      console.log('gettodosdone', res);
      commit('setTodosDone', res);
    });
  },
  getTodos({ commit }) {
    api('gettodos').then(res => {
      console.log('gettodo', res);
      commit('setTodos', res);
    });
  },
  getCalendar({ commit, state }, data) {
    let start, end;
    if (data) {
      start = data.start.date;
      end = data.end.date;
    } else {
      start = state.calendarStart;
      end = state.calendarEnd;
    }
    const events = [];
    let today = date.toYYYYMMDD(new Date());
    let todayInt = parseInt(today);
    let futureTodoColor = "grey lighten-1";
    let undoTodoColor = "grey darken-1";
    let doneTodoColor = "green";
    // let isTodoDone = (todo, todosDone, date) => {
    //   date = date.toString();
    //   if (todo.repeat) {
    //     return todosDone.find(v => v.id == todo.id && v.date == date);
    //   } else {
    //     return todosDone.find(v => v.id == todo.id);
    //   }
    // }
    api("getcalendar", {
      from: start.replace(/-/g, ""),
      to: end.replace(/-/g, "")
    }).then(res => {
      console.log("calendar gettodos", res);
      let todos = res.todos;
      let todosdone = res.todosdone;
      for (let i = 0; i < todos.length; i++) {
        let from = todos[i].from;
        let to = todos[i].to;
        let todo = todos[i];
        let color;
        if (todo.repeat) {
          let jstart = parseInt(todo.createddatetime.substr(0, 8));
          let jend = parseInt(end.replace(/-/g, ""));
          for (let j = jstart; j <= jend; j++) {
            if (todayInt < j) {
              color = futureTodoColor;
            } else {
              color = isTodoDone(todo, todosdone, j.toString())
                ? doneTodoColor
                : undoTodoColor;
            }
            events.push({
              name: todo.name,
              start: date.addDashYYYYMMDD(j),
              end: date.addDashYYYYMMDD(j),
              color
            });
          }
        } else {
          if (todayInt < from) {
            color = futureTodoColor;
          } else {
            color = isTodoDone(todo, todosdone)
              ? doneTodoColor
              : undoTodoColor;
          }
          events.push({
            name: todo.name,
            start: date.addDashYYYYMMDD(from),
            end: date.addDashYYYYMMDD(to),
            color
          });
        }
      }
      console.log('setCalendarEvents', events)
      commit('setCalendarEvents', { events, start, end })
    });
  },
  setCurrentTab({ commit }, value) {
    commit('setCurrentTab', value)
  },
}

// mutations
const mutations = {
  setAddTodo: (state, value) => state.showAddTodo = value,
  setCalendarEvents: (state, { events, start, end }) => {
    state.calendarEvents = events;
    state.calendarStart = start;
    state.calendarEnd = end
  },
  setTodos: (state, todos) => {
    state.todos = parseTodos(todos);
    state.calendarShouldUpdate = true;
  },
  setTodosDone: (state, todos) => {
    state.todosDone = todos;
    state.calendarShouldUpdate = true;
  },
  toggleMenu: (state) => state.showMenu = !state.showMenu,
  setShowMenu: (state, value) => {
    console.log('setShowMenu', value);
    state.showMenu = value;
  },
  setCurrentTab: (state, value) => state.currentTab = value
}


function isTodoDone(todo, todosDone, date) {
  date = date ? date.toString() : "";
  if (todo.repeat) {
    return todosDone.find(v => v.id == todo.id && v.date == date);
  } else {
    return todosDone.find(v => v.id == todo.id);
  }
}

function parseTodos(data, dates) {
  let todos = data.todos;
  let todosdone = data.todosdone;
  let today = date.toYYYYMMDD(new Date());
  let todayInt = parseInt(today);
  let from, to;
  if (dates) {
    from = dates.from;
    to = dates.to;
  } else {
    from = todayInt;
    to = todayInt;
  }
  let res = [];
  for (let todo of todos) {
    if (todo.repeat) {
      let start = Math.max(from, parseInt(todo.createddatetime.substr(0, 8)));
      for (let i = start; i <= to; i++) {
        if (!isTodoDone(todo, todosdone, i))
          res.push(todo);
      }
    } else {
      if (!isTodoDone(todo, todosdone))
        res.push(todo);
    }
  }
  return res;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}