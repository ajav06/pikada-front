<template>
  <v-container>
    <div
      class="d-flex flex-wrap justify-center justify-md-space-around align-stretch flex-grow-0 flex-shrink-1"
    >
      <span v-for="(item, id) in reports" :key="id">
        <report-card
          :name="item.name"
          :title="item.title"
          :quantity="item.quantity"
        />
      </span>
    </div>

    <list-report
      :headers="headers"
      :isSale="isSale"
      :items="products"
      :title="title"
      :loading="loading"
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import { formatNumber, formatCurrency } from '@/assets/helpers';

import ReportCard from './ReportCard.vue';
import ListReport from './ListReport.vue';

export default {
  name: 'Products',
  components: { ReportCard, ListReport },
  data() {
    return {
      title: 'Productos',
      reports: [],
      isSale: false,
      products: [],
      headers: [
        {
          text: 'Nombre',
          align: 'center',
          class:
            'primary white--text rounded-tl-lg font-weight-bold text-subtitle-2',
          value: 'name',
        },
        {
          text: 'Precio',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'price',
        },
        {
          text: 'Ventas',
          align: 'center',
          class:
            'primary white--text rounded-tr-lg font-weight-bold text-subtitle-2',
          value: 'quantity',
        },
      ],
      loading: true,
    };
  },
  async mounted() {
    await this.loadProducts();
    await this.loadReports();
  },
  methods: {
    async loadProducts() {
      try {
        this.loading = true;
        const { data } = await axios.get('product');
        this.products = data.map((item) => {
          const price = formatCurrency(item.price);
          const quantity = formatNumber(item.quantity);
          return { ...item, price, quantity };
        });

        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async loadReports() {
      try {
        const { data } = await axios.get('product/report');
        const { numberOfProducts, productMoreSales } = data;

        this.reports.push({
          title: 'Plato con más ventas',
          name: productMoreSales.name,
          quantity: `${formatNumber(productMoreSales.quantity)} ventas`,
        });

        this.reports.push({
          title: 'Cantidad de productos',
          quantity: formatNumber(numberOfProducts),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
