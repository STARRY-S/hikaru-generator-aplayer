# Hikaru Generator APlayer

A music player plugin based on [APlayer](https://github.com/MoePlayer/APlayer) for [Hikaru](https://github.com/AlynxZhou/hikaru).

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
        "lrc": "[00:00.00]APlayer[00:04.01]is[00:08.02]amazing"
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

Add `"fixed": "true"` to enable Fixed mode;
Add `"mini": "true"` to enable mini mode.

The default value is `false`.

# APlayer Options

For more descriptions please refer to [APlayer Official Documents](https://aplayer.js.org/#/home?id=options).

# Custom CDN

The default CDN is provided by [cdnjs](https://cdnjs.com/libraries/aplayer) (version: 1.10.1).

Add following to your `siteConfig.yml` for custom CDN links.

``` yaml
aplayer:
  enable: true
  cdn:
    style: "https://link_to_your/APlayer.min.css"
    script: "https://link_to_your/APlayer.min.js"

```
