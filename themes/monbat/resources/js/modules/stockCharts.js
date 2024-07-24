import Highcharts from 'highcharts/highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import stockChart from 'highcharts/modules/stock';

Accessibility(Highcharts);
stockChart(Highcharts);

const stockCharts = {
  chart: null,
  chartOptions: null,
  mainChartOptions: {
    credits: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: null,
    },
    chart: {
      type: 'line',
      borderWidth: 0,
      plotShadow: false,
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      backgroundColor: '#EDF2F4',
    },
    plotOptions: {
      ohlc: {
        color: 'red',
        upColor: 'green',
      }, candlestick: {
        color: 'red',
        upColor: 'green',
      },
    },
    navigator: {
      enabled: true,
      adaptToUpdatedData: false,
    },
    xAxis: {
      gridLineWidth: 1,
      gridLineDashStyle: 'Solid',
      lineColor: '#9d9ea0',
      tickColor: '#9d9ea0',
      tickWidth: 0,
      lineWidth: 1,
      type: 'datetime',
      labels: {
        staggerLines: 0,
      },
    },
    yAxis: [
      {
        gridLineWidth: 1,
        gridLineDashStyle: 'Solid',
        lineColor: '#f2f2f2',
        tickColor: '#9d9ea0',
        tickWidth: 0,
        offset: 0,
        labels: {
          align: 'left',
          x: 0,
        },
        title: {
          text: 'MONBAT AD - Price',
        },
      },
    ],
  },
  seriesData: null,
  priceSeries: null,
  volumeSeries: null,

  parseFloatNumber: (numb) => {
    return Number(parseFloat(numb).toFixed(2));
  },

  createChart: function () {
    Highcharts.setOptions(this.mainChartOptions);
    this.chart = Highcharts.chart('chart-container', this.chartOptions);
  },

  updateChartType: function (type) {
    switch (type) {
      case 'line':
        this.priceSeries.update(
          {
            type: 'line',
            name: 'Price',
            data: this.seriesData.map((entry) => [
              entry.timestamp * 1000,
              this.parseFloatNumber(entry.official),
            ]),
          },
          false
        );
        break;
      case 'candlestick':
        this.priceSeries.update(
          {
            type: 'candlestick',
            name: 'Candlestick',
            data: this.seriesData.map((entry) => [
              entry.timestamp * 1000,
              this.parseFloatNumber(entry.open),
              this.parseFloatNumber(entry.high),
              this.parseFloatNumber(entry.low),
              this.parseFloatNumber(entry.close),
            ]),
          },
          false
        );
        break;
      case 'ohlc':
        this.priceSeries.update(
          {
            type: 'ohlc',
            name: 'OHLC',
            data: this.seriesData.map((entry) => [
              entry.timestamp * 1000,
              this.parseFloatNumber(entry.open),
              this.parseFloatNumber(entry.high),
              this.parseFloatNumber(entry.low),
              this.parseFloatNumber(entry.close),
            ]),
          },
          false
        );
        break;
      default:
        this.priceSeries.update(
          {
            type: 'line',
            name: 'Price',
            data: this.seriesData,
          },
          false
        );
        break;
    }

    this.chart.redraw();
  },

  updateChartSeries: function (isChecked) {
    if (isChecked) {
      if (!this.volumeSeries) {
        this.volumeSeries = this.chart.addSeries(
          {
            type: 'column',
            name: 'Volume',
            data: this.seriesData.map((entry) => [
              entry.timestamp * 1000,
              this.parseFloatNumber(entry.volume),
            ]),
          },
          false
        );
      }
    } else {
      if (this.volumeSeries) {
        this.volumeSeries.remove();
        this.volumeSeries = null;
      }
    }

    this.chart.redraw();
  },

  init: async function () {
    const data = await fetch(`${themeVars.home}/wp-json/stock/v1/data/`).then((response) =>
        response.json()
    );
    this.seriesData = data.reverse();

    this.chartOptions = {

      series: [
        {
          name: 'Price',
          type: 'line',
          data: this.seriesData.map((entry) => [
            entry.timestamp * 1000,
            this.parseFloatNumber(entry.official),
          ]),
        },
      ],
    };

    this.createChart();
    this.priceSeries = this.chart.series[0];

    const chartTypeSelector = document.getElementById('chart-type-selector');
    chartTypeSelector.addEventListener('change', (event) => {
      const selectedType = event.target.value;
      this.updateChartType(selectedType);
    });

    const volumeCheckbox = document.getElementById('volume-checkbox');
    volumeCheckbox.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      this.updateChartSeries(isChecked);
    });
  },
};

export default stockCharts;
