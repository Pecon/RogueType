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

	}

	collide(collided)
	{

	}

	remove()
	{

	}
}