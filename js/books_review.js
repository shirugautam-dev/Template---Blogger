const params = new URLSearchParams(window.location.search);
const postSlug = params.get("post");

// Only run the list generator if we are NOT currently viewing a post
if (!postSlug) {
  const articles = [
  {
    title: "Book 1",
    excerpt: "This is my review on Book 1",
  },
  {
    title: "Book 2",
    excerpt: "This is my review on Book 2",
  },
  {
    title: "Book 3",
    excerpt: "This is my review on Book 3",
  }
];

  const container = document.getElementById("articles");

  if (container) {
    container.innerHTML = `
  <div class="home-header">
    <h1>Books Review</h1>
    <a href="index.html" class="header-link">Back to Srijana's thoughts ></a>
  </div>
`;

    articles.forEach(article => {
      const post = document.createElement("article");
      post.className = "srijana-post";

      post.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.excerpt}</p>
      `;
      container.appendChild(post);
    });
  }
}