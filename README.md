# CHALLENGE

## Summary
This is a Yandex-maps-based challenge for Yandex School of Interface Development 2018. The original description in Russian can be seen [here](docs/challenge-description.md). Briefly, the map should display clusters of objects representing active (green) and malfunctioning (red) drone stations. A cluster icon should show whether it contains malfunctioning stations. A click on a placemark should open a popup with certain details about the station and a chart reflecting its workload.

## Solution

### Display the map

There were a couple of bugs in the code preventing the map from showing up. One was that the function initializing the map was exported as a named export, but imported as a default import. That was immediately obvious by the error in the browser console. This could be fixed by either exporting the init function as a default module (which I did), or by importing it as a named import. The other problem was that the map container had a zero height. Again, that was immediately obvious by examining the DOM (the initialized map had an inline style with the height of 0; so it was an easy guess that the map initializes with the same size as its container). Alternatively, I could have just checked the docs, which emphasize that the container must have non-zero dimensions. I guess it’s a common mistake that Yandex Maps users make.

### Show the clusters

The geographical data about the stations was added to the map using the `ObjectManager` api. Code samples for using `ObjectManager` showed that the challenge code was missing a line for adding the object manager to the map (`myMap.geoObjects.add(objectManager);`), which I added.

The next bit took me way longer than I care to admit. After adding the line above, I still did not see anything on the map, so I started checking, and double-checking, and triple-checking the code for initializing the object manager. At first, I suspected some async-related problems (that the object manager was being created too early), so I moved the code around. That didn't help. I checked with code samples in the Yandex Maps sandbox, but could not find any mistakes in the challenge code. Finally, in a stroke of inspiration, I zoomed out on the map, and sure enough, there were the clusters showing up somewhere in the vicinities of Iran. In retrospect, it must have been another common error that Yandex Maps users make, and I should have guessed it much sooner — the data points passed to the object mapper had their longitude and latitude in the wrong order. Once I switched longitude and latitude around, the clusters showed up where the map was centering, i.e. in Moscow.

### Indicate which clusters contain malfunctioning stations

After the data was added to the object manager, it was trivial to loop over the clusters and check whether a cluster contained any objects with the `isActive` field set to `false` (which, I believe, shows the functioning status of a station). Clusters with inactive objects could then be displayed differently by setting their options (the challenge did not specify how differently, so I just went with a red circle with a red dot inside).

### Show relevant info in a balloon when clicking on a placemark

#### Making the balloon to show up

This part also took me embarrassingly too long to figure out, and caused me to doubt my sanity for a while. It followed from the code that a `click` event on a placemark should open a bubble above that mark, but the bubble would not appear. Worse, a click on another placemark immediately after clicking the first resulted in an error. At first, I thought that the bubble was opened too soon (before the details for its contents were loaded), but according to code samples that shouldn't have been a problem. Next, I thought that perhaps there perhaps was some typo, or perhaps a missing function, and re-read the docs (to no particular avail). I tried to show at least _something_ in the balloon — a hardcoded string, anything, by following examples from the sandbox; but the balloon just would not show up. Finally, I realized that it was the `geoObjectBalloonContentLayout` option that was overriding the default balloon behavior, and if I comment it out I can get the balloon to appear, even though at this point it would just show my hardcoded string.

As an aside, Yandex Maps’ documentation regarding opening the balloon is pretty horrible. It says that the second argument to the balloon’s `open` function (`anchorPixelPosition`) is required, but then happily ignores it in the example  (here’s a [screenshot](https://i.imgur.com/T82Tzcl.png)). It was moments like those that were the most frustrating.

#### Using the proper template for the balloon

So, the `getDetailsContentLayout` function needed fixing. It was apparent that something wrong was going on in the redefined `build` and `clear` methods passed to `templateLayoutFactory`, and with the help of debugger it also quickly became quite clear that the `this` keyword (which yielded `undefined` in those functions) was most likely incorrect,  but it was not immediately obvious what the correct `this` must be. The Yandex Maps api docs were again of very little help — they only stated the obvious that the `build`, `clear` and `rebuild` methods of the template layout class could be overridden, but did not explain what the overridden methods should look like. Luckily, there was an example in the sandbox, which made it obvious that the methods should refer to the `this` of the parent constructor. So the use of the arrow functions, which bound `this` to the context where `getDetailsContentLayout` was executed (i.e. to `undefined`) was wrong; instead, one should use regular functions here.

#### Drawing the chart in the balloon

By now, the balloon was showing an empty grid, which suggested that it should contain the "station workload chart" as mentioned in the challenge. The text of the challenge does not give an example of what such a chart should look like, so the only suspicious thing that I noted when reading through the code was that in the options passed to the `Chart` constructor, the y axis was clamped at a maximum value of 0 (whereas the data values passed to the chart were all greater than 0). After removing this option, I could see a visible chart drawn in the balloon. It looks legit, so I believe this is the solution for this bit of the puzzle, but I have no way of ascertaining that this indeed is the case.

### Update code style
I tried to make the code consistent with regards to the following:
- indentation (2 spaces); it was a bit hard to consistently indent the template literal, but while doing so, I noticed it was missing the closing `div`
- position of braces in function definition (opening curly brace is on the same line as parenthesis):

```
function () {
  // body
}
```
instead of on the new line (as was in one function in api.js):
```
function ()
{
  // body
}
```
- do not spam the console with debugging messages (that's why I removed `console.log`) from the `index.js` file

### No unused code
One of the instructions in the challenge was to remove unused code. It seems that the `popup.js` file is not used anywhere in this code and can be safely removed. I tried to imagine where its code might fit in the rest of the picture, but couldn't find a proper place for it. `popup.js` expects a data object to have an `operator` field on it, which it doesn't. Unless I am missing something, this code is superfluous and can be safely removed.
