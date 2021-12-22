<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
        <h1 class="display-2 font-weight-bold mb-3">
          ChessPecker
        </h1>
        <p class="subheading font-weight-regular">
          Improve your chess with science based techniques
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Our Features
        </h2>

        <v-row justify="center">
          <v-card 
            v-for="(feature, i) in features"
            :key="i"
            elevation="2"
            max-width="300px"
          >
            <v-card-title>{{feature.Name}}</v-card-title>
            <v-card-text>{{feature.desc}}</v-card-text>
            <v-card-actions>
              <v-btn :to="feature.href" color="primary">
                Let's Go
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () =>  ({
        features: [
          {Name:'Puzzles',href:'/Puzzles',desc:'Use the Woodpecker Method to repeatedly train defined puzzles sets'},
          {Name:'Visualize',href:'/Visualize',desc:'Improve your visualisation skills by mentally following text moves, and then solving a puzzle at the end'},
        ]
    }),
  }
</script>
