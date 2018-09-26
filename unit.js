class unit
{
	constructor(typeName, location)
	{
		if(location === undefined)
			throw "Location not specified!";

		this.class = "monster";
		this.location = {x: location.x, y: location.y};
		this.itemDrop = null;
		this.passive = false;
		this.canDisplace = false;
		this.baseWeapon = null;
		this.weapon = null;
		this.exp = 0;
		this.poison = 0;
		this.poisonSchedule = 0;
		this.invisibility = 0;
		this.moveDelay = 0;
		this.moveDelaySchedule = 0;
		this.aggro = 0;

		// Element modifiers
		// 1.0 is no change. Lower value will create resistance, higher values will create vulnerability.
		this.fireResist = 1.0;
		this.frostResist = 1.0;
		this.earthResist = 1.0;

		let maxHealth = 100;
		let maxStamina = 100;
		let character = '?';
		let description = "";
		let name = "";
		let perception = 5;
		let strength = 2;
		let defence = 2;
		let agility = 2;
		let level = 1;

		switch(typeName)
		{
			case "player":
				this.class = "player";
				this.compulsiveAction = null;
				name = "Player";
				description = "It's you!";
				character = '@';
				this.baseWeapon = new item("fists");
				this.itemDrop = undefined;

				maxHealth = 25;
				maxStamina = 20;
				level = 10; 
				break;

			case "rat":
				name = "Giant Rat";
				description = "An absolutely massive rat.";
				character = "R";
				this.baseWeapon = new item("rat_teeth");
				this.itemDrop = "rat_meat";

				maxHealth = 6;
				maxStamina = 15;
				perception = 2;
				strength = 1;
				defence = 1;
				agility = 3;
				level = 2;
				break;

			case "bat":
				name = "Giant Bat";
				description = "Annoying flappy thing.";
				character = "B";
				this.baseWeapon = new item("bat_teeth");
				this.itemDrop = "bat_wing";
				this.canDisplace = true;

				maxHealth = 3;
				maxStamina = 5;
				perception = 3;
				strength = 0;
				defence = 0;
				agility = 5;
				level = 1;
				break;

			case "spider":
				name = "Big Spider";
				description = "A frighteningly large poisonous spider.";
				character = "X";
				this.baseWeapon = new item("spider_teeth");
				this.itemDrop = "spider_body";
				this.canDisplace = true;

				maxHealth = 3;
				maxStamina = 5;
				perception = 3;
				strength = 0;
				defence = 0;
				agility = 5;
				level = 1;
				break;

			case "skeleton":
				name = "Skeleton";
				description = "An animated skeleton held together with weak magic.";
				character = "S";
				this.baseWeapon = new item("fists");
				this.weapon = new item("ancient_sword");
				this.itemDrop = "skeleton_bone";

				maxHealth = 5;
				maxStamina = 15;
				perception = 0;
				strength = 3;
				defence = 2;
				agility = 0;
				level = 2;
				this.frostResist = 0.0;
				break;

			case "cutpurse":
				name = "Crazed Cutpurse";
				description = "A mind-torn human who, by the looks of it, was likely a theif originally.";
				character = "@";
				this.baseWeapon = new item("fists");
				this.weapon = new item("dagger");
				this.itemDrop = "coin";

				maxHealth = 8;
				maxStamina = 7;
				perception = 2;
				strength = 1;
				defence = 0;
				agility = 3;
				level = 3;
				this.frostResist = 0.5;
				break;

			case "goblin":
				name = "Goblin";
				description = "An ugly green goblin.";
				character = "G";
				this.baseWeapon = new item("goblin_fists");
				this.itemDrop = "goblin_toe";

				maxHealth = 10;
				maxStamina = 12;
				perception = 1;
				strength = 2;
				defence = 3;
				agility = 1;
				level = 3;
				break;

			case "kobold":
				name = "Kobold";
				description = "A scrawny kobold.";
				character = "K";
				this.baseWeapon = new item("goblin_fists");
				this.weapon = new item("pickaxe");
				this.itemDrop = "kobold_candle";

				maxHealth = 6;
				maxStamina = 12;
				perception = 3;
				strength = 1;
				defence = 1;
				agility = 1;
				level = 3;
				break;

			case "troll":
				name = "Troll";
				description = "A massive club-wielding brute.";
				character = "T";
				this.baseWeapon = new item("goblin_fists");
				this.weapon = new item("club");
				this.itemDrop = "troll_fat";

				maxHealth = 32;
				maxStamina = 25;
				perception = 1;
				strength = 5;
				defence = 2;
				agility = 1;
				level = 5;
				this.earthResist = 0.2;
				break;

			case "shade":
				name = "Ancient Shade";
				description = "A terrifying and powerful ancient spirit.";
				character = "A";
				this.baseWeapon = new item("fists");
				this.weapon = new item("longsword");
				this.itemDrop = "shade_essence";

				maxHealth = 26;
				maxStamina = 20;
				perception = 2;
				strength = 3;
				defence = 3;
				agility = 2;
				level = 4;
				this.frostResist = 0.0;
				this.fireResist = 2.0;
				break;

			case "imp":
				name = "Fire Imp";
				description = "A small, combustive demon.";
				character = "I";
				this.baseWeapon = new item("imp_claws");
				this.itemDrop = "imp_ashes";

				maxHealth = 21;
				maxStamina = 15;
				perception = 3;
				strength = 3;
				defence = 1;
				agility = 4;
				level = 4;
				this.frostResist = 2.0;
				break;

			case "cobra":
				name = "Massive Cobra";
				description = "The King of King Cobras. No doubt highly poisonous.";
				character = "Ꭶ";
				this.baseWeapon = new item("cobra_fangs");
				this.itemDrop = "snake_skin";

				maxHealth = 24;
				maxStamina = 10;
				perception = 4;
				strength = 2;
				defence = 1;
				agility = 5;
				level = 5;
				this.frostResist = 1.5; // 50% frost vulnerability
				break;

			case "cat":
				name = "Cat";
				description = "Hairy baby.";
				character = "C";
				this.baseWeapon = null;
				this.canDisplace = true;

				maxHealth = 10;
				maxStamina = 15;
				perception = 7;
				strength = 1;
				defence = 3;
				agility = 100;
				level = 1;
				this.passive = true;
				this.fireResist = 0.01;
				this.frostResist = 0.0;
				this.earthResist = 0.01;
				break;

			case "drake":
				this.class = "boss";
				name = "Three Headed Dragon";
				description = "A terrifying three-headed dragon. Each head seems to have it's own ability, but luckily they seem to have issues cooperating.";
				character = "D";
				this.baseWeapon = new item("dragon_tail");
				this.moveDelay = 1;

				maxHealth = 100;
				maxStamina = 50;
				perception = 5;
				strength = 7;
				defence = 5;
				agility = 1;
				level = 15;
				this.fireResist = 0.0;
				this.frostResist = 0.5;
				this.earthResist = 0.8;
				break;

			case "beast":
				this.class = "boss";
				name = "Displacer Beast";
				description = "A horrifying monster from the abyss, can open small portals to the abyss where certain destruction awaits!";
				character = "Ᏼ";
				this.baseWeapon =  new item("beast_tail");

				maxHealth = 175;
				maxStamina = 40;
				perception = 5;
				strength = 3;
				defence = 5;
				agility = 1;
				level = 15;
				this.fireResist = 0.8;
				this.frostResist = 0.3;
				this.earthResist = 0.0;

				this.angerThreshold = 0.9;
				break;

			default:
				throw "Unknown unit type " + typeName;
				break;

		}

		if(this.weapon === null)
			this.weapon = this.baseWeapon;

		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.maxStamina = maxStamina;
		this.stamina = maxStamina;
		this.character = character;
		this.description = description;
		this.name = name;
		this.perception = perception;
		this.strength = strength;
		this.defence = defence;
		this.agility = agility;
		this.level = level;

		this.stun = 0;

		units.push(this);
	}

	getCharacter()
	{
		return this.character;
	}

	getName()
	{
		if(this.invisibility > 0)
			return "Invisible Object";

		return this.name;
	}

	getDescription()
	{
		if(this.invisibility > 0)
		{	
			let description = "Something is here, but you can't tell what it is due to its invisibility effect.";

			if(this.level > player.level)
				description += " It seems much stronger than you.";
			else if(this.level == player.level)
				description += " It seems about as strong as you.";
			else
				description += " You are pretty confident that you are stronger than it.";

			return description;
		}

		return this.description;
	}

	tick()
	{
		if(this.health > this.maxHealth)
			this.health = this.maxHealth;

		this.stamina += 5;

		if(this.stamina > this.maxStamina)
			this.stamina = this.maxStamina;

		if(this.poison > 0)
		{
			if(this.poisonSchedule > 4)
			{
				this.health -= this.poison;
				this.poison--;
				this.poisonSchedule = 0;

				if(this.class == "player")
				{
					if(this.poison > 0)
						addLog("You're taking poison damage.", "color: #0A0;");
					else
						addLog("You're no longer poisoned.", "color: #0A0;");
				}
			}
			else
			{
				this.poisonSchedule++;
			}
		}

		if(this.invisibility > 0)
		{
			this.invisibility--;

			if(this.invisibility <= 0 && this.class == "player")
				addLog("Your invisibility wears off.");
		}

		if(this.health <= 0)
		{
			this.die();
			return;
		}

		if(this.stamina < 0 && this.stamina + 5 >= 0 && this.class != "player")
			addLog("The " + this.getName() + " looks like it's about to recover.", (this.class == "boss" ? "color: orange;" : "color: MediumTurquoise;"));

		if(this.stun > 0)
		{
			if(this.class != "player")
				addLog("The " + this.getName() + " is stunned.", "color: MediumTurquoise;");

			if(this.stamina >= 10)
			{
				this.stun--;
				this.stamina -= 10;
			}
			else if(this.class == "player")
			{
				addLog("You are currently too weak to recover from your stun.", "color: MediumTurquoise;");
			}

			return;
		}

		if(this.class == "player")
		{
			// Don't run AI code
			return;
		}
		else if(this.class == "boss") // Displacer beast boss code
		{
			if(gameStage < 2)
				return;

			let closestItem = null;
			let closestItemDist = Number.MAX_SAFE_INTEGER;

			for(let i = 0; i < groundItems.length; i++)
			{
				if(groundItems[i].location == null)
					continue;

				let dist = vectorDist(groundItems[i].location, this.location);

				if(dist < closestItemDist)
				{
					closestItem = groundItems[i];
					closestItemDist = dist;
				}
			}

			if(this.health / this.maxHealth <= this.angerThreshold)
			{
				addLog("The " + this.getName() + " seeths with anger! It smashes it's tail against the ground and the entire dungeon rumbles...", "color: red;");
				gameSoundEffect.src = "./crumble.mp3";
				gameSoundEffect.play();
				windowObject.classList.add("screenShake");

				for(let x = this.location.x - 3; x <= this.location.x + 3; x++)
				{
					for(let y = this.location.y - 3; y <= this.location.y + 3; y++)
					{
						let tile = getWorld({x: x, y: y});
						let roll = Math.random();

						if(roll > 0.85 && tile.base.getName() == "Floor" && tile.hazard === null)
						{
							tile.hazard = new hazard("rocks", {x: x, y: y});

							if(tile.unit !== null)
								if(tile.unit.class == "player")
									addLog("Some stones are about to collapse onto you! You should probably move out of the way...", "color: orange;");
						}

					}
				}

				this.angerThreshold -= 0.1;
			}
			else if(closestItemDist < vectorDist(this.location, player.location))
			{
				// Head to the item
				this.moveTowards(closestItem.location);

				if(this.location.x == closestItem.location.x && this.location.y == closestItem.location.y)
				{
					// Destroy all the items on that tile
					let tile = getWorld(this.location);
					let count = tile.items.length;

					addLog("The " + this.getName() + " opens a black portal to the void!", "color: red;");
					
					for(let i = count - 1; i >= 0; i--)
					{
						addLog("The " + tile.items[i].getName() + " is sucked into the portal and destroyed!", "color: red;");
						tile.items[i].remove();
						this.stamina -= 9;
					}

					tile.items = Array();

					if(this.stamina < -5)
					{
						addLog("The " + this.getName() + " looks exhausted!", "color: MediumTurquoise;");
					}

					if(this.stamina < -15)
						this.stamina = -15;
				}
			}
			else
			{
				// Head to the player
				this.moveTowards(player.location);
			}
		}
		else // Generic AI code
		{		
			let playerDist = vectorDist(this.location, player.location);
			let detectDist = playerDist;
			let tile = getWorld(this.location);

			if(player.invisibility > 0)
				detectDist = Math.floor(playerDist * 4);

			if(playerDist > 100 && tile.hazard === null)
			{
				// Don't bother doing ai stuff if they're so far away
				return;
			}
			else if(playerDist <= 1 && !this.passive && tile.hazard === null)
			{
				// Attack!
				if(this.stamina >= 0)
				{
					player.attack(this);
				}
			}
			else if(this.aggro > 0 && tile.hazard === null)
			{
				if(detectDist <= this.perception + 2 && !this.passive)
				{
					if(this.aggro < 3)
						this.aggro = 3;

					this.target = player.location;
				}
				
				this.moveTowards(this.target);
				this.aggro--;
			}
			else if(detectDist <= this.perception + 2 && !this.passive && tile.hazard === null)
			{
				this.target = player.location;
				this.aggro = 3;

				this.moveTowards(this.target);
				this.aggro--;	
			}
			else
			{
				if(Math.random() > 0.8 && tile.hazard === null)
				{
					// Wait
				}
				else
				{
					// Wander
					let moves = Array();

					if(getWorld(northOf(this.location)).base.permitsTravel)
						moves.push(getWorld(northOf(this.location)));

					if(getWorld(southOf(this.location)).base.permitsTravel)
						moves.push(getWorld(southOf(this.location)));

					if(getWorld(eastOf(this.location)).base.permitsTravel)
						moves.push(getWorld(eastOf(this.location)));

					if(getWorld(westOf(this.location)).base.permitsTravel)
						moves.push(getWorld(westOf(this.location)));

					let movesBackup = moves.slice();

					while(moves.length > 0)
					{
						let index = getRandom(0, moves.length - 1);
						let move = moves[index];

						if(move === undefined)
							moves.splice(index, 1);
						else if(move.base.moveTo(this, true) && move.unit === null && move.hazard === null)
						{
							this.moveTo(move.location);
							return;
						}
						else
							moves.splice(index, 1);
					}

					// Prevent monsters from standing still while engulfed by hazards
					if(tile.hazard !== null)
						this.moveTo(movesBackup[getRandom(0, movesBackup.length - 1)]);
				}
			}
		}

	}

	moveTowards(location)
	{
		let possibleMoves = Array();

		possibleMoves.push(getWorld(westOf(this.location)));
		possibleMoves.push(getWorld(eastOf(this.location)));
		possibleMoves.push(getWorld(northOf(this.location)));
		possibleMoves.push(getWorld(southOf(this.location)));

		let goodMoves = Array();

		for(let i = 0; i < possibleMoves.length; i++)
		{
			if(!possibleMoves[i].base.moveTo(this, true))
				continue; // Tile is inaccessible

			if(possibleMoves[i].hazard !== null && this.class != "boss")
				continue; // Tile has a hazard

			goodMoves.push(possibleMoves[i]);
		}

		let bestMove = null;
		let bestDistance = Number.MAX_SAFE_INTEGER;

		for(let i = 0; i < goodMoves.length; i++)
		{
			let checkDistance = vectorDist(goodMoves[i].location, location);

			if(bestMove == null)
			{
				bestMove = goodMoves[i];
				bestDistance = checkDistance;
				continue;
			}

			if(checkDistance < bestDistance)
			{
				bestMove = goodMoves[i];
				bestDistance = checkDistance;
			}
			else if(checkDistance == bestDistance)
			{
				if(Math.random() > 0.5)
				{
					bestMove = goodMoves[i];
				}
			}
		}

		if(bestDistance >= vectorDist(this.location, location) + 1)
			bestMove = null; // Don't backtrack

		if(bestMove != null)
			this.moveTo(bestMove.location);
	}

	moveTo(location)
	{
		if(this.health <= 0)
			return false;

		if(this.stamina <= 0)
		{
			if(this.class == "player")
				addLog("You are too exhausted to move.");

			return false;
		}

		if(this.moveDelay > 0)
		{
			if(this.moveDelaySchedule > 0)
			{
				this.moveDelaySchedule--;
				return false;
			}
			else
				this.moveDelaySchedule = this.moveDelay;
		}

		let tile = getWorld(location);

		// Test if the tile is accessible
		let accessible = tile.base.moveTo(this);

		if(!accessible)
			return false;

		let displaceUnit = null;

		if(tile.unit !== null)
			displaceUnit = tile.unit;

		tile.unit = this;
		let leaveTile = getWorld(this.location);

		leaveTile.unit = null;
		leaveTile.base.onLeave(this);

		if(displaceUnit !== null)
		{
			if(vectorDist(location, player.location) < 30 && this.class != "player")
				addLog("The " + this.getName() + " displaces the " + displaceUnit.getName() + ".", "color: MediumTurquoise;");
			leaveTile.base.moveTo(displaceUnit);
			leaveTile.unit = displaceUnit;
			displaceUnit.location = leaveTile.location;
		}

		if(this.class == "player")
		{
			for(let i = tile.items.length; i > 0; i--)
			{
				// if(tile.items[tile.items.length - 1].dropped)
				// 	continue;

				let pickup = tile.items.pop();
				inventory.push(pickup);
				score++;
				pickup.location = null;

				for(let j = 0; j < groundItems.length; j++)
				{
					if(groundItems[j] == pickup)
					{
						groundItems.splice(j, 1);
						break;
					}
				}

				inventoryUpdate = true;
				addLog("You pick up the " + pickup.getName() + ".");
			}
		}

		this.location = location;
		this.stamina -= 3.5;
	}

	attack(attacker)
	{
		if(attacker.health <= 0 || this.health <= 0)
			return false;

		if(attacker.stamina < 0)
			return false;

		if(this.getName() == "Cat" && attacker.class == "player" && attacker.weapon == attacker.baseWeapon)
		{
			addLog("You pet the cat. It purrs loudly and then promptly ignores you.", "color: green;");
			return false;
		}

		let damage = attacker.strength + attacker.weapon.blade + attacker.weapon.blunt;
		attacker.stamina -= ((attacker.weapon.weight * 2.5) + 5) - attacker.strength;

		// Crit roll
		if(Math.random() < 0.05 + attacker.weapon.blade / 100)
		{
			damage *= 2;

			if(this.class == "player")
				addLog("The " + attacker.getName() + "'s " + attacker.weapon.getName() + " crackles with electricity, a critical attack coming right at you!", "color: yellow;");
			else if(attacker.class == "player")
				addLog("Your " + attacker.weapon.getName() + " crackles with electricity, a critical attack!", "color: yellow;");
		}
		else
		{
			if(this.class == "player")
				addLog("The " + attacker.getName() + " " + attacker.weapon.attackDescriptor + attacker.weapon.attackDescriptorPluralString + " toward you with its " + attacker.weapon.getName() + ".");
			else if(attacker.class == "player")
				addLog("You " + attacker.weapon.attackDescriptor + " your " + attacker.weapon.getName() + " towards the " + this.getName() + ".");
		}
		

		

		// Agility rolls
		let evaded = false;
		for(let i = 0; i < this.agility; i++)
		{
			if(Math.random() < 0.05)
				evaded = true;
		}

		// Defence rolls
		let blocked = 0;
		for(let i = 0; i < this.defence; i++)
		{
			if(Math.random() < 0.1)
				blocked++;
		}


		if(evaded)
		{
			damage = 0;
			if(this.class == "player")
				addLog("You nimbly dodge the " + attacker.getName() + "'s attack.");
			else if(attacker.class == "player")
				addLog("The " + this.getName() + " " + (this.agility > 2 ? "nimbly" : "barely") + " dodges your attack.");
		}


		// Weapon enchantments
		if(attacker.weapon.magicalEffect !== null && damage > 0)
		{
			switch(attacker.weapon.magicalEffect)
			{
				case "concussion":
					if(attacker.weapon.concussiveCharge === undefined)
						attacker.weapon.concussiveCharge = 5;

					if(attacker.weapon.concussiveCharge >= 5)
					{
						if(attacker.class == "player")
							addLog("As soon as your attack connects, your weapon unleashes all it's magical charge! Like lightning, the energy surges into the " + this.getName() + " with a brilliant flash and thunderous bang!", "color: yellow;");
						else
							addLog("With a brilliant flash, you're concussed by the " + attacker.getName() + "'s " + attacker.weapon.getName() + 
								"!", "color: orange;");
						this.stun = 2;
						attacker.weapon.concussiveCharge = 0;
					}
					else
					{
						if(attacker.class == "player")
							addLog("Your weapon hums, adding to a magical tension growing within it.", "color: #22F;");
						attacker.weapon.concussiveCharge++;
					}

					break;

				case "concussion_poor":
					if(attacker.weapon.concussiveCharge === undefined)
						attacker.weapon.concussiveCharge = 5;

					if(attacker.weapon.concussiveCharge >= 5)
					{
						if(Math.random() > 0.5)
						{
							// Curse effect, miss and stun yourself
							if(attacker.class == "player")
							{
								addLog("As soon as your attack connects, your weapon unleashes all it's magical charge! But the weapon dims for just a moment, missing your opponent.", "color: orange;");
								addLog('"Uh oh."');
								addLog("Like lightning, the energy surges from the weapon and up your arm! You've been stunned!", "color: orange;");
							}
							attacker.stun = 2;
						}
						else
						{
							if(attacker.class == "player")
								addLog("As soon as your attack connects, your weapon unleashes all it's magical charge! Like lightning, the energy surges into the " + this.getName() + " with a brilliant flash and thunderous bang! The " + this.getName() + " is stunned!", "color: yellow;");
							else
								addLog("With a brilliant flash, you're concussed by the " + attacker.getName() + "'s " + attacker.weapon.getName() + 
								"!", "color: orange;");
							this.stun = 2;
						}

						attacker.weapon.concussiveCharge = 0;
					}
					else
					{
						if(attacker.class == "player")
							addLog("Your weapon hums, adding to a magical tension growing within it.", "color: #22F;");
						attacker.weapon.concussiveCharge++;
					}

					// Loses charge twice as quickly
					attacker.weapon.magicalCharge--;
					break;

				case "lifesteal":
					if(attacker.class == "player")
						addLog("You feel your weapon transfer a small amount of life force from the " + this.getName() + " to you.", "color: #22F;");
					this.health--;
					attacker.health++;
					break;

				case "regeneration":
					if(attacker.health < attacker.maxHealth)
					{
						if(attacker.class == "player")
							addLog("You're suddenly wracked with pain! The " + attacker.weapon.getName() + "'s curse is slowly healing your wounds in the most excrutiatingly painful way imaginable! The immense pain is extremely tiring.", "color: orange;");
						attacker.health += 5;
						attacker.stamina -= 10;
						attacker.weapon.magicalCharge -= 3;
					}
					break;

				case "power":
					damage++;
					break;

				case "dullness":
					damage--;
					break;

				case "piercing":
					if(blocked > 0)
					{
						let effect = getRandom(0, blocked) + 1;
						blocked -= effect;
						if(attacker.class == "player")
							addLog("Your weapon negates " + (blocked > 0 ? "all" : "some") + " of your opponent's defences.", "color: #22F;");
						
						attacker.weapon.magicalCharge -= effect;
					}
					break;

				case "weight":
					attacker.stamina -= 5;
					break;

				case "stamina":
					attacker.stamina += 5;
					break;

				case "miss":
					if(Math.random() > 0.8)
					{
						if(attacker.class == "player")
							addLog("Despite your attack being perfectly aimed, your weapon suddenly jerks mid-flight and allows the " + this.getName() + " to evade it easily.", "color: orange;");
						evaded = true;
						damage = 0;
						attacker.weapon.magicalCharge -= 5;
					}
					break;

				case "bloodlust":
					if(attacker.weapon.lastKillTurn === undefined)
					{
						attacker.weapon.lastKillTurn = -8;
						attacker.weapon.kills = 0;
					}

					if(attacker.weapon.lastKillTurn > turnCount - 8)
					{
						// Made a kill in the last 5 turns, gets damage bonus
						if(attacker.class == "player")
							addLog("The " + attacker.weapon.getName() + " eagerly awaits your kill.", "color: #22F;");

						damage *= (1.1 + (attacker.weapon.kills * 0.1));
					}
					else
					{
						// Penalty for not having a kill in the last five turns.
						// if(attacker.class == "player")
						// 	addLog("The " + attacker.weapon.getName() + " is silent.");
						damage *= 0.8;
						attacker.weapon.kills = 0;
					}

					if(damage - blocked > this.health)
					{
						if(!(attacker.weapon.lastKillTurn > turnCount - 7))
						{
							if(attacker.class == "player")
								addLog("As you strike the finishing blow, your " + attacker.weapon.getName() + " glows bright red! More...", "color: #A00;");
						}
						else
						{
							if(attacker.class == "player")
								addLog("Your " + attacker.weapon.getName() + " vibrates with excitement and grows even stronger...", "color: #A00;");

							attacker.weapon.magicalCharge++;
						}
						attacker.weapon.lastKillTurn = turnCount;
						attacker.weapon.kills++;
					}
					break;

			}

			if(attacker.weapon.realName != attacker.weapon.getName() && attacker.class == "player")
			{
				attacker.weapon.identify();
				addLog("This is a " + attacker.weapon.getName() + "!", "color: #22F;");
				inventoryUpdate = true;
				score += 5;
			}

			attacker.weapon.magicalCharge--;
		}

		// Destroy the weapon if it's out of magical charge
		if(attacker.weapon.magicalCharge <= 0 && attacker.weapon.magicalCharge !== null)
		{
			if(attacker.class == "player")
			{
				addLog("Your " + attacker.weapon.getName() + " runs out of the magic holding it together and crumbles to dust.", "color: MediumTurquoise;");
				attacker.weapon.remove();
			}
			
			attacker.weapon = attacker.baseWeapon;
		}


		if(blocked > 0 && !evaded)
		{
			damage -= blocked;

			if(damage < 0)
				damage = 0;

			if(damage > 0)
			{
				if(this.class == "player")
					addLog("You manage to partially block the " + attacker.getName() + "'s attack.");
				else if(attacker == player)
					addLog("The " + this.getName() + " resists some of your attack.");
			}
			else
			{
				if(this.class == "player")
					addLog("You completely block the " + attacker.getName() + "'s attack!");
				else if(attacker.class == "player")
					addLog("The " + this.getName() + " resists your attack completely!");
			}
		}

		else if(!evaded)
		{
			if(this.class == "player")
				addLog("You take the " + attacker.getName() + "'s attack!");
			else if(attacker.class == "player")
				addLog("The " + this.getName() + " takes your attack!");

			let stunRoll = getRandom();
			let stunMargin = 0.0125 * (attacker.weapon.weight + attacker.weapon.blunt + attacker.strength);

			if(stunRoll < stunMargin)
			{
				if(stunRoll > (stunMargin - ((this.stamina / this.maxStamina) / 12)))
				{
					this.stamina /= 3;

					if(this.class == "player")
						addLog("It's a concussive blow! Luckily you were stable enough to not be stunned, but you feel drained.", "color: orange;");
					else if(attacker.class == "player")
						addLog("You land a concussive blow, but the " + this.getName() + " manages to recover without being stunned!");
				}
				else
				{
					this.stun++;

					if(this.class == "player")
						addLog("Your vision swims from the attack, you've been stunned!", "color: orange;");
					else if(attacker.class == "player")
						addLog("You land a concussive blow, the " + this.getName() + " is stunned!");
				}
			}

			if(attacker.class == "monster" && attacker.stamina <= -5)
				addLog("The " + attacker.getName() + " appears to have exhausted itself!", "color: MediumTurquoise;");

		}

		if(attacker.weapon.poison > 0 && (blocked < damage && !evaded))
		{
			this.poison += attacker.weapon.poison;

			if(this.class == "player" && this.poison == attacker.weapon.poison)
				addLog("You've been poisioned!", "color: #0A0;");
		}



		this.damage(damage, attacker, null);
	}

	damage(amount, attacker, damageType)
	{
		if(attacker != undefined)
		{
			this.target = attacker.location;
			this.aggro = 10;
		}

		this.health -= amount;

		if(this.health <= 0)
			this.die(attacker, damageType);
	}

	die(killer, damageType)
	{
		if(this.class != "player")
			addLog("The " + this.getName() + " is dead.");

		let roll = Math.random();
		roll += (0.05 * this.level);
		let drop;

		if(this.itemDrop !== undefined)
		{
			if(roll > 0.8)
				drop = new item(getCommonDrop(this.level), this.location);
			else if(roll > 0.7 && drop === undefined) // Don't drop junk if we've already dropped something useful
				drop = new item((this.itemDrop === null ? "droppings" : this.itemDrop), this.location);
			else
				drop = null;
				
		}

		let tile = getWorld(this.location);

		if(tile.unit == this)
			tile.unit = null;

		for(let i = 0; i < units.length; i++)
		{
			if(units[i] == this)
				units.splice(i, 1);
		}

		if(this.class == "boss")
		{
			bossGameMusic.pause();
			gameStage = 3;
		}

		score += 10 * this.level;
		kills++;

		if(killer != undefined)
		{
			if(killer.class == "player" && killer != this)
				killer.addExp(this.level * getRandom(1, 3));
		}

		delete this;
	}

	addExp(amount)
	{
		if(amount === undefined)
			return false;

		this.exp += amount;

		if(this.exp < 0)
			this.exp = 0;

		let levels = 0;
		while(Math.pow(1.3, this.level + levels) <= this.exp)
		{
			this.exp -= Math.pow(1.3, this.level + levels);
			levels++;
		}

		if(levels > 0)
			this.levelup(levels);
	}

	levelup(amount)
	{
		if(amount === undefined)
			amount = 1;

		this.maxHealth += (2.5 * amount);
		this.health += this.maxHealth * 0.20;

		this.maxStamina += (5 * amount);
		this.stamina += this.maxStamina * 0.20;

		this.defence += (0.75 * amount);
		this.agility += (0.75 * amount);
		this.strength += (0.50 * amount);
		this.level += (1 * amount);

		if(this.class == "player")
		{
			addLog("You just advanced to level " + (this.level - 10) + ", congratulations!", "color: #FF0;");
		}
	}
}
