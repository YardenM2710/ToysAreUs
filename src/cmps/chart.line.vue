<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        type: 'bar',
        labels: ['Adult', 'Educational', 'Funny', 'Animal'],
        datasets: [
          {
            label: 'Price',
            backgroundColor: '#f87979',
            data: this.pricesPerType,
          },
        ],
      },
      {
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      }
    )
  },

  data() {
    return {
      toys: null,
    }
  },
  computed: {
    pricesPerType() {
      const types = this.toys.reduce((acc, toy) => {
        if (!acc[toy.type]) acc[toy.type] = []
        acc[toy.type].push(toy)
        return acc
      }, {})
      let priceByTypes = Object.values(types)
      var percents = priceByTypes.map(toys => {
        let res = toys.reduce((a, toy) => a + +toy.price, 0) / toys.length
        return res.toFixed(2)
      })
      return percents
    },
  },
  created() {
    this.toys = this.$store.getters.getToys
  },
}
</script>

<style></style>
