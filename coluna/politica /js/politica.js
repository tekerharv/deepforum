const upvoteButtons = document.querySelectorAll(".upvote");
const downvoteButtons = document.querySelectorAll(".downvote");

function handleClick(event) {
	const target = event.currentTarget;
	const votesElement = target.parentNode.querySelector(".votes");
	const currentVotes = Number(votesElement.textContent);
	if (target.classList.contains("upvote")) {
		votesElement.textContent = currentVotes + 1;
	} else {
		votesElement.textContent = currentVotes - 1;
	}

	// Alterna a cor do botão quando clicado
	if (target.classList.contains("clicked")) {
		target.classList.remove("clicked");
	} else {
		target.classList.add("clicked");
	}
}

upvoteButtons.forEach(button => {
	button.addEventListener("click", handleClick);
});

downvoteButtons.forEach(button => {
	button.addEventListener("click", handleClick);
});