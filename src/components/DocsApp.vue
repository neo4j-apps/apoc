<template>
    <div id="app" class="docs" :class="theme">
        <sidebar
            :name="name"
            :slug="slug"
            :versions="versions"
            :version="version"
        />

        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { appendIndex } from '../utils'

import Sidebar from './Sidebar'

export default {
    components: {
        Sidebar,

    },
    props: {
        name: String,
        slug: String,
        version: String,
        versions: Array,
        theme: String,
    },
}
</script>