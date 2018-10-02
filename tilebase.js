class tileBase
{
	constructor(typeName, location)
	{
		let success = true;

		this.class = "tileBase";
		this.location = {x: location.x, y: location.y};
		this.type = typeName;
		this.discovered = false;
		this.locked = false;
		this.lockHealth = 0;

		let name, description, character, permitsTravel, permitsVision = undefined;

		switch(this.type)
		{
			case "wall":
				description = "A rigid stone wall that looks throughly impenetrable.";
				name = "Wall";
				character = '█';
				permitsTravel = false;
				permitsVision = false;
				break;

			case "fakeWall":
				description = "A rigid stone wall with a slightly glassy look to it. It still looks convincingly impenetrable.";
				name = "Wall";
				character = '█';
				permitsTravel = true;
				permitsVision = false;
				break;

			case "halfWall":
				description = "A pile of rubble here is clearly too unstable to climb over, but you can mostly see around it.";
				name = "Rubble";
				character = '▓';
				permitsTravel = false;
				permitsVision = true;
				break;

			case "floor":
				description = "There is open floorspace you can walk through here.";
				name = "Floor";
				character = '.';
				permitsVision = true;
				permitsTravel = true;
				break;

			case "door":
				description = "A crude wooden door.";
				name = "Door";
				character = '+';
				permitsVision = false;
				permitsTravel = true;

				if(Math.random() > 0.4)
				{
					this.locked = true;
				}
				break;

			case "strongDoor":
				description = "A very sturdy looking wooden door. It looks like it would be very difficult to break down if were locked...";
				name = "Sturdy Door";
				character = '+';
				permitsVision = false;
				permitsTravel = true;

				if(Math.random() > 0.6)
				{
					this.locked = true;
					this.lockHealth = getRandom(5, 12);

				}
				break;

			case "bossDoor":
				description = "A very sturdy looking wooden door. It looks like it would be very difficult to break down if were locked...";
				name = "Sturdy Door";
				character = '/';
				permitsVision = false;
				permitsTravel = true;
				this.locked = true;
				this.lockHealth = 10;
				break;

			case "sealedDoor":
				description = "A powerful magic seal protects this door from harm, and keeps it locked tight!";
				name = "Sealed Door";
				character = '░';
				permitsVision = false;
				permitsTravel = false;
				break;

			case "exitPortal":
				description = "A glowing green portal... It looks like home.";
				name = "Exit Portal";
				character = "օ";
				permitsVision = true;
				permitsTravel = true;
				break;
				
			case "altar":
				description = "A marble altar that glows with divine energy.";
				name = "Marble Altar";
				character = "ᅮ";
				permitsVision = true;
				permitsTravel = true;
				break;

			// Aesthetic tiles
			case "tree":
				description = "A very large tree stands here.";
				name = "Tree";
				character = "▲";
				permitsTravel = false;
				permitsVision = false;
				break;

			case "bush":
				description = "Some bushes are in the way here, but you should be able to push through them.";
				name = "Brush";
				character = "▵";
				permitsTravel = true;
				permitsVision = false;
				break;

			case "rock":
				description = "A huge boulder sits here.";
				name = "Boulder";
				character = "▢";
				permitsTravel = false;
				permitsVision = false;
				break;

			case "water":
				description = "This water is too deep to cross safely.";
				name = "Water";
				character = "≈";
				permitsTravel = false;
				permitsVision = true;
				break;

			case "path":
				description = "A paved road makes travel here easy.";
				name = "Road";
				character = " ";
				permitsTravel = true;
				permitsVision = true;
				break;

			default:
				description = "A nondescript tile. Something probably went wrong with the world generator.";
				name = "Glitch";
				character = '?';
				permitsTravel = false;
				permitsVision = true;

				console.log("error tile " + typeName + " not recognized.");
				success = false;
				break;
		}
		
		this.description = description;
		this.name = name;
		this.character = character;
		this.permitsTravel = permitsTravel;
		this.permitsVision = permitsVision;
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
		if(this.type == "door" || this.type == "strongDoor")
		{
			if(this.locked)
				return "+";
			else
				return "/";
		}

		return this.character;
	}

	moveTo(unit, checkOnly)
	{
		if(checkOnly === undefined)
			checkOnly = false;

		let message = null;
		let success = true;

		let tile = getWorld(this.location);

		if(tile.unit !== null)
		{
			if(unit.class == "boss" && tile.unit != unit)
			{
				if(unit.name == "Displacer Beast")
				{
					success = true;

					if(!checkOnly)
					{
						addLog("The " + unit.name + " opens a black portal to the void!", "color: red;");

						if(tile.unit.class == "player")
							addLog("You are sucked into the portal and destroyed instantly.", "color: red;");
						else
							addLog("The " + tile.unit.name + " is sucked into the portal and destroyed instantly!", "color: red;");


						tile.unit.health = 0;
						tile.unit.itemDrop = undefined;
						tile.unit.die();

						unit.stamina -= 10;
					}
				}
			}
			else if(tile.unit.canDisplace && !unit.canDisplace)
			{
				message = "You walk right past the " + tile.unit.name + ".";
				success = true;
			}
			else
			{
				message = "You walk right into the " + tile.unit.name + "!";
				success = false;
			}			
		}
		else
		{
			switch(this.type)
			{
				case "wall":
					message = "You clumsily smack directly into the wall, and feel foolish for doing so.";
					success = false;
					break;

				case "fakeWall":
					//message = "You approach the wall and realize it's mostly etherial, you're able to walk right through it even though it looked solid.";
					success = true;
					break;

				case "halfWall":
					message = "You try to pull yourself ontop of the rubble... But it has hardly any solidity and gives away from your limbs whenever you try to pull yourself up.";
					success = (unit.class == "boss" ? true : false);
					break;

				case "floor":
					message = null;
					break;

				case "door":
					if(this.locked)
					{
						message = "You push on the dingy wooden door, but it's locked. You can probably force it open with an attack.";
						success = false;
					}
					else
					{
						message = "The light wooden door swings open easily and you step through.";
						success = true;
					}

					break;

				case "strongDoor":
					if(this.locked)
					{
						message = "You push on the strong wooden door, but it's locked. You can probably force the lock open by attacking it a few times.";
						success = false;
					}
					else
					{
						message = "The strong wooden door's hinge resists as you push through, but you make it through the doorway. The hinge seems to hold a lot of tension, the door will slam shut pretty hard when you move on.";
					}

					break;

				case "bossDoor":
					if(unit.class != "player" || checkOnly)
					{
						success = false;
					}
					else
					{
						// Force them to move through the door
						unit.compulsiveAction = "moveDown";

						if(getWorld(southOf(unit.location)).unit !== null)
							getWorld(southOf(unit.location)).unit.die();

						addLog("As soon as you open the door, a magical force takes hold of you and flings you through the door...");
						gameMusic.pause();
						
						let location = this.location;
						this.remove();
						getWorld(location).base = new tileBase("sealedDoor", location);

						gameStage = 2;
						inventoryUpdate = true;

						success = true;
					}
					break;

				case "sealedDoor":
					message = "You futily shove and bang the magically sealed door, but it might as well be made of solid adamantium for how much it gives.";
					success = false;
					break;

				case "exitPortal":
					if(unit.class != "player" || checkOnly)
					{
						success = false;
					}
					else if(gameStage == 2)
					{
						message = "The portal refuses to let you enter it!";
						success = false;
					}
					else
					{
						addLog("You enter the portal and finally return home.");
						victoryMusic.play();

						addLog("In " + turnCount + " turns, you slew " + kills + " creatures and earned " + score + " points!", "color: #22F;");

						message = "Game over. Thanks for playing!";
						success = true;

						gameStage = 4;
					}
					break;

				case "altar": 
					message = "You climb onto the altar.";
					success = true;
					break;

				default:
					message = "You step into the glitch, and suddenly reappear where you were before." + this.typeName;
					success = false;
					break;
			}
		}
		

		if(message !== null && unit.class == "player" && !checkOnly)
			addLog(message);

		return success;
	}

	onLeave(unit)
	{
		switch(this.type)
		{
			case "strongDoor":
				if(Math.random() > 0.2)
				{
					if(unit.class == "player")
					{
						addLog("The door slams shut with a click!");
						this.locked = true;
						this.lockHealth = getRandom(2, 10);
					}
				}
				break;

			case "sealedDoor":
				addLog("As soon as you're past the door, it slams shut and a huge magical seal on the door reveals itself! I don't think it can be opened anymore...");
				bossIntroMusic.play();

				break;		
		}
	}

	attack(unit)
	{
		let message, success;

		switch(this.type)
		{
			case "wall":
				message = "You slam your " + unit.weapon.getName() + " into the wall. There is no give at all, and you're slightly stunned by the incredible shock of it.";
				success = false;
				unit.stun += 1;
				break;

			case "fakeWall":
				message = "You swing your " + unit.weapon.getName() + " at the wall. Instead of hitting it, your " + unit.weapon.getName() + " suddenly phases through the wall, like it wasn't there at all! Is this wall just an illusion?";
				success = false;
				break;

			case "halfWall":
				message = "You swing your " + unit.weapon.getName() + " at the rubble. The force of your swing propels it partially into the rubble, but succeeds at nothing else.";
				success = false;
				break;

			case "floor":
				message = "You swing at the empty air.";
				success = false;
				break;

			case "door":
				if(this.locked)
				{
					message = "You " + unit.weapon.attackDescriptor + " your " + unit.weapon.getName() + " into the dingy wooden door. The lock is forced back into the unlocked position with a clang!";
					success = true;
					this.locked = false;
					this.lockHealth = 0;
				}
				else
				{
					message = "You " + unit.weapon.attackDescriptor + " your " + unit.weapon.getName() + " into the dingy wooden door. The door isn't locked, so it flails around on it's hinge for a few moments from the attack.";
					success = true;
				}

				break;

			case "strongDoor":
				if(this.locked)
				{
					this.lockHealth -= unit.weapon.blunt + unit.weapon.weight;

					if(this.lockHealth > 0)
					{
						message = "You " + unit.weapon.attackDescriptor + " your " + unit.weapon.getName() + " into the strong wooden door. The door shudders and gets noticably weaker but remains locked for now.";
						success = false;
					}
					else
					{
						message = "You " + unit.weapon.attackDescriptor + " your " + unit.weapon.getName() + " into the strong wooden door. With a clang the lock is finally forced back into the unlocked position, and the door swings open a bit from the remainder of the attack.";
						success = true;
						this.locked = false;
						this.lockHealth = 0;
					}
				}
				else
				{
					message = "You " + unit.weapon.attackDescriptor + " your " + unit.weapon.getName() + " into the strong wooden door. It's not locked, so it swings open a bit from the attack and then slowly settles back into position.";
					success = true;
				}

				break;

			case "bossDoor":
				message = "You " + unit.weapon.attackDescriptor + " your " + unit.weapon.getName() + " into the strong wooden door. It's not locked, so it swings open a bit from the attack and then slowly settles back into position.";
				success = true;
				break;

			case "sealedDoor":
				message = "You futily swing your " + unit.weapon.getName() + " at the magically sealed door, but it might as well be made of solid adamantium for how much it gives.";
				success = false;
				break;
				
			case "altar":
				message = "You smash your " + unit.weapon.getName() + " at the magically altar, but its stone stays pristine.";
				success = false;
				break;

			default:
				message = "You attack the glitch, and suddenly appear again in the same position but with your weapon no longer raised.";
				success = true;
				break;
		}

		if(unit.class == "player")
			addLog(message);

		return success;
	}

	remove()
	{
		let tile = getWorld(this.location);

		tile.base = null;

		return delete this;
	}
}