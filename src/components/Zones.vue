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
      :items="zones"
      :title="title"
      :loading="loading"
    />

    <div class="text-center my-5 my-md-10">
      <v-btn
        depressed
        color="primary"
        @click="$router.push('/')"
        class="rounded-lg"
      >
        Inicio
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import { formatNumber } from '@/assets/helpers';

import ReportCard from './ReportCard.vue';
import ListReport from './ListReport.vue';

export default {
  name: 'Zones',
  components: { ReportCard, ListReport },
  data() {
    return {
      title: 'Zonas',
      reports: [],
      isSale: false,
      zones: [],
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
    await this.loadZones();
    await this.loadReports();
  },
  methods: {
    async loadZones() {
      try {
        this.loading = true;
        const { data } = await axios.get('zone');
        this.zones = data.map((item) => {
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
        const { data } = await axios.get('zone/report');
        const { numberOfZones, zoneMoreSales } = data;

        this.reports.push({
          title: 'Zona con más ventas',
          name: zoneMoreSales.name,
          quantity: `${formatNumber(zoneMoreSales.quantity)} ventas`,
        });

        this.reports.push({
          title: 'Cantidad de zonas',
          quantity: formatNumber(numberOfZones),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
