import Chart from 'chart.js/auto';
import { getHoverColor } from 'chart.js/helpers';
import {useEffect, useRef, useState} from "react";


function formatDateLabel(label) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex to match YYYY/MM/DD format
  if (dateRegex.test(label)) {
    const date = new Date(label);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Converts to DD/MM
  }
  return label;
}

function colorize(opaque) {
  return (ctx) => {
    if (!ctx.parsed || !ctx.parsed.y) {
      return 'rgba(250,177,103,0.2)'; // Default color or handling code when y is not available
    }
    const v = ctx.parsed.x;
    const baseColor = v < -50 ? '#D60000'
      : v === 0 ? 'rgb(255,247,233)'  // lightest
      : v === 1 ? 'rgb(250,238,219)'
      : v === 2 ? 'rgb(245,229,205)'
      : v === 3 ? 'rgb(240,220,191)'
      : v === 4 ? 'rgb(235,211,177)'
      : v === 5 ? 'rgb(230,202,163)'
      : v === 6 ? 'rgb(225,193,149)'
      : v === 7 ? 'rgb(220,184,135)'
      : v === 8 ? 'rgb(215,175,121)'
      : v === 9 ? 'rgb(210,166,107)'
      : v >= 10 ? 'rgb(184,107,1)'
      : '#44DE28';
    return opaque ? baseColor : getHoverColor(baseColor);
  };
}

const BarChart = ({ insight, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [yAxisTitle, setYAxisTitle] = useState(null);
  const [xAxisTitle, setXAxisTitle] = useState(null);

  console.log(insight)

    // Helper function to format date

  useEffect(() => {
    const maxNumber = Math.max(...insight.map(item => item.number)) + 2;

    // Ensure the previous chart instance is destroyed before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Setting names for Axis
    if (type === 'AccessesByPeriod') {
        setYAxisTitle('Number of accesses');
        setXAxisTitle('Period of time');
    } else if (type === 'Stamps') {
        setYAxisTitle('Users');
        setXAxisTitle('Stamps collected');
    } else if (type === 'Voucher') {
        setYAxisTitle('Users');
        setXAxisTitle('Vouchers collected');
    } else if (type === 'Points') {
        setYAxisTitle('Users');
        setXAxisTitle('Points collected');
    } else if (type === 'Money') {
        setYAxisTitle('Users');
        setXAxisTitle('Money spent');
    }

    // Resizing the chart instance on window resize to adapt the chart size
    const resizeListener = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };
    window.addEventListener('resize', resizeListener);



    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: insight.map(item => item.day ? formatDateLabel(item.day) : item.label),
        datasets: [{
          label: '',
          data: insight.map(item => item.number),
          backgroundColor: colorize(false),
          borderColor: ['rgba(250, 159, 64, 1)'],
          borderWidth: 2,
          barPercentage: 1,  // Controls the width of the bar, less than 1 to make bars thinner
          categoryPercentage: 0.5  // Controls the spacing between categories
        }]
      },
      options: {
        scales: {
          y: {
            max: maxNumber,
            beginAtZero: true,
            title: {
              display: true,
              text: yAxisTitle,
              color: "rgb(133,77,0)",
              font: {
                size: 22,
              }
              },
            ticks: {
              stepSize: 1,
              precision: 0,
              display: true,
              color: "rgb(184,107,1)",
              font: {
                size: 16,
              }
            },
            grid: {
              display: false
            }
          },
          x: {
            title: {
              display: true,
              text: xAxisTitle,
              color: "rgb(133,77,0)",
              font: {
                size: 22,
              }
              },
            grid: {
              display: false
            },
            ticks: {
              color: "rgb(184,107,1)",
              font: {
                size: 16,
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
        animation: {
          onComplete: () => {
            // Check if the chart instance still exists before handling animation complete
            if (chartInstance.current) {
              handleAnimationComplete(chartInstance.current);
            }
          }
        }
      }
    });

    return () => {
      // Proper cleanup of the chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      window.removeEventListener('resize', resizeListener);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [insight]);

  return (
    <>
      <div className="w-full lg:w-12/12 m-0 p-0">
        <canvas ref={chartRef} className="p-0 m-0 bg-white rounded-lg -full" style={{height: '200px'}}></canvas>
      </div>
    </>
  );
};

function handleAnimationComplete(chart) {
  const ctx = chart.ctx;
  if (!ctx) {
    return;  // Exit if context is not available
  }

  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'rgb(250, 159, 64)';

  chart.data.datasets.forEach((dataset, i) => {
    const meta = chart.getDatasetMeta(i);
    meta.data.forEach((bar) => {
      const label = dataset.data[meta.data.indexOf(bar)];
      ctx.fillText(label, bar.x, bar.y - 5);
    });
  });
}

export default BarChart;