document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("post");

  if (!slug) return;

  const filePath = `articles/${slug}.md`;
  console.log("Attempting to fetch from:", filePath); // This tells you the exact name needed

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`File not found at ${filePath}`);
      return res.text();
    })
    .then(md => {
      const words = md.split(/\s+/).length;
      const minutes = Math.ceil(words / 238);
      
      const content = document.querySelector(".content");
      if (typeof marked === 'undefined') {
        throw new Error("The 'marked' library is blocked or missing!");
      }
        content.innerHTML = `<article class="article-body">

  <div class="home-header">
    <a href="index.html">← Back</a>
  </div>

  <h1>${slug.replace("-", " ")}</h1>

  <p class="reading-time">${minutes} min read</p>

  ${marked.parse(md)}

</article>`;
    })
    .catch(err => {
      console.error("Loader Error:", err.message);
      document.querySelector(".content").innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    });
});