class projectile
{
	constructor(typeName, location, vector)
	{
		this.class = "projectile";
		this.type = typeName;

		if(location === undefined || location === null)
		{
			throw "No location provided for projectile.";
			return;
		}

		if(vector === undefined || location === null)
		{
			throw "No vector provided for projectile.";
			return;
		}

		this.location = {x: location.x, y: location.y};
		this.rotation = {x: vector.x, y: vector.y};

		switch(typeName)
		{
			case "fireball":
				this.character = "*";
				this.directDamage = 9;
				break;

			case "firestorm":
				this.character = "*";
				this.directDamage = 30;
				break;

			case "giestflame":
				this.character = "*";
				this.directDamage = 5;
				break;

			case "magic_missle":
				this.character = "-";
				this.directDamage = 15;
				this.bouncesLeft = 3;

			default:
				throw "Unknown type for projectile " + typeName;
				return;
		}

		this.tile = undefined;
		let currentTile = getWorld(this.getLocation());

		if(currentTile.projectile !== null)
		{
			this.explode();
			currentTile.explode();
		}
		else
		{
			currentTile.projectile = this;
			this.tile = currentTile;
		}

		projectiles.push(this);
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

	getLocation()
	{
		return {x: Math.round(this.location.x), y: Math.round(this.location.y)};
	}

	getExactLocation()
	{
		return {x: this.location.x, y: this.location.y};
	}

	tick()
	{
		this.location = vectorAdd(this.getExactLocation(), this.rotation);
		this.tile.projectile = null;
		let newTile = getWorld(this.getLocation());

		if(newTile != this.tile)
		{
			if(newTile.projectile !== null)
			{
				this.explode();
				newTile.projectile.explode();
			}

			this.tile = newTile;
			this.tile.projectile = this;

			if(this.tile.unit !== null)
			{
				this.collideUnit(this.tile.unit);
				return;
			}

			if(!this.tile.base.permitsVision)
			{
				this.collideWall(this.tile.base);
				return;
			}
		}

		switch(this.type)
		{
			case "firestorm":
				if(this.tile.hazard !== null)
					this.tile.hazard.remove();

				this.tile.hazard = new hazard("bigfire");
				break;
		}
	}

	collideUnit(unit)
	{
		switch(this.type)
		{
			case "fireball":
				if(unit.class == "player")
					addLog("You're immolated by the fireball!");
				else
					addLog("The " + unit.getName() + " is immolated by the fireball!");

				break;

			case "firestorm":
				if(unit.class == "player")
					addLog("You're caught directly in the firestorm!");
				else if(unit.health < this.directDamage)
					addLog("The " + unit.getName() + " is vaporized by the firestorm!");
				else
					addLog("The " + unit.getName() + " is caught directly in the firestorm!");

				break;

			case "giestflame":
				if(unit.class == "player")
					addLog("You're burned by the giestflame!");
				else
					addLog("The " + unit.getName() + " is burned by the giestflame!");

				break;

			case "magic_missle":
				if(unit.class == "player")
					addLog("The magic missle shoves you down as it explodes on you!");
				else
					addLog("The magic missle explodes on " + unit.getName() + "!");

				break;



		}

		unit.health -= this.directDamage;
		this.explode();
	}

	collideWall(tileBase)
	{
		switch(this.type)
		{
			case "fireball":
				addLog("The fireball slams into the " + tileBase.getName().toLowerCase() + " and explodes!");
				break;

			case "firestorm":
				addLog("The firestorm ends as it crashes into the " + tileBase.getName().toLowerCase() + ".");
				break;

			case "giestflame":
				addLog("The giestflame fizzles out as it hits the " + tileBase.getName().toLowerCase() + ".");
				break;

			case "magic_missle":
				if(this.bouncesLeft > 0)
				{
					this.bouncesLeft--;
					this.rotation = vectorScale(this.rotation, -1);
					addLog("The magic missle bounces off the " + tileBase.getName().toLowerCase() + " like a rubber ball!");
					return;
				}
				else
					addLog("The magic missle explodes as it hits the " + tileBase.getName().toLowerCase() + "!");
		}

		this.explode();
	}

	explode()
	{
		switch(this.type)
		{
			case "fireball":
				let location = this.getLocation();
				console.log("fireball explosion");

				for(let x = location.x - 2; x <= location.x + 2; x++)
				{
					for(let y = location.y - 2; y <= location.y + 2; y++)
					{
						let tile = getWorld({x: x, y: y});

						if(!tile.base.permitsTravel)
							continue;

						if(tile.hazard !== null)
							tile.hazard.remove();

						if(tile.unit !== null)
							tile.unit.health -= 4;

						tile.hazard = new hazard("bigfire", tile.location);
					}
				}
				break;
		}

		this.remove();
	}

	remove()
	{
		for(let i = 0; i < projectiles.length; i++)
			if(projectiles[i] == this)
			{
				projectiles.splice(i, 1);
				break;
			}

		if(this.tile.projectile == this)
			this.tile.projectile = null;

	}
}