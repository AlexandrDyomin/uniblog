const burger = document.querySelector(".page__burger");
const menu = document.querySelector(".page__nav");

if (burger) {
	burger.onclick = () => {
		menu.classList.toggle("page__nav_open");
		document.documentElement.classList.toggle("no-scroll");
	}
}

