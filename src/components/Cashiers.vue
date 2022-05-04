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
      :items="cashiers"
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
  name: 'Cashiers',
  components: { ReportCard, ListReport },
  data() {
    return {
      title: 'Cajeros',
      reports: [],
      isSale: false,
      cashiers: [],
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
    await this.loadCashiers();
    await this.loadReports();
  },
  methods: {
    async loadCashiers() {
      try {
        this.loading = true;
        const { data } = await axios.get('cashier');
        this.cashiers = data.map((item) => {
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
        const { data } = await axios.get('cashier/report');
        const { numberOfCashiers, cashierMoreSales } = data;

        this.reports.push({
          title: 'Cajero con más ventas',
          name: cashierMoreSales.name,
          quantity: `${formatNumber(cashierMoreSales.quantity)} ventas`,
        });

        this.reports.push({
          title: 'Cantidad de meseros',
          quantity: formatNumber(numberOfCashiers),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
