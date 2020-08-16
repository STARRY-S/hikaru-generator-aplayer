const fs = require('fs')
const path = require('path')
const { title } = require('process')
module.exports = (hikaru) => {
    hikaru.generator.register('aplayer', (site) => {
        if (site['siteConfig']['aplayer']) {
            if (!site['siteConfig']['aplayer']['enable']) {
                return
            }
        }
        var APLAYER_STYLE_LITERAL = `<link href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css" rel="stylesheet">`
        var APLAYER_SCRIPT_LITERAL = `<script src= "https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"></script>`
        const APLAYER_DEFAULT_THEME = `#33363b`
        // const all = "site['posts'].concat(site['pages'])"
        const config = site['siteConfig']['aplayer']
        if (config['cdn']) {
            APLAYER_STYLE_LITERAL = `<link href="${config['cdn']['style']}" rel="stylesheet">`
            APLAYER_SCRIPT_LITERAL = `<script src= "${config['cdn']['script']}"></script>`
        }

        for (const p of site['posts'].concat(site['pages'])) {
            if (p['content'] && p['content'].includes("<!--aplayer")) {
                p['content'] = `${APLAYER_STYLE_LITERAL}\n${APLAYER_SCRIPT_LITERAL}\n${p['content']}`
            }
            if (p['excerpt'] && p['excerpt'].includes("<!--aplayer")) {
                p['excerpt'] = `${APLAYER_STYLE_LITERAL}\n${APLAYER_SCRIPT_LITERAL}\n${p['excerpt']}`
            }
            var apnum = 0;
            for (var pos = p['content'].indexOf("<!--aplayer"); pos !== -1; pos = p['content'].indexOf("<!--aplayer")) {
                var objstr = p['content'].slice(pos+11, p['content'].indexOf('-->', pos))
                try {
                    var objects = JSON.parse(objstr)
                } catch(e) {
                    hikaru.logger.warn(`[APlayer] Parse JSON failed in post: ${p['title']}`)
                    hikaru.logger.warn(`[APlayer] ${objstr}`)
                    hikaru.logger.warn(`[APlayer] Please check the JSON syntax and retry.`)
                    hikaru.logger.error(e)
                    process.exit(-1)
                    return;
                }

                if (objects['audio'] !== undefined) {   // Multi musics with/without lyrics.
                    var aplayer = 
                        `<!--APlayer-->\n<div id="aplayer${apnum}" style="color:#222"></div>`
                        + `\n<script>`
                        + `\nconst ap${apnum} = new APlayer ({`
                        + `\n    container: document.getElementById("aplayer${apnum}"),`
                        + `\n    theme: "${APLAYER_DEFAULT_THEME}",`
                        + `\n    fixed: ${objects['fixed'] || false},`
                        + `\n    listFolded: ${objects["listFolded"] || false},`
                        + `\n    listMaxHeight: ${objects["listMaxHeight"] || false},`
                        + `\n    lrcType: ${objects["lrcType"] || false},`
                        + `\n    mini: ${objects["mini"] || false},`
                        + `\n    volume: ${objects['volume'] || 0.7},`
                        + `\n    order: "${objects['order'] || "list"}",`
                        + `\n    loop: "${objects['loop'] || "all"}",`
                        + `\n    autoplay: ${objects['autoplay'] || false},`
                    + `\n    audio: [`

                    for (const q of objects['audio']) {
                        aplayer += 
                        `{`
                        + `\n    name: "${q['name']}",`
                        + `\n    artist: "${q['artist']}",`
                        + `\n    url: "${q['url']}",`
                        + `\n    cover: "${q['cover']}",`
                        + `\n    theme: "${q['theme'] || ""}",`
                        + `\n    lrc: "${q['lrc'] || false}"`
                        + `\n},`;
                    }
                    aplayer = aplayer.slice(0, aplayer.length-1)
                    aplayer +=`]\n});\n</script>`

                } else {
                    if (objects['lrc'] === undefined) {     // Single music without lyrics, can changed to dark mode.
                        var aplayer = 
                            `<!--APlayer-->\n<div id="aplayer${apnum}" style="background: var(--color-main-background)"></div>`
                    } else {    // Single music with lyrics.
                        var aplayer = 
                            `<!--APlayer-->\n<div id="aplayer${apnum}" style="color:#222"></div>`
                    }
                    aplayer +=
                        `\n<script>`
                        + `\nconst ap${apnum} = new APlayer ({`
                        + `\n    container: document.getElementById("aplayer${apnum}"),`
                        + `\n    theme: "${APLAYER_DEFAULT_THEME}",`
                        + `\n    fixed: ${objects['fixed'] || false},`
                        + `\n    listFolded: ${objects["listFolded"] || false},`
                        + `\n    listMaxHeight: ${objects["listMaxHeight"] || false},`
                        + `\n    lrcType: ${objects["lrcType"] || false},`
                        + `\n    mini: ${objects["mini"] || false},`
                        + `\n    volume: ${objects['volume'] || 0.7},`
                        + `\n    order: "${objects['order'] || "list"}",`
                        + `\n    loop: "${objects['loop'] || "all"}",`
                        + `\n    autoplay: ${objects['autoplay'] || false},`
                        + `\n    audio: [{`
                        + `\n        name: "${objects['name']}",`
                        + `\n        artist: "${objects['artist']}",`
                        + `\n        url: "${objects['url']}",`
                        + `\n        cover: "${objects['cover']}",`
                        + `\n        lrc: "${objects['lrc'] || ""}",`
                        + `\n        theme: "${objects['theme'] || ""}"`
                        + `\n    }]`
                        + `\n});`
                        + `\n</script>`
                }

                p['content'] = `${p['content'].slice(0, pos)} ${aplayer} ${p['content'].slice(p['content'].indexOf("-->", pos)+3)}`
                if (p['excerpt'] && pos < p['excerpt'].length) {
                    p['excerpt'] = `${p['excerpt'].slice(0, pos)} ${aplayer} ${p['excerpt'].slice(p['excerpt'].indexOf("-->", pos)+3)}`
                }
                apnum++;
            }
        }
    })
}
