# APOC Documentation App

This repository takes the HTML files generated as part of the [APOC Manual](https://neo4j.com/docs/labs/apoc/current/) generation process and makes it available offline as a [Graph App](https://www.neo4j.com/developer/graph-app-development).  The Graph App also provides additional functionaliy 

## Installation

To install this repository as a Graph App, you can [click here](neo4j-desktop://graphapps/install?url=https://registry.npmjs.org/@graphapps/apoc) or paste the following link into the Install form at the bottom of the Graph Apps pane in Neo4j Desktop.

[neo4j-desktop://graphapps/install?url=https://registry.npmjs.org/@graphapps/apoc](neo4j-desktop://graphapps/install?url=https://registry.npmjs.org/@graphapps/apoc)

The manual can be viewed in it's original form at https://neo4j.com/docs/labs/apoc/current/


## How I Built It

This is a Vue.js project created using `@vue/cli`.  The app uses the `fetch` API to load in the generated TOC from the Manual and displays it in a menu on the left hand side.  When any of the links are clicked, a component uses fetch to load the file into a "virtual" DOM.

Then any link click events are highjacked so the events are passed through to the vue router.

The code highlighting is then applied to any `<code>` blocks, and a `<div>` is prepended to each code block with a set of actions for that code block.

If a code block contains cypher, a button is added which redirects the user to a Deep Link for Neo4j Desktop which instructs it to open Neo4j Browser with the query pre-populated.

```
neo4j-desktop://graphapps/neo4j-browser?arg=edit&cmd={cypher}
```

eg:
```
neo4j-desktop://graphapps/neo4j-browser?arg=edit&cmd=MATCH (n) RETURN count(n)
```

### Tech Stack
- Vue.js & Vue Router
- Tailwind & PostCSS for a utility-based styling approach
- Deep links to Neo4j Browser via Neo4j Desktop
- HighlightJS for syntax highlighting
- Elasticlunr for Full Text search
- Cypress for testing