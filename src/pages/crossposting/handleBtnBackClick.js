function handleBtnBackClick() {
	let cards = document.querySelector(".cards");
	let images = cards.querySelectorAll(".card__img");
	
	for (let img of images) {
		URL.revokeObjectURL(img.src);
	}

	if (cards) cards.remove();

	document
		.querySelector(".crossposting")
		.classList.remove("crossposting_disabled");
}

export default handleBtnBackClick;