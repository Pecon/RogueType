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
		return {x: this.location, y: this.location};
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
			}
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

		}


		this.explode();
	}

	collideWall(tileBase)
	{
		switch(this.type)
		{
			case "fireball":
				addLog("The fireball slams into the " + tileBase.getName() + " and explodes!");
				break;
		}

		this.explode();
	}

	explode()
	{
		switch(this.type)
		{
			case "fireball":
				let location = this.getLocation();

				for(let x = location.x - 2; x <= location.x + 2; x++)
				{
					for(let y = location.y - 2; y <= location.y + 2; y++)
					{
						let tile = getWorld({x: x, y: y});

						if(!tile.base.permitsTravel)
							continue;

						if(tile.hazard !== null)
							tile.hazard.remove();

						tile.hazard = new hazard("bigfire");
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