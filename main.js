function attempt_init()
{
	windowObject = document.getElementById("window");
	welcomeObject = document.getElementById("welcome")
	containerObject = document.getElementById("container");
	mapSelectorObject = document.getElementById("maps");
	logObject = document.getElementById("log");
	focusGrabberObject = document.getElementById("focusGrabber");
	inventoryObject = document.getElementById("inventory");
	healthObject = document.getElementById("healthIndicator");
	staminaObject = document.getElementById("staminaIndicator");
	expObject = document.getElementById("expIndicator");


	if(containerObject === null || logObject === null)
	{
		setTimeout(attempt_init, 100);
		return;
	}

	// Create all the boxes on the page
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
    titleMusic = new Audio("./title.mp3");
    titleMusic.volume = 0.7;
    titleMusic.play();


    introMusic = new Audio("./intro.mp3");
    introMusic.preload = true;
    introMusic.volume = 0.7;
    introMusic.onended = function()
    {
        // Start playing the loop
        gameMusic.play();
    }

    gameMusic = new Audio("./loop.mp3");
    gameMusic.preload = true;
    gameMusic.volume = 0.7;
    gameMusic.loop = true;


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
    gameOverMusic.volume = 0.4;
    gameOverMusic.loop = false;
    gameOverMusic.preload = true;

    victoryMusic = new Audio("./victory.mp3");
    victoryMusic.volume = 0.5;
    victoryMusic.loop = false;
    victoryMusic.preload = true;

    gameSoundEffect = new Audio("./crumble.mp3");
    gameSoundEffect.volume = 0.7;
    gameSoundEffect.preload = true;

    startMapLoad(gameData.mapList[0]);

    loadCookie();
    setupOptions();
    updateOptions();
    updateMapList();

    // Detect changes in the map selector drop-down
    mapSelectorObject.addEventListener('change', function()
    {
        document.getElementById("loading").innerHTML = "Loading, please wait...";
        document.getElementById("start").style = "display: none;";


        if(mapSelectorObject.selectedIndex < gameData.mapList.length)
        {
            startMapLoad(gameData.mapList[mapSelectorObject.selectedIndex]);
        }
        else
        {
            startMapLoad(gameData.customMaps[mapSelectorObject.selectedIndex - gameData.mapList.length]);
        }
    });
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
            let displayTile = map[screenX][screenY];

            if((x < 0 || x >= worldDimensionX) || (y < 0 || y >= worldDimensionY))
            {
                let base = new tileBase("wall", {x: x, y: y});
                displayTile.innerHTML = base.getCharacter();
                displayTile.title = base.getName() + "\n" + base.getDescription();
            }
            else
            {
                let tile = world[x][y];
                let character, title, style = "";

                displayTile.classList.value = "gameSquare";

                character = tile.base.getCharacter();
                title = tile.base.getName() + "\n" + tile.base.getDescription();

                if(tile.unit !== null)
                {
                    character = tile.unit.getCharacter();
                    title = tile.unit.getName() + "\n" + tile.unit.getDescription() + "\n";

                    if(tile.unit.class == "boss")
                        displayTile.classList.add("bossMonster");
                }

                if(tile.hazard !== null)
                {
                    character = tile.hazard.getCharacter();
                    title = tile.hazard.getName() + "\n" + tile.hazard.getDescription() + "\n";

                    displayTile.classList.add("hazardBackground");
                    style = style + "color: " + tile.hazard.color + ";";

                    if(tile.unit !== null)
                        title = title + "\n + " + tile.unit.getName();
                }

                else if(tile.projectile !== null)
                {
                    character = tile.projectile.getCharacter();
                }

                if(tile.items.length > 0)
                {
                    if(tile.unit === null)
                    {
                        character = tile.items[0].getCharacter();
                        title = tile.items[0].getName() + "\n" + tile.items[0].getDescription() + "\n";
                    }
                    else
                    {
                        title = title + "\n + " + tile.items[0].getName() + " - " + tile.items[0].getDescription();
                    }

                    for(let i = 1; i < tile.items.length; i++)
                    {
                        title = title + "\n + " + tile.items[i].getName() + " - " + tile.items[i].getDescription();
                    }

                    if(tile.unit === null)
                    {
                        title = title + "\n" + tile.base.getDescription();
                    }
                }

                //title = title + "\rx: " + tile.location.x + " y: " + tile.location.y;

                if(displayTile.innerHTML != character)
                    displayTile.innerHTML = character;

                if(displayTile.title != title)
                    displayTile.title = title;

                if(displayTile.style != style)
                    displayTile.style = style;
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

        let allButtonsProperties = "";

        if(player.compulsiveAction !== null)
        {
            allButtonsProperties = 'disabled="true"';
            inventoryUpdate = true;
        }


        for(let i = 0; i < inventory.length; i++)
        {
            let element = document.createElement("p");
            element.classList.add(className);
            let name = inventory[i].getName();
            let html = name.substr(0, 1).toUpperCase() + name.substr(1);

            if(inventory[i] == player.weapon)
                html = html + " (Held)";

            if(inventory[i].class == "weapon" && name != "fists" && player.weapon != inventory[i])
                html = html + ' <button onclick="equip(' + i + ')" class="' + className +'" ' + allButtonsProperties + '>Hold</button>';
            else if(inventory[i].class == "consumable")
                html = html + ' <button onclick="drink(' + i + ')" class="' + className +'" ' + allButtonsProperties + '>Use</button>';
            else if(inventory[i].class == "food")
                html = html + ' <button onclick="eat(' + i + ')" class="' + className +'" ' + allButtonsProperties + '>Eat</button>';

            if(gameStage == 2 && inventory[i] != player.weapon && inventory[i].canDrop)
                html = html + ' <button onclick="drop(' + i + ')" class="' + className +'" ' + allButtonsProperties + '>Drop</button>';


            element.innerHTML = html;
            element.title = inventory[i].getDescription();
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
    healthObject.textContent = text;
    text = "";
    let staminaRatio = player.stamina / player.maxStamina;
    for(let i = 0.0; i < 1; i += 0.1)
    {
        text = text + (i < staminaRatio ? "█" : "-");
    }
    staminaObject.textContent = text;
    text = "";
    let expRatio = player.exp / Math.pow(1.3, player.level);
    for(let i = 0.0; i < 1; i += 0.1)
    {
        text = text + (i < expRatio ? "█" : "-");
    }
    expObject.textContent = text;
}

function addLog(text, style)
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

        if(length > 86)
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

    if(style !== undefined)
    {
        text = '<div class="gameLogTextEntrance" style="' + style + '">' + text.trim() + '</div>';
    }
    else
    {
        text = '<div class="gameLogTextEntrance">' + text.trim() + '</div>';
    }

    text = text.trim();
    let html = logObject.innerHTML.trim();

    logObject.innerHTML = text + html;
    logObject.scrollTop = 0;
    // logObject.scrollTop = logObject.scrollHeight;

    return text;
}

function loadCookie()
{
    if(document.cookie !== undefined)
    {
        if(document.cookie.substr(0, 5) == "data=")
        {
            let loadData = atob(document.cookie.substr(5));
            //console.log(loadData);
            loadData = JSON.parse(loadData);
            //console.log(loadData);

            if(loadData.cookieFormat === undefined)
            {
                gameData.customMaps = loadData;
            }
            else
            {
                //console.log("Loaded game data");
                //console.log(loadData);
                gameData = loadData;
            }
        }
    }
}

function saveCookie()
{
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 3345271305300);
    document.cookie = "data=" + window.btoa(JSON.stringify(gameData)) + "; expires=" + expireDate.toString();
}

function setupOptions()
{
    let optionsMovement = document.getElementById("optionsMovement");
    let optionsCombat = document.getElementById("optionsCombat");
    let optionsWait = document.getElementById("optionsWait");
    let optionsSound = document.getElementById("optionsSound");

    for(let i = 0; i < optionsMovement.length; i++)
        if(optionsMovement.options[i].value.toLowerCase() == gameData.options.movementKeys)
        {
            optionsMovement.selectedIndex = i;
            break;
        }

    for(let i = 0; i < optionsCombat.length; i++)
        if(optionsCombat.options[i].value.toLowerCase() == gameData.options.combatKeys)
        {
            optionsCombat.selectedIndex = i;
            break;
        }

    for(let i = 0; i < optionsWait.length; i++)
        if(optionsWait.options[i].value.toLowerCase() == gameData.options.waitKey)
        {
            optionsWait.selectedIndex = i;
            break;
        }

    optionsSound.selectedIndex = !gameData.options.soundEnabled;
}

function displayOptions()
{
    setupOptions();
    document.getElementById("options").style = "display: block;";
}

function hideOptions()
{
    document.getElementById("options").style = "";
}

function updateOptions()
{
    let optionsMovement = document.getElementById("optionsMovement");
    let optionsCombat = document.getElementById("optionsCombat");
    let optionsWait = document.getElementById("optionsWait");
    let optionsSound = document.getElementById("optionsSound");

    if(optionsMovement.options[optionsMovement.selectedIndex].value.toLowerCase() == optionsCombat.options[optionsCombat.selectedIndex].value.toLowerCase())
    {
        window.alert("You cannot bind the same keys for both movement and combat. There are specific situations in this game where the differentiation is important. (i.e. Some smaller monsters can be displaced by the player)");
        return;
    }

    gameData.options.movementKeys = optionsMovement.options[optionsMovement.selectedIndex].value.toLowerCase();
    gameData.options.combatKeys = optionsCombat.options[optionsCombat.selectedIndex].value.toLowerCase();
    gameData.options.waitKey = optionsWait.options[optionsWait.selectedIndex].value.toLowerCase();
    gameData.options.soundEnabled = (optionsSound.options[optionsSound.selectedIndex].value.toLowerCase() == "enabled" ? true : false);


    if(gameData.options.soundEnabled)
    {
        titleMusic.volume = 0.7;
        introMusic.volume = 0.7;
        gameMusic.volume = 0.7;
        bossIntroMusic.volume = 0.7;
        bossGameMusic.volume = 0.7;
        gameOverMusic.volume = 0.5;
        victoryMusic.volume = 0.5;
        gameSoundEffect.volume = 0.7;
    }
    else
    {
        titleMusic.volume = 0;
        introMusic.volume = 0;
        gameMusic.volume = 0;
        bossIntroMusic.volume = 0;
        bossGameMusic.volume = 0;
        gameOverMusic.volume = 0;
        victoryMusic.volume = 0;
        gameSoundEffect.volume = 0;
    }

    hideOptions();
    saveCookie();
}

function updateMapList()
{
    document.getElementById("selector").style = "display: block;";

    let html = "";

    for(let i = 0; i < gameData.mapList.length; i++)
    {
        let map = gameData.mapList[i];
        html = html + '<option>' + map.name + ' (' + map.difficulty + ')</option>\n';
    }

    for(let i = 0; i < gameData.customMaps.length; i++)
    {
        let map = gameData.customMaps[i];
        html = html + '<option>' + map.name + ' (' + map.difficulty + ')</option>\n';
    }
    mapSelectorObject.innerHTML = html;
}

function addMap()
{
    let src = prompt("Please enter the URL of the custom map to load.", "http://");

    if(src == null || src == "")
    {
        return;
    }

    let map = {name: "Unknown Map", author: "Unknown", difficulty: "Normal", src: src};
    startMapLoad(map, true);
}

function confirmAddMap(map)
{
    //console.log(customMaps[customMaps.length - 1]);
    //console.log(map);
    if(gameData.customMaps[gameData.customMaps.length - 1] == map)
    {
        saveCookie();
        window.alert("Custom map loaded successfully.");
    }
}

function startMapLoad(map, customMap)
{
    let serverQuery;

    if(customMap === undefined)
        customMap = false;

    if(window.XMLHttpRequest)
        serverQuery = new XMLHttpRequest();
    else
        serverQuery = new ActiveXObject("Microsoft.XMLHTTP");

    serverQuery.onreadystatechange = function()
    {
        if(this.status >= 400)
        {
            alert("Map download failed. Please try a different map!");
            return;
        }
        else if(this.readyState == 4)
        {
            loadMap(this.responseText, map, customMap);
        }
    };

    serverQuery.responseType = "text";
    serverQuery.open("GET", map.src);
    serverQuery.send();
}

function loadMap(mapText, mapInfo, customMap)
{
    let fileStart = 0;
    let meta = mapText.substr(0, mapText.search("\n") + 1);
    let search = meta.search("	");

    if(meta.substr(0, search) == "METADATA")
    {
        meta = meta.substr(search + 1);

        search = meta.search("	");
        mapInfo.name = htmlEntities(meta.substr(0, search).trim());
        meta = meta.substr(search + 1);

        search = meta.search("	");
        mapInfo.author = htmlEntities(meta.substr(0, search).trim());
        meta = meta.substr(search + 1);

        search = meta.search("\n");
        mapInfo.difficulty = htmlEntities(meta.substr(0, search).trim());

        mapText = mapText.substr(mapText.search("\n") + 1);
    }

    let x = 0;
    let y = 0;

    let lineLength = 0;

    for(let i = fileStart; i < mapText.length; i++)
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
            let tile = {"base": null, "items": Array(), "unit": null, "hazard": null, "projectile": null, "location": {"x": x, "y": y}};
            tile.base = new tileBase("wall", {x, y});
            world[x][y] = tile;
        }
    }

    inventory = Array();
    groundItems = Array();
    units = Array();

    let errors = 0;

    for(let i = fileStart; i < mapText.length; i++)
    {
        let character = mapText.charAt(i);

        let roll, monster;

        switch(character)
        {
            case "\n":
                y++;
                x = -1;

            case "\r":
                break;

                break;
            case "S":
                world[x][y].base = new tileBase("floor", {x, y});
                player = new unit("player", {x, y});
                world[x][y].unit = player;

                inventory = Array();
                inventory.push(player.baseWeapon);
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
                else if(roll > 0.85)
                    monster = new unit("skeleton", {x, y});
                else if(roll > 0.7)
                    monster = new unit("kobold", {x, y});
                else if(roll > 0.6)
                    monster = new unit("goblin", {x, y});
                else if(roll > 0.4)
                    monster = new unit("spider", {x, y});
                else if(roll > 0.2)
                    monster = new unit("rat", {x, y});
                else
                    monster = new unit("bat", {x, y});

                world[x][y].unit = monster;
                break;
            case "!":
                world[x][y].base = new tileBase("floor", {x, y});

                roll = Math.random();
                monster;
                if(roll > 0.9)
                    monster = new unit("imp", {x, y});
                else if(roll > 0.6)
                    monster = new unit("cobra", {x, y});
                else if(roll > 0.3)
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
                errors++;
                let test = prompt("Error reading level file on line " + (y + 2) + " column " + (x + 1) + ". Invalid level character '" + character + "'. Continue loading?");

                if(test === false)
                {
                    i = mapText.length;
                }
                break;

        }

        x++;
    }

    if(errors > 0)
    {
        alert("Level could not be loaded due to " + errors + " tile errors. Please correct this.");
        return;
    }

    // User input
    document.onkeydown = function(e)
    {
        e = e || window.event;
        focusGrabberObject.focus();

        // Don't accept 'repeating' input from holding the key down
        if(e.repeat)
            return;

        let key = e.key;
        // console.log(key);

        if(gameStage === 0 && key.substr(0, 1) == " ")
        {
            document.getElementsByClassName("mapSelector")[0].style = "display: none;";
            startTransition();
            return;
        }

        // Movement key binds
        if(gameData.options.movementKeys == "wasd")
        {
            if(key == 'w')
                key = 'moveUp';
            else if(key == 'a')
                key = 'moveLeft';
            else if(key == 's')
                key = 'moveDown';
            else if(key == 'd')
                key = 'moveRight';
        }
        else if(gameData.options.movementKeys == "arrowkeys")
        {
            if(key == 'ArrowUp')
                key = 'moveUp';
            else if(key == 'ArrowLeft')
                key = 'moveLeft';
            else if(key == 'ArrowDown')
                key = 'moveDown';
            else if(key == 'ArrowRight')
                key = 'moveRight';
        }
        else if(gameData.options.movementKeys == "ijkl")
        {
            if(key == 'i')
                key = 'moveUp';
            else if(key == 'j')
                key = 'moveLeft';
            else if(key == 'k')
                key = 'moveDown';
            else if(key == 'l')
                key = 'moveRight';
        }
        else if(gameData.options.movementKeys == "8456")
        {
            if(key == '8')
                key = 'moveUp';
            else if(key == '4')
                key = 'moveLeft';
            else if(key == '5')
                key = 'moveDown';
            else if(key == '6')
                key = 'moveRight';
        }
        else if(gameData.options.movementKeys == "8426")
        {
            if(key == '8')
                key = 'moveUp';
            else if(key == '4')
                key = 'moveLeft';
            else if(key == '2')
                key = 'moveDown';
            else if(key == '6')
                key = 'moveRight';
        }
        else if(gameData.options.movementKeys == "hjkl")
        {
            if(key == 'k')
                key = 'moveUp';
            else if(key == 'h')
                key = 'moveLeft';
            else if(key == 'j')
                key = 'moveDown';
            else if(key == 'l')
                key = 'moveRight';
        }

        // Attack keybinds
        if(gameData.options.combatKeys == "arrowkeys")
        {
            if(key == 'ArrowUp')
                key = 'attackUp';
            else if(key == 'ArrowLeft')
                key = 'attackLeft';
            else if(key == 'ArrowDown')
                key = 'attackDown';
            else if(key == 'ArrowRight')
                key = 'attackRight';
        }
        else if(gameData.options.combatKeys == "wasd")
        {
            if(key == 'w')
                key = 'attackUp';
            else if(key == 'a')
                key = 'attackLeft';
            else if(key == 's')
                key = 'attackDown';
            else if(key == 'd')
                key = 'attackRight';
        }
        else if(gameData.options.combatKeys == "ijkl")
        {
            if(key == 'i')
                key = 'attackUp';
            else if(key == 'j')
                key = 'attackLeft';
            else if(key == 'k')
                key = 'attackDown';
            else if(key == 'l')
                key = 'attackRight';
        }
        else if(gameData.options.combatKeys == "8456")
        {
            if(key == '8')
                key = 'attackUp';
            else if(key == '4')
                key = 'attackLeft';
            else if(key == '5')
                key = 'attackDown';
            else if(key == '6')
                key = 'attackRight';
        }
        else if(gameData.options.combatKeys == "8426")
        {
            if(key == '8')
                key = 'attackUp';
            else if(key == '4')
                key = 'attackLeft';
            else if(key == '2')
                key = 'attackDown';
            else if(key == '6')
                key = 'attackRight';
        }
        else if(gameData.options.combatKeys == "hjkl")
        {
            if(key == 'k')
                key = 'attackUp';
            else if(key == 'h')
                key = 'attackLeft';
            else if(key == 'j')
                key = 'attackDown';
            else if(key == 'l')
                key = 'attackRight';
        }

        // Wait keybinds
        if(gameData.options.waitKey == "spacebar")
        {
            if(key == ' ')
                key = 'wait';
        }
        else if(gameData.options.waitKey == "return")
        {
            if(key == 'Enter')
                key = 'wait';
        }
        else if(gameData.options.waitKey == "z")
        {
            if(key == 'z')
                key = 'wait';
        }

        if(player.compulsiveAction !== null)
        {
            if(key != "wait")
            {
                addLog("You don't have control this turn. Press " + gameData.options.waitKey + " to continue.");
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
                case "attackUp":
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

                case "attackDown":
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

                case "attackRight":
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

                case "attackLeft":
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

                case "wait":
                    addLog("You wait in place.");
                    break;

                case "moveUp":
                    player.moveTo(northOf(player.location));
                    break;
                case "moveDown":
                    player.moveTo(southOf(player.location));
                    break;
                case "moveRight":
                    player.moveTo(eastOf(player.location));
                    break;
                case "moveLeft":
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
                bulletTime();
            }
        }
        else if(player.stun > 0)
        {
            if(key == "wait")
            {
                addLog("You wait in place.");
                enemyTurn();
            }

        }
    };

    if(customMap)
    {
        let conflict = false;

        for(let i = 0; i < gameData.customMaps.length; i++)
        {
            if(mapInfo.src == gameData.customMaps[i].src)
            {
                conflict = true;
                //console.log("Map already in list.");
                break;
            }
        }

        if(!conflict)
        {
            gameData.customMaps.push(mapInfo);
            confirmAddMap(mapInfo);
            updateMapList();
        }
    }

    updateDisplay();
    document.getElementById("loading").innerHTML = "Loaded map " + mapInfo.name + ", by " + mapInfo.author;
    document.getElementById("start").style = "display: inline;";
    logObject.innerHTML = "\n<div class=\"gameLogTextEntrance\">Welcome to " + mapInfo.name + "! (Difficulty: " + mapInfo.difficulty + ")</div>";
    yourTurn = true;

    welcomeObject.focus();
    welcomeObject.blur();
}

function startTransition(iteration)
{
    if(iteration === undefined)
    {
        welcomeObject.classList.add("fadeAway");
        iteration = 0;
    }

    let volume = 0.7 - (iteration / 120);

    if(volume < 0 || !gameData.options.soundEnabled)
        volume = 0;

    titleMusic.volume = volume;

    if(iteration > 100)
    {
        welcomeObject.style = "display: none;";
        gameStage = 1;
        titleMusic.pause();
        introMusic.play();
        yourTurn = true;
        return;
    }
    else
        window.setTimeout(startTransition, 10, iteration + 1);
}

function enemyTurn()
{
    turnTime = new Date().getTime();

    if(gameStage == 4)
    {
        updateDisplay();
        yourTurn = false;
        return;
    }

    windowObject.classList.remove("screenShake");

    let tickGroupCopy = tickGroup.slice();
    for(let i = 0; i < tickGroupCopy.length; i++)
    {
        tickGroupCopy[i].tick();
    }

    let unitGroupCopy = units.slice();
    for(let i = 0; i < unitGroupCopy.length; i++)
    {
        unitGroupCopy[i].tick();
    }

    turnCount++;
    updateDisplay();

    if(player.health <= 0)
    {
        addLog("You played for " + turnCount + " turns, slew " + kills + " creatures (yourself included), and earned " + score + " points.", "color: MediumTurquoise;");
        addLog("You have died. Game over.", "color: red;");
        yourTurn = false;
        gameMusic.pause();
        bossGameMusic.pause();
        gameOverMusic.play();
    }
    else if(player.stun <= 0)
    {
        if(player.compulsiveAction !== null)
        {
            addLog("You don't have control this turn. Press " + gameData.options.waitKey + " to continue.");
            quickActionUsed = true;
        }
        else
            quickActionUsed = false;

        yourTurn = true;
        quickActionUsed = false;
    }
    else
    {
        addLog("Press the " + gameData.options.waitKey + " key to pass turn. (You cannot do anything while stunned)");
        yourTurn = false;
    }

    //console.log("Turn calculation time: " + ((new Date().getTime() - turnTime) / 1000) + "ms");
}

function bulletTime(iteration)
{
    iteration++;

    if(iteration > 50)
        return;

    if(projectiles.length == 0)
    {
        enemyTurn();
        return;
    }

    let bulletTimeGroup = projectiles.slice();
    for(let i = 0; i < bulletTimeGroup.length; i++)
    {
        bulletTimeGroup[i].tick();
    }

    updateDisplay();
    window.setTimeout(bulletTime, 100, iteration);
}

function startTicking(thing)
{
    for(let i = 0; i < tickGroup.length; i++)
    {
        if(tickGroup[i] === thing)
            return;
    }

    tickGroup.push(thing);
}

function stopTicking(thing)
{
    for(let i = 0; i < tickGroup.length; i++)
    {
        if(tickGroup[i] === thing)
            tickGroup.splice(i, 1);
    }
}

function equip(slot)
{
    if(!yourTurn)
        return;

    let weapon = inventory[slot];

    if(weapon === undefined)
        return;
    else if(((weapon.weight * 2.5) + 5) - player.strength > player.maxStamina - 5)
    {
        addLog("You can't even lift this weapon... Maybe you can wield it once you're stronger.");
    }
    else if(player.weapon.cursed)
    {
        addLog("Your " + player.weapon.getName() + " refuses to leave your hand!", "color: red;");
    }
    else if(weapon.class == "weapon")
    {
        addLog("You equip the " + weapon.getName() + ".");

        if(weapon.cursed)
            addLog("You quickly realize you can't seem to let go of the " + weapon.getName() + ", it's cursed!", "color: red;");

        player.weapon = weapon;

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

        let identify = true;

        player.health += drink.healthEffect;
        player.stamina += drink.staminaEffect;

        if(drink.healthEffect > 0)
            addLog("You feel healed.");
        else if(drink.healthEffect < 0)
        {
            if(player.health > -10 && player.health < 0)
                player.health = 1;

            addLog("You feel sick.");
        }

        if(drink.staminaEffect > 0)
            addLog("You feel energized.");
        else if(drink.stamina < 0)
            addLog("You feel weakend.");

        if(drink.specialEffect !== undefined)
        {
            switch(drink.specialEffect)
            {
                case "deadly_poison":
                    player.poison += 5;
                    addLog("You've been poisoned!");
                    break;

                case "disintegrate":
                    if(player.weapon.baseWeapon == false && player.weapon.class == "weapon")
                    {
                        for(let i = 0; i < inventory.length; i++)
                            if(inventory[i] == player.weapon)
                                inventory.splice(i, 1);

                        addLog("Your " + player.weapon.getName() + " is engulfed in magical flames! Within moments, it's magically reduced to dust.");
                        player.weapon = player.baseWeapon;
                    }
                    else
                    {
                        addLog("Nothing happens.");
                        identify = false;
                    }

                    break;

                case "placebo":
                    addLog("Nothing happens.");
                    identify = false;
                    break;

                case "identification":
                    identify = false;

                    for(let i = 0; i < inventory.length; i++)
                    {
                        if(inventory[i].class == "consumable" || (inventory[i].class == "weapon" && inventory[i].baseWeapon == false))
                        {
                            if(!inventory[i].isIdentifed() && inventory[i].realName != "Potion of Identification")
                            {
                                addLog('A thought suddenly enters your head. "I think I know what this ' + inventory[i].getName() + ' really does now..."');
                                identify = true;
                                inventory[i].identify();
                                addLog("You identified your " + inventory[i].getName() + ".", "color: #22F;");

                                if(Math.random() > 0.7)
                                    break;
                            }
                        }

                    }

                    if(!identify)
                        addLog("Nothing happens.");

                    break;

                case "defence":
                    if(player.defence > 10)
                    {
                        identify = false;
                        addLog("Nothing else happens.");
                        player.defence = 10;
                    }
                    else
                    {
                        player.defence++;
                        addLog("You feel more hardy.");
                    }

                    break;

                case "defence_minus":
                    player.defence--;

                    if(player.defence < 0)
                    {
                        identify = false;
                        player.defence = 0;
                        addLog("Nothing happens.");
                    }
                    else
                        addLog("You feel more fragile.");

                    break;

                case "agility":
                    if(player.agility > 10)
                    {
                        identify = false;
                        addLog("Nothing happens.");
                        player.agility = 10;
                    }
                    else
                    {
                        player.agility++;
                        addLog("You feel more agile!");
                    }

                    break;

                case "agility_minus":
                    player.agility--;

                    if(player.agility < 0)
                    {
                        identify = false;
                        player.agility = 0;
                        addLog("Nothing happens.");
                    }
                    else
                        addLog("You feel unsteady.");

                    break;

                case "exp":
                    player.addExp(15);
                    addLog("You feel imbued with knowledge.");
                    break;

                case "forget":
                    // Need a potion of identification to start recognizing these
                    identify = false;

                    if(knownItems.length > 0)
                    {
                        knownItems.splice(getRandom(0, knownItems.length - 1), 1);
                        addLog("You blink a few times and feel completely disoriented. You can't remember anything that's happened for at least a few minutes, and maybe something else too? You're not sure at all.");
                    }
                    else
                        addLog("Nothing happens.");

                    break;

                case "levelup":
                    player.levelup();
                    player.health += 20;
                    player.stamina += 30;
                    break;

                case "antipoison":
                    if(player.poison > 8)
                    {
                        player.poison -= 7;
                        addLog("You feel a lot better, but the poison still isn't completely neutralized.", "color: #0A0;");
                    }
                    else if(player.poison > 0)
                    {
                        player.poison = 0;
                        addLog("The poison is neutralized completely, you feel much better.", "color: #0A0;");
                    }
                    else
                    {
                        addLog("Nothing happens, because you were not poisoned... What a waste.");
                    }
                    break;
            }
        }

        if(drink.realName !== null)
        {
            if(drink.realName != drink.getName() && identify)
            {
                drink.identify();
                addLog("That must have been " + aOrAn(drink.realName) + " " + drink.realName + "!", "color: #22F;");
            }
            else if(drink.realName != drink.getName() && !identify)
                addLog("You can't discern what that potion did.");
            else if(!identify)
                addLog("I don't think that had any further effect.");
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

function eat(slot)
{
    if(!yourTurn)
        return;

    let food = inventory[slot];

    if(food === undefined)
        return;
    else if(food.class == "food")
    {
        addLog("You eat the " + food.getName() + "...");

        let identify = true;

        player.health += food.healthEffect;
        player.stamina += food.staminaEffect;

        if(food.healthEffect > 0)
            addLog("You feel healed.");
        else if(food.healthEffect < 0)
        {
            if(player.health > -10 && player.health < 0)
                player.health = 1;

            addLog("You feel sick.");
        }

        if(food.staminaEffect > 0)
            addLog("You feel energized.");
        else if(food.stamina < 0)
            addLog("You feel weakend.");

        if(food.specialEffect !== undefined)
        {
            switch(food.specialEffect)
            {
                case "deadly_poison":
                    player.poison += 5;
                    addLog("You've been poisoned!");
                    break;

                case "disintegrate":
                    if(player.weapon.baseWeapon == false && player.weapon.class == "weapon")
                    {
                        for(let i = 0; i < inventory.length; i++)
                            if(inventory[i] == player.weapon)
                                inventory.splice(i, 1);

                        addLog("Your " + player.weapon.getName() + " is engulfed in magical flames! Within moments, it's magically reduced to dust.");
                        player.weapon = player.baseWeapon;
                    }
                    else
                    {
                        addLog("Nothing happens.");
                        identify = false;
                    }

                    break;

                case "placebo":
                    addLog("Nothing happens.");
                    identify = false;
                    break;

                case "identification":
                    identify = false;

                    for(let i = 0; i < inventory.length; i++)
                    {
                        if(inventory[i].class == "consumable" || (inventory[i].class == "weapon" && inventory[i].baseWeapon == false))
                        {
                            if(!inventory[i].isIdentifed() && inventory[i].realName != "Potion of Identification")
                            {
                                addLog('A thought suddenly enters your head. "I think I know what this ' + inventory[i].getName() + ' really does now..."');
                                identify = true;
                                inventory[i].identify();
                                addLog("You identified your " + inventory[i].getName() + ".", "color: #22F;");

                                if(Math.random() > 0.7)
                                    break;
                            }
                        }

                    }

                    if(!identify)
                        addLog("Nothing happens.");

                    break;

                case "defence":
                    if(player.defence > 10)
                    {
                        identify = false;
                        addLog("Nothing else happens.");
                        player.defence = 10;
                    }
                    else
                    {
                        player.defence++;
                        addLog("You feel more hardy.");
                    }

                    break;

                case "defence_minus":
                    player.defence--;

                    if(player.defence < 0)
                    {
                        identify = false;
                        player.defence = 0;
                        addLog("Nothing happens.");
                    }
                    else
                        addLog("You feel more fragile.");

                    break;

                case "agility":
                    if(player.agility > 10)
                    {
                        identify = false;
                        addLog("Nothing happens.");
                        player.agility = 10;
                    }
                    else
                    {
                        player.agility++;
                        addLog("You feel more agile!");
                    }

                    break;

                case "agility_minus":
                    player.agility--;

                    if(player.agility < 0)
                    {
                        identify = false;
                        player.agility = 0;
                        addLog("Nothing happens.");
                    }
                    else
                        addLog("You feel unsteady.");

                    break;

                case "exp":
                    player.addExp(5);
                    addLog("You feel imbued with knowledge from your delicious treat.");
                    break;

                case "forget":
                    // Need a potion of identification to start recognizing these
                    identify = false;

                    if(knownItems.length > 0)
                    {
                        knownItems.splice(getRandom(0, knownItems.length - 1), 1);
                        addLog("You blink a few times and feel completely disoriented. You can't remember anything that's happened for at least a few minutes, and maybe something else too? You're not sure at all.");
                    }
                    else
                        addLog("Nothing happens.");

                    break;

                case "levelup":
                    player.levelup();
                    player.health += 20;
                    player.stamina += 30;
                    break;

                case "antipoison":
                    if(player.poison > 8)
                    {
                        player.poison -= 7;
                        addLog("You feel a lot better, but the poison still isn't completely neutralized.", "color: #0A0;");
                    }
                    else if(player.poison > 0)
                    {
                        player.poison = 0;
                        addLog("The poison is neutralized completely, you feel much better.", "color: #0A0;");
                    }
                    else
                    {
                        addLog("Nothing happens, because you were not poisoned... What a waste.");
                    }
                    break;
            }
        }

        if(food.realName !== null)
        {
            if(food.realName != food.getName() && identify)
            {
                food.identify();
                addLog("That must have been " + aOrAn(food.realName) + " " + food.realName + "!", "color: #22F;");
            }
            else if(food.realName != food.getName() && !identify)
                addLog("You can't discern what that food did.");
            else if(!identify)
                addLog("I don't think that had any further effect.");
        }

        inventory.splice(slot, 1);
        delete food;

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

function zap(slot)
{
    if(!yourTurn)
        return;
}

function drop(slot)
{
    if(!yourTurn)
        return;

    let item = inventory[slot];

    if(item === undefined)
        return;

    if(!item.canDrop)
    {
        addLog("You can't drop that.");
        return;
    }

    if(item != player.weapon)
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
    if(location === null)
        location = {x: -1, y: -1};

    let tile;
    let normal = {base: new tileBase("wall", location), unit: null, items: Array(), hazard: null, projectile: null};
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

function vectorAdd(locationA, locationB)
{
    return {x: locationA.x + locationB.x, y: locationA.y + locationB.y};
}

function vectorSub(locationA, locationB)
{
    return {x: locationA.x - locationB.x, y: locationA.y - locationB.y};
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

function htmlEntities(str)
{
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function aOrAn(noun)
{
    let vowels = ["a", "e", "i", "o", "u"];
    let firstLetter = noun.substr(0, 1).toLowerCase();

    for(let i = 0; i < vowels.length; i++)
        if(vowels[i] == firstLetter)
            return "an";

    return "a";
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




var player;
var inventory = Array();
var knownItems = Array();
var groundItems = Array();
var tickGroup = Array();
var projectiles = Array();
var units = Array();
var yourTurn, inventoryUpdate, quickActionUsed = false;
var treasureDrops = Array("longsword", "longsword", "rapier", "rapier", "mace", "mace", "sledgehammer", "greatsword", "flail", "levelup_potion");
var otherDrops = Array("health_potion", "stamina_potion", "energy_potion", "refresh_potion", "posion_potion", "fatigue_potion", "disintegrate_potion", "placebo_potion", "identify_potion", "defence_potion", "frail_potion", "agility_potion", "slug_potion", "exp_potion", "forget_potion", "antipoison_potion", "disc", "coin", "key", "bat", "knuckles","croissant","wonderbread","sparklingmuffin");
var windowObject, containerObject, logObject, focusGrabberObject, mapSelectorObject, inventoryObject, healthObject, staminaObject, expObject = null;
var map = Array.matrix(80, 24, false);
var worldDimensionX = 1;
var worldDimensionY = 1;
var world;
var titleMusic, introMusic, gameMusic, bossIntroMusic, bossGameMusic, gameOverMusic, gameSoundEffect;
var gameStage = 0, turnCount = 0, score = 0, kills = 0;
var turnTime = new Date().getTime();

// Default game configuration data
var gameData =
    {
        cookieFormat: 2,

        options:
            {
                movementKeys: "wasd",
                combatKeys: "arrowkeys",
                waitKey: "space",
                soundEnabled: true
            },

        mapList:
            [
                {
                    name: "The Dungeon",
                    author: "Pecon",
                    difficulty: "Normal",
                    src: "./level.dat"
                },

                {
                    name: "The Dungeon",
                    author: "Pecon",
                    difficulty: "Easy",
                    src: "./level_easy.dat"
                },

                {
                    name: "The Dungeon",
                    author: "Pecon",
                    difficulty: "Hard",
                    src: "./level_hard.dat"
                },

                {
                    name: "z'ralnixeus, the cat caverns",
                    author: "Zeustal",
                    difficulty: "Normal",
                    src: "./zeus_map.dat"
                }
            ],

        customMaps: []
    };

window.onload = function()
{
    attempt_init();
}
