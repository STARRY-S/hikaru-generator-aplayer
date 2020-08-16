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

# Dark Mode

If the player only has single music and no lyrics, it will support dark mode when using hikaru theme aria.

```json
// Support dark mode.
<!--aplayer
{
    "name": "Music Name",
    "artist": "Artist",
    "theme": "#F6890E",
    "url": "URL",
    "cover": "COVER"
}
-->
````

If the player has a playlist or contains lyrics, it will not support dark mode.

``` json
// Don't support dark mode because it has lyrics, the background color is always white.
<!--aplayer
{
    "name": "Music Name",
    "artist": "Artist",
    "theme": "#F6890E",
    "url": "URL",
    "cover": "COVER",
    "lrcType": "2",
    "lrc": "[00:00.00]APlayer[00:04.01]is[00:08.02]amazing[00:9.02]11111[00:10.02]2222[00:11.02]3333"
}
-->

```
