class hazard
{
	constructor(typeName, location)
	{
		this.class = "hazard";
		this.type = typeName;
		this.location = {x: location.x, y: location.y};
		this.useHazardFlash = true;
		let name = "";
		let description = "";
		let character = "?";
		let color = "#AAA";
		let lifetime = 0;

		switch(typeName)
		{
			case "fire":
				name = "Fire";
				description = "A small fire burns here.";
				character = "*";
				color = "orange";
				lifetime = 5;
				break;

			case "bigfire":
				name = "Huge fire";
				description = "A large fire burns here.";
				character = "*";
				color = "red";
				lifetime = 3;
				break;

			case "dragonfire":
				name = "Dragon Fire";
				description = "A tremendous fire rages here.";
				character = "#";
				color = "red";
				lifetime = 10;
				break;

			case "chilly":
				name = "Cold Zone";
				description = "The air here is below freezing.";
				character = "░";
				color = "cyan";
				this.useHazardFlash = false;
				lifetime = 15;
				break;

			case "rocks":
				name = "Falling rocks";
				description = "A ton of rocks are about to fall here!";
				character = "▓";
				color = "orange";
				lifetime = 1;
				break;
				
			case "speartrap_off":
				name = "Spear Trap (Inactive)";
				description = "Holes in the floor... suspicious.";
				character = ",";
				lifetime = -1;
				color: "inherit";
				this.useHazardFlash = false;
				break;
				
			case "speartrap_on":
				name = "Spear Trap (Active)";
				description = "Spears came through the floor!";
				character = "!";
				lifetime = 5;
				color: "inherit";
				this.useHazardFlash = false;
				break;

			default:
				throw "Unknown hazard type " + typeName;
				break;
		}

		this.name = name;
		this.description = description;
		this.character = character;
		this.color = color;
		this.lifetime = lifetime;

		if(location !== undefined)
		{
			let tile = getWorld(this.location);
			if(tile.hazard === null)
			{
				tile.hazard = this;
			}
		}

		startTicking(this);
	}

	getName()
	{
		return this.name;
	}

	getDescription()
	{
		return this.description;
	}

	getCharacter()
	{
		return this.character;
	}

	tick()
	{
		let tile = getWorld(this.location);

		switch(this.type)
		{
			case "fire":
				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("You're burned by the flames!", "color: orange;");

					tile.unit.damage(3 * tile.unit.fireResist, null, "fire");
				}
				break;

			case "bigfire":
				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("You're burned by the massive flames!", "color: orange;");

					tile.unit.damage(6 * tile.unit.fireResist, null, "fire");
				}
				break;

			case "dragonfire":
				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "color: orange;");

					tile.unit.damage((6 * tile.unit.fireResist) + 4, null, "fire");
				}
				break;

			case "chilly":
				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("It's freezing cold here!", "color: cyan;");

					tile.unit.stamina -= (10 * tile.unit.frostResist);
				}
				break;

			case "rocks":
				tile.base.remove();
				tile.base = new tileBase("halfWall", tile.location);

				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("You're brutally crushed by falling rocks!", "color: orange;");
					else
						addLog("The " + tile.unit.getName() + " is crushed by falling rocks.");

					tile.unit.stamina -= (20 * tile.unit.earthResist);
					tile.unit.stun++;
					tile.unit.damage(20 * tile.unit.earthResist, null, "earth");
				}

				break;
				
			case "speartrap_off":
				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("You're impaled by hidden spears!");
					else
						addLog("The " + tile.unit.getName() + " is impaled by hidden spears!");

					tile.unit.stun++;
					tile.unit.damage(4, null, "stab");

					this.remove();
					getWorld(this.location).hazard = new hazard("speartrap_on", this.location);
				}
				break;

			case "speartrap_on":
				if(tile.unit !== null)
				{
					if(tile.unit.class == "player")
						addLog("You walk through the spears.");
					else
						addLog("The " + tile.unit.getName() + " moves through the spears!");

					tile.unit.damage(2, null, "stab");
				}
				break;
		}

		if(this.lifeTime != -1)
		{
			this.lifetime--;
		}
		

		if(this.lifetime == 0)
		{
			this.remove();
		}
			
	}

	remove()
	{
		stopTicking(this);

		getWorld(this.location).hazard = null;

		switch(this.type)
		{
			case "bigfire":
				getWorld(this.location).hazard = new hazard("fire", this.location);
				break;

			case "dragonfire":
				getWorld(this.location).hazard = new hazard("bigfire", this.location);
				break;
				
			case "speartrap_on":
				getWorld(this.location).hazard = new hazard("speartrap_off", this.location);
				break;
		}
	}
}
