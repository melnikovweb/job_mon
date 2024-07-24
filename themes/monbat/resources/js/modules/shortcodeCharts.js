import Highcharts from "highcharts";
import Accessibility from 'highcharts/modules/accessibility';
import stockChart from "highcharts/modules/stock";
import indicators from "highcharts/indicators/indicators";
import momentum from "highcharts/indicators/momentum";
import ROC from "highcharts/indicators/roc";
import RSI from "highcharts/indicators/rsi";
import BB from "highcharts/indicators/bollinger-bands";
import MACD from "highcharts/indicators/macd";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import stockTools from "highcharts/modules/stock-tools";
import accessibility from "highcharts/modules/accessibility";

accessibility(Highcharts);
stockChart(Highcharts);
indicators(Highcharts);
momentum(Highcharts);
ROC(Highcharts);
RSI(Highcharts);
BB(Highcharts);
MACD(Highcharts);
annotationsAdvanced(Highcharts);
stockTools(Highcharts);
Accessibility(Highcharts);


const shortcodeChartSofix = {
  calcChangePercentage: function (original, final) {
    return Number(((final - original) / original) * 100).toFixed(2);
  },
  init: async function () {
    const renderTo = document.querySelectorAll('.shortcode-chart-sofix-container');
    if (renderTo.length === 0) return;

    const sofix = await fetch(`${themeVars.home}/wp-json/sofix/v1/data/`).then((response) =>
      response.json()
    );

    const monbat = await fetch(`${themeVars.home}/wp-json/stock/v1/data/`).then((response) =>
      response.json()
    );

    let dataMonbat = monbat.data;
    let dataSofix = sofix.data;


    await renderTo.forEach(element => {
      new Highcharts.Chart({
        credits: {
          enabled: false,
        },
        scrollbar: {
          enabled: true,
        },
        navigator: {
          enabled: true,
          baseSeries: 0,
          xAxis: {
            min: 1325548800000,
            type: 'datetime',
          },
        },
        legend: {
          enabled: false,
        },
        global: {
          useUTC: true,
        },
        chart: {
          renderTo: element,
          type: 'line',
          borderWidth: 0,
          plotShadow: false,
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          backgroundColor: '#EDF2F4',
        },
        title: {
          text: null,
        },
        xAxis: {
          gridLineWidth: 1,
          gridLineDashStyle: 'Solid',
          lineColor: '#9d9ea0',
          tickColor: '#9d9ea0',
          lineWidth: 0,
          type: 'datetime',
          labels: {
            staggerLines: 2,
            style: {
              color: '#666',
              fontWeight: 'normal',
            },
          },
          dateTimeLabelFormats: {
            day: ' %b - %e',
            week: '%e / %b',
            month: '%b / %y',
            year: '%Y',
          },
        },
        yAxis: {
          gridLineWidth: 1,
          gridLineDashStyle: 'Solid',
          lineColor: '#f2f2f2',
          tickColor: '#9d9ea0',
          minorTickInterval: 'auto',
          offset: 1,
          opposite: false,
          showLastLabel: false,
          showEmpty: false,
          startOnTick: false,
          resize: {
            enabled: true,
          },
          title: {
            text: "Monbat/Sofix change %",
          },
        },
        tooltip: {
          backgroundColor: 'rgba(249, 249, 249, 0.75)',
          shadow: true,
          shared: true,
          crosshairs: true,
          snap: 10,
          formatter: function () {
            let tooltipTitle = Highcharts.dateFormat('%b-%d-%y', this.key) + '<br/>';
            this.points.forEach((i) => {
              tooltipTitle += '<span style="color:' + i.series.color + '">' + i.series.name + '</span>: ' + i.point.y + ' (' + shortcodeChartSofix.calcChangePercentage(i.series.data[0].y, i.point.y) + '%)' + '<br/>';
            });

            return tooltipTitle;
          },
          useHTML: true,
        },
        plotOptions: {
          series: {
            compare: "percent",
            states: {
              inactive: {
                opacity: 1,
              },
              hover: {
                lineWidth: 2,
              },
            },
            yAxis: 0,
            marker: {
              enabled: false,
            },
            compareValue: 100,
            lineWidth: 2,
          },
        },
        series: [
          {
            name: 'MONBAT AD',
            data: dataMonbat.map(({timestamp, official}) => {
              return [
                timestamp * 1000,
                parseFloat(official),
              ]
            }),
            color: "#1273a8",
            showInNavigator: true,
          },
          {
            name: 'SOFIX',
            data: dataSofix.map(([timestamp, open]) => {
              return [
                timestamp * 1000,
                parseFloat(open),
              ]
            }),
            color: "#D8232A",
          },
        ],
      });
    })
  },
};

const shortcodeChartBond = {
  init: async function () {
    const renderTo = document.querySelectorAll('.shortcode-chart-bond-container');
    if (renderTo.length === 0) return;

    const monbat = await fetch(`${themeVars.home}/wp-json/bond/v1/data/`).then((response) =>
      response.json()
    );

    const dataMonbat = monbat.data;


    await renderTo.forEach(element => {
      new Highcharts.Chart({
        credits: {
          enabled: false,
        },
        scrollbar: {
          enabled: true,
        },
        navigator: {
          enabled: true,
          baseSeries: 0,
          xAxis: {
            min: 1518998400000,
            type: 'datetime',
          },
        },
        legend: {
          enabled: false,
        },
        global: {
          useUTC: true,
        },
        chart: {
          renderTo: element,
          type: 'line',
          borderWidth: 0,
          plotShadow: false,
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          backgroundColor: '#EDF2F4',
        },
        title: {
          text: null,
        },
        xAxis: {
          gridLineWidth: 1,
          gridLineDashStyle: 'Solid',
          lineColor: '#9d9ea0',
          tickColor: '#9d9ea0',
          lineWidth: 0,
          type: 'datetime',
          labels: {
            staggerLines: 2,
            style: {
              color: '#666',
              fontWeight: 'normal',
            },
          },
          dateTimeLabelFormats: {
            day: ' %b - %e',
            week: '%e / %b',
            month: '%b / %y',
            year: '%Y',
          },
        },
        yAxis: {
          gridLineWidth: 1,
          gridLineDashStyle: 'Solid',
          lineColor: '#f2f2f2',
          tickColor: '#9d9ea0',
          tickWidth: 0,
          offset: -1,
          tickInterval: 5,
          min: 80,
          max: 125,
          resize: {
            enabled: true,
          },
          title: {
            text: "5MBA - Price",
          },
        },
        tooltip: {
          backgroundColor: 'rgba(249, 249, 249, 0.75)',
          shadow: true,
          shared: true,
          snap: 10,
          formatter: function () {
            let tooltipTitle = Highcharts.dateFormat('%b-%d-%y', this.key) + '<br/>';
            this.points.forEach((i) => {
              tooltipTitle += '<span style="color:' + i.series.color + '">' + i.series.name + '</span>: ' + i.point.y + '<br/>';
            });

            return tooltipTitle;
          },
          useHTML: true,
        },
        plotOptions: {
          series: {
            states: {
              inactive: {
                opacity: 1,
              },
              hover: {
                lineWidth: 2,
              },
            },
            yAxis: 0,
            marker: {
              enabled: false,
            },
            lineWidth: 2,
          },
        },
        series: [
          {
            name: 'Price',
            data: dataMonbat.map(({timestamp, official}) => {
              return [
                timestamp * 1000,
                parseFloat(official),
              ]
            }),
            color: "#1273a8",
            showInNavigator: true,
          },
        ],
      });
    })
  },
};

const shortcodeChartStock = {
  init: async function () {
    const renderTo = document.querySelectorAll('.shortcode-chart-stock-container');
    if (renderTo.length === 0) return;

    const monbatStock = await fetch(`${themeVars.home}/wp-json/stock/v1/data/`).then((response) =>
      response.json()
    );

    const dataLength = monbatStock.data,
      ohlc = [],
      volumeData = [];


    dataLength.map(({timestamp, open, high, low, close, volume}) => {
      ohlc.push([
        timestamp * 1000, parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close),
      ]);

      volumeData.push([
        timestamp * 1000,
        parseFloat(volume),
      ]);
    })

    await renderTo.forEach(element => {
      Highcharts.stockChart({
        credits: {
          enabled: false,
        },
        chart: {
          renderTo: element,
          zooming: {
            mouseWheel: {
              enabled: false,
            },
          },
        },
        stockTools: {
          gui: {
            enabled: false,
          },
        },
        yAxis: [{
          labels: {
            align: 'left',
            enabled: true,
          },
          height: '80%',
          resize: {
            enabled: true,
          },
          title: {
            text: 'MONBAT AD - Price',
            textAlign: 'middle',
          },
        }, {
          labels: {
            align: 'left',
          },
          top: '80%',
          height: '20%',
          offset: 0,
        }],
        navigator: {
          enabled: true,
          baseSeries: 0,
          xAxis: {
            min: 1325548800000,
            type: 'datetime',
          },
        },
        rangeSelector: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        global: {
          useUTC: true,
        },
        series: [{
          type: 'ohlc',
          id: 'ohlc',
          name: 'Price',
          data: ohlc,
        }, {
          type: 'column',
          id: 'volume',
          name: 'Volume',
          data: volumeData,
          yAxis: 1,
        }],
      });
    })
  },
};

export {shortcodeChartSofix, shortcodeChartBond, shortcodeChartStock};
