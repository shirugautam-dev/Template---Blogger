document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const postSlug = params.get("post");



  const container = document.getElementById("articles");
  const searchInput = document.querySelector(".search-container input");
  const articlesPerPage = 3;

  function render() {
    if (!container) return;

    // 1. Filter based on search input
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const filtered = articles.filter(art =>
      art.title.toLowerCase().includes(searchTerm) ||
      art.excerpt.toLowerCase().includes(searchTerm)
    );

    // 2. Handle Pagination
    const pageParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(pageParams.get("page")) || 1;
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const paginatedArticles = filtered.slice(startIndex, endIndex);

    // 3. Render Header
    container.innerHTML = `
      <div class="home-header">
        <h1>${config.siteTitle}</h1>
        <a href="book-reviews.html" class="header-link">BOOK REVIEWS</a>
      </div>
    `;

    // 4. Render Articles
    if (paginatedArticles.length === 0) {
      container.innerHTML += `<p>No articles found.</p>`;
    } else {
      paginatedArticles.forEach(article => {
        const post = document.createElement("article");
        post.className = "srijana-post";

        const url = `https://shirugautam-dev.github.io/Template---Blogger/htmls/${article.slug}.html"`;

        const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        post.innerHTML = `
    <h2>
    <a href="/Template---Blogger/htmls/${article.slug}.html">${article.title}</a>
  </h2>

  <p class="excerpt">${article.excerpt}</p>

  <div class="meta">
    <span>${formattedDate}</span>
    <span>• 5 min read</span>
  </div>

  <a href="/Template---Blogger/htmls/${article.slug}.html" class="read-btn">
    Read Article →
  </a>
  `;

        container.appendChild(post);
      });
    }

    // 5. Render Pagination Controls
    const nav = document.createElement("div");
    nav.className = "pagination-container";
    nav.style.display = "flex";
    nav.style.justifyContent = "space-between";
    nav.style.marginTop = "20px";

    if (currentPage > 1) {
      nav.innerHTML += `<a href="?page=${currentPage - 1}" class="read-more">← Previous</a>`;

      nav.innerHTML += `<a href="index.html" class="read-more" style="margin-left: 20px;">Home</a>`;

    }
    if (endIndex < filtered.length) {
      nav.innerHTML += `<a href="?page=${currentPage + 1}" class="read-more" style="margin-left:auto">Next →</a>`;
    }
    container.appendChild(nav);
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      // Reset to page 1 when searching
      const url = new URL(window.location);
      url.searchParams.set('page', '1');
      window.history.pushState({}, '', url);
      render();
    });
  }

  render(); // Initial call

});
