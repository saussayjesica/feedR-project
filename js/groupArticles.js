import {renderArticles} from './renderArticles'

export function groupArticles(state) {
  const articlesToRender = state.source.map(sourceName => {
    const source = state[sourceName]

    if (source.displayArticles) {
      return source.articles
    }

    return false
  })
  .filter(source => !!source)
  .reduce((res, next) => {
    return res.concat(next)
  }, [])

  return renderArticles(articlesToRender)

}
