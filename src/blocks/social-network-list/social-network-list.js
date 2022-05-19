import { loadStyles } from "../../pages/crossposting/handleBtnNextClick";

let list = document.querySelector(".social-network-list");

if (list) {
	list.addEventListener("click", handleListClick);
}

function handleListClick(e) {
	let style;
	if (e.target.classList.contains("button")) {
		style = loadStyles("./css/modal.css");

		document.documentElement.classList.add("no-scroll");
		let input = e.target
			.closest(".custom-btn")
			.querySelector(".custom-btn__input");
		let modalClone = modalAccaunt.content.cloneNode(true);
		let icon = modalIcon.content.cloneNode(true);
		let img = icon.querySelector("img");
		let src = "images/" + input.value + ".svg";
		img.src = src;
		modalClone.querySelector(".modal__icons").append(icon);

		if (input.dataset.added === "true") {
			modalClone.querySelector(".modal__title").textContent =
				"Отвязать/Изменить аккаунт";
			let btn = modalClone.querySelector(".button_white");
			btn.textContent = "Отвязать";
			let btnClone = btn.cloneNode();
			btnClone.textContent = "Готово";
			btnClone.classList.remove("button_white");
			btn.after(btnClone); 

			modalClone
				.querySelector(".button_white")
				.addEventListener("click", handleBtnClick, { once: true });

			modalClone.querySelectorAll(".modal__item")
				.forEach(item => item.lastElementChild.textContent = "Изменить");
		}

		modalClone
			.querySelector(".modal")
			.addEventListener("click", handleModalClick);

		Promise.all([style]).then(() => {
			document.body.append(modalClone);
			document.querySelector(".modal").querySelector(".input").focus();
		});
	}
}

function handleBtnClick(e) {
	let modal = e.currentTarget.closest(".modal");

	modal.querySelectorAll(".modal__item").forEach((item) => item.remove());

	let text = document.createElement("p");
	text.textContent = "Вы уверены, что хотите отвязать аккаунт?";
	text.className = "modal__text";
	modal.querySelector(".modal__title").after(text);

	modal.lastElementChild.textContent = "Да";
	let btn = modal.querySelector("button");
	btn.textContent = "Нет";

	btn.addEventListener(
		"click",
		() => {
			btn.closest(".mask").remove();
			document.documentElement.classList.remove("no-scroll");
		},
		{ once: true }
	);
}

function handleModalClick(e) {
	if (e.target === e.currentTarget.lastElementChild) {
		e.currentTarget.parentElement.remove();
		document.documentElement.classList.remove("no-scroll");
		e.currentTarget.removeEventListener("click", handleModalClick);
	}
}
