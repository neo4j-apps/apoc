<template>
    <div id="documentation">
        <loading v-if="loading" message="Loading Documentation&hellip;" />
        <div v-html="html" v-else />
    </div>
</template>

<script>
/* eslint-disable */
import hljs from 'highlightjs'
import cypher from 'highlightjs-cypher'

hljs.registerLanguage('cypher', cypher);

import { appendIndex, addActions } from '../utils'
import CodeMirror from 'codemirror'

export default {
    data: () => ({
        slug: 'apoc',
        version: '4.0',

        loading: false,
        dom: false,

        html: false,
    }),
    mounted() {
        this.loadHtml()
    },
    methods: {
        loadHtml() {
            this.loading = true

            const file = this.$route.path == '/' ? '/index.html' : this.$route.path

            const url = `./${this.slug}/${this.version}${file}`

            fetch(url)
                .then(res => res.text())
                .then(html => {
                    this.dom = document.createElement('html')
                    this.dom.innerHTML = html                    

                    this.setHtml()

                    setTimeout(() => {
                        this.correctLinks()
                        this.correctImages()
                        this.handleCodeBlocks()
                        this.scrollToHash()
                    }, 20)
                })
                .finally(() => this.loading = false)
        },
        setHtml() {
            window.dom = this.dom
            this.html = this.dom ? Array.from(this.dom.querySelectorAll('section')).map(section => section.innerHTML).join('') : ''
        },
        scrollToHash() {
            if ( this.$route.hash ) {
                const el = Array.from(document.getElementsByTagName('a'))
                    .filter(a => a.className === 'anchor' && a.getAttribute('href') === this.$route.hash )[0]

                el && el.scrollIntoView()
            }
            else {
                window.scrollTo(0, 0)
            }
        },
        // TODO: Is there a better way of doing all this?!
        correctLinks() {
            const base = this.$router.currentRoute.path.endsWith('/') ? this.$router.currentRoute.path : `${this.$router.currentRoute.path}/`

            // Correct Links
            Array.from(this.$el.getElementsByTagName('a'))
                .filter(a => a.getAttribute('href').includes('//'))
                .forEach(a => {
                    a.setAttribute('target', '_blank')
                    a.className = a.className + ' external'
                })

            Array.from(this.$el.getElementsByTagName('a'))
                .filter(a => !a.getAttribute('href').includes('//') && /^[a-z0-9-.]/.test(a.getAttribute('href')))
                .forEach(a => {
                    a.setAttribute('href', `${appendIndex(a, base)}`)

                    a.onclick = e => {
                        e.preventDefault()

                        // If the user has clicked an <em> or something, find the parent
                        let target = e.target

                        while ( target.tagName !== "A" && target.parentNode ) {
                            target = target.parentElement
                        }

                        this.$router.push({ path: target.getAttribute('href') })
                    }
                })
        },
        correctImages() {
            Array.from(this.$el.getElementsByTagName('img'))
                .filter(img => img.getAttribute('src').includes('../'))
                .forEach(img => {
                    img.setAttribute('src', './' + img.getAttribute('src').replace(/\.\.\//g, ''))
                })
        },
        handleCodeBlocks() {
            Array.from(this.$el.querySelectorAll('pre code'))
                .forEach(block => addActions(block))

            Array.from(this.$el.querySelectorAll('pre code'))
                .forEach(block => hljs.highlightBlock(block))


        },
    },
    watch: {
        $route() {
            this.loadHtml()
        },
    },
}
</script>

<style>

</style>