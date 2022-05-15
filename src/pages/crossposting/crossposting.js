import "../../layouts/layout";
import "../../blocks/calendar/calendar";


// проверка наличия сообщения
let btnNext = document.querySelector(".status-panel__next");

let fileList = []; // список с выбранными пользователем файлами
if (btnNext) {
	btnNext.onclick = async () => {
		let { default: handleBtnNextClick } = await import(
			"./handleBtnNextClick.js"
		);

		handleBtnNextClick(fileList.filter(item => item !== undefined));
	};
}

// обработчик для выбора файлов
let input = document.querySelector(".files__input");
input.onchange = () => {
	fileList = [...input.files];

	let cards = document.querySelector(".files__cards");
	cards.innerHTML = "<div class='files__preview' data-index='0'></div>";

	for (let i = 0; i < input.files.length; ++i) {
		if (input.files[i].size > 0) {
			let btnClose = document.createElement("button");
			btnClose.type = "button";
			btnClose.className = "files__btn-close";
			btnClose.textContent = "X";
			let img = document.createElement("img");
			img.className = "files__img";
			
			if (input.files[i].type.includes("image")) {
				img.src = URL.createObjectURL(input.files[i]);
			} else {
				img.classList.add("files__img_small");
				img.src = "../images/file-solid.svg";
			}

			let preview = document.querySelector(".files__preview:last-child");
			let previewClone = preview.cloneNode(false);
			preview.append(img);
			previewClone.dataset.index =  i + 1;
			preview.append(btnClose);
			cards.append(previewClone);
		}
	}
}


// обработчик для кнопки удаления файла
document.querySelector(".files__cards")
	onclick = (e) => {
		if (e.target.classList.contains("files__btn-close")) {
			let img = e.target.previousElementSibling;
			URL.revokeObjectURL(img.src);
			let preview = e.target.closest(".files__preview");
			let index = preview.dataset.index;
			preview.remove();
			delete fileList[index];
		}
	}