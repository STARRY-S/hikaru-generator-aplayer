Hikaru Generator APlayer
======================

A music player plugin based on [APlayer](https://github.com/MoePlayer/APlayer) for Hikaru.
------------------

# Usage

``` json
<!--aplayer
{
    "name": "name",
    "artist": "artist",
    "url": "music url.mp3",
    "cover": "music cover.jpg"
}
-->
```
## Music List & Lyrics

``` json
<!--aplayer
{
    "theme": "#b7daff",
    "lrcType": "2",
    "audio":
    [{
        "theme": "#F57F17",
        "name":"music1",
        "artist":"artist1",
        "url":"url1.mp3",
        "cover":"cover1.jpg",
        "lrc": "[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing"
    },
    {
        "theme": "#F57F17",
        "name":"music2",
        "artist":"artist2",
        "url":"url2.mp3",
        "cover":"cover2.jpg"
    }]
}
-->
```

# Fixed mode & Mini mode

Add `"fixed": "true"` to enable Fixed mode and `"mini": "false"` to enable mini mode.

The default value is `false`.

# Options

Most of [these Options](https://aplayer.js.org/#/home?id=options) are supported.

# CDN

CDN provided by [cdnjs](https://cdnjs.com/libraries/aplayer).

You can edit CDN at `index.js`:

```
const APLAYER_STYLE_LITERAL = `<link href="LINK_FOR_APlayer.min.css" rel="stylesheet">`
const APLAYER_SCRIPT_LITERAL = `<script src= "LINK_FOR_APlayer.min.js"></script>`
```
