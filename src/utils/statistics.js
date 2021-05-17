import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartType } from '../constant.js';

const getTime = (minutes) => {
  const daysCount = Math.floor(minutes / 60 / 24);
  const hoursCount = Math.floor((minutes - (daysCount * 24 * 60)) / 60);
  const minutesCount = minutes % 60;

  const formatedDay = daysCount > 0 ? `${daysCount}D ` : '';
  let formatedHour;
  const formatedMinute = minutesCount < 10 ? `0${minutesCount}M` : `${minutesCount}M`;
  if (!daysCount && hoursCount === 0) {
    formatedHour = '';
  } else if (hoursCount < 10) {
    formatedHour = `0${hoursCount}H `;
  } else {
    formatedHour = `${hoursCount}H `;
  }

  return `${formatedDay}${formatedHour}${formatedMinute}`;
};


export const getLabels = (data) => {
  const labels = [];
  data.forEach((dataItem) => {
    if (!labels.includes(dataItem.type)) {
      labels.push(dataItem.type);
    }
  });
  return labels;
};

export const getMoneyChartData = (data, labels) => {
  const moneyChartData = [];
  labels.forEach((label) => {
    let result = 0;
    data.forEach((dataItem) => {
      if (dataItem.type === label) {
        result += dataItem.price;
      }
    });
    moneyChartData.push(result);
  });
  return moneyChartData;
};

export const getTypeChartData = (data, labels) => {
  const typeChartData = [];
  labels.forEach((label) => {
    let result = 0;
    data.forEach((dataItem) => {
      if (dataItem.type === label) {
        result += 1;
      }
    });
    typeChartData.push(result);
  });
  return typeChartData;
};

export const getTimeChartData = (data, labels) => {
  const timeChartData = [];
  labels.forEach((label) => {
    let result = 0;
    data.forEach((dataItem) => {
      if (dataItem.type === label) {
        result += dataItem.time.end.diff(dataItem.time.start, 'minute');
      }
    });
    timeChartData.push(result);
  });
  return timeChartData;
};

export const getChart = (type, labels, container, data) => {

  return new Chart(container, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 120,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${type === ChartType.MONEY ? '€' : ''} ${type === ChartType.TIME ? getTime(val) : val}`,
        },
      },
      title: {
        display: true,
        text: type.toUpperCase(),
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },

        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
