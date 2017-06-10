import {renderLoader} from './renderLoader'
import {fetchMashableArticles, fetchDiggArticles, fetchRedditArticles} from './fetchApis'
import {popUpDisplay} from './popUp'
import {renderArticles} from './renderArticles'
import {groupArticles} from './groupArticles'
import {getSelectedArticle} from './getSelectedArticle'


const app = document.querySelector('#app')

const state = {
    source: ['reddit', 'digg', 'mashable'],
    sourceName: 'All sources',
    loading: false,
    search: false,
    moveNav: false,
    mashable: {
      popup: false,
      displayArticles: true,
      articles: [
        {
          image: '',
          title: '',
          theme: '',
          impressions: '',
          summary: '',
          link: '',
          selected: '',
        }
      ]
    },
    digg: {
    popup: false,
    displayArticles: true,
      articles: [
        {
          image: '',
          title: '',
          theme: '',
          impressions: '',
          summary: '',
          link: '',
          selected: '',
        }
      ]
    },
    reddit: {
    popup: false,
    displayArticles: true,
      articles: [
        {
          image: '',
          title: '',
          theme: '',
          impressions: '',
          summary: '',
          link: '',
          selected: '',
        }
      ]
    }
}

function fetchArticles(array) {
  array.map(api => {
    if (api === 'reddit') {
      fetchRedditArticles(state)
        .then(articles => state.reddit.articles = articles)
        .then(() => render(app, state))
    } else if (api === 'digg') {
        fetchDiggArticles(state)
        .then(articles => state.digg.articles = articles)
        .then(() => render(app, state))
    } else if (api === 'mashable') {
        fetchMashableArticles(state)
        .then(articles => state.mashable.articles = articles)
        .then(() => render(app, state))
    }
  })
}


function render(container, data) {
  container.innerHTML = `
  <header>
    <section class="container">
      <a href="#"><h1>Feed<span>r</span></h1></a>
      <nav>
        <ul id= ${!data.moveNav ? "" : "moveNav"}>
          <li id="newsSource"><a href="#">News Source: <span>${data.sourceName}</span><i id='listIcon' class="material-icons">keyboard_arrow_down</i></a>
            <ul>
                <li><a href="#">digg</a></li>
                <li><a href="#">reddit</a></li>
                <li><a href="#">mashable</a></li>
            </ul>
          </li>
        </ul>
        <section id="search" class= ${!data.search ? "" : "active"}>
          <input id="searchInput" type="text" name="name" value="">
          <a href="#"><i id="searchIcon" class="material-icons">search</i></a>
        </section>


      </nav>
      <div class="clearfix"></div>
    </section>
  </header>
  <section id="main" class="container">
    ${popUpDisplay(getSelectedArticle(data))}
    ${data.loading ? renderLoader() : groupArticles(data)}
  </section>
  `
}

delegate('body', 'click', '.article', event => {
      state.source.map(item => {
        state[item].articles.forEach(article => {
            if (article.title === event.target.innerText) {
              if (!article.selected)
                article.selected = true;
            }
        })
      })

  render(app, state)
})

delegate('body', 'click', '.closePopUp', event => {
  state.source.map(api => {
    for(var props in state) {
      if (api === props){
        state[props].articles.forEach(article => {
          if (article.selected) {
            article.selected = false
          }
        })
      }
    }
  })
  render(app, state)
})

delegate('body', 'click', 'li', event => {
    state.reddit.displayArticles   = false
    state.mashable.displayArticles = false
    state.digg.displayArticles     = false

   switch (event.target.innerText) {
     case 'REDDIT':
       state.sourceName = 'Reddit'
       state.reddit.displayArticles   = true
       break;
     case 'DIGG':
       state.sourceName = 'Digg'
       state.digg.displayArticles     = true
       break;
     case 'MASHABLE':
       state.sourceName = 'Mashable'
       state.mashable.displayArticles = true
       break;
     default:
       state.sourceName = '(unknown)'
       break;
   }
  render(app, state)
})

delegate('body', 'click', 'h1', event => {
  state.sourceName = 'All sources'
  state.reddit.displayArticles = true
  state.mashable.displayArticles = true
  state.digg.displayArticles = true
  render(app,state)
})

delegate('body', 'click', '#searchIcon', event => {
  !state.search ? state.search = true : state.search = false
  !state.moveNav ? state.moveNav = true : state.moveNav = false
  render(app,state)
})

//started working on the search filter but didn't quite get there
delegate('body', 'keyup', '#searchInput', event => {
  state.source.forEach(item => {
    state[item].articles.forEach(article => {
        if (article.title.indexOf(event.target.value) != -1) {
          console.log(article.title)
        }
    })
  })
  //render(app,state)
})


fetchArticles(state.source)
render(app, state)
