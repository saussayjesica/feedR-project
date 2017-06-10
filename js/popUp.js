export function popUpDisplay(article) {
  if (!article){
    return ""
  } else {
    return `
      <div id="popUp" class= ${!article.selected ? "loader hidden" : ""}>
        <a href="#" class="closePopUp">x</a>
        <div class="container">
          <h1>${article.title}</h1>
          <p>
            ${article.summary}
          </p>
          <a href=${article.link} class="popUpAction" target="_blank">Read more from source</a>
        </div>
      </div>
      `
  }
}
