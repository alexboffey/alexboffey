---
title: "Lazyload embedded YouTube videos"
subtitle: "A technique for cleaner, more user-friendly YouTube embeds."
date: "2017-12-15T00:00:00.000Z"
post_type: "blog"
tags: "JavaScript,YouTube,jQuery"
published: true
---

Replace the typical iframe which is used to embed a YouTube video with a div with a data-id attribute. This attribute will contain the embed code for the iframe which is injected into the div.

## HTML

```html
<div class="ll-youtube-embed" data-id="vhO72LufsKQ"></div>
```

## JavaScript

```js
document.addEventListener("DOMContentLoaded", function () {
  var div,
    n,
    v = document.getElementsByClassName("ll-youtube-embed")

  for (n = 0; n < v.length; n++) {
    div = document.createElement("div")
    div.setAttribute("data-id", v[n].dataset.id)
    div.innerHTML = thumb(v[n].dataset.id)
    div.onclick = iframe
    v[n].appendChild(div)
  }
})

function thumb(id) {
  var thumb =
      '<img class="u-center" src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
    play = '<div class="play"></div>'
  return thumb.replace("ID", id) + play
}

function iframe() {
  var iframe = document.createElement("iframe")
  var embed = "https://www.youtube.com/embed/ID?autoplay=1"
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id))
  iframe.setAttribute("frameborder", "0")
  iframe.setAttribute("allowfullscreen", "1")
  iframe.setAttribute("width", "640")
  iframe.setAttribute("height", "400")
  this.parentNode.replaceChild(iframe, this)
}
```

## CSS

```scss
.ll-youtube-embed {
  position: relative;
  padding-bottom: 56.23%;
  /* Use 75% for 4:3 videos */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  margin: 5px;
}

.ll-youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: transparent;
}

.ll-youtube-embed img {
  bottom: 0;
  display: block;
  left: 0;
  margin: auto;
  max-width: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  height: auto;
  cursor: pointer;
  -webkit-transition: 0.4s all;
  -moz-transition: 0.4s all;
  transition: 0.4s all;
}

.ll-youtube-embed img:hover {
  -webkit-filter: brightness(75%);
}

.ll-youtube-embed .play {
  height: 72px;
  width: 72px;
  left: 50%;
  top: 50%;
  margin-left: -36px;
  margin-top: -36px;
  position: absolute;
  background: #fff;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0.5em 0.5em 2.5em -0.5em rgba(68, 68, 68, 0.7);
  transition: transform 0.3s ease;
}

.ll-youtube-embed .play::after {
  content: "Click to play video";
  font-size: 0;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-bottom: 15px solid transparent;
  border-top: 15px solid transparent;
  border-left: 26.25px solid #854da9;
  margin-left: -10px;
  margin-top: -15px;
}

.ll-youtube-embed .play:hover {
  transform: scale(1.05);
}
```
