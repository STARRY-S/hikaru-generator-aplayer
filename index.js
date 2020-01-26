const fs = require('fs')
const path = require('path')
module.exports = (hikaru) => {
    hikaru.generator.register('aplayer', (site) => {
        const APLAYER_STYLE_LITERAL = `<link href="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css" rel="stylesheet">`
        const APLAYER_SCRIPT_LITERAL = `<script src= "https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"></script>`
        const APLAYER_DEFAULT_THEME = `#33363b`
        // const all = "site['posts'].concat(site['pages'])"

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
                var objects = JSON.parse(objstr)

                if (objects['audio'] !== undefined) {
                    var aplayer = `
                    <div id="aplayer${apnum}"></div>
                    <script>
                    const ap${apnum} = new APlayer ({
                        container: document.getElementById("aplayer${apnum}"),
                        theme: "${APLAYER_DEFAULT_THEME}",
                        fixed: ${objects['fixed'] || false},
                        listFolded: ${objects["listFolded"] || false},
                        listMaxHeight: ${objects["listMaxHeight"] || false},
                        lrcType: ${objects["lrcType"] || false},
                        mini: ${objects["mini"] || false},
                        volume: ${objects['volume'] || 0.7},
                        order: "${objects['order'] || "list"}",
                        loop: "${objects['loop'] || "all"}",
                        autoplay: ${objects['autoplay'] || false},
                        audio: [`

                    for (const q of objects['audio']) {
                        aplayer += `
                        {
                            name: "${q['name']}",
                            artist: "${q['artist']}",
                            url: "${q['url']}",
                            cover: "${q['cover']}",
                            theme: "${q['theme'] || ""}",
                            lrc: "${q['lrc'] || false}"
                        },`;
                    }
                    aplayer = aplayer.slice(0, aplayer.length-1)
                    aplayer +=
                    `]
                });
                </script>`

                } else {
                    var aplayer = `
                    <div id="aplayer${apnum}"></div>
                    <script>
                    const ap${apnum} = new APlayer ({
                        container: document.getElementById("aplayer${apnum}"),
                        theme: "${APLAYER_DEFAULT_THEME}",
                        fixed: ${objects['fixed'] || false},
                        listFolded: ${objects["listFolded"] || false},
                        listMaxHeight: ${objects["listMaxHeight"] || false},
                        lrcType: ${objects["lrcType"] || false},
                        mini: ${objects["mini"] || false},
                        volume: ${objects['volume'] || 0.7},
                        order: "${objects['order'] || "list"}",
                        loop: "${objects['loop'] || "all"}",
                        autoplay: ${objects['autoplay'] || false},
                        audio: [{
                            name: "${objects['name']}",
                            artist: "${objects['artist']}",
                            url: "${objects['url']}",
                            cover: "${objects['cover']}",
                            lrc: "${objects['lrc'] || ""}",
                            theme: "${objects['theme'] || ""}"
                        }]
                    });
                    </script>`
                }

                p['content'] = `${p['content'].slice(0, pos)} ${aplayer} ${p['content'].slice(p['content'].indexOf("-->", pos)+3)}`
                console.log(objects)
                if (p['excerpt'] && pos < p['excerpt'].length) {
                    p['excerpt'] = `${p['excerpt'].slice(0, pos)} ${aplayer} ${p['excerpt'].slice(p['excerpt'].indexOf("-->", pos)+3)}`
                }
                apnum++;
            }
        }

    })
}
