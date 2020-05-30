<template>
  <v-app id="inspire">
    <v-content class="grey lighten-3">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="Login" name="login" v-model="username" type="text"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="password"
                    name="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { api } from "../utils/http";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    username: "Demo",
    password: "1"
  }),
  methods: {
    ...mapActions("user", ["login"]),
    submit() {
      this.login({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
<style scoped>
</style>