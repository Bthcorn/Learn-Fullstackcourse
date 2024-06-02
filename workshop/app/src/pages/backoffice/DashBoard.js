import React from 'react'
import BackOffice from '../../components/BackOffice'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, plugins)

export default function DashBoard() {

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        boderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Sales Data'
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  }

  return (
    <BackOffice>
      <Bar data={data} options={options} />
    </BackOffice>
  )
}
