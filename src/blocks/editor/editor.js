let editor = document.querySelector(".editor");
let [textField, counter] = editor.children;

updateCounter(counter.children[0], textField);

textField.oninput = () => {
	updateCounter(counter.children[0], textField)
}


function updateCounter(counter, textField) {
	counter.textContent = textField.value.length; 
}