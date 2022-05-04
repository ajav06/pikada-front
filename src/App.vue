<template>
  <v-app>
    <v-main class="blue lighten-4">
      <h2 class="text-h2 text-center my-5 font-italic font-Raleway">
        La Pikada de la Esquina
      </h2>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap');

.font-Raleway {
  font-family: 'Raleway', sans-serif !important;
}
</style>
