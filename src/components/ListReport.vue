<template>
  <v-card class="rounded-xl py-3 mt-5">
    <h4 class="text-center text-h4 my-3">{{ title }}</h4>

    <div
      class="mx-5 mx-md-7 px-md-7 d-flex flex-column flex-md-row align-center align-md-baseline"
    >
      <div style="width: 250px">
        <v-text-field
          outlined
          dense
          solo
          placeholder="Buscar"
          class="rounded-lg"
          prepend-inner-icon="mdi-magnify"
          v-model="search"
        ></v-text-field>
      </div>
    </div>

    <div class="mx-5 mx-md-7 px-md-7">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        :search="search"
        hide-default-footer
        class="elevation-1 rounded-lg"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.products="{ item }" v-if="isSale">
          <v-btn
            icon
            @click="
              () => {
                $emit('products', item.products);
              }
            "
            ><v-icon small color="primary">mdi-eye</v-icon></v-btn
          >
        </template>
        <template v-slot:item.payments="{ item }" v-if="isSale">
          <v-btn
            icon
            @click="
              () => {
                $emit('payments', item.payments);
              }
            "
            ><v-icon small color="primary">mdi-eye</v-icon></v-btn
          >
        </template>
      </v-data-table>

      <div class="pt-2 d-flex flex-column flex-md-row align-center justify-end">
        <span>Filas por páginas: </span>
        <span style="width: 50px" class="mx-md-2">
          <v-select v-model="itemsPerPage" :items="itemsPerPages"></v-select>
        </span>
        <span>1-{{ itemsPerPage }} de {{ items.length }} </span>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="pageVisible"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          circle
        ></v-pagination>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ListReport',
  props: {
    headers: Array,
    items: Array,
    isSale: { type: Boolean, default: false },
    title: String,
    loading: Boolean,
  },
  data: () => ({
    itemsPerPage: 3,
    pageVisible: 5,
    page: 1,
    pageCount: 0,
    search: '',
    itemsPerPages: [3, 5, 10, 20, 30, 50, 100],
  }),
};
</script>
