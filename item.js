class item
{
	constructor(type, location)
	{
		if(location === undefined)
		{
			location = null;
		}
		else
		{
			groundItems.push(this);
		}

		this.class = "junk";
		this.name = "Error";
		this.realName = null;
		this.character = "!";
		this.description = "An item with no usable properties.";
		this.location = location;
		this.dropped = false;

		switch(type)
		{
			case "droppings":
				this.class = "junk";
				this.name = "Monster Droppings";
				this.character = "d";
				this.description = "Ew.";
				break;

			case "rat_meat":
				this.class = "junk";
				this.name = "Rat Meat";
				this.character = "m";
				this.description = "Probably not good for eating.";
				break;

			case "goblin_toe":
				this.class = "junk";
				this.name = "Goblin Toe";
				this.character = "t";
				this.description = "A goblin's big toe. It's smelly.";
				break;

			case "bat_wing":
				this.class = "junk";
				this.name = "Bat Wing";
				this.character = "w";
				this.description = "Thin, supple bat wing.";
				break;

			case "skeleton_bone":
				this.class = "junk";
				this.name = "Femur";
				this.character = "b";
				this.description = "A human femur bone.";
				break;

			case "troll_fat":
				this.class = "junk";
				this.name = "Troll Fat";
				this.character = "f";
				this.description = "Slimy troll fat.";
				break;

			case "shade_essence":
				this.class = "junk";
				this.name = "Shade Essence";
				this.character = "e";
				this.description = "A fine black powder.";
				break;

			case "imp_ashes":
				this.class = "junk";
				this.name = "Impeous Ashes";
				this.character = "a";
				this.description = "Ashes from a dead demon.";
				break;

			case "disc":
				this.class = "junk";
				this.name = "Disc";
				this.character = "d";
				this.description = "A tiny disc.";
				break;

			case "coin":
				this.class = "junk";
				this.name = "Rusty Coin";
				this.character = "c";
				this.description = "A rusty old coin.";
				break;

			case "key":
				this.class = "junk";
				this.name = "Battered Key";
				this.character = "k";
				this.description = "A battered old key.";
				break;

			case "fists":
				this.class = "weapon";
				this.name = "fist";
				this.character = "f";
				this.description = "hands";
				this.weight = 1;
				this.damage = 1;
				this.attackDescriptor = "swing";
				this.attackDescriptorPluralString = "s at";
				break;

			case "goblin_fists":
				this.class = "weapon";
				this.name = "fist";
				this.character = "f";
				this.description = "hands";
				this.weight = 2;
				this.damage = 0;
				this.attackDescriptor = "swing";
				this.attackDescriptorPluralString = "s at";
				break;

			case "rat_teeth":
				this.class = "weapon";
				this.name = "teeth";
				this.character = '?';
				this.description = "pointy rat teeth";
				this.weight = 0;
				this.damage = 1;
				this.attackDescriptor = "bite";
				break;

			case "ancient_sword":
				this.class = "weapon";
				this.name = "sword";
				this.character = '?';
				this.description = "old rusty sword";
				this.weight = 2;
				this.damage = 2;
				this.attackDescriptor = "swing";
				this.attackDescriptorPluralString = "s at";
				break;

			case "bat_teeth":
				this.class = "weapon";
				this.name = "teeth";
				this.character = '?';
				this.description = "pointy bat teeth";
				this.weight = 0;
				this.damage = 1;
				this.attackDescriptor = "strike";
				break;

			case "club":
				this.class = "weapon";
				this.name = "club";
				this.character = 'c';
				this.description = "brutal club";
				this.weight = 4;
				this.damage = 1;
				this.attackDescriptor = "clobber";
				break;

			case "imp_claws":
				this.class = "weapon";
				this.name = "claw";
				this.character = '?';
				this.description = "deadly sharp demon claws";
				this.weight = 0;
				this.damage = 7;
				this.attackDescriptor = "swipe";
				this.attackDescriptorPluralString = "s at";
				break;

			case "beast_tail":
				this.class = "weapon";
				this.name = "tail";
				this.character = '?';
				this.description = "massive, spiked tail";
				this.weight = 1;
				this.damage = 4;
				this.attackDescriptor = "swipe";
				this.attackDescriptorPluralString = "s at";
				break;

			case "longsword":
				this.class = "weapon";
				this.name = "longsword";
				this.character = 'l';
				this.description = "a heavy, long and sharp blade";
				this.weight = 3;
				this.damage = 3;
				this.attackDescriptor = "swing";
				this.attackDescriptorPluralString = "s at";
				break;

			case "bat":
				this.class = "weapon";
				this.name = "bat";
				this.character = 'b';
				this.description = "a wooden bat";
				this.weight = 2;
				this.damage = 1;
				this.attackDescriptor = "swing";
				this.attackDescriptorPluralString = "s at";
				break;

			case "rapier":
				this.class = "weapon";
				this.name = "rapier";
				this.character = 'r';
				this.description = "a light, slender and pointy blade";
				this.weight = 1;
				this.damage = 3;
				this.attackDescriptor = "thrust";
				this.attackDescriptorPluralString = "s at";
				break;

			case "mace":
				this.class = "weapon";
				this.name = "mace";
				this.character = 'm';
				this.description = "a heavy mace";
				this.weight = 4;
				this.damage = 0;
				this.attackDescriptor = "clobber";
				break;

			case "sledgehammer":
				this.class = "weapon";
				this.name = "sledgehammer";
				this.character = 's';
				this.description = "an incredibly heavy hammer";
				this.weight = 7;
				this.damage = 0;
				this.attackDescriptor = "crush";
				this.attackDescriptorPluralString = "es";
				break;

			case "greatsword":
				this.class = "weapon";
				this.name = "greatsword";
				this.character = 'g';
				this.description = "a massive sword";
				this.weight = 4;
				this.damage = 4;
				this.attackDescriptor = "heave";
				this.attackDescriptorPluralString = "s at";
				break;

			case "health_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Health Potion";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = 15;
				this.staminaEffect = 0;
				break;

			case "stamina_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Stamina Potion";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = 0;
				this.staminaEffect = 50;
				break;

			case "energy_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Energy Potion";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = 5;
				this.staminaEffect = 30;
				break;

			case "refresh_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Refreshing Potion";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = 10;
				this.staminaEffect = 20;
				break;

			case "posion_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Deadly Poison";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = -13;
				this.staminaEffect = 0;
				break;

			case "fatigue_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Weakness";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = 0;
				this.staminaEffect = -40;
				break;

			case "cursed_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Cursed Energy Potion";
				this.character = 'p';
				this.description = "A small flask filled with a potion.";
				this.healthEffect = -5;
				this.staminaEffect = -13;
				break;

		}

		if(this.class == "weapon")
		{ 
			// if(this.attackDescriptorPlural === undefined)
			// 	this.attackDescriptorPlural = true;

			if(this.attackDescriptorPluralString === undefined)
				this.attackDescriptorPluralString = "s";
		}

		if(location !== null)
			this.moveTo(location);
	}

	getName()
	{
		if(this.realName === null)
			return this.name;

		for(let i = 0; i < knownItems.length; i++)
		{
			if(this.realName == knownItems[i])
				return this.realName;
		}

		return this.name;
	}

	moveTo(location)
	{
		let tile = getWorld(location);

		if(!tile.base.permitsTravel)
		{
			delete this;
			return;
		}

		if(this.position !== null)
		{
			let currentTile = getWorld(this.location);

			for(let i = 0; i < currentTile.items.length; i++)
				if(currentTile.items[i] == this)
				{
					currentTile.items.splice(i, 1);
					break;
				}
		}
		
		tile.items.push(this);
		this.location = location;
	}

	remove()
	{
		let currentTile = getWorld(this.location);

		for(let i = 0; i < currentTile.items.length; i++)
			if(currentTile.items[i] == this)
			{
				currentTile.items.splice(i, 1);
				break;
			}

		for(let j = 0; j < groundItems.length; j++)
			if(groundItems[j] == this)
			{
				groundItems.splice(j, 1);
				break;
			}

		return delete this;
	}
}