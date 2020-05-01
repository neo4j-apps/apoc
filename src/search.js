import elasticlunr from 'elasticlunr'

const stripTags = str => str && str.replace(/(<([^>]+)>)/ig,"");

class Search {

    constructor() {
        this._index = elasticlunr(function() {
            this.addField('title')
            this.addField('description')
            this.addField('body')
            this.setRef('url')
        })
        window._index = this._index
    }

    index(urls) {
        return Promise.all(urls.map(url => {
            return fetch(url)
                .then(res => res.text())
                .then(html => {
                    const dom = document.createElement('html')
                    dom.innerHTML = html

                    const title = dom.querySelector('title')
                    const description = dom.querySelector('meta[name=description]')
                    const body = Array.from(dom.querySelectorAll('section')).map(el => el.innerHTML).join()

                    this._index.addDoc({
                        url,
                        title: title && title.innerHTML,
                        description: description && description.getAttribute('content'),
                        body: body && stripTags(body.innerHTML),
                    })
                })
        }))
    }

    search(...args) {
        return this._index.search(...args)
    }
}

export default new Search()
