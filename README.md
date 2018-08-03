# CHALLENGE

## Summary
This is a Yandex-maps-based challenge for Yandex School of Interface Development 2018. The original description in Russian can be seen [here](docs/challenge-description.md). Briefly, the map should display clusters of objects representing active (green) and malfunctioning (red) drone stations. A click on a marker should open a popup with details about the station.

## Solution

### Display the map

There were a couple of bugs in the code preventing the map from showing up. One was that the function initializing the map was exported as a named export, but imported as a default import. That was immediately obvious by the error in the browser console. This could be fixed by either exporting the init function as a default module (which I did), or by importing it as a named import. The other problem was that the map container had a zero height. Again, that was immediately obvious by examining the DOM (the initialized map had an inline style with the height of 0; so it was an easy guess that the map initializes with the same size as its container). Alternatively, I could have just checked the docs, which emphasize that the container must have non-zero dimensions. I guess it’s a common mistake that Yandex Maps users make.

### Show the clusters

The geographical data about the stations was added to the map using the `ObjectManager` api. Code samples for using `ObjectManager` showed that the challenge code was missing a line for adding the object manager to the map (`myMap.geoObjects.add(objectManager);`), which I added.

The next bit took me way longer than I care to admit. After adding the line above, I still did not see anything on the map, so I started checking, and double-checking, and triple-checking the code for initializing the object manager. At first, I suspected some async-related problems (that the object manager was being created too early), so I moved the code around. That didn't help. I checked with code samples in the Yandex Maps sandbox, but could not find any mistakes in the challenge code. Finally, in a stroke of inspiration, I zoomed out on the map, and sure enough, there were the clusters showing up somewhere in the vicinities of Iran. In retrospect, it must have been another common error that Yandex Maps users make, and I should have guessed it much sooner — the data points passed to the object mapper had their longitude and latitude in the wrong order. Once I switched longitude and latitude around, the clusters showed up where the map was centering, i.e. in Moscow.

### Indicate which clusters contain malfunctioning stations

After the data was added to the object manager, it was trivial to loop over the clusters and check whether a cluster contained any objects with the `isActive` field set to `false` (which, I believe, shows the functioning status of a station). Clusters with inactive objects could then be displayed differently by setting their options (the challenge did not specify how differently, so I just went with a red circle with a red dot inside).
