function handleBtnNextClick(fileList) {
	let editor = document.querySelector(".editor__field");
	let form = document.forms.post;
	let formData = new FormData(form);
	formData.delete("files");

	for (let file of fileList) {
		formData.append("files", file)
	}

	let files = formData.getAll("files");
	if (!formData.has("network")) {
		console.log("Выбирите соцсети, в которых хотите опубликовать свой пост");
		return;
	}

	if (
		document.querySelector(".js-later:checked") &&
		(calendar.value === "" || time.value === "")
	) {
		console.log("Выбирите дату и время публикации");
		return;
	}

	if ((editor && editor.value) || files.length > 0) {
		document
			.querySelector(".crossposting")
			.classList.add("crossposting_disabled");

		// загрузим стили
		let promiseLoadStyles = loadStyles("css/cards.css");

		let cardTempl = document.querySelector("#card");
		let logo = cardTempl.content.querySelector(".card__logo > .card__img");
		let txt = cardTempl.content.querySelector(".card__text");
		let slider = cardTempl.content.querySelector(".card__slider");
		let counter = cardTempl.content.querySelector(".card__counter");

		let slideTempl = document.querySelector("#slide");
		let cardSlide = slideTempl.content.querySelector(".card__slide");
		let img = slideTempl.content.querySelector(".card__img");

		let networks = formData.getAll("network");
		let text = formData.get("editor");
		let iconDir = "../images/";
		let docFragment = document.createDocumentFragment();
		let slides = document.createDocumentFragment();
		
		for (let network of networks) {
			logo.src = iconDir + network + ".svg";

			if (files.length > 1) {
				counter.textContent = "1/" + files.length;
				counter.classList.remove("card__counter_disabled");
			} else {
				counter.classList.add("card__counter_disabled");
			}

			for (let file of files) {
				if (file.size > 0) {
					if (file.type.includes("image")) {
						img.src = URL.createObjectURL(file);
					} else {
						img.src = "../images/file-solid.svg";
						img.classList.add("card__img_small");

						let fileName = slideTempl.content.querySelector(".card__file-name");
						if (fileName) fileName.remove();

						fileName = document.createElement("h3");
						fileName.className = "card__file-name";
						fileName.textContent = file.name;
						cardSlide.append(fileName);
					}

					let slideClone = slideTempl.content.cloneNode(true);
					slides.append(slideClone);
					img.classList.remove("card__img_small");
				}
			}

			let fileName = slideTempl.content.querySelector(".card__file-name");
			if (fileName) fileName.remove();

			if (files.length) {
				slider.append(slides);
			}

			txt.textContent = text;
			let cardClone = cardTempl.content.cloneNode(true);
			docFragment.append(cardClone);

			while (slider.firstChild) {
				slider.removeChild(slider.firstChild);
			}
		}

		// инициалицируем слайдеры
		let sliders = docFragment.querySelectorAll(".card__slider");
		if (files.length > 1) {
			let loadTns = (async () => {
				let tinySlider = await import("tiny-slider");
				sliders.forEach((item) => {
					let sl = tinySlider.tns({
						container: item,
						items: 1,
						slideBy: "page",
						autoplay: false,
						controls: true,
						navPosition: "bottom",
						nav: true,
						controlsPosition: "bottom",
						controlsText: ["", ""],
					});

					sl.events.on("indexChanged", (e) => handleSliderIndexChanged(e));
				});
			})();

			Promise.all([promiseLoadStyles, loadTns]).then(() => {
				render(docFragment);
				addListeners(formData);
			});
		} else {
			Promise.all([promiseLoadStyles]).then(() => {
				render(docFragment);
				addListeners(formData);
			});
		}
	} else {
		console.log("Добавте файл или напишите что-нибудь");
	}
}


function handleSliderIndexChanged(e) {
	let counter = e.container.closest(".card__middle").children[0];
	let x = (counter.textContent = e.displayIndex + "/" + e.pages);
}


function render(docFragment) {
	let wrapTemp = document.querySelector("#wrap");
	let wrapClone = wrapTemp.content.cloneNode(true);

	wrapClone.querySelector(".cards__view").append(docFragment);

	document.querySelector(".page__main").append(wrapClone);
}


function addListeners(formData) {
	let btnBack = document.querySelector(".status-panel__btn");
	let btnPublish = document.querySelector(".status-panel__public");

	if (btnBack) {
		btnBack.onclick = async () => {
			let { default: handleBtnBackClick } = await import(
				"./handleBtnBackClick.js"
			);
			handleBtnBackClick();
		};
	}

	if (btnPublish) {
		btnPublish.onclick = (e) => {
			e.preventDefault();
			let style = loadStyles("css/modal.css");
			let handle = import(
				"./handleBtnPublicClick.js"
			);

			Promise.all([style, handle])
				.then(result => result[1].default(formData))
		};
	}
}


export function loadStyles(href) {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`link[href='${href}']`)) {
			return resolve("Стили загружены");
		}

		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = href;
		document.head.append(link);
		link.onload = () => resolve("Стили загружены");
		link.onerror = () => reject(new Error("Не удалось загрузить стили"));
	});
}

export default handleBtnNextClick;