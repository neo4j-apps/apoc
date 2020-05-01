<template>
    <div class="sidebar">
        <loading v-if="loading" message="Loading Documentation&hellip;" />
        <div class="top brand" v-else>
            <img class="logo" src="globe.svg" />

            <div class="identity">
                <svg
                    width="39px"
                    height="17px"
                    viewBox="0 0 39 17"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="labs" transform="translate(-1.000000, -5.000000)" fill="#000000">
                            <path
                            d="M1.39,18.206 L1.39,5.666 L3.018,5.666 L3.018,18.096 C3.018,19.306 3.37,19.812 4.404,19.812 C4.668,19.812 4.954,19.79 5.196,19.724 L5.196,21.242 C4.932,21.308 4.668,21.33 4.404,21.33 C3.216,21.33 1.39,21.066 1.39,18.206 Z M6.736,18.008 C6.736,15.72 8.32,14.642 11.356,14.422 C13.468,14.268 14.304,14.092 14.304,12.794 C14.304,12.024 13.688,11.1 11.928,11.1 C10.608,11.1 9.64,11.738 8.936,12.662 L7.814,11.738 C8.782,10.33 10.212,9.582 11.928,9.582 C14.326,9.582 15.932,10.902 15.932,13.036 L15.932,18.954 C15.932,19.79 16.394,19.812 16.856,19.812 L17.054,19.812 L17.054,20.978 C16.746,21.176 16.284,21.22 15.932,21.22 C15.294,21.22 14.898,20.846 14.766,20.626 C14.634,20.406 14.568,20.208 14.524,19.922 C13.688,20.912 12.28,21.33 10.74,21.33 C8.386,21.33 6.736,20.032 6.736,18.008 Z M8.364,17.964 C8.364,19.13 9.332,19.812 10.916,19.812 C13.116,19.812 14.304,18.8 14.304,17.26 L14.304,15.28 C13.908,15.698 12.984,15.83 11.422,15.962 C9.596,16.116 8.364,16.512 8.364,17.964 Z M18.946,21 L18.946,5.666 L20.574,5.666 L20.574,11.562 C21.124,10.616 22.334,9.582 24.512,9.582 C27.614,9.582 30.122,12.068 30.122,15.456 C30.122,18.844 27.614,21.33 24.512,21.33 C22.334,21.33 21.124,20.296 20.574,19.35 L20.574,21 L18.946,21 Z M20.376,15.456 C20.376,17.942 22.136,19.812 24.512,19.812 C26.8,19.812 28.494,17.942 28.494,15.456 C28.494,12.97 26.8,11.1 24.512,11.1 C22.136,11.1 20.376,12.97 20.376,15.456 Z M31.288,18.602 L32.674,18.074 C32.938,18.91 33.818,19.746 35.468,19.746 C37.514,19.746 37.91,18.69 37.91,18.052 C37.91,16.842 36.876,16.424 35.138,15.742 C33.378,15.038 32.124,14.268 32.124,12.508 C32.124,10.792 33.51,9.582 35.468,9.582 C36.964,9.582 38.042,10.242 38.68,11.496 L37.36,12.178 C36.964,11.452 36.414,11.078 35.49,11.078 C34.5,11.078 33.752,11.584 33.752,12.508 C33.752,13.498 34.72,13.96 36.172,14.51 C38.306,15.324 39.538,16.27 39.538,18.052 C39.538,19.636 38.284,21.264 35.468,21.264 C33.422,21.264 31.75,20.34 31.288,18.602 Z"
                            />
                        </g>
                    </g>
                </svg>


            </div>
        </div>

        <nav class="nav">
            <div class="library">
                <h1 class="name">
                    <router-link :to="{path: '/index.html'}">{{ name }}</router-link>
                </h1>
                <span class="version">{{ version }}</span>
            </div>

            <ul>
                <chapter-link
                    v-for="chapter in chapterResults"
                    :key="chapter.to.path"
                    :to="chapter.to"
                    :text="chapter.text"
                    :classes="chapter.class"
                    :children="chapter.children"
                />
            </ul>
        </nav>

        <div class="search">
            <div class="form">
                <input type="text" v-model="search" placeholder="Search" @keydown="detectEsc">

                <div class="searching" v-if="searching" />

                <svg class="" width="23px" height="23px" viewBox="0 0 23 23" v-else-if="search == ''">
                    <g id="search">
                        <circle id="Oval" transform="translate(11.389364, 11.388564) rotate(-23.025000) translate(-11.389364, -11.388564) " cx="11.3893642" cy="11.3885639" r="8.056"></circle>
                        <path d="M17.0853333,17.0844444 L23.3333333,23.3333333" id="Shape"></path>
                    </g>
                </svg>

                <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" style="margin-top: 6px" v-else @click="clearSearch">
                    <g transform="translate(-6.000000, -6.000000)" stroke-width="1.5">
                        <path d="M7.498,16.5 L16.497,7.5" id="Shape"></path>
                        <path d="M16.498,16.5 L7.497,7.5" id="Shape"></path>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ChapterLink from './ChapterLink'
import search from '../search'
import { appendIndex } from '../utils'

export default {
    props: {
        name: String,
        slug: String,
        version: String,
        versions: Array,
    },
    components: {
        ChapterLink,
    },
    data: () => ({
        loading: true,
        toc: false,

        searching: false,
        search: '',
        boosted: [],
    }),
    mounted() {
        this.load()
    },
    computed: {
        chapterResults() {
            if ( this.search === '' ) return this.chapters

            return this.chapters.filter(chapter =>
                    chapter.text.toLowerCase().includes(this.search.toLowerCase())
                    || chapter.children.find(child => child.text.toLowerCase().includes(this.search.toLowerCase()))
                )
                .map(chapter => ({
                    ...chapter,
                    children: chapter.children.filter(section => section.text.toLowerCase().includes(this.search.toLowerCase()))
                }))

        },
        chapters() {
            if ( !this.toc ) return []

            return Array.from(this.toc.querySelectorAll('.chapter a'))
                .map(a => ({
                    class: a.parentElement.className,
                    to: { path: appendIndex(a), },
                    text: a.innerHTML,
                    children: Array.from(a.parentElement.parentElement.querySelectorAll('.section a')).map(a => ({
                        class: a.parentElement.className,
                        to: { path: appendIndex(a), },
                        text: a.innerHTML,
                    })),
                }))
        },
        root() {
            return `./${this.slug}/${this.version}`
        },
    },
    methods: {
        load() {
            let url = `${this.root}/toc.html`

            fetch(url)
                .then(res => res.text())
                .then(html => {
                    this.toc = document.createElement('body')
                    this.toc.innerHTML = html
                })
                .finally(() => this.loading = false)
        },
        indexFiles() {
            // TODO: Is this worth persuing?
            const all = this.chapters.map(chapter => {
                return chapter.children.map(section => this.root + section.to.path).concat([this.root + chapter.to.path])
            }).reduce((acc, arr) => acc.concat(arr), [])
            
            search.index(all)
                .then(() => this.searching = false)

        },
        clearSearch() {
            this.search = ''
        },
        detectEsc(e) {
            if ( e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27 ) {
                this.clearSearch()
            }
        },
    },
}
</script>

<style>

</style>