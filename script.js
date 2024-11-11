let articles = [];
const articleImages = [
  "https://www.luxcafeclub.com/cdn/shop/articles/240916-coffee-caffeine-heart-health-kh-d4d5cb_1100x.jpg?v=1726678632",
  "https://thejournal.com/-/media/EDU/CampusTechnology/2024/07/20240719aigroup.jpg",
  "https://images.squarespace-cdn.com/content/v1/5b338c6bf93fd40cc613354d/1555081593022-3B1H96BW3WP9LAJY7GK6/create-a-community-mural.jpg",
  "https://daryo.uz/static/2024/08/world-economic-outlook-growth-projections-july-2024-real-gdp-growth-map.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCblbIm8NHegOUdPiEkf162bo5l5tVjVpplw&s",
  "https://devdiscourse.blob.core.windows.net/devnews/27_10_2024_19_25_56_6169737.jpg",
  "https://static.wixstatic.com/media/11062b_47f82c6f766c4e05b07874cab2d40062~mv2.jpeg/v1/fill/w_1000,h_597,al_c,q_85,usm_0.66_1.00_0.01/11062b_47f82c6f766c4e05b07874cab2d40062~mv2.jpeg",
  "https://b2259389.smushcdn.com/2259389/wp-content/uploads/2023/10/Garage-Guard-Blog-Thumbnails-9.png?lossy=1&strip=1&webp=1",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbOsOpjG2EVjYr3ZyMxEHf4f2o-cV-7uTzg&s",
  "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1152192651.jpg?w=900"
];

fetch('Articles.json')
  .then(response => response.json())
  .then(data => {
    articles = data.articles;
    displayArticles(articles);
  });

function displayArticles(articles) {
  const container = document.getElementById('article-container');
  container.innerHTML = articles
    .map((article, index) => `
      <div class="col-md-4">
        <div class="card" onclick="openArticle(${index})">
          <img src="${articleImages[index]}" class="card-img-top" alt="${article.title}">
          <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${article.content.substring(0, 100)}...</p>
            <p>
              <small class="text-muted">
                ${new Date(article.date).toLocaleDateString()} - ${calculateReadingTime(article.wordCount)} min read
              </small>
            </p>
            <p><strong>${article.views} views</strong></p>
          </div>
        </div>
      </div>
    `).join('');
}

function calculateReadingTime(wordCount) {
  return Math.ceil(wordCount / 200);
}

function openArticle(index) {
  const article = articles[index];
  document.getElementById('articleModalLabel').innerText = article.title;
  document.getElementById('articleModalImage').src = articleImages[index];
  document.getElementById('articleModalContent').innerText = article.content;
  document.getElementById('articleModalDetails').innerText = `
    Published on ${new Date(article.date).toLocaleDateString()} - ${article.views} views - ${calculateReadingTime(article.wordCount)} min read
  `;
  const modal = new bootstrap.Modal(document.getElementById('articleModal'));
  modal.show();
}

function sortArticles(criteria) {
  const sortedArticles = [...articles].sort((a, b) => {
    if (criteria === 'views') return b.views - a.views;
    if (criteria === 'date') return new Date(b.date) - new Date(a.date);
  });
  displayArticles(sortedArticles);
}
