import AirDatepicker from "air-datepicker";


// инициализация календарей
new AirDatepicker('#calendar', {
	dateFormat: "dd MMMM yyyy г."
});

new AirDatepicker('#time', {
	onlyTimepicker: true,
	timepicker: true,
	position: 'bottom right'
});

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