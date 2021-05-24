import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartType } from '../constant.js';

const sortChartData = (chartData) => {
  const sortedChartData = Object.entries(chartData).sort((firstChartData, secondChartData) => {

    if (firstChartData[1] > secondChartData[1]) {
      return -1;
    }

    if (firstChartData[1] < secondChartData[1]) {
      return 1;
    }

    return 0;
  });

  return new Map(sortedChartData);
};

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
  const moneyChartData = {};
  labels.forEach((label) => {
    moneyChartData[label] = 0;
    data.forEach((dataItem) => {
      if (dataItem.type === label) {
        moneyChartData[label] += dataItem.price;
      }
    });
  });

  return sortChartData(moneyChartData);
};

export const getTypeChartData = (data, labels) => {
  const typeChartData = {};
  labels.forEach((label) => {
    typeChartData[label] = 0;
    data.forEach((dataItem) => {
      if (dataItem.type === label) {
        typeChartData[label] += 1;
      }
    });
  });

  return sortChartData(typeChartData);
};

export const getTimeChartData = (data, labels) => {
  const timeChartData = {};
  labels.forEach((label) => {
    timeChartData[label] = 0;
    data.forEach((dataItem) => {
      if (dataItem.type === label) {
        timeChartData[label] += dataItem.time.end.diff(dataItem.time.start, 'minute');
      }
    });
  });
  return sortChartData(timeChartData);
};

export const getChart = (type, chartData, container) => {
  const labels = Array.from(chartData.keys());
  const data = Array.from(chartData.values());

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
