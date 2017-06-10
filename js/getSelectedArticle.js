
export function getSelectedArticle(data){
  let selectedArticle;
  data.source.map(api => {
    for(var props in data) {
      if (api === props){
        data[props].articles.map(article => {
          if (article.selected) {
            selectedArticle = article
          }
        })
      }
    }
  })
  return selectedArticle
}
