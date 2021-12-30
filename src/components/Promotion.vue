<template>
    <v-card max-width="300px" max-height="75px">
        <v-container>
        <v-row>
                
            <v-img
            max-width="75px"
            src='../assets/pieces/wQ.png'
            @click='queen'
            ></v-img>

            <v-img
            max-width="75px"
            src='../assets/pieces/wR.png'
            @click='rook'
            ></v-img>

            <v-img
            max-width="75px"
            src='../assets/pieces/wN.png'
            @click='knight'
            ></v-img>

            <v-img
            max-width="75px"
            src='../assets/pieces/wB.png'
            @click='bishop'
            ></v-img>

        </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    methods:{
        queen(){
            return 'q'
        },
        rook(){
            return 'r'
        },
        knight(){
            return 'n'
        },
        bishop(){
            return 'b'
        },
    }
}
</script>