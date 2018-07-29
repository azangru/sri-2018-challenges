## Decisions

### User Name
At first I attempted to use `faker` to generate a random Russian name of the user, but quickly realized that this meant faker got pulled in the js bundle (and increased its size to about 1MB). There was no clear way that I could find to tree-shake unnecessary `faker` code, so I moved back to just hard-coding the user name as in the mockup;

### Font
The mockup instructs to use ArialMT and Arial-BoldMT fonts. Wikipedia explains that these are the same as a regular Arial font. So I googled for a regular and a bold Arial font and downloaded them from [this site](https://webfonts.pro/base-web-fonts/).
