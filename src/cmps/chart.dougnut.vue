<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Adult', 'Educational', 'Funny', 'Animal'],
      afterTitle: '%',
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: this.getInStockByType,
          backgroundColor: ['#81ecec', '#ffeaa7', '#ff7675', '#fd79a8'],
        },
      ],
    });
  },

  data() {
    return {
      labels: ['Adult', 'Educational', 'Funny', 'Animal'],
      toys: null,
      objectMap: null,
      inStockByType: [],
    };
  },
  created() {
    this.toys = this.$store.getters.getToys;
  },
  computed: {
    getInStockByType() {
      const types = this.toys.reduce((acc, toy) => {
        if (!acc[toy.type]) {
          if (toy.inStock) acc[toy.type] = 1;
        } else if (toy.inStock) acc[toy.type]++;

        return acc;
      }, {});
      var percents = Object.values(types).map((num) =>
        ((100 / Object.values(types).length) * num).toFixed(2)
      );
      return percents;
    },
  },
  methods: {
    countType() {
      this.objectMap = this.labels.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
      }, {});
    },
  },
};
</script>

<style></style>
