import Chart from 'chart.js/auto';
import {useEffect, useRef} from "react";

const BarChart = () =>{

  const chartRef = useRef(null);

  useEffect(() => {
    const barChart = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
          label: '',
          data: [100, 119, 33, 65, 62, 37],
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
  }, []);

    return (
        <>
          <div className="w-full p-0">
            <canvas ref={chartRef} className="p-4 bg-white rounded-lg shadow"></canvas>
          </div>
        </>
    )
}
export default BarChart;