function handleBtnPublicClick(formData) {
	document.documentElement.classList.add("no-scroll");
	let networks = formData.getAll("network");
	let iconDir = "../images/";

	let title = modal.content.querySelector(".modal__title");
	let text = modal.content.querySelector(".modal__text");
	let button = modal.content.querySelector(".button");
	title.textContent = "Пост опубликован.";
	text.innerHTML = "Смотрите его эффективность в <a class='modal__link' href='#'>статистике</a>";
	button.textContent = "Готово";


	let modalClone = modal.content.cloneNode(true);
	let icons = modalClone.querySelector(".modal__icons");
	let img = modalIcon.content.querySelector("img");
	for (let network of networks) {
		img.src = iconDir + network + ".svg";
		let madalIconClone = modalIcon.content.cloneNode(true);
		icons.append(madalIconClone);
	}

	modalClone.firstElementChild.onclick = (e) => {
		if (e.target.classList.contains("button")) {
			e.currentTarget.remove();
			document.documentElement.classList.remove("no-scroll");
			document.querySelector(".status-panel__btn").click();
		}
	}

	document.body.append(modalClone);
	button = document.querySelector(".modal > .button");
	button.focus();
}

export default handleBtnPublicClick;