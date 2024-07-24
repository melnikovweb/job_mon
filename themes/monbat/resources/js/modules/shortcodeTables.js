import moment from 'moment';
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import localeBg from 'air-datepicker/locale/bg';
import XLSX from "xlsx/dist/xlsx.full.min";

const shortcodeTables = {
  data: {},
  type: '',
  lang: themeVars.lang,

  exportXLSX: function (data, type = '', from = 0 , to = 0) {
    const fromDate = moment(new Date(from * 1000)).format('MM-DD-YYYY');
    const toDate = moment(new Date(to * 1000)).format('MM-DD-YYYY');
    const obj = JSON.parse(JSON.stringify(data));

    obj.forEach(o => {
      const time = new Date(o.timestamp * 1000);
      o.timestamp =  moment(time).format('MM-DD-YYYY');
      delete o.official;
    });

    const worksheet = XLSX.utils.json_to_sheet(obj);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
    XLSX.utils.sheet_add_aoa(worksheet, [["Date", "Open", "High", "Low", "Close", "Volume"]], {origin: "A1"});
    XLSX.writeFile(workbook, `${type}_${fromDate}_${toDate}.xlsx`, {compression: true});
  },

  renderTables: function (type, tablesContainer, currentPage = 1, fromDate = null, toDate = null, itemsPerPage = 10) {
    if (!tablesContainer) return;
    const tableData = this.filterData(fromDate, toDate);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const tableDataPage = tableData.slice(startIndex, startIndex + itemsPerPage);
    const table = document.createElement('table');

    table.classList.add('has-white-background-color', 'has-background');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headerRow = document.createElement('tr');
    const thTimestamp = document.createElement('th');
    const thClose = document.createElement('th');
    const thVolume = document.createElement('th');

    thTimestamp.textContent = themeVars.lang === 'bg'? 'Дата' :'Date';
    thTimestamp.classList.add('has-text-align-left');
    headerRow.appendChild(thTimestamp);

    if(type !== 'bond') {
      const thOpen = document.createElement('th');
      const thLow = document.createElement('th');
      const thHigh= document.createElement('th');
      thOpen.textContent = themeVars.lang === 'bg'? 'Отворен' :'Open';
      thLow.textContent = themeVars.lang === 'bg'? 'Ниска' : 'Low';
      thHigh.textContent = themeVars.lang === 'bg'? 'Висока' : 'High';
      thOpen.classList.add('has-text-align-right');
      thLow.classList.add('has-text-align-right');
      thHigh.classList.add('has-text-align-right');
      headerRow.appendChild(thOpen);
      headerRow.appendChild(thLow);
      headerRow.appendChild(thHigh);
    }

    thClose.textContent = themeVars.lang === 'bg'? 'Затворен' : 'Close';
    thVolume.textContent = themeVars.lang === 'bg'? 'Обем' : 'Volume';
    thClose.classList.add('has-text-align-right');
    thVolume.classList.add('has-text-align-right');

    headerRow.appendChild(thClose);
    headerRow.appendChild(thVolume);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    if(type !== 'bond') {
      for (const {timestamp, open, low, high, close, volume} of tableDataPage) {
        const tr = document.createElement('tr');
        const tdTimestamp = document.createElement('td');
        const tdOpen = document.createElement('td');
        const tdLow = document.createElement('td');
        const tdHigh= document.createElement('td');
        const tdClose = document.createElement('td');
        const tdVolume = document.createElement('td');
        const time = new Date(timestamp * 1000);

        tdTimestamp.textContent = time ? moment(time).format('MM-DD-YYYY') : '';
        tdClose.textContent = Number(close).toFixed(2);
        tdVolume.textContent = volume;
        tdOpen.textContent = open;
        tdLow.textContent = low;
        tdHigh.textContent = high;

        tdTimestamp.classList.add('has-text-align-left');
        tdOpen.classList.add('has-text-align-right');
        tdLow.classList.add('has-text-align-right');
        tdHigh.classList.add('has-text-align-right');
        tdClose.classList.add('has-text-align-right');
        tdVolume.classList.add('has-text-align-right');

        tr.appendChild(tdTimestamp);
        tr.appendChild(tdOpen);
        tr.appendChild(tdLow);
        tr.appendChild(tdHigh);
        tr.appendChild(tdClose);
        tr.appendChild(tdVolume);
        tbody.appendChild(tr);
      }
    } else {
      for (const {timestamp, close, volume} of tableDataPage) {
        const tr = document.createElement('tr');
        const tdTimestamp = document.createElement('td');
        const tdClose = document.createElement('td');
        const tdVolume = document.createElement('td');
        const time = new Date(timestamp * 1000);

        tdTimestamp.textContent = time ? moment(time).format('MM-DD-YYYY') : '';
        tdClose.textContent = Number(close).toFixed(2);
        tdVolume.textContent = volume;

        tdTimestamp.classList.add('has-text-align-left');
        tdClose.classList.add('has-text-align-right');
        tdVolume.classList.add('has-text-align-right');

        tr.appendChild(tdTimestamp);
        tr.appendChild(tdClose);
        tr.appendChild(tdVolume);
        tbody.appendChild(tr);
      }
    }

    table.appendChild(tbody);

    tablesContainer.innerHTML = '';
    tablesContainer.appendChild(table);

    if (tableData.length <= itemsPerPage) return;
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    this.data = tableData;
    this.renderPagination(tablesContainer, currentPage, totalPages, itemsPerPage);
  },

  renderPagination: function (tablesContainer, currentPage, totalPages, itemsPerPage) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    const prevFirstLink = document.createElement('a');
    prevFirstLink.classList.add('prev-first');
    prevFirstLink.href = '#';
    prevFirstLink.addEventListener('click', () => {
      currentPage = 1;
      this.renderTables(shortcodeTables.type, tablesContainer, currentPage, null, null, itemsPerPage);
    });
    paginationContainer.appendChild(prevFirstLink);

    const prevLink = document.createElement('a');
    prevLink.classList.add('prev');
    prevLink.href = '#';
    prevLink.addEventListener('click', () => {
      currentPage = Math.max(currentPage - 1, 1);
      this.renderTables(shortcodeTables.type, tablesContainer, currentPage, null, null, itemsPerPage);
    });
    paginationContainer.appendChild(prevLink);

    const infoText = document.createElement('span');
    const startRange = (currentPage - 1) * itemsPerPage + 1;
    const endRange = Math.min(currentPage * itemsPerPage, this.data.length);
    infoText.textContent = `${startRange}-${endRange} of ${this.data.length}`;
    paginationContainer.appendChild(infoText);

    const nextLink = document.createElement('a');
    nextLink.classList.add('next');
    nextLink.href = '#';
    nextLink.addEventListener('click', () => {
      currentPage = Math.min(currentPage + 1, totalPages);
      this.renderTables(shortcodeTables.type, tablesContainer, currentPage, null, null, itemsPerPage);
    });
    paginationContainer.appendChild(nextLink);

    const nextLastLink = document.createElement('a');
    nextLastLink.classList.add('next-last');
    nextLastLink.href = '#';
    nextLastLink.addEventListener('click', () => {
      currentPage = totalPages;
      this.renderTables(shortcodeTables.type, tablesContainer, currentPage, null, null, itemsPerPage);
    });
    paginationContainer.appendChild(nextLastLink);

    tablesContainer.appendChild(paginationContainer);

    const paginationLinks = paginationContainer.querySelectorAll('a');
    paginationLinks.forEach((link) => {
      link.classList.remove('last');
    });

    if (currentPage === 1) {
      prevFirstLink.classList.add('last');
      prevLink.classList.add('last');
    } else if (currentPage === totalPages) {
      nextLink.classList.add('last');
      nextLastLink.classList.add('last');
    }
  },

  filterData: function (fromDate, toDate) {
    const tableData = this.data;
    if (!fromDate && !toDate) return tableData;

    const fromDateTimestamp = fromDate ? Date.parse(fromDate) / 1000 : Number.MIN_SAFE_INTEGER;
    const toDateTimestamp = toDate ? (Date.parse(toDate) + 86400000) / 1000 : Number.MAX_SAFE_INTEGER;

    return tableData.filter(({timestamp}) => {
      return timestamp >= fromDateTimestamp && timestamp <= toDateTimestamp;
    });
  },

  init: async function () {
    const renderTo = [...document.querySelectorAll('.tables-container')];
    if (renderTo.length === 0) return;
    this.type = renderTo[0].querySelector('figure')?.getAttribute('data-type');

    const res = await fetch(`${themeVars.home}/wp-json/${shortcodeTables.type}/v1/data/`).then((response) =>
      response.json()
    );

    this.data = res.data.reverse();
    const nowDate = new Date().getTime();
    const startDate = new Date(this.data.at(-1).timestamp * 1000).getTime();


    await renderTo.forEach(element => {
      const fromDate = new AirDatepicker(element.querySelector('.from-date'), {
        locale: shortcodeTables.lang === 'en' ? localeEn : localeBg,
        autoClose: true,
        selectedDates: [startDate],
        startDate: startDate,
        minDate: startDate,
        maxDate: nowDate,
        position: 'bottom center',
        onSelect: function ({date}) {
          shortcodeTables.data = res.data;
          toDate.minDate = date;
          const selectedDate = toDate.selectedDates[0];
          shortcodeTables.renderTables(shortcodeTables.type, element.querySelector('figure'), 1, date, selectedDate);
        },
      });

      const toDate = new AirDatepicker(element.querySelector('.to-date'), {
        locale: shortcodeTables.lang === 'en' ? localeEn : localeBg,
        autoClose: true,
        selectedDates: [nowDate],
        minDate: startDate,
        maxDate: nowDate,
        position: 'bottom center',
        onSelect: function ({date}) {
          shortcodeTables.data = res.data;
          fromDate.maxDate = date;
          const selectedDate = fromDate.selectedDates[0];
          shortcodeTables.renderTables(shortcodeTables.type, element.querySelector('figure'), 1, selectedDate, date);
        },
      });

      element.querySelector('button.export')?.addEventListener('click', () => {
        shortcodeTables.exportXLSX(shortcodeTables.data, shortcodeTables.type, shortcodeTables.data.at(-1).timestamp, shortcodeTables.data.at(0).timestamp);
      })

      this.renderTables(shortcodeTables.type, element.querySelector('figure'), 1);
    });
  },
};

export default shortcodeTables;
