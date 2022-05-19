function handleBtnPublicClick(formData) {
	document.documentElement.classList.add("no-scroll");
	let networks = formData.getAll("network");
	let iconDir = "images/";

	let modalClone = modalPost.content.cloneNode(true);
	let icons = modalClone.querySelector(".modal__icons");
	let img = modalIcon.content.querySelector("img");
	for (let network of networks) {
		img.src = iconDir + network + ".svg";
		let madalIconClone = modalIcon.content.cloneNode(true);
		icons.append(madalIconClone);
	}

	modalClone.firstElementChild.addEventListener(
		"click",
		(e) => {
			if (e.target.classList.contains("button")) {
				e.currentTarget.remove();
				document.documentElement.classList.remove("no-scroll");
				document.querySelector(".status-panel__btn").click();
			}
		},
		{ once: true }
	);

	document.body.append(modalClone);
	let button = document.querySelector(".modal > .button");
	button.focus();
}

export default handleBtnPublicClick;
