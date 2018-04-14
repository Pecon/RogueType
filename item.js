class item
{
	constructor(type, location)
	{
		if(location === undefined)
		{
			location = null;
			this.location = null;
		}
		else
		{
			this.location = {x: location.x, y: location.y};
			groundItems.push(this);
		}

		this.type = type;
		this.class = "junk";
		this.name = "Error";
		this.realName = null;
		this.character = "!";
		this.description = "An item with no usable properties.";
		this.dropped = false;
		this.canDrop = true;
		this.canStack = false;
		this.rareLoot = false;

		switch(type)
		{
			case "droppings":
				this.class = "junk";
				this.name = "Monster Droppings";
				this.character = "d";
				this.description = "Ew.";
				this.canStack = true;
				break;

			case "rat_meat":
				this.class = "junk";
				this.name = "Rat Meat";
				this.character = "m";
				this.description = "Probably not good for eating.";
				this.canStack = true;
				break;

			case "goblin_toe":
				this.class = "junk";
				this.name = "Goblin Toe";
				this.character = "t";
				this.description = "A goblin's big toe. It's smelly.";
				this.canStack = true;
				break;

			case "bat_wing":
				this.class = "junk";
				this.name = "Bat Wing";
				this.character = "w";
				this.description = "Thin, supple bat wing.";
				this.canStack = true;
				break;

			case "spider_body":
				this.class = "junk";
				this.name = "Spider Carcass";
				this.character = "c";
				this.description = "The carcass of a dead spider.";
				this.canStack = true;
				break;

			case "skeleton_bone":
				this.class = "junk";
				this.name = "Femur";
				this.character = "b";
				this.description = "A human femur bone.";
				this.canStack = true;
				break;

			case "kobold_candle":
				this.class = "junk";
				this.name = "candle";
				this.character = "c";
				this.description = "A partially used candle from a kobold.";
				this.canStack = true;
				break;

			case "troll_fat":
				this.class = "junk";
				this.name = "Troll Fat";
				this.character = "f";
				this.description = "Slimy troll fat.";
				this.canStack = true;
				break;

			case "shade_essence":
				this.class = "junk";
				this.name = "Shade Essence";
				this.character = "e";
				this.description = "A fine black powder.";
				this.canStack = true;
				break;

			case "imp_ashes":
				this.class = "junk";
				this.name = "Impeous Ashes";
				this.character = "a";
				this.description = "Ashes from a dead demon.";
				this.canStack = true;
				break;

			case "snake_skin":
				this.class = "junk";
				this.name = "Snake Skin";
				this.character = "s";
				this.description = "Scaly skin from a giant snake.";
				this.canStack = true;
				break;

			case "disc":
				this.class = "junk";
				this.name = "Disc";
				this.character = "d";
				this.description = "A tiny disc.";
				this.canStack = true;
				break;

			case "coin":
				this.class = "junk";
				this.name = "Rusty Coin";
				this.character = "c";
				this.description = "A rusty old coin.";
				this.canStack = true;
				break;

			case "key":
				this.class = "junk";
				this.name = "Battered Key";
				this.character = "k";
				this.description = "A battered old key.";
				this.canStack = true;
				break;
				
			case "corpseHero": 
				this.class = "junk";
				this.name = "Hero Skull";
				this.character = "k";
				this.description = "The skull of a heroic champion that perished in the dungeon.";
				this.canStack = true;
				break;

			case "corpseCleric": 
				this.class = "junk";
				this.name = "Priest Skull";
				this.character = "k";
				this.description = "The skull of a lowly healer that perished in the dungeon.";
				this.canStack = true;
				break;				

			case "fists":
				this.class = "weapon";
				this.name = "fist";
				this.character = "f";
				this.description = "hands";
				this.weight = 1;
				this.blunt = 1;
				this.blade = 0;
				this.attackDescriptor = "swing";
				this.baseWeapon = true;
				this.canDrop = false;
				break;

			case "goblin_fists":
				this.class = "weapon";
				this.name = "fist";
				this.character = "f";
				this.description = "hands";
				this.weight = 2;
				this.blunt = 2;
				this.blade = 0;
				this.attackDescriptor = "swing";
				this.baseWeapon = true;
				break;

			case "pickaxe":
				this.class = "weapon";
				this.name = "pickaxe";
				this.character = "?";
				this.description = "a pickaxe";
				this.weight = 2;
				this.blunt = 2;
				this.blade = 1;
				this.attackDescriptor = "swing";
				this.baseWeapon = true;
				break;

			case "rat_teeth":
				this.class = "weapon";
				this.name = "teeth";
				this.character = '?';
				this.description = "pointy rat teeth";
				this.weight = 0;
				this.blunt = 0;
				this.blade = 3;
				this.attackDescriptor = "lunge";
				this.baseWeapon = true;
				break;

			case "spider_teeth":
				this.class = "weapon";
				this.name = "mandibles";
				this.character = '?';
				this.description = "pointy rat teeth";
				this.weight = 1;
				this.blunt = 0;
				this.blade = 1.5;
				this.poison = 3;
				this.attackDescriptor = "spring";
				this.baseWeapon = true;
				break;

			case "ancient_sword":
				this.class = "weapon";
				this.name = "sword";
				this.character = '?';
				this.description = "old rusty sword";
				this.weight = 2;
				this.blunt = 1;
				this.blade = 2;
				this.attackDescriptor = "swing";
				this.baseWeapon = true;
				break;

			case "bat_teeth":
				this.class = "weapon";
				this.name = "teeth";
				this.character = '?';
				this.description = "pointy bat teeth";
				this.weight = 0;
				this.blunt = 0;
				this.blade = 2;
				this.attackDescriptor = "swoop";
				this.baseWeapon = true;
				break;

			case "club":
				this.class = "weapon";
				this.name = "club";
				this.character = 'c';
				this.description = "brutal club";
				this.weight = 4;
				this.blunt = 5;
				this.blade = 0;
				this.attackDescriptor = "swing";
				this.baseWeapon = true;
				break;

			case "imp_claws":
				this.class = "weapon";
				this.name = "claw";
				this.character = '?';
				this.description = "deadly sharp demon claws";
				this.weight = 0;
				this.blunt = 0;
				this.blade = 7;
				this.attackDescriptor = "lunge";
				this.baseWeapon = true;
				break;

			case "cobra_fangs":
				this.class = "weapon";
				this.name = "fang";
				this.character = '?';
				this.description = "long fearsome cobra fangs, glistening with venom";
				this.weight = 0;
				this.blunt = 0;
				this.blade = 2;
				this.poison = 5;
				this.attackDescriptor = "spring";
				this.baseWeapon = true;
				break;

			case "dragon_tail":
				this.class = "weapon";
				this.name = "tail";
				this.character = '?';
				this.description = "massive, spiked tail";
				this.weight = 1;
				this.blunt = 4;
				this.blade = 1;
				this.attackDescriptor = "swipe";
				this.baseWeapon = true;
				break;

			case "beast_tail":
				this.class = "weapon";
				this.name = "tail";
				this.character = '?';
				this.description = "massive, spiked tail";
				this.weight = 1;
				this.blunt = 4;
				this.blade = 1;
				this.attackDescriptor = "swipe";
				this.baseWeapon = true;
				break;

			case "longsword":
				this.class = "weapon";
				this.name = "longsword";
				this.character = 'l';
				this.description = "A heavy, long and sharp blade. It looks like a very effective weapon. It's somewhat heavy.";
				this.weight = 3;
				this.blunt = 1;
				this.blade = 4;
				this.attackDescriptor = "swing";
				break;

			case "bat":
				this.class = "weapon";
				this.name = "bat";
				this.character = 'b';
				this.description = "A wooden bat. It seems like a poor choice of weapon, but better than nothing. It's not very heavy.";
				this.weight = 2;
				this.blunt = 2;
				this.blade = 0;
				this.attackDescriptor = "swing";
				break;

			case "knuckles":
				this.class = "weapon";
				this.name = "brass knuckles";
				this.character = 'b';
				this.description = "Some brass knuckles. It seems like a poor choice of weapon, but better than nothing. It hardly weighs anything.";
				this.weight = 1;
				this.blunt = 1;
				this.blade = 1;
				this.attackDescriptor = "swing";
				break;

			case "dagger":
				this.class = "weapon";
				this.name = "dagger";
				this.character = 'd';
				this.description = "A small dagger. It seems like a poor choice of weapon, but better than nothing. It hardly weighs anything.";
				this.weight = 1;
				this.blunt = 0;
				this.blade = 2;
				this.attackDescriptor = "thrust";
				break;

			case "rapier":
				this.class = "weapon";
				this.name = "rapier";
				this.character = 'r';
				this.description = "A light, slender and pointy blade. It looks like a moderately effective weapon. It's not very heavy.";
				this.weight = 2;
				this.blunt = 0;
				this.blade = 3;
				this.attackDescriptor = "thrust";
				break;

			case "mace":
				this.class = "weapon";
				this.name = "mace";
				this.character = 'm';
				this.description = "A heavy, spiked mace. It looks like a fairly effective weapon. It's very heavy.";
				this.weight = 4;
				this.blunt = 4;
				this.blade = 0;
				this.attackDescriptor = "hoist";
				break;

			case "sledgehammer":
				this.class = "weapon";
				this.name = "sledgehammer";
				this.character = 's';
				this.description = "An incredibly heavy hammer. It looks like an amazingly effective weapon. It's extremely heavy.";
				this.weight = 7;
				this.blunt = 7;
				this.blade = 0;
				this.attackDescriptor = "heave";
				break;

			case "greatsword":
				this.class = "weapon";
				this.name = "greatsword";
				this.character = 'g';
				this.description = "A massive, powerful sword. It looks like a very effective weapon. It's very heavy.";
				this.weight = 5;
				this.blunt = 1;
				this.blade = 5;
				this.attackDescriptor = "heave";
				break;

			case "flail":
				this.class = "weapon";
				this.name = "Flail";
				this.character = 'f';
				this.description = "A massive, spiked flail on a giant steel chain. It looks like an amazingly effective weapon. It's ridiculously heavy.";
				this.weight = 10;
				this.blunt = 5;
				this.blade = 3;
				this.attackDescriptor = "heave";
				break;

			case "zweihander":
				this.class = "weapon";
				this.name = "zweihander";
				this.character = "z";
				this.description = "A fearsome, wildly oversized blade which is somehow much lighter than it looks. This must be a rare weapon! It's very heavy.";
				this.weight = 5;
				this.blunt = 2;
				this.blade = 8;
				this.attackDescriptor = "heave";
				break;

			case "odachi":
				this.class = "weapon";
				this.name = "ōdachi";
				this.character = "o";
				this.description = "Basically an oversized katana. This must be a rare weapon! It's somewhat heavy.";
				this.weight = 3;
				this.blunt = 0;
				this.blade = 6;
				this.attackDescriptor = "heave";
				break;

			case "nunchucks":
				this.class = "weapon";
				this.name = "nunchucks";
				this.character = "n";
				this.description = "Two sets of short sticks attached to each-other by a short chain. This must be a rare weapon! It hardly weighs anything.";
				this.weight = 1;
				this.blunt = 5;
				this.blade = 0;
				this.attackDescriptor = "swing";
				break;

			case "scimitar":
				this.class = "weapon";
				this.name = "scimitar";
				this.character = "s";
				this.description = "A vicious curved sword notable in desert regions. This must be a rare weapon! It's somewhat heavy.";
				this.weight = 2.5;
				this.blunt = 1;
				this.blade = 5;
				this.attackDescriptor = "swipe";
				break;

			case "muramasa":
				this.class = "weapon";
				this.name = "Muramasa Katana";
				this.character = "m";
				this.description = "A fearsome katana created by the famous swordsmith Sengo Muramasa. This must be an ultra rare weapon! It's somewhat heavy.";
				this.weight = 3;
				this.blunt = 0;
				this.blade = 9;
				this.attackDescriptor = "slash";
				this.rareLoot = true;
				break;

			case "kusanagi":
				this.class = "weapon";
				this.name = "Kusanagi-no-Tsurugi";
				this.character = "k";
				this.description = "A legendary sword found within the tail of the fearsome Yamata-no-Orochi. This must be an ultra rare weapon! It's practically weightless.";
				this.weight = 0;
				this.blunt = 0;
				this.blade = 7;
				this.attackDescriptor = "thrust";
				this.rareLoot = true;
				break;

			case "joyeuse":
				this.class = "weapon";
				this.name = "Joyeuse";
				this.character = "j";
				this.description = "The elegant personal sword of Charlemagne. This must be an ultra rare weapon! It's very heavy.";
				this.weight = 4;
				this.blunt = 0;
				this.blade = 10;
				this.attackDescriptor = "slash";
				this.rareLoot = true;
				break;

			case "nyantana":
				this.class = "weapon";
				this.name = "Nyantana";
				this.character = "n";
				this.description = "It's a katana, but the pommel looks like a cat head and you swear you can hear a cat meowing somewhere when you swing it... This must be an ultra rare weapon! It's extremely lightweight.";
				this.weight = 1;
				this.blunt = 0;
				this.blade = 8;
				this.attackDescriptor = "nyaa";
				this.baseWeapon = true;
				this.rareLoot = true;
				break;
				
			case "lightbringer":
				this.class = "weapon";
				this.name = "Lightbringer";
				this.character = "l";
				this.description = "The slim and beautiful Lightbringer is foretold to bring radiance even to the darkest places.";
				this.weight = 0;
				this.blunt = 0;
				this.blade = 6;
				this.attackDescriptor = "slash";
				this.baseWeapon = true;
				this.rareLoot = true;
				
				//give it some enchantments
				this.enchanted = true;
				this.cursed = false;
				this.effect = "concussion";
				this.magicalCharge = 10;
				break;

			case "wand_fireball":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Fireball";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A wand enchanted with a powerful fireball spell.";
				this.projectile = "fireball";
				this.magicalCost = 6;
				break;

			case "wand_frostbolt":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Frostbolt";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A wand enchanted with a moderate frost spell.";
				this.projectile = "frostbolt";
				this.magicalCost = 4;
				break;

			case "wand_firestorm":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Firestorm";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A pyromaniac's dream come true, this wand is enchanted with a terrifying and powerful fire spell.";
				this.projectile = "firestorm";
				this.magicalCost = 8;
				this.rareLoot = true;
				break;

			case "wand_giestflame":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Giestflame";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A wand enchanted with a minor fire spell.";
				this.projectile = "giestflame";
				this.magicalCost = 1;
				break;

			case "wand_snowball":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Snowball";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A wand enchanted with a minor ice spell.";
				this.projectile = "snowball";
				this.magicalCost = 1;
				break;

			case "wand_missle":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Magic Missle";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A wand enchanted with a magic missle spell.";
				this.projectile = "magic_missle";
				this.magicalCost = 3;
				break;

			case "wand_concussion":
				this.class = "wand";
				this.name = "Unidentified Wand";
				this.realName = "Wand of Concussion";
				this.character = 'w';
				this.description = "A crooked wooden rod, gleaming with magical power.";
				this.realDescription = "A wand enchanted with a concussive missle spell that will stun enemies.";
				this.projectile = "concussive_missle";
				this.magicalCost = 6;
				break;

			case "health_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Health Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "A potent healing potion.";
				this.healthEffect = 15;
				this.staminaEffect = 0;
				break;

			case "super_health_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Super Health Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "An extremely potent healing potion.";
				this.healthEffect = 35;
				this.staminaEffect = 0;
				break;

			case "stamina_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Stamina Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "A potent energizing potion.";
				this.healthEffect = 0;
				this.staminaEffect = 50;
				break;

			case "super_stamina_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Super Stamina Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "An extremely potent energizing potion.";
				this.healthEffect = 0;
				this.staminaEffect = 80;
				break;

			case "energy_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Energy Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "An energizing potion with slight healing effects.";
				this.healthEffect = 5;
				this.staminaEffect = 30;
				break;

			case "refresh_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Refreshing Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "A healing potion with some energizing effects.";
				this.healthEffect = 10;
				this.staminaEffect = 20;
				break;

			case "posion_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Deadly Poison";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "Do not drink.";
				this.healthEffect = -4;
				this.staminaEffect = 0;
				this.specialEffect = "deadly_poison";
				break;

			case "fatigue_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Weakness";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "Energy draining potion.";
				this.healthEffect = 0;
				this.staminaEffect = -40;
				break;

			case "disintegrate_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Disintegrating Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "Disintegrates whatever weapon you are holding, could be helpful to get rid of something cursed...";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "disintegrate";
				break;

			case "placebo_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Nothing";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "It's literally just bad tasting water.";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "placebo";
				break;

			case "identify_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Identification";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "Helps identify unknown items.";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "identification";
				break;

			case "defence_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Defence Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "This should make me better at resisting damage.";
				this.healthEffect = 5;
				this.staminaEffect = 0;
				this.specialEffect = "defence";
				break;

			case "frail_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Frailty";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "This would make me worse at resisting damage.";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "defence_minus";
				break;

			case "agility_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Agility Potion";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "This would improve my reaction time.";
				this.healthEffect = 5;
				this.staminaEffect = 0;
				this.specialEffect = "agility";
				break;

			case "slug_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Uncoordination";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "This would worsen my reaction time.";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "agility_minus";
				break;

			case "exp_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Experience";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "The product of collecting souls and harvesting the literal essence of their life experiences. Ethically questionable, but it's undoubtedly useful.";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "exp";
				break;

			case "forget_potion":
				this.class = "consumable";
				this.name = "Unidentified Potion";
				this.realName = "Potion of Forgetting";
				this.character = 'p';
				this.description = "A small flask filled with an unknown potion.";
				this.realDescription = "The most vile thing in existance.";
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "forget";
				break;

			case "levelup_potion":
				this.class = "consumable";
				this.name = "Level Up Potion";
				this.character = 'l';
				this.description = 'A regal looking flask with golden trimmings. "Level Up" is engraved into a small nameplate affixed to the glass.';
				this.healthEffect = 30;
				this.staminaEffect = 50;
				this.specialEffect = "levelup";
				this.rareLoot = true;
				break;

			case "antipoison_potion":
				this.class = "consumable";
				this.name = "Antipoison";
				this.character = 'a';
				this.description = 'A small, labelled vial of poison-neutralizing potion.';
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "antipoison";
				break;

			case "super_antipoison_potion":
				this.class = "consumable";
				this.name = "Super Antipoison";
				this.character = 'a';
				this.description = 'A small, labelled vial of powerful poison-neutralizing potion.';
				this.healthEffect = 0;
				this.staminaEffect = 0;
				this.specialEffect = "antipoison+";
				break;
				
			


			default:
				throw "Unknown item type " + type;
				break;

		}

		if(this.class == "weapon")
		{ 
			if(this.baseWeapon === undefined)
				this.baseWeapon = false;

			if(this.poison === undefined)
				this.poison = 0;

			if(this.attackDescriptorPluralString === undefined)
				this.attackDescriptorPluralString = "s";

			// Create a random enchantment
			let possibleEnchantments = ["concussion", "lifesteal", "power", "piercing", "bloodlust", "stamina"];
			let possibleCurses = ["concussion_poor", "regeneration", "dullness", "weight", "miss"];

			let enchantmentSuffixes = ["of concussion", "of lifesteal", "of power", "of piercing", "of bloodlust", "of endurance"];
			let curseSuffixes = ["of concussion", "of regeneration", "of dullness", "of fatigue", "of inaccuracy"];

			let enchantmentDescriptions = [
			"The enchantment will slowly build up energy during combat, and then release all of it in a concussive blast once fully charged.",
			"The enchantment will steal a small amount of life from your target each time you hit them.",
			"The enchantment increases the damage I deal with this weapon.",
			"The enchantment can negate my opponent's successful defences.",
			"The enchantment makes this weapon much more powerful if it's recently killed something, otherwise it's slightly less corporeal and deals less damage as a result.",
			"The enchantment refreshes some of my steamina each time I land a hit."
			];
			let curseDescriptions = [
			"The curse will slowly build up energy during combat, and then release all of in a concussive blast once fully charged; however, the curse causes it to sometimes backfire.",
			"The curse uses my own stamina to heal my wounds, but it only activates when I land a hit.",
			"The curse makes my attacks a little less effective.",
			"The curse makes this weapon feel a lot heavier and require more stamina to swing, I doubt the weight increase changes it's effectiveness.",
			"The curse causes this weapon to ocassionally jerk around while attacking swinging, causing the attack to miss."
			];

			let roll = Math.random();
			if(roll > 0.6 && !this.baseWeapon)
			{
				// Enchanted weapon
				this.enchanted = true;
				this.cursed = false;

				let effect = getRandom(0, possibleEnchantments.length - 1);
				this.magicalEffect = possibleEnchantments[effect];

				this.magicalCharge = getRandom(10, 40);
				this.realName = this.name + ' ' + enchantmentSuffixes[effect];
				this.realDescription = this.description + " " + enchantmentDescriptions[effect];
			}
			else if(roll > 0.1 && !this.baseWeapon)
			{
				// Cursed weapon
				this.cursed = true;
				this.enchanted = false;

				let effect = getRandom(0, possibleCurses.length - 1);

				if(possibleCurses[effect] == "dullness" && (type == "bat" || type == "knuckles"))
					this.magicalEffect = "weight";
				else
					this.magicalEffect = possibleCurses[effect];

				this.magicalCharge = getRandom(10, 40);
				this.realName = "Cursed " + this.name + ' ' + curseSuffixes[effect];
				this.realDescription = this.description + " " + curseDescriptions[effect];
			}
			else
			{
				// Non-magical weapon
				this.cursed = false;
				this.enchanted = false;
				this.magicalEffect = null;

				//this.realName = "Unenchanted " + this.name;
			}

		}
		else if(this.class == "wand")
		{
			this.magicalCharge = getRandom(10, 40);
		}


		if(this.realName == null)
			this.realName = this.name;

		if(location !== null)
			this.moveTo(location);
	}
	
	getClass() 
	{
		return this.class;
	}

	getName()
	{
		if(this.realName !== null)
		{
			if(this.isIdentifed())
				return this.realName;
			
		}

		if(this.cursed && player.weapon == this)
			return "Cursed " + this.name;

		return this.name;
	}

	getDescription()
	{
		if(this.realDescription !== undefined)
		{
			if(this.isIdentifed())
				return this.realDescription;
		}

		return this.description;
	}

	getCharacter()
	{
		return this.character;
	}

	isIdentifed()
	{
		if(this.realName !== null)
		{
			if(this.realName == this.name)
				return true;

			for(let i = 0; i < knownItems.length; i++)
			{
				if(this.realName == knownItems[i])
					return true;
			}
		}
		else
			return true;

		return false;
	}

	identify()
	{
		if(this.isIdentifed())
			return;

		inventoryUpdate = true;
		knownItems.push(this.realName);
		score += 5;
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
		if(this.location === null)
		{
			for(let i = 0; i < inventory.length; i++)
				if(inventory[i] == this)
				{
					inventory.splice(i, 1);
					inventoryUpdate = true;
					break;
				}
		}
		else
		{
			let currentTile = getWorld(this.location);

			for(let i = 0; i < currentTile.items.length; i++)
				if(currentTile.items[i] == this)
				{
					currentTile.items.splice(i, 1);
					break;
				}

			for(let i = 0; i < groundItems.length; i++)
				if(groundItems[i] == this)
				{
					groundItems.splice(i, 1);
					break;
				}
		}

		return delete this;
	}

	zapWand(unit, direction)
	{
		if(this.class != "wand")
			return;

		if(unit === undefined)
			return;

		if(direction.x === undefined || direction.y === undefined)
		{
			throw "No appropriate direction supplied for wand cast.";
			return;
		}

		new projectile(this.projectile, unit.location, direction, unit);

		this.magicalCharge -= this.magicalCost;

		if(this.magicalCharge <= 0)
		{
			if(unit.class == "player")
				addLog("The " + this.getName() + " runs out of magical energy and crumbles into faintly glowing ashes.", "color: MediumTurquoise;");

			this.remove();
		}
		else if(!this.isIdentifed())
		{
			this.identify();

			if(unit.class == "player")
				addLog("This is " + aOrAn(this.getName()) + " " + this.getName() + "!", "color: #22F;");
		}
	}
}
