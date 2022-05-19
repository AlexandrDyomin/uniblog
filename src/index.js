import Chart from 'chart.js/auto';
import "./layouts/layout";


const data = {
  labels: ["Пн","Вт", "Ср", "Чт", "Пт", "Сб", "ВС"],
  datasets: [{
    data: [0, 59, 80, 81, 56, 60, 70],
    fill: false,
    borderColor: "#1543E7",
    lineTension: 0.1
  }]
};


let options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		}
	},
	scales: {
		y: {
			display: false
		},
		x: {
			grid: {
				color: "rgba(0, 0, 0, 0)"
			}
		}
	}
}


let ctx = chart.getContext('2d');

new Chart(ctx, { 
	type: 'line',
  data: data,
  options: options	
});