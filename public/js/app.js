console.log("Client side javascript file is loaded.");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";

	const location = search.value;
	fetch(`http://localhost:3000/weather?adress=${location}`).then((res) => {
		res
			.json()
			.then((data) => {
				if (data.error) {
					messageOne.textContent = data.error;
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecast;
				}
			})
			.catch((err) => console.log("error: ", err));
	});
});
