<template>
    <li :class="classes" :id="id">
        <router-link  :to="to" v-html="text" />

        <ul v-if="children">
            <chapter-link
                v-for="chapter in children"
                :key="chapter.to.path"
                :to="chapter.to"
                :text="chapter.text"
                :classes="chapter.class"
                :children="chapter.children"
            />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'chapter-link',
    props: {
        to: Object,
        classes: String,
        text: String,
        children: Array,
    },
    computed: {
        id() {
            return this.text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s/g, '-')
        },
    },
}
</script>

<style>

</style>