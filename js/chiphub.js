/**
 * ChipHUB.js - home of all the javascript powering the madness of the ChipHub.
 *
 * Author: ViridianForge
 * Contact: wayne@viridianforge.com
 * Version: 0.7
 *
 * Change Log:
 * 0.1 First idea drafted
 * 0.2 Initial Cheat Code Algorithms
 * 0.3 Backdrops implements
 * 0.4 Improved Cheat Code Algorithms
 * 0.5 Skinning added
 * 0.6 First sound playback added
 * 0.7 First iterative cheat code added
 *
 * TODO
 * Add resource load waiting code to the Skin Bonuses
 * Add resource load waiting code for the sound playback
 * * Eventually convert to promises once more browsers support them natively
 * Move cheat codes out to an external json file
 * Make error checks more robust
 * Add a general ES6 support test
 * Add test that disables cheat codes on mobile platforms for now to minimize any data loading
 */

//Memory of Keypresses
var keyBuffer = [];

//Codes to implement
//Konami Code
var konami = ['38','38','40','40','37','39','37','39','66','65'];
var konamiParams =[splashBonus, ['img/freakazoid.gif',"Konami'd!!!",2500]];
//JUSTINBAILEY
var justin = ['74','85','83','84','73','78','66','65','73','76','69','89'];
var justinParams = [reskinBonus,['skins/Justin/shield.png','skins/Justin/Background.png','linear-gradient(0deg, rgba(10,10,10,0.5) 0%, rgba(10,10,50,0.5) 50%, rgba(10,10,90,0.5) 100%)'],'sounds/metItemGet.mp3'];
//IAMERROR
var zelda =['73','65','77','69','82','82','79','82'];
var zeldaParams = [reskinBonus,['skins/Zelda/shield.png','skins/Zelda/Background.png'],'sounds/zeldaSecret.mp3'];
//Other M++
var otherM = ['79','84','72','69','82','77'];
var otherMParams = [iterativeBonus,[['img/OtherM/bg1.png','img/OtherM/bg2.jpeg','img/OtherM/bg3.jpg','img/OtherM/bg4.jpg'],['No.','I said no.','THE BABY. THE BABY. THE BABY.','Your insolence must be punished.'],2000]];
//Axiom Verge Codes?g
//Seasonal Activations
//Winter
//Celtic - Aon Imni - "No Worries"
var celtTunes = ['97', '111', '110', '32', '105', '109', '110', '105'];
var celtParams = [reskinBonus,['img/celtLogo.png',[]]];
//Cherry Blossoms?
//Volume 1
//Volume 2
//Volume 3
var volThree = ['86', '79', '76', '85', '77', '69', '32', '51'];
var volThreeParams = [reskinBonus, ['skins/V3/v3.png','skins/V3/chip_bg.png','linear-gradient(20deg, rgba(255,0,0,0.75) 0%, rgba(0,255,0,0.75) 33%, rgba(0,0,255,0.75) 66%)']];
//Volume 4
var volFour = ['86', '79', '76', '85', '77', '69', '32', '52'];
var volFourParams = [reskinBonus, ['skins/V4/v4.png','skins/V4/chip_bg.png','linear-gradient(90deg, rgba(255,4,0,1) 0%, rgba(193,1,216,1) 50%, rgba(1,115,239,1) 100%)']];
//Freakazoid
var freakazoid = ['16','50','219','71','51','188','56','68','221','220','16','55','70','66','66','187','189','81','221','191','72','75','16','53','70','71'];
var freakazoidParams = [splashBonus, ['img/freakazoid.gif',"Super Dude Extraordinaire!",2500]];
//candleJack
var candlejack = ['99', '97', '110', '100', '108', '101', '106', '97', '99', '107'];
var candlejackParams = [];

//Code loading and testing goes here.
//General idea is that we load the JSON file. Iterate over its contents.
//Test to make sure params are compliant.  If they are, load them, if not, pass over.

//Compile Codes -- Hard-coding needs to be scrapped in future version.
var cheatCodes = [konami, justin, otherM, freakazoid, candlejack, volThree, volFour];
//Super Refactor idea.  Each cheat code has an associated function and set of params.  When we find the cheat code, execute the appropriate function and args.
var cheatParams = [konamiParams, justinParams, otherMParams, freakazoidParams, candlejackParams, volThreeParams, volFourParams];

//Time of last Keypress
var timeStamp = Date.now();

//Last Code Entered and Number of times its been entered.
var cheatMem = [[],0];

//Browser tests go here.  Only add the event listeners if the browser behaves to our spec.

window.addEventListener('keydown', function(e){
  //Check to see if we aren't wiping the keyBuffer
  if((Date.now() - timeStamp > 2500) || (e.keyCode === 27)){
    //console.log("Timeout. Buffer reset.");
    keyBuffer = [];
    //We should probably add a catch for a help key or something.  Or eventually build it inot the webpage.
    if(e.keyCode !== 27){
      keyBuffer.push(e.keyCode);
    }
  } else {
    if(keyBuffer.length > 30){
      //Limit Buffer length to 30.
      keyBuffer = keyBuffer.slice(1,keyBuffer.length).push(e.keyCode);
    }
    //Check to see if the KeyBuffer meets minimum Length
    keyBuffer.push(e.keyCode);
    console.log(keyBuffer);
    if(keyBuffer.length > 4){
      //See if the keyBuffer matches any key sequence
      evalBuffer();
    }
  }
});

window.addEventListener('keyup', function(e){
  timeStamp = Date.now();
});

//Test the buffer against the collections of static codes.
function evalBuffer(){
  for (var i = 0; i < cheatCodes.length; i++){
    //Not the biggest fan of this approach, but it works.
    //Check to see if something in ES6 or ES7 allows for direct
    //Array Equality Comparisons.
    if (keyBuffer.join() === cheatCodes[i].join()){
      //Update the cheat code memory
      console.log(cheatCodes[i].join());
      console.log(cheatMem[0].join());
      if(cheatCodes[i].join() === cheatMem[0].join()){
        //console.log("Same code!");
        cheatMem[1]++;
      }else{
        //console.log("Different code!");
        cheatMem[0] = cheatCodes[i];
        cheatMem[1] = 0;
      }
      //Clear the Key Buffer and Execute the Code
      keyBuffer = [];
      executeCode(cheatParams[i]);
    }
  }
}

//The business end of the cheat code execution.
function executeCode(cParams){
  //Test the code's particulars, make sure it'll execute.
  //Move this to beginning execution.  Everything should be
  //tested when the code initializes, not at every code entry.
  if(typeof cParams[0] === 'function'){
    //Hook for sound playback
      if (typeof cParams.slice(-1)[0] === 'string') {
          playSound(cParams[2]);
    }
    cParams[0].apply(cParams[0],cParams[1]);
  }
}

/*
 * General function for displaying a splash screen bonus.
 * Takes image to load, text to display, and how long to keep up.
 * Possibly eventually refactor, depending on crossover with different types of Bonuses.
 */
function splashBonus(nImgSrc, nText, length){
  var oldImg = document.getElementById("bImg");
  var bText = document.getElementById("bText");
  var bBox = oldImg.parentNode;
  var newImg = new Image();
  newImg.id = "bImg";
  bText.textContent = nText;
  //I want to move away from internal call-backs, but this isn't terrible.
  //Kind of a wash v. implementing promises.
  newImg.onload = function(){
    bBox.replaceChild(newImg, oldImg);
    bBox.parentNode.style.display = "inline";
  };
  newImg.src = nImgSrc;
  setTimeout(function () { resetView(bBox.parentNode) }, length);
}

/*
 * Function that enables displaying a bonus page that
 * changes response every time that it is called.
 */
function iterativeBonus(bImgArr, bTextArr, length){
  //console.log('Have I been called?');
  if(cheatMem[1] >= bImgArr.length){
    cheatMem[1] = 0;
  }
  splashBonus(bImgArr[cheatMem[1]],bTextArr[cheatMem[1]], length);
}

/**
 * General function to switch out the main logo, background
 * pattern, and any accent coloring of the website.
 */
function reskinBonus(shield, background, colorSpec){
  var logoImg, backImg, cSpec = "";
  
  //Displayed Logo
  if(shield){
    logoImg = "url('".concat(shield, "')");
  }
  //Displayed Background
  if(background){
    backImg = ", url('".concat(background, "')");
  }
  //Background Color Gradient
  if(colorSpec){
    var cSpec = ", ".concat(colorSpec);
  }
  //Set the arrangement!
  document.getElementsByTagName("body")[0].style.backgroundImage = "".concat(logoImg, backImg, cSpec);
}

function resetView(bBox){
  bBox.style.display = "none";
}

/**
 * Set the audio element to the new sound.
 * Plays it back once the the sound is loaded.
 */
function playSound(sndFile) {
    var bonusSound = document.getElementById("bSound");
  bonusSound.src = sndFile;
  bonusSound.play();
}
