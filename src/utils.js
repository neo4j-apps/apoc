export const appendIndex = (a, base = '/') => {
    let parts = a.getAttribute('href').replace('index.html', '').split('#')

    // Fix relative links
    if ( parts[0].startsWith('../') ) {
        base = base.split('/').filter(n => n !== 'index.html').splice(0, 2).join('/') + '/'
        parts[0] = parts[0].replace('../', '')
    }

    parts[0] = `${parts[0]}index.html`

    return (base.replace('index.html', '') + parts.join('#')).replace('//', '/')
}

const allowedLanguages = ['cypher', 'json']

const cleanCode = code => {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = code

    return textarea.value
}

const copyToClipboard = code => {
    const textarea = document.createElement('textarea')
    textarea.value = cleanCode(code)
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea)
    textarea.select()

    document.execCommand('copy')
    document.body.removeChild(textarea)
}

export const addActions = el => {
    const code = el.innerHTML
    const language = el.getAttribute('data-lang')

    const container = document.createElement('div')
    container.setAttribute('class', 'code-header')

    if ( language && allowedLanguages.includes(language) ) {
        const lang = document.createElement('div')
        lang.setAttribute('class', 'language')
        lang.innerHTML = language

        container.appendChild(lang)
    }

    const actions = document.createElement('div')
    actions.setAttribute('class', 'code-actions')

    const copyButton = document.createElement('button')
    copyButton.className = "secondary"
    copyButton.innerHTML = 'Copy to Clipboard'

    copyButton.addEventListener("click", e => {
        e.preventDefault()
        copyToClipboard(code)
    })

    actions.appendChild(copyButton)

    if ( language === "cypher" ) {
        const runInBrowser = document.createElement('button')
        runInBrowser.className = "primary"
        runInBrowser.innerHTML = 'Run in Browser'

        runInBrowser.addEventListener("click", e => {
            e.preventDefault()

            window.location.href = `neo4j-desktop://graphapps/neo4j-browser?cmd=edit&arg=${encodeURIComponent(cleanCode(code))}`
        })
        actions.appendChild(runInBrowser)
    }

    container.appendChild(actions)
    el.parentNode.insertBefore(container, el)
}