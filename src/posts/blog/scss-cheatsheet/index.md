---
title: 'SCSS Cheatsheet'
subtitle: 'A practical guide to SCSS features.'
date: '2019-02-15T00:00:00.000Z'
post_type: 'blog'
tags: 'SCSS,CSS,Cheatsheet,front end development'
published: 'true'
---

# SCSS Cheatsheet
This article aims to provide a list of the features of SCSS and show some of their use cases, limitations and how they could be used in practice. To go along with this article is a [Codepen project](https://codepen.io/alexboffey/project/editor/ZorbKG#) which further demonstrates these features in a practical environment.

## Variables
Best use case is for *global* project settings, where changing the value would otherwise mean doing a painful find and replace.

```scss
// Variables are best used for `global` things like font family, colours and spacing
$font-family: 'Open Sans', Helvetica, Arial, sans-serif;
$color-primary: #F06D06;
$spacing: 1.2em;

// Variables can have other variables as their value
$font-family-headings: $font-family;
```

## Nesting
*Probably* the most useful feature that CSS doesn't have...

### CSS
This example shows how much repetition goes into a simple class in CSS.

```scss
.page-header {
  padding: 20px;
}

.page-header .heading {
  margin-bottom: 0;
}

.page-header .page-header__action {
  color: #5f5f5f;
}

.page-header .page-header__action:hover,
.page-header .page-header__action:focus {
  color: #F06D06;
}
```
### SCSS
This would compile to the CSS example above, but in SCSS there is way less repetition. It's also nice how the DOM hierarchy is *sort of* represented in the styles.

This example is a good demonstration of the `&`  operator. It refers to the *parent* selector when *nesting* and is essentially *interpolated* into the nested selector.

It's important to not *over-nest* as the code will become difficult to follow. Try to not go more than 3 levels deep.

```scss
.page-header {
  padding: 20px;

  .heading {
    margin-bottom: 0;
  }

  &__action {
    color: #5f5f5f;

    &:hover,
    &:focus {
      color: #F06D06;
    }
  }
}
```

## Partials / Import
SCSS lets you split your style-base into multiple files. This is **way better** than having a single 2000 line CSS file.

Beware of the order you import your partials in!
1. CSS is cascading: the order you declare styles in effects the *importance* of those styles.
2. SCSS doesn't hoist variables: you must declare variables before you use them.

You should always prefix your partials file name's with a `_`. This both signals that the file is a partial to other developers, and allows you to import it as shown below.
```scss
// _var.scss
$primary: pink;
```

```scss
// _base.scss
body {
  background-color: $primary;
}
```

Swapping the order of the imports would cause the `$primary` variable to be undefined.
```scss
// index.scss
@import "var";
@import "base";
```

## Mixins
Mixins allow you to *reuse* and *parameterise* blocks of styles. See how we can use arguments to "return" differernt styles for different uses.

Also note the use of the `@content` directive within mixins to yield blocks of styles *into* the mixin.

```scss
// Mixin Definition, also note the 'default' argument.
@mixin breakpoint($screen, $min-max: "min") {
  // Using interpolation here
  @media screen and (#{$min-max}-width: #{$screen}) {
    @content; // Using content directive too!
  }
}

// Mixin Usage
.container {
  @include breakpoint(1200px) {
    background: pink;
  }

  @include breakpoint(1199px, "max") {
    background: red;
  }
}
```

## Inheritance with the @extend directive
Very similar to mixins but without the ability to *parameterise* the *reusable* code block. 

**Don't** use the `@extend` directive on classes! It bloats the CSS output as you will probably end up writing classes that are only used to extend.
Instead use the placeholder syntax `%im-a-placeholder`, it can be thought of as a class that doesn't get output as CSS.

```scss
// Placeholder definition
%spacing {
  margin: 20px;
}

.content {
  @extend %spacing;

  background: #f9f9f9;
}
```

## Mathematical Operators
SCSS lets us do *"inline"* mathematical operations, we can combine different types of units and it will still be evaluated for us.
```scss
$spacing: 1.2em;

.container {
  padding: $spacing / 2; // 0.6em
  width: 300px / 960px * 100%; // 31.25%
}
```

## Native Functions
SCSS has lots of *built-in* functions that we can take advantage of. They're not going to all be listed here, so here's a link to the [documentation](http://sass-lang.com/documentation/Sass/Script/Functions.html).

```scss
$color-primary: #F06D06;
$color-primary-light: lighten($color-primary, 10%);
$color-primary-dark: darken($color-primary, 10%);
$color-primary-transparent: rgba($color-primary, 0.1);
```

## Functions and Control Directives
We can also write our own custom functions in SCSS. To make them usewill we will want to use the *control directives* which allow us to do conditionals, iteration and other features that you would find in other programming languages.

### Colour map variable retriever function
Aswell as using variables, we could use `maps` to store and group our variables. This provides us an alternative interface for using those values.

```scss
$colors: (
  primary: (
    default: #F06D06,
    light: lighten(#F06D06, 10%)
  ),

  neutral: (
    default: #666,
    light: #8f8f8f,
    dark: #4f4f4f
  )
);
```

Note the use of the `@function` directive to declare the function, its similar to how we declare a mixin. Also note the use of the `@return` directive to return values from the function.
```scss
// Retriever function
@function color($color-group, $color-item: "default") {
   @return map-get(map-get($colors, $color-group), $color-item);
}

// Usage
body {
  background: color(primary);

  section {
    background: color(primary, light);
  }
}
```

### Class and placeholder generation from colour map map
We can use the `@each` directive to iterate over each value within a map. Also note the use of the `@if` and `@else` directives to conditionally build the class / placeholder name.

```scss
@each $color-group-key, $color-group in $colors {
   // Nested each to go two levels deep into map
   @each $color-key, $color-value in $color-group {
      // Conditional class / placeholder name for "default" colour
      // Eg: .u-background-primary instead of .u-background-primary-default
      @if ($color-key == "default") {
         // Creating placeholders aswell as classes
         // Note the use of interpolation allowing us to create the class name from a variable
         %u-background-#{$color-group-key},
         .u-background-#{$color-group-key} {
            background-color: $color-value !important;  
         }
         
         %u-text-#{$color-group-key},
         .u-text-#{$color-group-key} {
            color: $color-value !important;  
         }
      } @else {
         %u-background-#{$color-group-key}-#{$color-key},
         .u-background-#{$color-group-key}-#{$color-key} {
            background-color: $color-value !important;   
         }
   
         %u-text-#{$color-group-key}-#{$color-key},
         .u-text-#{$color-group-key}-#{$color-key} {
            color: $color-value !important;   
         }
      }
   }
}
```
