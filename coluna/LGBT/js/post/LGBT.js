const form = document.querySelector('form');
const articlesContainer = document.getElementById('articles');

function populateArticles() {
	articlesContainer.innerHTML = '';
	fetch('/api/v1/articles').then((response) => {
		return response.json();
	}).then((data) => {
		data.forEach((article) => {
			const articleElement = createArticleElement(article.title, article.author, article.content, article.votes);
			articlesContainer.appendChild(articleElement);
		});
	}).catch((error) => {
		console.error(error);
	});
}

function createArticleElement(title, author, content, votes) {
	const articleElement = document.createElement('article');
	const headerElement = document.createElement('header');
	const titleElement = document.createElement('h2');
	titleElement.textContent = title;
	headerElement.appendChild(titleElement);
	const authorElement = document.createElement('p');
	authorElement.textContent = author;
	headerElement.appendChild(authorElement);
	articleElement.appendChild(headerElement);
	const contentElement = document.createElement('p');
	contentElement.textContent = content;
	articleElement.appendChild(contentElement);
	const footerElement = document.createElement('footer');
	const votesElement = document.createElement('p');
	const upvoteElement = document.createElement('span');
	upvoteElement.textContent = '+';
	upvoteElement.classList.add('upvote');
	votesElement.appendChild(upvoteElement);
	const votesCountElement = document.createElement('span');
	votesCountElement.textContent = votes;
	votesCountElement.classList.add('votes');
	votesElement.appendChild(votesCountElement);
	const downvoteElement = document.createElement('span');
	downvoteElement.textContent = '-';
	downvoteElement.classList.add('downvote');
	votesElement.appendChild(downvoteElement);
	footerElement.appendChild(votesElement);
	articleElement.appendChild(footerElement);

	// Adiciona o evento de click dos botões de votação
	upvoteElement.addEventListener('click', () => {
		voteArticle(title, author, 1);
	});
	downvoteElement.addEventListener('click', () => {
		voteArticle(title, author, -1);
	});

	return articleElement;
}

function voteArticle(title, author, value) {
	fetch('/api/v1/vote', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, author, value })
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Erro ao votar no artigo');
		}
		return response.json();
	}).then((data) => {
		populateArticles();
	}).catch((error) => {
		console.error(error);
	});
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const title = form.elements.title.value;
	const author = form.elements.author.value;
	const content = form.elements.content.value;
	fetch('/api/v1/articles', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, author, content })
	}).then((response) => {
		if (!response.ok) {
			throw new Error('Erro ao enviar o artigo');
		}
		form.reset();
		populateArticles();
	}).catch((error) => {
		console.error(error);
	});
});

populateArticles();
