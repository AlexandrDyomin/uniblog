import "./layouts/layout";

let fakeData = {
	day: {
		labels: ["00:00", "03:00","06:00","09:00","00:00"],
		data: [5, 9, 3, 0, 1]
	},
	week: {
		labels: ["Пн","Вт", "Ср", "Чт", "Пт", "Сб", "ВС"],
		data: [0, 59, 80, 81, 56, 60, 70]
	},
	month: {
		labels: ["1", "2","3","4","5", "6", "7","8","9","10", "11", "12","13","14","15", "16", "17","18","19","20", "21", "22","23","24","25", "26", "27", "28", "29", "30"],
		data: [190, 505, 523, 979, 111, 560, 311, 440, 901, 1520, 1000, 988,190, 505, 523, 979, 111, 560, 311, 440, 901, 1520, 1000, 988, 560, 311, 440, 901, 1520, 1000,]
	},
	year: {
		labels: ["Янв", "Фев","Мар","Апр","Май", "Июн", "Июл","Авг","Сен","Октя", "Ноя", "Дек"],
		data: [19, 55, 53, 99, 111, 50, 30, 40, 90, 120, 100, 98]
	}
}

let ch;

let select = document.querySelector(".uniblog__periods");

if (select) {
	select.addEventListener("change", handleSelectChange)
}


import('chart.js/auto')
	.then((module) => {
		let Chart = module.default;
		const data = {
		  labels: fakeData[select.value].labels,
		  datasets: [{
		    data: fakeData[select.value].data,
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

		ch = new Chart(ctx, {
			type: 'line',
		  data: data,
		  options: options
		});
	})


function handleSelectChange(e) {
	ch.data.labels = fakeData[e.currentTarget.value].labels;
	ch.data.datasets[0].data = fakeData[e.currentTarget.value].data;
	ch.update();
}
