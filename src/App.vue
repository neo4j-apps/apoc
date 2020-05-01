<template>
    <docs-app :theme="theme" :name=name :slug="slug" :version="version" />
</template>

<script>
/* eslint-disable */
import DocsApp from './components/DocsApp'
import { name, slug, versions, theme } from './constants'
export default {
    name: 'App',
    components: {
        DocsApp,
    },
    data: () => ({
        name,
        slug,
        versions,
        theme,
        version: versions[0],
    }),
}
</script>

<style lang="postcss">
#app {
    @apply fixed h-full w-full;
    /* font-size: 16px; */
}

.loading {
    @apply absolute inset-0 flex flex-row w-full justify-between items-center text-center;

    .message {
        @apply relative block text-center pt-16 w-full;

        &:before {
            @apply absolute rounded-full;
            top: 0;
            left: 50%;
            width: 100%;
            height: 100%;
        }


        &:after {
            @apply absolute rounded-full border-2 shadow-sm;

            top: 0;
            left: 50%;
            width: 100%;
            height: 100%;

            animation: loader .6s linear;
            animation-iteration-count: infinite;
        }

        &:before, &:after {
            @apply h-10 w-10 m-0 -ml-5;
            content: '';
        }
    }
}

.searching {
    @apply h-5 w-5 relative;

    &:before, &:after {
        @apply absolute rounded-full inset-0;

        @apply h-5 w-5;
        content: '';
    }

    &:after {
        @apply absolute rounded-full border-2 shadow-sm;

        animation: loader .6s linear;
        animation-iteration-count: infinite;
    }

    &:after {
        border-color: theme('colors.purple.600') transparent transparent;
    }


}

@keyframes loader {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}


.docs {
    @apply flex flex-row h-screen w-screen overflow-hidden;

    .sidebar {
        @apply flex flex-col flex-grow-0 flex-shrink-0 bg-gray-100 overflow-scroll;

        .loading {
            z-index: 10000;
        }

        width: 280px;

        .brand {
            @apply p-4 border-b border-gray-300 flex flex-grow-0 flex-row;

            .logo {
                @apply flex items-center mr-3 w-10 h-10;
            }

            .identity {
                @apply flex items-center text-gray-600 border-b-2 border-transparent mr-4 transition-all flex-grow;
            }
        }

        .nav {
            @apply flex flex-col flex-grow overflow-auto p-2 pt-4;

            .library {
                @apply flex flex-row justify-between p-2 border-b border-gray-300;

                .name {
                    @apply font-bold;
                }
            }


            li {
                @apply mt-2;

                a {
                    @apply block px-2 py-2 rounded-md;
                }

                &.chapter {
                    @apply font-bold text-sm;
                }

                &.section {
                    @apply font-normal text-xs mt-0;

                    a {
                        @apply py-1;
                    }
                }
            }

        }

        .search {
            @apply relative;
            /* @apply flex; */

            .form {
                @apply flex p-2 m-2 mb-4 bg-white border border-gray-300 rounded-md h-10;
                /* p-4 border-t  border-gray-300;*/


                input {
                    @apply flex-grow bg-transparent outline-none text-xs;
                }
            }

            svg {
                @apply flex-grow-0;
            }
        }
    }

    .main {
        @apply relative flex flex-grow justify-start p-4 pt-6 overflow-y-auto text-gray-700;

        #documentation {
            min-width: 100%;
            min-height: 100%;
            @apply relative;
        }

        a {
           @apply font-semibold;
        }


        h1 {
            @apply text-xl font-bold text-gray-800 mb-4 border-b pb-4 leading-normal;
        }

        h2 {
            @apply text-xl font-bold text-gray-800 mb-4 border-b py-3 leading-normal;
        }

        .titlepage .title {
            @apply leading-tight;
        }

        h3 {
            @apply text-lg font-bold mb-2 leading-normal;
        }

        h4 {
            @apply font-bold mb-2 leading-normal;
        }

        p, pre, ul, table, h3, h4, table {
            @apply mb-4;
        }

        .code-header {
            @apply -m-4 mb-4 px-4 py-2 rounded-t-lg font-sans flex justify-between text-xs;

            .code-actions {
                @apply flex justify-end flex-grow;
            }

            .language {
                @apply flex font-bold py-2;
            }

            button {
                @apply px-2 py-2 ml-2 rounded-md;

                &.primary {
                    @apply -mr-2 ml-4;
                }

                &.secondary {
                    @apply px-0;
                }
            }
        }

        li {
            @apply ml-6 pl-2;
        }

        code {
            @apply px-2 py-1 bg-gray-100 overflow-x-auto;
            max-width: 100%;
        }

        pre {
            @apply p-4;

            code {
                @apply p-0;
            }
        }

        .table {
            @apply mt-8;

        }

        .table, pre {
            width: 100%;
            overflow-x: auto;
        }

        table, pre {
            @apply w-full mb-12;
        }

        table {
            @apply w-full mb-12;

            caption {
                @apply bg-gray-100 p-4 text-xs font-bold;
            }

            thead {
                @apply bg-gray-200 p-2 text-xs;
            }

            td, th {
                @apply px-2 py-4;
            }

            th {
                @apply leading-none;
            }

            td {
                @apply border-b border-gray-200;
            }

            tr:nth-child(even) {
                @apply bg-gray-100;
            }

            &.informaltable {
                @apply border-t-2;
            }
        }

        .admonitionblock {
            @apply mb-8 p-2;

            table {
                @apply mb-0;

                td.note {
                    @apply w-10 border-r border-purple-200;
                }

                td, td {
                    @apply border-0;
                }
            }

            p:last-child {
                @apply mb-0;
            }
        }

        .section {
            @apply mt-12;
        }

        .informalfigure {
            @apply p-2 my-8 bg-gray-100;

            img {
                max-width: 100%;
                display: block;
                margin: auto;
            }
        }

        .figure {
            @apply my-8 bg-gray-100 rounded-b-md;

            .figure-title {
                @apply text-center font-bold p-4 rounded-t-md text-xs;
            }

            .figure-contents {
                @apply p-4;
            }
        }

        .formalpara-title {
            @apply font-bold;
        }
    }

    table td {
        .code-header {
            display: none !important;
        }

        pre {
            width: 100%;
            max-width: 800px;
            overflow-y: auto;
        }
    }

    .icon {
        @apply w-16 py-8 mr-4 text-center !important;

        vertical-align: top;
    }

}


.labs {
    @apply border-t-4 border-purple-400;

    .loading {
        @apply bg-purple-200 text-purple-800;

        .message {
            &:before {
                @apply border-purple-300;
            }
            &:after {
                border-color: theme('colors.purple.600') transparent transparent;
            }
        }
    }

    #documentation .loading {
        @apply bg-white;
    }

    .nav {

        .library {
            .name {
                @apply text-purple-800;
            }
            .version {
                @apply text-purple-600;
            }
        }

        .chapter a {
            @apply text-purple-900;
        }

        a:hover {
            @apply text-purple-800 bg-purple-100;
        }

        .section a {
            @apply text-gray-600;
        }
    }

    .search {
        .form {
            input {
                @apply text-gray-600;
            }
            svg {
                fill: transparent;
                stroke: theme('colors.gray.600')
            }
        }
    }

    .main {
        a {
            @apply text-purple-700;
        }
    }

    code {
        @apply text-purple-600;
    }

    .code-header,  table caption, .figure-title {
        @apply bg-purple-200 text-purple-800;

        button {
            @apply font-bold;

            &.primary {
                @apply bg-purple-300 text-purple-900;
            }
        }
    }

    .table {
        @apply border-purple-600 text-sm;

        .informaltable {
            @apply border-purple-600;
        }
    }

    table tr:nth-child(even) {
        @apply bg-purple-100 border-purple-200 !important;
    }

    .admonitionblock {
        @apply p-4 bg-purple-100;
    }

    .icon {
        @apply text-purple-500;
    }

    .titlepage {
        @apply mt-8;

        &:first-child {
            @apply mt-0 leading-none;
        }
    }

    .table-title {
        @apply bg-purple-200 text-purple-800 rounded-t-md !important;

        code {
            @apply bg-purple-100 !important;
        }
    }


    pre, code {
        @apply bg-gray-100;
    }

    .router-link-active {
        @apply text-purple-600 !important;
    }

    .hljs {
        .hljs-comment,
        .hljs-quote {
            @apply italic text-gray-500;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
            @apply text-purple-600;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
            @apply text-purple-600;
        }

        .hljs-literal {
            @apply text-blue-400;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta-string {
            @apply text-green-600;
        }

        .hljs-built_in,
        .hljs-class .hljs-title {
            @apply text-red-300;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
            @apply text-purple-700;
        }


        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
            @apply text-blue-600;
        }

        .hljs-emphasis {
            font-style: italic;
        }

        .hljs-strong {
            font-weight: bold;
        }

        .hljs-link {
            text-decoration: underline;
        }
    }


}

</style>