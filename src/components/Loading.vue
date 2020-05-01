<template>
    <div class="loading">
        <span class="message" v-html="message" />
    </div>
</template>

<script>
export default {
    props: {
        message: String,
    },
}
</script>