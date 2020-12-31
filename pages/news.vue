<template>
    <div>
        <v-container>
            <v-flex>
                <h2>News</h2>
            </v-flex>

            <v-flex pb-3 v-for="(article,index) in articles" :key="index">
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                    <v-img
                    :src="article.urlToImage"
                    height="200px"
                    ></v-img>

                    <v-card-title>
                        {{article.title}}
                    </v-card-title>

                    <v-card-subtitle>
                    {{article.author}}
                    </v-card-subtitle>

                    <v-card-actions>
                    

                    </v-card-actions>

                    <v-expand-transition>
                    <div>
                        <v-divider></v-divider>

                        <v-card-text>
                        {{article.description}}
                        </v-card-text>
                        <v-spacer></v-spacer>

                        <v-btn :href="article.url"
                        color="orange lighten-2"
                        text
                        >
                        Explore
                    </v-btn>

                    </div>
                    </v-expand-transition>
                </v-card>
            </v-flex>
        </v-container>
    </div>
</template>


<script>
    export default{
        async asyncData(app){
            const articles=await app.$axios.$get('http://localhost:3005/get');
            console.log(articles)
            return articles;

        }
    }
</script>