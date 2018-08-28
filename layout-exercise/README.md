# Layout challenge

## Summary
This is a challenge offered by the Yandex School of Interface Development 2018. The original description in Russian can be found [here](docs/README.md).

Briefly, the challenge is to code an interface of a hypothetical smart house device. The screen

## My goals for this exercise
Apart from trying to replicate the provided mockup, I wanted to try new modern APIs or libraries that I have mostly heard about and rarely used. That’s why I tried CSS Grid for layout as well as CSS variables (haven’t had that luxury before), or the Web Animation API for animations.

## Code organization and styling methodology used in the exercise
webpack template
everything is rendered with JS
JS is split into components
each component has its own CSS rules, with classes named roughly in the BEM fashion

## Controversial Decisions

These are decisions that I am a little embarrassed about, because I took them to improve my experience as a developer; not necessarily to ensure the solution will work across all browsers or that the solution is necessarily performant.

### Hyperscript for templating

Although I certainly could have just use standard JavaScript template literals for templating, I wanted to give hyperscript a try to have a feel of how useful it is. Hyperscript also looked more convenient to add event listeners than the vanilla JS way. The cost of hyperscript is about 1.6Kb of minified gzipped JavaScript.

### CSS Grid for layout

### Web Animation API for animations

### Scroll.js

## Other decisions

### User name
At first I attempted to use `faker` to generate a random Russian name of the user, but quickly realized that this meant faker got pulled in the js bundle (and increased its size to about 1MB). There was no clear way that I could find to tree-shake unnecessary `faker` code, so I moved back to just hard-coding the user name as in the mockup;

### Font
The mockup instructs to use ArialMT and Arial-BoldMT fonts. Wikipedia explains that these are the same as a regular Arial font. So I googled for a regular and a bold Arial font and downloaded them from [this site](https://webfonts.pro/base-web-fonts/).
