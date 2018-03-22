class unit
{
	constructor(typeName, location)
	{
		this.class = "monster";
		this.location = location;
		this.itemDrop = null;
		let maxHealth = 100;
		let maxStamina = 100;
		let weapon = "fists";
		let character = '?';
		let description = "";
		let name = "";
		let perception = 5;
		let defence = 5;
		let agility = 5;
		let level = 1;

		switch(typeName)
		{
			case "player":
				this.class = "player";
				name = "You";
				description = "A nondescript protagonist.";
				character = '@';
				weapon = "fists";

				maxHealth = 25;
				maxStamina = 50;
				level = 10;
				break;

			case "goblin":
				name = "Goblin";
				description = "An ugly green goblin.";
				character = "G";
				weapon = "goblin_fists";
				this.itemDrop = "goblin_toe";

				maxHealth = 7;
				maxStamina = 10;
				perception = 1;
				defence = 2;
				agility = 1;
				level = 1;
				break;

			case "rat":
				name = "Giant Rat";
				description = "An absolutely massive rat.";
				character = "R";
				weapon = "rat_teeth";
				this.itemDrop = "rat_meat";

				maxHealth = 3;
				maxStamina = 15;
				perception = 2;
				defence = 1;
				agility = 3;
				level = 1;
				break;

			case "skeleton":
				name = "Skeleton";
				description = "An animated skeleton held together with weak magic.";
				character = "S";
				weapon = "ancient_sword";
				this.itemDrop = "skeleton_bone";

				maxHealth = 4;
				maxStamina = 25;
				perception = 0;
				defence = 1;
				agility = 0;
				level = 2;
				break;

			case "bat":
				name = "Giant Bat";
				description = "Annoying flappy thing.";
				character = "B";
				weapon = "bat_teeth";
				this.itemDrop = "bat_wing";

				maxHealth = 2;
				maxStamina = 5;
				perception = 3;
				defence = 0;
				agility = 5;
				level = 2;
				break;

			case "troll":
				name = "Troll";
				description = "A massive club-wielding brute.";
				character = "T";
				weapon = "club";
				this.itemDrop = "troll_fat";

				maxHealth = 20;
				maxStamina = 30;
				perception = 1;
				defence = 2;
				agility = 1;
				level = 3;
				break;

			case "shade":
				name = "Ancient Shade";
				description = "A terrifying and powerful ancient spirit.";
				character = "A";
				weapon = "longsword";
				this.itemDrop = "shade_essence";

				maxHealth = 12;
				maxStamina = 25;
				perception = 2;
				defence = 3;
				agility = 2;
				level = 3;
				break;

			case "imp":
				name = "Fire Imp";
				description = "A small, combustive demon.";
				character = "I";
				weapon = "imp_claws";
				this.itemDrop = "imp_ashes";

				maxHealth = 15;
				maxStamina = 15;
				perception = 3;
				defence = 1;
				agility = 4;
				level = 3;
				break;

			case "drake":
				name = "Lesser Drake";
				description = "A young but still terrifying dragon.";
				character = "D";
				weapon = "firebreath";

				maxHealth = 50;
				maxStamina = 50;
				perception = 3;
				defence = 4;
				agility = 1;
				level = 4;
				break;

			case "beast":
				name = "Displacer Beast";
				description = "A horrifying monster from the abyss, can open small portals to the abyss where certain destruction awaits!";
				character = "B";
				weapon = "beast_tail";

				maxHealth = 150;
				maxStamina = 200;
				perception = 5;
				defence = 5;
				agility = 1;
				level = 5;
				break;

		}

		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.maxStamina = maxStamina;
		this.stamina = maxStamina;
		this.weapon = new item(weapon);
		this.character = character;
		this.description = description;
		this.name = name;
		this.perception = perception;
		this.defence = defence;
		this.agility = agility;
		this.level = level;

		this.stun = 0;

		units.push(this);
	}

	tick()
	{
		if(this.health <= 0)
		{
			this.die();
			return;
		}

		//this.health += 0.25;

		if(this.health > this.maxHealth)
			this.health = this.maxHealth;

		this.stamina += 5;

		if(this.stamina > this.maxStamina)
			this.stamina = this.maxStamina;

		if(this.stun > 0)
		{
			if(this.class != "player")
				addLog("The " + this.name + " is stunned.");

			if(this.stamina >= 10)
			{
				this.stun--;
				this.stamina -= 10;
			}
			else if(this.class == "player")
			{
				addLog("You are currently too weak to recover from your stun.");
			}

			if(this.stun <= 0 && this.class == "player")
				yourTurn = true;
			return;
		}

		if(this.class == "player")
		{
			let tile = getWorld(this.location);

			for(let i = tile.items.length; i > 0; i--)
			{
				let pickup = tile.items.pop();
				inventory.push(pickup);
				pickup.location = null;
				inventoryUpdate = true;
				addLog("You pick up the " + pickup.getName() + ".");
			}

			return;
		}
		
		let playerDist = vectorDist(this.location, player.location);

		if(playerDist > 100)
		{
			// Don't bother doing ai stuff if they're so far away
			return;
		}
		else if(playerDist == 1)
		{
			// Attack!
			if(this.stamina > 0)
			{
				player.attack(this);
			}
		}
		else if(playerDist <= this.perception + 2)
		{
			// Move towards the player
			let distanceX = this.location.x - player.location.x;
			let distanceY = this.location.y - player.location.y;
			let directionX, directionY, move = null;

			if(distanceX > 0)
				directionX = getWorld(westOf(this.location));
			else if(distanceX < 0)
				directionX = getWorld(eastOf(this.location));
			else
				directionX = getWorld(this.location);

			if(distanceY > 0)
				directionY = getWorld(northOf(this.location));
			else if(distanceY < 0)
				directionY = getWorld(southOf(this.location));
			else
				directionY = getWorld(this.location);

			if(Math.abs(distanceX) >= Math.abs(distanceY))
			{
				// y-distance is shorter, move along x-axis towards player
				if(directionX.unit !== null || directionX.base.moveTo(this))
					move = directionX;
			}

			if(Math.abs(distanceY) >= Math.abs(distanceX) || move === null)
			{
				// Move along y-axis
				if(directionY.unit !== null || directionY.base.moveTo(this))
					move = directionY;
			}

			if(Math.abs(distanceY) >= Math.abs(distanceX) && move === null)
			{
				// Edge case
				if(directionX.unit !== null || directionX.base.moveTo(this))
					move = directionX;
			}

			if(move !== null)
			{
				this.moveTo(move.location);
			}
		}
		else
		{
			if(Math.random() > 0.8)
			{
				//Wait
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

				while(moves.length > 0)
				{
					let index = getRandom(0, moves.length - 1);
					let move = moves[index];

					if(move === undefined)
						moves.splice(index, 1);
					else if(move.base.moveTo(this) && move.unit === null)
					{
						this.moveTo(move.location);
						break;
					}
					else
						moves.splice(index, 1);
				}

			}
		}

	}

	moveTo(location)
	{
		if(this.stamina < 2.5)
		{
			return false;
		}

		let tile = getWorld(location);

		// Test if the tile is accessible
		let accessible = tile.base.moveTo(this);

		if(!accessible)
			return false;
		

		tile.unit = this;
		let leaveTile = getWorld(this.location);

		leaveTile.unit = null;
		leaveTile.base.onLeave(this);

		this.location = location;
		this.stamina -= 4.5;
	}

	attack(attacker)
	{
		let damage = attacker.weapon.damage + attacker.weapon.weight;
		attacker.stamina -= (attacker.weapon.weight * 2.5) + 5;

		// Crit roll
		if(Math.random() < 0.05)
		{
			damage *= 2;

			if(this == player)
				addLog("The " + attacker.name + "'s " + attacker.weapon.name + " crackles with electricity, a critical attack coming right at you!");
			else if(attacker == player)
				addLog("Your " + attacker.weapon.name + " crackles with electricity, a critical attack!");
		}
		else
		{
			if(this == player)
				addLog("The " + attacker.name + " " + attacker.weapon.attackDescriptor + "s at you with their " + attacker.weapon.name + ".");
			else if(attacker == player)
				addLog("You " + attacker.weapon.attackDescriptor + " your " + attacker.weapon.name + " at the " + this.name + ".");
		}
		

		

		// Agility
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
			if(this == player)
				addLog("You nimbly dodge the " + attacker.name + "'s attack.");
			else if(attacker == player)
				addLog("The " + this.name + " " + (this.agility > 2 ? "nimbly" : "barely") + " dodges your attack.");
		}

		else if(blocked > 0)
		{
			damage -= blocked;

			if(damage < 0)
				damage = 0;

			if(damage > 0)
			{
				if(this == player)
					addLog("You manage to partially block the " + attacker.name + "'s attack.");
				else if(attacker == player)
					addLog("The " + this.name + " blocks some of your attack.");
			}
			else
			{
				if(this == player)
					addLog("You completely block the " + attacker.name + "'s attack!");
				else if(attacker == player)
					addLog("The " + this.name + " blocks your attack completely!");
			}
		}

		else
		{
			if(this == player)
				addLog("You take the " + attacker.name + "'s attack!");
			else if(attacker == player)
				addLog("The " + this.name + " takes your attack!");

			let stunRoll = getRandom();
			let stunMargin = 0.0125 * attacker.weapon.weight;

			if(stunRoll > (1.0 - stunMargin))
			{
				if(stunRoll < (1.0 - stunMargin + ((this.stamina / this.maxStamina) / 12)))
				{
					this.stamina /= 3;

					if(this == player)
						addLog("It's a concussive blow! Luckily you were stable enough to not be stunned, but you feel drained.");
					else if(attacker == player)
						addLog("You land a concussive blow, but the " + this.name + " manages to recover without being stunned!");
				}
				else
				{
					this.stun++;

					if(this == player)
						addLog("Your vision swims from the attack, you've been stunned!");
					else if(attacker == player)
						addLog("You land a concussive blow, the " + this.name + " is stunned!");
				}
			}

		}

		this.health -= damage;

		if(this.health <= 0)
			this.die();

	}

	die()
	{
		addLog("The " + this.name + " is dead.");

		let roll = Math.random();
		roll += (0.05 * this.level);
		let drop;

		if(roll < 0.4)
			drop = null;
		else if(roll < 0.9)
			drop = new item((this.itemDrop === null ? "droppings" : this.itemDrop), this.location);
		else
			drop = new item(otherDrops[getRandom(0, otherDrops.length - 1)], this.location);

		let tile = getWorld(this.location);
		tile.unit = null;

		for(let i = 0; i < units.length; i++)
		{
			if(units[i] == this)
				units.splice(i, 1);
		}

		delete this;
	}
}