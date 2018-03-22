<img src="https://pecon.us/Rogue/" alt="RogueType Logo" />

# RogueType
A browser-based roguelike game with handmade maps instead of randomly generated ones. Custom maps can be created and imported easily.

The game features original music by Jazz Cat. The only system requirements are an ES6-compatible web browser, keyboard, and preferably a widescreen display. This game is 'finished' in the sense that it can be fully played through and is beatable, but in reality it's still pretty far from complete. After playing for a bit, scroll down and read about the additional features I plan to implement. I do not plan to make any money from this project, it's just for fun.

Out of both laziness and an odd desire to make my own map for the game, I opted to not use random map generation. However, most elements of the game are still randomized (e.g. potions, weapons, item drops, combat rolls...). Custom maps can be created manually through a relatively simple text file, and the game readily supports loading third party maps simply by entering the url of the map. Custom maps you've loaded will even persist in the drop down menu between reloads assuming you don't clear your cookies. There is currently only one guest map created for the game by Zeustal, but if other people contribute good maps I may make them default to the game. I know I'm not talking about the gameplay a whole lot here, I think it's best to just try it than try to explain it all here.

## Map Creation
Want to create a map for RogueType? I'd recommend playing the game through to the boss at least before attempting this, since it gives you a better feel for everything. Other than that, you really just need a text editor and an online text sharing site (ideally one you log in to so that you can update your map later if you want to), something like pastebin or github gist. Once you've got that look at `level.dat` from this repository for reference so you can ensure you're doing things right. Simply use a text editor (or ideally ascii art software) to make your map, and use the table below for reference when placing things in your map. If you use a text editor, you'll probably find it's easiest to first fill the entire contents of the map with walls and then use the insert key to write over individual tiles within it.

```
x - A solid wall.
. - Open floorspace.
S - The starting point for the player, only one.
+ - A normal door
= - A stronger door
M - A common monster spawn
! - A high-level monster spawn
? - A common item spawn (mainly potions for now)
T - A rare item spawn (mainly weapons for now)
F - Boss stage trigger door (only place one of these, ideally the boss room should face southwards from the door)
B - The Boss.
P - Exit portal that finishes the game after The Boss is killed.
```
Note: Any characters in the map which are not recognized as valid types will display as errors in-game.

## Credits and license
The entire game and contents is created by Pecon, aside from a couple exceptions

**Jazz Cat** - Original soundtrack.  
**Oren Watson** - Neoletters font face ( http://www.orenwatson.be/fontdemo.htm )

RogueType is *not* released under an open-source license. You must have my (and the people listed above when relevant to what they contributed) explicit permission to host, modify, or monetize this software; however, that said, I won't generally care about you hosting or modifying the game as long as due credit is kept and the game philosophy is kept intact. Feel free to fork if you stick to that.