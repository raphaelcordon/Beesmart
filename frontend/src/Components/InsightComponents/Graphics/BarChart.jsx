import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";

const BarChart = ({ insight }) =>{

  const chartRef = useRef(null);

  useEffect(() => {
    const barChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: insight.map(item => item.day? item.day : item.label),
        datasets: [{
          label: '',
          data: insight.map(item => item.number),
          backgroundColor: [
            'rgba(250,177,103,0.2)',

          ],
          borderColor: [
            'rgba(250, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });

    return () => barChart.destroy();
  }, [insight]);

    return (
        <>
          <div className="w-full p-0">
            <canvas ref={chartRef} className="p-4 bg-white rounded-lg shadow"></canvas>
          </div>
        </>
    )
}
export default BarChart;