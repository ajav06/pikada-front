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
      :items="waiters"
      :title="title"
      :loading="loading"
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import { formatNumber } from '@/assets/helpers';

import ReportCard from './ReportCard.vue';
import ListReport from './ListReport.vue';

export default {
  name: 'Waiters',
  components: { ReportCard, ListReport },
  data() {
    return {
      title: 'Meseros',
      reports: [],
      isSale: false,
      waiters: [],
      headers: [
        {
          text: 'Nombre',
          align: 'center',
          class:
            'primary white--text rounded-tl-lg font-weight-bold text-subtitle-2',
          value: 'name',
        },
        {
          text: 'Ventas',
          align: 'center',
          class:
            'primary white--text rounded-tr-lg font-weight-bold text-subtitle-2',
          value: 'numberSales',
        },
      ],
      loading: true,
    };
  },
  async mounted() {
    await this.loadWaiters();
    await this.loadReports();
  },
  methods: {
    async loadWaiters() {
      try {
        this.loading = true;
        const { data } = await axios.get('waiter');
        this.waiters = data.map((item) => {
          const numberSales = formatNumber(item.numberSales);
          return { ...item, numberSales };
        });

        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async loadReports() {
      try {
        const { data } = await axios.get('waiter/report');
        const { numberOfWaiters, waiterMoreSales } = data;

        this.reports.push({
          title: 'Mesero con más ventas',
          name: waiterMoreSales.name,
          quantity: `${formatNumber(waiterMoreSales.quantity)} ventas`,
        });

        this.reports.push({
          title: 'Cantidad de meseros',
          quantity: formatNumber(numberOfWaiters),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
