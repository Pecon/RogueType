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
		this.vector = {x: vector.x, y: vector.y};

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
		
	}

	collide(collided)
	{

	}

	remove()
	{

	}
}