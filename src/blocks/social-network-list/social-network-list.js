let list = document.querySelector(".social-network-list");

if (list) {
	list.addEventListener("click", handleListClick);
}



function handleListClick(e) {
	if (e.target.classList.contains("button")) {
		let input = e.target.closest(".custom-btn")
			.querySelector(".custom-btn__input");
		document.documentElement.classList.add("no-scroll");
		let modalClone;
		if (input.dataset.added === "true") {

		} else {
			modalClone = modal.content.cloneNode(true);
			modalClone.querySelector(".modal__title").textContent = "Привязать аккаунт";
			let btnBack = modalClone.querySelector(".button");
			btnBack.textContent = "Назад";
			btnBack.classList.add("button_white");
			let src = "images/" + input.value + ".svg";
			let icon = modalIcon.content.cloneNode(true);
			let img = icon.querySelector("img");
			img.src = src;
			modalClone.querySelector(".modal__icons").append(icon);

			let btn = modalItem.content.querySelector(".button");
			btn.textContent = "Привязать";
			let inpt = modalItem.content.querySelector(".input");
			inpt.placeholder = "Введите логин";
			let field = modalItem.content.cloneNode(true);
			modalClone.querySelector(".button_stretchable").before(field);

			inpt.placeholder = "Введите пароль";
			field = modalItem.content.cloneNode(true);
			modalClone.querySelector(".button_stretchable").before(field);

		}




		document.body.append(modalClone);
	}
}