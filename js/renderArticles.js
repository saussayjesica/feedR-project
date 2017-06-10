export function renderArticles(state) {
  return state.map(article => `
    <article class="article">
      <section class="featuredImage">
        <img src="${article.image}" alt="" />
      </section>
      <section class="articleContent">
          <a href="#"><h3>${article.title}</h3></a>
          <h6>${article.theme}</h6>
      </section>
      <section class="impressions">
        <i class="material-icons">thumb_up</i>
        ${article.impressions}
      </section>
      <div class="clearfix"></div>
    </article>
  `).join('\n')
}
