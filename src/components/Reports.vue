<template>
  <v-container>
    <div
      class="d-flex flex-wrap justify-center justify-md-space-around align-stretch flex-grow-0 flex-shrink-1"
    >
      <span v-for="(item, id) in reports" :key="id" class="my-2">
        <v-hover>
          <template v-slot:default="{ hover }">
            <div
              :class="item.isList ? `elevation-${hover ? 24 : 0}` : ''"
              class="ma-2 px-0 rounded-xl transition-swing"
              @click="item.isList ? $router.push(`${item.redirect}`) : ''"
            >
              <report-card
                :name="item.name"
                :title="item.title"
                :quantity="item.quantity"
              />
            </div> </template
        ></v-hover>
      </span>
    </div>

    <!-- <div
      class="d-flex flex-wrap justify-center justify-md-space-around align-stretch"
    >
      <span v-for="(item, id) in reports2" :key="id">
        <report-card
          :name="item.name"
          :title="item.title"
          :quantity="item.quantity"
        />
      </span>
    </div> -->

    <list-report
      :headers="headers"
      :isSale="isSale"
      :items="sales"
      :title="title"
      :loading="loading"
      @products="
        (data) => {
          loadProducts(data);
        }
      "
      @payments="
        (data) => {
          loadPayments(data);
        }
      "
    />

    <list-dialog
      :isActive="dialog"
      :items="items"
      :headers="headersDialog"
      :title="titleDialog"
      @dismiss="
        () => {
          dismiss();
        }
      "
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import { formatNumber, formatCurrency } from '@/assets/helpers';
import ReportCard from './ReportCard.vue';
import ListReport from './ListReport.vue';
import ListDialog from './ListDialog.vue';

export default {
  name: 'Reports',
  components: { ReportCard, ListReport, ListDialog },
  data() {
    return {
      title: 'Ventas',
      reports: [],
      isSale: true,
      sales: [],
      items: [],
      dialog: false,
      headers: [
        {
          text: 'Mesero',
          align: 'center',
          class:
            'primary white--text rounded-tl-lg font-weight-bold text-subtitle-2',
          value: 'waiter',
        },
        {
          text: 'Cajero',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'cashier',
        },
        {
          text: 'Fecha',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'date_closed',
        },
        {
          text: 'Zona',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'zone',
        },
        {
          text: 'Monto',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'total',
        },
        {
          text: 'Productos',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'products',
        },
        {
          text: 'Pagos',
          align: 'center',
          class:
            'primary white--text rounded-tr-lg font-weight-bold text-subtitle-2',
          value: 'payments',
        },
      ],
      loading: true,
      headersDialog: [],
      titleDialog: '',
      headersProduct: [
        {
          text: 'Nombre',
          align: 'center',
          class:
            'primary white--text rounded-tl-lg font-weight-bold text-subtitle-2',
          value: 'name',
        },
        {
          text: 'Cantidad',
          align: 'center',
          class: 'primary white--text font-weight-bold text-subtitle-2',
          value: 'quantity',
        },
        {
          text: 'Precio',
          align: 'center',
          class:
            'primary white--text rounded-tr-lg font-weight-bold text-subtitle-2',
          value: 'price',
        },
      ],
      headersPayment: [
        {
          text: 'Tipo',
          align: 'center',
          class:
            'primary white--text rounded-tl-lg font-weight-bold text-subtitle-2',
          value: 'type',
        },
        {
          text: 'Monto',
          align: 'center',
          class:
            'primary white--text rounded-tr-lg font-weight-bold text-subtitle-2',
          value: 'amount',
        },
      ],
    };
  },
  async mounted() {
    await this.loadSales();
    await this.loadReports();
  },
  methods: {
    async loadSales() {
      try {
        this.loading = true;
        const { data } = await axios.get('');
        this.sales = data.map((item) => {
          const [date_closed] = item.date_closed.split(' ');
          const total = formatCurrency(item.total);
          return { ...item, date_closed, total };
        });

        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    async loadReports() {
      try {
        const { data } = await axios.get('reports');
        const {
          totalCollected,
          numberOfSales,
          cashierMoreSales,
          productMoreSales,
          waiterMoreSales,
          zoneMoreSales,
        } = data;

        this.reports.push({
          title: 'Cajero con más ventas',
          name: cashierMoreSales.name,
          quantity: `${formatNumber(cashierMoreSales.quantity)} ventas`,
          isList: true,
          redirect: 'cashier',
        });

        this.reports.push({
          title: 'Mesero con más ventas',
          name: waiterMoreSales.name,
          quantity: `${formatNumber(waiterMoreSales.quantity)} ventas`,
          isList: true,
          redirect: 'waiter',
        });

        this.reports.push({
          title: 'Plato con más ventas',
          name: productMoreSales.name,
          quantity: `${formatNumber(productMoreSales.quantity)} ventas`,
          isList: true,
          redirect: 'product',
        });

        this.reports.push({
          title: 'Zona con más ventas',
          name: zoneMoreSales.name,
          quantity: `${formatNumber(zoneMoreSales.quantity)} ventas`,
          isList: true,
          redirect: 'zone',
        });

        this.reports.push({
          title: 'Total recaudado',
          quantity: formatCurrency(totalCollected),
        });

        this.reports.push({
          title: 'Cantidad de ventas',
          quantity: formatNumber(numberOfSales),
        });
      } catch (error) {
        console.log(error);
      }
    },

    loadProducts(data) {
      this.dialog = true;

      this.items = data?.map((item) => {
        const price = formatCurrency(item.price);
        return { ...item, price };
      });
      this.titleDialog = 'Productos';
      this.headersDialog = this.headersProduct;
    },

    loadPayments(data) {
      this.dialog = true;

      this.items = data?.map((item) => {
        const amount = formatCurrency(item.amount);
        return { ...item, amount };
      });

      this.titleDialog = 'Pagos';
      this.headersDialog = this.headersPayment;
    },

    dismiss() {
      this.dialog = false;
      this.items = [];
      this.headersDialog = [];
      this.titleDialog = '';
    },
  },
};
</script>
