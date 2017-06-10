function fetchUrl(url) {
  return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
}


export function fetchMashableArticles(state) {
  state.loading = true
  return fetchUrl('http://mashable.com/stories.json')
  .then(res => res.json())
  .then(data => {
    state.loading = false
    return data.new.map(article => {
      return {
        image: article.feature_image,
        title: article.display_title,
        theme: article.channel,
        impressions: article.formatted_shares,
        summary: article.excerpt,
        link: article.short_url,
        selected: false
      }
    })
  })
}

export function fetchDiggArticles(state) {
  state.loading = true
  return fetchUrl('http://digg.com/api/news/popular.json')
  .then(res => res.json())
  .then(data => {
    state.loading = false
    return data.data.feed.map(article => {
      return {
        image: article.content.media.images[0].url,
        title: article.content.title,
        theme: article.content.tags[0].name,
        impressions: article.diggs.count,
        summary: article.content.description,
        link: article.content.url,
        selected: false
      }
    })
  })
}

export function fetchRedditArticles(state) {
  state.loading = true
  return fetchUrl('https://www.reddit.com/top.json')
  .then(res => res.json())
  .then(data => {
    state.loading = false
    return data.data.children.map(article => {
      return {
        image: article.data.thumbnail.includes('http') ? article.data.thumbnail : './images/logo.png',
        title: article.data.title,
        theme: article.data.subreddit,
        impressions: article.data.num_comments,
        summary: article.data.title,
        link: `https://www.reddit.com${article.data.permalink}`,
        selected: false
      }
    })
  })
}
