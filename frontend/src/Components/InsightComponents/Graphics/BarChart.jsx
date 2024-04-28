import Chart from 'chart.js/auto';
import { useEffect, useRef } from "react";

function formatDateLabel(label) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex to match YYYY/MM/DD format
  if (dateRegex.test(label)) {
    const date = new Date(label);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Converts to DD/MM
  }
  console.log(label)
  return label;
}

const BarChart = ({ insight }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

    // Helper function to format date

  useEffect(() => {
    const maxNumber = Math.max(...insight.map(item => item.number)) + 2;

    // Ensure the previous chart instance is destroyed before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
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
          backgroundColor: ['rgba(250,177,103,0.2)'],
          borderColor: ['rgba(250, 159, 64, 1)'],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            max: maxNumber,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0,
              display: true
            },
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              beginAtZero: true
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
        <canvas ref={chartRef} className="p-0 m-0 bg-white rounded-lg shadow w-full" style={{height: '200px'}}></canvas>
      </div>
    </>
  );
};

function handleAnimationComplete(chart) {
  const ctx = chart.ctx;
  if (!ctx) {
    return;  // Exit if context is not available
  }

  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'rgba(250, 159, 64, 1)';

  chart.data.datasets.forEach((dataset, i) => {
    const meta = chart.getDatasetMeta(i);
    meta.data.forEach((bar) => {
      const label = dataset.data[meta.data.indexOf(bar)];
      ctx.fillText(label, bar.x, bar.y - 5);
    });
  });
}

export default BarChart;