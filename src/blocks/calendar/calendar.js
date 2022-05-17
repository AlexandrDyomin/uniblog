import { loadStyles } from "../../pages/crossposting/handleBtnNextClick";


// обработчик для радиокнопок
let btnsCont = document.querySelector(".calendar");
btnsCont.onclick = (e) => {
	if (e.target.classList.contains("js-now")) {
		calendar.value = "";
		time.value = "";
		return;
	}

	if (e.target.id === "calendar" || e.target.id === "time") {
		e.currentTarget
			.querySelector(".js-later").click();
	}
}

let calendar = document.querySelector(".calendar__fields");
calendar.addEventListener("focus", handleClendarFocus, true)


// обработчик для полей с датой и временем
function handleClendarFocus(e) {
	if (e.target.id === "calendar" || e.target.id === "time") {
		let styles = loadStyles("css/calendar.css");
		let airDatepicker = import("air-datepicker");

		Promise.all([styles, airDatepicker])
			.then(result => {
				let AirDatepicker = result[1].default;
				
				// инициализация календарей
				let calendar = new AirDatepicker('#calendar', {
					dateFormat: "dd MMMM yyyy г."
				});

				let time = new AirDatepicker('#time', {
					onlyTimepicker: true,
					timepicker: true,
					position: 'bottom right'
				});

				if (e.target.id === "calendar") {
					calendar.show();
				} else {
					time.show();
				}
			})
	}
}