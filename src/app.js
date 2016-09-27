var map = [];
map[0] = "A billboard";
map[1] = "A mushroom-shaped structure";
map[2] = "A narrow pathway";
map[3] = "The edge of a river";
map[4] = "A rocky outcrop";
map[5] = "Foggy dunes";
map[6] = "A group of alien lifeforms";
map[7] = "Your crashed vessel";
map[8] = "A black monolith";
map[9] = "An endless desert";

var images = [];
images[0] = "billboard.png";
images[1] = "mushroom.png";
images[2] = "narrow.png";
images[3] = "river.png";
images[4] = "rocks.png";
images[5] = "foggy.png";
images[6] = "jawas.png";
images[7] = "crash.png";
images[8] = "monolith.png";
images[9] = "desert.png";

var blockedPathMessages = [];
blockedPathMessages[0] = "Arid desert stretches out as far as the eye can see. You see no point in walking further in that direction";
blockedPathMessages[1] = "Arid desert stretches out as far as the eye can see. You see no point in walking further in that direction";
blockedPathMessages[2] = "The canyon ends abruptly";
blockedPathMessages[3] = "Unfortunately, you left your swimming trunks back in the ship";
blockedPathMessages[4] = "";
blockedPathMessages[5] = "The fog is too thick to see anything in that direction";
blockedPathMessages[6] = "You try to climb the dunes but they prove too slippery for you";
blockedPathMessages[7] = "Toxic fumes rise from cracks in the ground, preventing you from going further";
blockedPathMessages[8] = "You feel a strange force compelling you to remain where you are";

visitedByPlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

discoveryMessages = [];
discoveryMessages[0] = "This alien billboard is strangely similar to the ones on Earth. You wonder what it's advertising.";
discoveryMessages[1] = "The geological formation facing you is strangely fungal in shape.";
discoveryMessages[2] = "The winding canyon proves quite tiring to navigate. You can see moving shapes at the corner of your vision.";
discoveryMessages[3] = "An overpowering chemical smell emanates from the running liquid.";
discoveryMessages[4] = "You climb on a stony platform. The elevation helps you recon the area.";
discoveryMessages[5] = "You can barely see where you're going in this fog.";
discoveryMessages[6] = "Strange little aliens come flocking towards you, murmuring in a foreign language.";
discoveryMessages[7] = "You wake up, a few meters from your wrecked ship, surrounded by debris and cargo.<br>Inspecting the engine, you realize a key part of the power transmission is missing.<br>The last thing you remember about this planet is that it's supposed to be inhabited. The locals might be able to help you take off again.";
discoveryMessages[8] = "A black monolith looms over the surrounding patch of desert. The fog has completely dissipated.";

var items = ["playboy magazine", "smooth stone", "metal detector"];
var itemLocations = [7, 8, 7];

var backpack = [];
var turnCounter = 0;
var gameOver = 0;

var mapLocation = 7;
var playersInput = "";
var gameMessage = "";
var actionsIKnow = ["north", "east", "west", "south", "take", "use", "drop"];
var itemsIKnow = ["transmitter", "spiraled flute", "playboy magazine", "smooth stone", "small key", "metal detector"];
var item = "";
var action = "";

var output = document.querySelector("#output");
var input = document.querySelector("#input");
var turns = document.querySelector("#turns");
var image = document.querySelector("img");
var winMessage = document.querySelector("#winMessage");

var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(event)
{
  if(event.keyCode === 13 && button.disabled === false)
  {
    playGame();
  }
}

function takeItem()
{
  var itemIndexNumber = items.indexOf(item);
  if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation && item !== "heavy metal chest")
  {
    gameMessage = "You take the "+item+".";
    backpack.push(item);
    items.splice(itemIndexNumber,1);
    itemLocations.splice(itemIndexNumber,1);
  }
  else if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation && item === "heavy metal chest")
  {
    gameMessage = "It's too heavy!";
  }
  else
  {
    gameMessage = "You can't do that.";
  }
}

function dropItem()
{
  if (backpack.length !==0) {
  var backpackIndexNumber = backpack.indexOf(item);
  if (backpackIndexNumber !== -1)
  {
    gameMessage = "You drop the "+item+".";
    items.push(backpack[backpackIndexNumber]);
    itemLocations.push(mapLocation);
    backpack.splice(backpackIndexNumber, 1);
  }
  else
  {
    gameMessage = "What are you trying to drop?";
  }}
}

function useItem()
{
  //Is the item in the backpack?
  var backpackIndexNumber = backpack.indexOf(item);
  if (backpackIndexNumber === -1)
  {
    gameMessage = "You're not carrying this.";
  }
  if (backpack.length === 0)
  {
    gameMessage = "Your backpack is empty!";
  }
  //What should happen?
  if (backpackIndexNumber !== -1)
  {
    switch(item)
    {
      case "transmitter":
        if (mapLocation === 7)
        {
          gameMessage = "You slide the component in the appropriate socket. You hear your mini-fridge's tiny ventilator start spinning as power is restored to the ship.";
          backpack.splice(backpack.indexOf(item),1);
          gameOver = 1;
          button.disabled = true;
        }
        else
        {
          gameMessage = "You examine the transmitter. It looks suspiciously similar to the one that's missing from your ship.";
        }
        break;
      case "spiraled flute":
        if (mapLocation === 8)
        {
          gameMessage = "A beautiful tune fills the air. Suddenly, the monolith starts resonating and a small cavity opens on one side.";
          backpack.splice(backpack.indexOf(item),1);
          items.push("small key");
          itemLocations.push(8);
        }
        else if (mapLocation === 6)
        {
          gameMessage = "A beautiful tune fills the air. The small lifeforms stop moving and stare at you, as if hypnotized."
        }
        else
        {
          gameMessage = "A beautiful tune fills the air."
        }
        break;
      case "playboy magazine":
        if (mapLocation === 6)
        {
          gameMessage = "The locals seem extremely interested in your magazine. One of them quickly snatches it from your hands. As it hurries back towards one of the stone structures, you see it drop something.";
          backpack.splice(backpack.indexOf(item),1);
          items.push("spiraled flute");
          itemLocations.push(6);
        }
        else
        {
          gameMessage = "You now have an erection.";
        }
        break;
      case "smooth stone":
        dropItem("smooth stone");
        gameMessage = "You try to juggle. You've never been good at this.";
        break;
      case "small key":
        if (mapLocation === 1 && items.indexOf("heavy metal chest") !== -1 && items.indexOf("transmitter") === -1 && backpack.indexOf("transmitter") === -1)
        {
          gameMessage = "You open the chest."
          items.push("transmitter");
          itemLocations.push(1);
        }
        else
        {
          gameMessage = "You wonder what this key opens.";
        }
        break;
      case "metal detector":
        if (mapLocation === 1 && items.indexOf("heavy metal chest") === -1)
        {
          gameMessage = "The detector goes crazy above a patch of dirt that looks freshly shoveled.<br>It does not take you long to dig out what's inside."
          items.push("heavy metal chest");
          itemLocations.push(1);
        }
        else
        {
          if (Math.floor(Math.random()*101) > 80)
          {
            gameMessage = "You found a piece of metal junk.";
          }
          else
          {
            gameMessage = "Nothing.";
          }
        }
        break;
    }
  }
}
// display
render();

function clickHandler() {
  playGame();
}

function playGame() {
  playersInput = input.value.toLowerCase();
  gameMessage = "";
  action = "";

  for(var i = 0; i < actionsIKnow.length; i++) {
    if (playersInput.indexOf(actionsIKnow[i]) !== -1)
    {
      action = actionsIKnow[i];
      console.log("player's action: "+ action);
      break;
    }
  }
  for(i = 0; i < itemsIKnow.length; i++)
  {
    if(playersInput.indexOf(itemsIKnow[i]) !== -1)
    {
      item = itemsIKnow[i];
      console.log("player's item: " + item);
    }
  }

  switch(action)
  {
  case "north":
    if(mapLocation >= 3 && mapLocation !== 5)
      {
        mapLocation -= 3;
      }
    else
      {
        gameMessage = blockedPathMessages[mapLocation];
      }
    break;
  case "east":
    if(mapLocation % 3 != 2 && mapLocation !== 6 && mapLocation !== 7)
      {
        mapLocation += 1;
      }
    else
      {
        gameMessage = blockedPathMessages[mapLocation];
      }
    break;
  case "south":
    if(mapLocation < 6 && mapLocation !== 2)
      {
        mapLocation += 3;
      }
    else
      {
        gameMessage = blockedPathMessages[mapLocation];
      }
    break;
  case "west":
    if(mapLocation % 3 != 0 && mapLocation !== 7 && mapLocation !== 8)
      {
        mapLocation -= 1;
      }
    else
      {
        gameMessage = blockedPathMessages[mapLocation];
      }
    break;
  case "take":
    takeItem();
    break;
  case "drop":
    dropItem();
    break;
  case "use":
    useItem();
    break;
  default:
    gameMessage = "I don't understand that.";
  }
  turnCounter ++;
  render()
}

function render() {
  turns.innerHTML = "Turn: "+turnCounter;
  //Render the location
  output.innerHTML = map[mapLocation];
  image.src = "../images/png/" + images[mapLocation];

  //Display the first time message
  if(visitedByPlayer[mapLocation] === 0)
  {
    output.innerHTML += "<br><em>"+discoveryMessages[mapLocation]+"</em>";
    visitedByPlayer[mapLocation] = 1;
  }
  //Display the game message
  output.innerHTML += "<br><em>"+gameMessage+"</em>";
  //Display an item if there is one
  for(var i = 0; i < items.length; i++)
  {
    if(mapLocation === itemLocations[i])
    {
      output.innerHTML += "<br>You see a <strong>"+items[i]+"</strong> here.";
    }
  }
  //Display the player's backpack
  console.log(backpack.length);
  if(backpack.length > 0)
  {
    output.innerHTML += "<br><br><br>You are carrying: "+backpack.join(", ");
  }
  if (gameOver === 1)
  {
    winMessage.innerHTML = "<strong>Congratulations!<br>You finished the game and it only took you "+turnCounter+" turns!"
  }
}
