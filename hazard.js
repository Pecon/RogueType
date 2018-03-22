class hazard
{
	constructor(typeName, location)
	{
		this.class = "hazard";
		this.type = typeName;
		this.location = {x: location.x, y: location.y};
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
				description = "A tremendous fire burns here.";
				character = "#";
				color = "red";
				lifetime = 10;
				break;

			case "rocks":
				name = "Falling rocks";
				description = "A ton of rocks are about to fall here!";
				character = "▓";
				color = "orange";
				lifetime = 1;
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
					tile.unit.health -= 2;

					if(tile.unit.class == "player")
						addLog("You're burned by the flames!", "color: orange;");
				}
				break;

			case "bigfire":
				if(tile.unit !== null)
				{
					tile.unit.health -= 4;

					if(tile.unit.class == "player")
						addLog("You're burned by the massive flames!", "color: orange;");
				}

			case "dragonfire":
				if(tile.unit !== null)
				{
					tile.unit.health -= 8;

					if(tile.unit.class == "player")
						addLog("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "color: orange;");
				}
				break;

			case "rocks":
				tile.base.remove();
				tile.base = new tileBase("halfWall", tile.location);

				if(tile.unit !== null)
				{
					tile.unit.health -= 40;
					tile.unit.stamina -= 20;
					tile.unit.stun++;

					if(tile.unit.class == "player")
						addLog("You're brutally crushed by falling rocks!", "color: orange;");
					else
						addLog("The " + tile.unit.getName() + " is crushed by falling rocks.");
				}

				break;
		}

		this.lifetime--;

		if(this.lifetime <= 0)
			this.remove();
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
		}
	}
}