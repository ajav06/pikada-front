<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="700"
    content-class="elevation-0"
  >
    <span>
      <div class="d-flex justify-end">
        <v-btn color="black" icon @click="$emit('dismiss')"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </div>
      <list-report :headers="headers" :items="items" :title="title" />
    </span>
  </v-dialog>
</template>

<script>
import ListReport from './ListReport.vue';
export default {
  components: { ListReport },
  name: 'ListDialog',
  props: {
    items: Array,
    isActive: { type: Boolean, default: false },
    title: String,
    headers: Array,
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>
