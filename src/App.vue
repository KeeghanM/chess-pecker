<template>
  <v-app>
    <v-navigation-drawer app color="primary" dark expand-on-hover>
        <div>
        <v-img src="./assets/logo.svg" max-width="150px"></v-img>
        </div>
      <v-list dense color="primary" dark>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  items: [
      { title:"Home", href:"/", icon:"mdi-home-outline" },
      { title:"Puzzles", href:"/Puzzles", icon:"mdi-puzzle" },
      { title:"Visualize", href:"/Visualize", icon:"mdi-eye" },
      { title:"User", href:"/User", icon:"mdi-account-circle" }
    ]
  })
};
</script>
