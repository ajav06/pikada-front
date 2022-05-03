<template>
  <v-card
    width="260"
    height="120"
    class="rounded-xl elevation-3 ma-2"
    color="primary"
  >
    <v-card-text class="text-center white--text">
      <p class="mb-1 text-h6 mt-n1">{{ title }}</p>
      <p class="mb-1 text-subtitle-1 font-weight-medium font-italic">
        {{ name }}
      </p>
      <p class="text-subtitle-1 font-weight-medium font-italic">
        {{ quantity }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ReportCard',
  props: ['title', 'name', 'quantity'],
};
</script>
