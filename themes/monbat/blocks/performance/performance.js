import Highcharts from 'highcharts/highcharts';
import Accessibility from 'highcharts/modules/accessibility';

Accessibility(Highcharts);


const chartsPopup = {
  targets: document.querySelectorAll('.performance td > .chart'),
  body: document.querySelector("body"),
  data: {
    seriesName: '',
    units: '',
    categories: [],
    points: [],
    lang: '',
  },
  scrollPos: 0,
  createPopup: function () {
    if (document.querySelector(".charts-popup")) return;
    const newPopup = document.createElement("div");
    const newPopupWrapper = document.createElement("div");
    const chartContainer = document.createElement("div");
    const closeBtn = document.createElement("div");
    newPopup.classList.add('charts-popup', 'hidden');
    newPopupWrapper.classList.add('wrapper-charts-popup', 'hidden');
    closeBtn.classList.add('close-btn');
    chartContainer.classList.add('chart-container');
    chartContainer.setAttribute('id', 'chart-container');
    newPopup.appendChild(closeBtn);
    newPopup.appendChild(chartContainer);
    document.querySelector("main")?.appendChild(newPopup);
    document.querySelector("main")?.appendChild(newPopupWrapper);
  },
  convertToDesiredFormat: function (item) {
    const sanitizedItem = item.replace(/,/g, '');
    if (sanitizedItem.match(/^\(.*\)$/)) {
      const numberInsideBrackets = parseFloat(sanitizedItem.slice(1, -1).replace(',', ''));
      return isNaN(numberInsideBrackets) ? 0 : -numberInsideBrackets;
    } else {
      const parsedFloat = parseFloat(sanitizedItem);
      return isNaN(parsedFloat) ? 0 : parsedFloat;
    }
  },
  getData: function (target) {
    this.data.seriesName = target.getAttribute('data-series-name');
    this.data.units = target.getAttribute('data-units');
    this.data.lang = target.getAttribute('data-lang');
    this.data.categories = target.getAttribute('data-categories').split(';');
    const arr = target.getAttribute('data-points').split(';');
    this.data.points = arr.map(this.convertToDesiredFormat);
  },
  openPopup: function ({target}) {
    chartsPopup.scrollPos =
      window.scrollY ||
      (document.documentElement.clientHeight
        ? document.documentElement.scrollTop
        : document.body.scrollTop);
    chartsPopup.body.style.overflow = "hidden";
    chartsPopup.body.style.width = "100%";
    chartsPopup.body.style.position = "fixed";
    chartsPopup.body.style.top = -chartsPopup.scrollPos + "px";
    chartsPopup.getData(target);
    chartsPopup.initChart();
    document.querySelector('.charts-popup')?.classList.remove('hidden');
    document.querySelector('.wrapper-charts-popup')?.classList.remove('hidden');
  },
  closePopup: function () {
    chartsPopup.body.style.overflow = "";
    chartsPopup.body.style.width = "";
    chartsPopup.body.style.position = "";
    chartsPopup.body.style.top = "";
    document.querySelector('.charts-popup')?.classList.add('hidden');
    document.querySelector('.wrapper-charts-popup')?.classList.add('hidden');
    if (chartsPopup.scrollPos !== 0) {
      window.scrollTo(0, chartsPopup.scrollPos);
    }
    chartsPopup.scrollPos = 0;
  },
  initChart: function () {
    if (this.data.lang === 'en') Highcharts.setOptions({lang: {thousandsSep: ','}});
    Highcharts.chart('chart-container', {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'column',
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
        tickWidth: 0,
        lineWidth: 0,
        categories: this.data.categories,
      },
      yAxis: {
        gridLineWidth: 1,
        gridLineDashStyle: 'Solid',
        lineColor: '#f2f2f2',
        tickColor: '#9d9ea0',
        title: {
          text: null,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(249, 249, 249, 0.75)',
        shadow: true,
        headerFormat: '{series.name}<br>{point.key}<br/>',
        pointFormat: '{point.y}',
        valueSuffix: ' ' + this.data.units,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
        series: {
          events: {
            legendItemClick: () => false,
          },
        },
      },
      series: [
        {
          name: this.data.seriesName,
          data: this.data.points,
        },

      ],
      legend: {
        align: 'left',
        symbolRadius: 0,
      },
    });
  },
  init: function () {
    if ([...this.targets].length > 0) {
      this.createPopup();

      [...this.targets].forEach(item => {
        item.addEventListener('click', this.openPopup);
      })

      document.addEventListener("keydown", (event) => {
        const code = event.keyCode || event.which;
        if (code === 27 && !document.querySelector('.charts-popup')?.classList.contains('hidden')) chartsPopup.closePopup();
      });

      document.querySelector('.close-btn').addEventListener('click', () => {
       chartsPopup.closePopup();
      });

      document.querySelector('.wrapper-charts-popup').addEventListener('click', () => {
     chartsPopup.closePopup();
      });
    }
  },
}

const tabsPerformance = {
  tabItems: [...document.querySelectorAll('.performance .tabs > li')],
  urlParams() {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const tabs = urlParams.get('tabs');
    if (!tabs) return;
    [...document.querySelectorAll(`[data-tab=${tabs}]`)].forEach(item => {
      item.dispatchEvent(new Event('click'));
    });
  },
  handleClick({target}) {
    let panel = target.closest('.performance').querySelector(`[data-panel="${target.getAttribute('data-tab')}"]`);
    [...target.closest('.performance').querySelectorAll('.active')].forEach(i => {
      i.classList.remove('active');
    })
    target.classList.add('active');
    panel.classList.add('active');
  },
  init() {
    if (this.tabItems.length === 0) return;
    this.handleClick = this.handleClick.bind(this);
    this.tabItems.forEach(tabItem => tabItem.addEventListener('click', this.handleClick));
    tabsPerformance.urlParams();
  },
}


window.addEventListener('load', () => {
  chartsPopup.init();
  tabsPerformance.init();
});
