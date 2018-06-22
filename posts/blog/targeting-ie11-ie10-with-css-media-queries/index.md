---
title: 'Targeting IE10 & IE11 with CSS'
subtitle: 'Using CSS media queries to target only IE10 and IE11.'
date: '2018-06-22T00:00:00.000Z'
post_type: 'blog'
published: 'true'
---

Supporting legacy browsers will always be a pain point for the developers who are unfortunate enough to have to support them.

Given enough frantic googling, or trial and error, sometimes just a few lines of CSS can be added or removed to resolve the issue. But this isn't always the case. Sometimes lots of styles would need to be re-factored or a design would need to be comprimised in order to achieve the desired outcome.

Fortunately, as both IE10 and IE11 support the `-ms-high-contrast` media query, we can use it to target them and apply specific styles to work around any styling issues that come up.

## Media query to target IE10 and IE11

```css
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    ..//
}
```
