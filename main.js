function attempt_init()
{
	welcomeObject = document.getElementById("welcome")
	containerObject = document.getElementById("container");
	logObject = document.getElementById("log");
	inventoryObject = document.getElementById("inventory");
	healthObject = document.getElementById("healthIndicator");
	staminaObject = document.getElementById("staminaIndicator");


	if(containerObject === null || logObject === null)
	{
		setTimeout(attempt_init, 100);
		return;
	}

	logObject.innerHTML = "Welcome To RogueType!";

	// Create all the boxes
	for(let y = 0; y < 24; y++)
	{
		for(let x = 0; x < 80; x++)
		{
			let element = document.createElement('div');
			element.className = "gameSquare";
			element.x = x;
			element.y = y;
			containerObject.appendChild(element);

			map[x][y] = element;
		}

		containerObject.appendChild(document.createElement('br'));
	}

	// Start music
	introMusic = new Audio("./intro.mp3");
	introMusic.volume = 0.7;
	introMusic.onended = function()
	{
		// Start playing the loop
		gameMusic.play();
	}

	gameMusic = new Audio("./loop.mp3");
	gameMusic.volume = 0.0;
	gameMusic.loop = true;
	gameMusic.loaded = false;
	gameMusic.oncanplaythrough = function()
	{
		if(!this.loaded)
		{
			this.pause();
			this.loaded = true;
			this.volume = 0.7;
			this.currentTime = 0;
		}
	}
	gameMusic.play();

	bossIntroMusic = new Audio("./intro_boss.mp3");
	bossIntroMusic.volume = 0.7;
	bossIntroMusic.preload = true;
	bossIntroMusic.onended = function()
	{
		bossGameMusic.play();
	}

	bossGameMusic = new Audio("./loop_boss.mp3");
	bossGameMusic.volume = 0.7;
	bossGameMusic.loop = true;
	bossGameMusic.preload = true;

	gameOverMusic = new Audio("./gameover.mp3");
	gameOverMusic.volume = 0.5;
	gameOverMusic.loop = false;
	gameOverMusic.preload = true;

	victoryMusic = new Audio("./victory.mp3");
	victoryMusic.volume = 0.5;
	victoryMusic.loop = false;
	victoryMusic.preload = true;

	gameSoundEffect = new Audio("./crumble.mp3");
	gameSoundEffect.volume = 0.7;
	gameSoundEffect.preload = true;

	startMapLoad();
}

function updateDisplay()
{
	let origin = {x: player.location.x - 39, y: player.location.y - 12};
	containerObject.style = "visibility: hidden;";

	for(let screenY = 0; screenY < 24; screenY++)
	{
		for(let screenX = 0; screenX < 80; screenX++)
		{
			let x = origin.x + screenX;
			let y = origin.y + screenY;
			if((x < 0 || x >= worldDimensionX) || (y < 0 || y >= worldDimensionY))
			{
				let base = new tileBase("wall", {x: x, y: y});
				map[screenX][screenY].innerHTML = base.character;
				map[screenX][screenY].title = base.name + "\n" + base.description;
			}
			else
			{
				let tile = world[x][y];
				let character, title, style = "";

				character = tile.base.character;
				title = tile.base.name + "\n" + tile.base.description;

				if(tile.unit !== null)
				{
					character = tile.unit.character;
					title = tile.unit.name + "\n" + tile.unit.description + "\n";

					if(tile.unit.class == "boss")
						style = "color: #F00;";
				}
				
				if(tile.items.length > 0)
				{
					if(tile.unit === null)
					{
						character = tile.items[0].character;
						title = tile.items[0].getName() + "\n" + tile.items[0].description + "\n";
					}
					else
					{
						title = title + "\n + " + tile.items[0].getName() + " - " + tile.items[0].description;

						if(tile.unit.class == "boss")
							map[screenX][screenY].style = "color: #F00;";
					}

					for(let i = 1; i < tile.items.length; i++)
					{
						title = title + "\n + " + tile.items[i].getName() + " - " + tile.items[i].description;
					}

					if(tile.unit === null)
					{
						title = title + "\n" + tile.base.description;
					}
				}
				
				if(map[screenX][screenY].innerHTML != character)
					map[screenX][screenY].innerHTML = character;

				if(map[screenX][screenY].title != title + "\n" + x + ", " + y)
					map[screenX][screenY].title = title + "\n" + x + ", " + y;

				if(map[screenX][screenY].style != style)
					map[screenX][screenY].style = style;
			}
		}
	}

	containerObject.style = "visibility: visible;";

	// Update inventory
	if(inventoryUpdate)
	{
		let className = "inventoryItem";

		if(inventoryObject.clientHeight < inventory.length * 29 + 58)
			className = "compactInventoryItem";

		inventoryUpdate = false;
		inventoryObject.innerHTML = "Inventory<br />\n";

		for(let i = 0; i < inventory.length; i++)
		{
			let element = document.createElement("p");
			element.classList.add(className);
			let name = inventory[i].getName();
			let html = name.substr(0, 1).toUpperCase() + name.substr(1);

			if(inventory[i] == player.weapon)
				html = html + " (Equipped)";

			if(inventory[i].class == "weapon" && name != "fists" && player.weapon != inventory[i])
				html = html + ' <button onclick="equip(' + i + ')" class="' + className +'">Equip</button>';
			else if(inventory[i].class == "consumable")
				html = html + ' <button onclick="drink(' + i + ')" class="' + className +'">Drink</button>';
			else if(gameStage == 2)
				html = html + ' <button onclick="drop(' + i + ')" class="' + className +'">Drop</button>';


			element.innerHTML = html;
			element.title = inventory[i].description;
			inventoryObject.appendChild(element);
		}
	}

	// Update health & stamina indicators
	let text = "";
	let healthRatio = player.health / player.maxHealth;
	for(let i = 0.0; i < 1; i += 0.1)
	{
		text = text + (i < healthRatio ? "█" : "-");
	}
	healthIndicator.textContent = text;
	text = "";
	let staminaRatio = player.stamina / player.maxStamina;
	for(let i = 0.0; i < 1; i += 0.1)
	{
		text = text + (i < staminaRatio ? "█" : "-");
	}
	staminaIndicator.textContent = text;
}

function printWorld()
{
	let log = "";
	for(y = 0; y < 87; y++)
	{
		let x = 0;
		while(true)
		{
			try
			{
			if(world[x][y].base.character !== undefined)
				log = log + world[x][y].base.character;
			else
				log = log + "?";
			}
			catch(exception)
			{
				console.log(x + "   " + y + exception);
			}

			x++;

			try
			{
				if(world[x][y] === undefined)
					break;
			}
			catch(e)
			{
				break;
			}
			
		}
		log = log + "\n";
	}

	addLog("\n\n" + log);
}

function addLog(text)
{
	let space = 0;
	let lastBreak = 0;
	let length = 0;
	let newString = "";


	for(let i = 0; i < text.length; i++)
	{
		let symbol = text.charAt(i);

		if(symbol == "\n")
		{
			newString = newString + "\n" + text.substr(lastBreak, i - lastBreak);
			space = 0;
			length = -1;
			lastBreak = i + 1;
		}
		else if(symbol == " ")
		{
			space = i + 1;
		}

		if(length > 87)
		{
			newString = newString + "\n" + text.substr(lastBreak, space - lastBreak);
			i = space + 1;
			length = 0;
			lastBreak = space;
			space = space;
		}

		length++;
	}

	newString = newString + "\n" + text.substr(lastBreak);

	text = newString;
	

	if(text.charAt(0) == "\n")
		text = text.substr(1);

	logObject.textContent = logObject.textContent + "\n" + text;
	logObject.scrollTop = logObject.scrollHeight;

	return text;
}

function startMapLoad()
{
	let serverQuery;

	if(window.XMLHttpRequest) 
		serverQuery = new XMLHttpRequest();
	else 
		serverQuery = new ActiveXObject("Microsoft.XMLHTTP");

	serverQuery.onreadystatechange = function()
	{
		if(this.status >= 400)
		{
			console.log("Failed to download map. Game is broken.");
			return;
		}
		else if(this.readyState == 4)
		{
			loadMap(this.responseText);
		}
	};

	serverQuery.responseType = "text";
	serverQuery.open("GET", "./level.dat");
	serverQuery.send();
}

function loadMap(mapText)
{
	let x = 0;
	let y = 0;

	let lineLength = 0;

	for(let i = 0; i < mapText.length; i++)
	{
		let character = mapText.charAt(i);
		lineLength++;

		if(character == "\n")
		{
			if(lineLength > worldDimensionX)
				worldDimensionX = lineLength;

			worldDimensionY++;
			lineLength = 0;
		}
	}

	world = Array.matrix(worldDimensionX, worldDimensionY, false);

	// Initialize the world
	for(let x = 0; x < worldDimensionX; x++)
	{
		for(let y = 0; y < worldDimensionY; y++)
		{
			let tile = {"base": null, "items": Array(), "unit": null, "location": {"x": x, "y": y}};
			tile.base = new tileBase("wall", {x, y});
			world[x][y] = tile;
		}
	}

	for(let i = 0; i < mapText.length; i++)
	{
		let character = mapText.charAt(i);

		let roll, monster;

		switch(character)
		{
			case "\n":
				y++;
				x = -1;

				break;
			case "S":
				world[x][y].base = new tileBase("floor", {x, y});
				player = new unit("player", {x, y});
				world[x][y].unit = player;

				inventory.push(player.weapon);
				inventoryUpdate = true;
				break;
			case "x":
				world[x][y].base = new tileBase("wall", {x, y});
				break;
			case ".":
				world[x][y].base = new tileBase("floor", {x, y});
				break;
			case "+":
				world[x][y].base = new tileBase("door", {x, y});
				break;
			case "=":
				world[x][y].base = new tileBase("strongDoor", {x, y});
				break;
			case "-":
				world[x][y].base = new tileBase("fakeWall", {x, y});
				break;
			case "M":
				world[x][y].base = new tileBase("floor", {x, y});

				roll = Math.random();
				monster;
				if(roll > 0.99)
					monster = new unit("cat", {x, y});
				else if(roll > 0.8)
					monster = new unit("skeleton", {x, y});
				else if(roll > 0.6)
					monster = new unit("goblin", {x, y});
				else if(roll > 0.3)
					monster = new unit("rat", {x, y});
				else
					monster = new unit("bat", {x, y});

				world[x][y].unit = monster;
				break;
			case "!":
				world[x][y].base = new tileBase("floor", {x, y});
				
				roll = Math.random();
				monster;
				if(roll > 0.8)
					monster = new unit("imp", {x, y});
				else if(roll > 0.4)
					monster = new unit("troll", {x, y});
				else
					monster = new unit("shade", {x, y});

				world[x][y].unit = monster;
				break;
			case "C":
				world[x][y].base = new tileBase("floor", {x, y});
				world[x][y].unit = new unit("cat", {x, y});
			case "T":
				world[x][y].base = new tileBase("floor", {x, y});
				world[x][y].items[0] = new item(treasureDrops[getRandom(0, treasureDrops.length - 1)], {x, y});
				break;
			case "?":
				world[x][y].base = new tileBase("floor", {x, y});
				world[x][y].items[0] = new item(otherDrops[getRandom(0, otherDrops.length - 1)], {x, y});
				break;
			case "B":
				world[x][y].base = new tileBase("floor", {x, y});
				world[x][y].unit = new unit("beast", {x, y});
				break;
			case "P":
				world[x][y].base = new tileBase("exitPortal", {x, y});
				break;
			case "F":
				world[x][y].base = new tileBase("bossDoor", {x, y});
				break;

			default:
				world[x][y].base = new tileBase("wall", {x, y});
				break;

		}

		x++;
	}

	// User input
	document.onkeydown = function(e)
	{
		e = e || window.event;
		welcomeObject.focus();
		welcomeObject.blur();

		// Don't accept 'repeating' input from holding the key down
		if(e.repeat)
			return;

		let key = e.key;
		//console.log("\"" + key + "\"");

		if(gameStage === 0 && key.substr(0, 1) != "F" && key != "Control" && key != "Shift" && key != "Alt")
		{
			welcomeObject.style = "display: none;";
			gameStage = 1;
			introMusic.play();
			yourTurn = true;
			return;
		}

		if(player.compulsiveAction !== null)
		{
			if(key != " ")
			{
				addLog("You don't have control this turn. Press space to continue.");
				return;
			}

			key = player.compulsiveAction;
			player.compulsiveAction = null;
		}

		if(yourTurn)
		{
			let tile, invalid = false;
			switch(key)
			{
				case "ArrowUp":
					if(player.stamina < 0)
					{
						addLog("You are too fatigued to attack...");
						return;
					}

					tile = getWorld(northOf(player.location));

					if(tile.unit === null)
					{
						player.stamina -= (player.weapon.weight * 2.5) + 5;
						tile.base.attack(player);
					}
					else
						tile.unit.attack(player);
					break;

				case "ArrowDown":
					if(player.stamina < 0)
					{
						addLog("You are too fatigued to attack...");
						return;
					}

					tile = getWorld(southOf(player.location));

					if(tile.unit === null)
					{
						player.stamina -= (player.weapon.weight * 2.5) + 5;
						tile.base.attack(player);
					}
					else
						tile.unit.attack(player);
					break;

				case "ArrowRight":
					if(player.stamina < 0)
					{
						addLog("You are too fatigued to attack...");
						return;
					}

					tile = getWorld(eastOf(player.location));

					if(tile.unit === null)
					{
						player.stamina -= (player.weapon.weight * 2.5) + 5;
						tile.base.attack(player);
					}
					else
						tile.unit.attack(player);
					break;

				case "ArrowLeft":
					if(player.stamina < 0)
					{
						addLog("You are too fatigued to attack...");
						return;
					}

					tile = getWorld(westOf(player.location));

					if(tile.unit === null)
					{
						player.stamina -= (player.weapon.weight * 2.5) + 5;
						tile.base.attack(player);
					}
					else
						tile.unit.attack(player);
					break;

				case " ":
					addLog("You wait in place.");
					break;

				case "w":
					player.moveTo(northOf(player.location));
					break;
				case "s":
					player.moveTo(southOf(player.location));
					break;
				case "d":
					player.moveTo(eastOf(player.location));
					break;
				case "a":
					player.moveTo(westOf(player.location));
					break;

				default:
					invalid = true;
					break;
			}

			if(!invalid)
			{
				yourTurn = false;
				quickActionUsed = true;
				enemyTurn();
			}
		}
		else if(player.stun > 0)
		{
			if(key == " ")
			{
				addLog("You wait in place.");
				enemyTurn();
			}
			
		}
	};

	updateDisplay();
	document.getElementById("start").style = "display: inline;";
	yourTurn = true;
}

function enemyTurn()
{
	if(gameStage == 4)
	{
		updateDisplay();
		yourTurn = false;
		return;
	}

	for(let i = 0; i < units.length; i++)
	{
		units[i].tick();
	}

	updateDisplay();

	if(player.health <= 0)
	{
		addLog("You are dead. Game over.");
		yourTurn = false;
		gameMusic.pause();
		bossGameMusic.pause();
		gameOverMusic.play();
	}
	else if(player.stun <= 0)
	{
		if(player.compulsiveAction !== null)
		{
			addLog("You don't have control this turn. Press space to continue.");
			quickActionUsed = true;
		}
		else
			quickActionUsed = false;

		yourTurn = true;
		quickActionUsed = false;
	}
	else
	{
		addLog("Press the space key to pass turn. (You cannot do anything while stunned)");
		yourTurn = false;
	}
}

function equip(slot)
{
	if(!yourTurn)
		return;

	let weapon = inventory[slot];

	if(weapon === undefined)
		return;
	else if(weapon.class == "weapon")
	{
		player.weapon = weapon;
		addLog("You equip the " + weapon.name + ".");

		inventoryUpdate = true;
		//if(quickActionUsed)
			enemyTurn();
		//else
		//	quickActionUsed = true;
	}
}

function drink(slot)
{
	if(!yourTurn)
		return;

	let drink = inventory[slot];

	if(drink === undefined)
		return;
	else if(drink.class == "consumable")
	{
		addLog("You drink the " + drink.getName() + "...");

		player.health += drink.healthEffect;
		player.stamina += drink.staminaEffect;

		if(drink.healthEffect > 0)
			addLog("You feel healed.");
		else if(drink.healthEffect < 0)
			addLog("You feel sick.");

		if(drink.staminaEffect > 0)
			addLog("You feel energized.");
		else if(drink.stamina < 0)
			addLog("You feel weakend.");

		if(drink.realName != drink.getName())
		{
			knownItems.push(drink.realName);
			addLog("You identified " + drink.realName + ".");
		}

		inventory.splice(slot, 1);
		delete drink;

		inventoryUpdate = true;
		if(quickActionUsed)
			enemyTurn();
		else
		{
			quickActionUsed = true;
			updateDisplay();
		}
	}
}

function drop(slot)
{
	if(!yourTurn)
		return;

	let item = inventory[slot];

	if(item === undefined)
		return;
	else if(item.class == "junk")
	{
		addLog("You drop the " + item.getName() + "...");

		inventory.splice(slot, 1);
		item.moveTo(player.location);
		groundItems.push(item);
		item.dropped = true;

		inventoryUpdate = true;
		if(quickActionUsed)
			enemyTurn();
		else
		{
			quickActionUsed = true;
			updateDisplay();
		}
	}
}

function getWorld(location)
{
	let tile;
	let normal = {base: new tileBase("wall", location), unit: null, items: Array()};
	try
	{
		tile = world[location.x][location.y];
	}
	catch(exception)
	{
		tile = normal;
	}

	if(tile == undefined)
		tile = normal;

	return tile;
}

function northOf(location)
{
	return {x: location.x, y: location.y - 1};
}

function southOf(location)
{
	return {x: location.x, y: location.y + 1};
}

function eastOf(location)
{
	return {x: location.x + 1, y: location.y};
}

function westOf(location)
{
	return {x: location.x - 1, y: location.y};
}

function vectorDist(locationA, locationB)
{
	return Math.sqrt(Math.pow(locationB.x - locationA.x, 2) + Math.pow(locationB.y - locationA.y, 2));
}

Array.matrix = function(numrows, numcols, initial) 
{
	let array = [];
	for (let i = 0; i < numrows; ++i)
	{
		let columns = [];
		for (let j = 0; j < numcols; ++j)
		{
			columns[j] = initial;
		}

		array[i] = columns;
	}

	return array;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




var player;
var inventory = Array();
var knownItems = Array();
var groundItems = Array();
var yourTurn, inventoryUpdate, quickActionUsed = false;
var units = Array();
var treasureDrops = Array("longsword", "rapier", "sledgehammer", "bat", "mace", "greatsword");
var otherDrops = Array("health_potion", "stamina_potion", "energy_potion", "refresh_potion", "posion_potion", "fatigue_potion", "cursed_potion", "disc", "coin", "key");
var containerObject, logObject, inventoryObject, healthObject, staminaObject = null;
var map = Array.matrix(80, 24, false);
var worldDimensionX = 1;
var worldDimensionY = 1;
var world;
var introMusic, gameMusic, bossIntroMusic, bossGameMusic, gameOverMusic, gameSoundEffect;
var gameStage = 0;

window.onload = function()
{
	attempt_init();
}
