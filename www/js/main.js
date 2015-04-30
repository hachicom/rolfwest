var hiscore = 10000;
var paused = false;
var oldTime = new Date();
var fpscount = 0;
var currentBGM;
var isAndroid = isMobile();
var scoreRewards = [5000,10000,20000,40000,80000];
var soundOn = true;
var language = 'en_US'; //ou en_US
var playerData = {
  scoretable: {
		hiscore: 10000
	},
  settings: {
		sound: true,
    language: 'en_US'
	},
	// ...
}; 

//Desligando os eventos de mouse (Android hack)
/* document.addEventListener('mousedown', function (e) {
  //console.log("cliquei");
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}, true);
document.addEventListener('mouseup', function (e) {
  //console.log("cliquei");
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}, true);
document.addEventListener('mousemove', function (e) {
  //console.log("cliquei");
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}, true);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('click', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('touchend', function(e) {
    e.preventDefault();
}, false);
document.addEventListener('touchstart', function(e) {
    e.preventDefault();
}, false); */


//game global difficulty variables
var levelUpAt = 4;

// 1 - Start enchant.js
enchant();
 
// 2 - On document load 
window.onload = function() {
  //console.log(screen.width+"X"+screen.height);
  var gameheight = (320 * screen.height)/screen.width;
  // 3 - Starting point
	var game = new Core(320, gameheight);
	//var game = new Core(320, 480);
	// 4 - Preload resources
	game.preload('res/rolfSheet.png',
               'res/bulletSheet.png',
               'res/Ice.png',
               'res/IceFrag.png',
               'res/heart.png',
               'res/batSheet.png',
               'res/piranhaSheet.png',
               'res/yukiSheet.png',
               'res/iglooSheet.png',
               'res/mountain.png',
               'res/groundSheet.png',
               'res/title.png',
               'res/dpad.png',
               'res/actbtn.png',
               'res/brackets.png',
               'res/pause.png',
               'res/font0_0.png');
  
	// 5 - Game settings
	game.fps = 30;
	//game.scale = 1;
	// 6 - Once Game finishes loading
  game.onload = function() {
		// 1 - Variables
    enchant.bmfont.createFont('score', 'res/font0.fnt', game.assets['res/font0_0.png']);
    var scene;
    
    if (isLocalStorageSupported())
    {
	    //console.log("Supports Save!");
      playerDataTmp = JSON.decode(localStorage["com.hachicom.rolfwest.playerData"]);
      if (playerDataTmp!=null) playerData = playerDataTmp;
      //console.dir(playerData);
    }
    else
    {
      //console.log("Doesn't support Save!");
      localStorage = [];
    }
    hiscore = playerData.scoretable.hiscore;
    soundOn = playerData.settings.sound;
    //alert(playerData.settings.language!=null);
    if(playerData.settings.language!=null) language = playerData.settings.language;
    
    // 2 - New scene
    scene = new SceneTitle();
    game.pushScene(scene);
	}
  
  // Set Phonegap Events
  if( isAndroid ) {
    document.addEventListener("deviceready", function ()
    {
      if( window.plugins && window.plugins.LowLatencyAudio ) {
        //alert("load plugin");
        window.plugins.LowLatencyAudio.preloadAudio('bgm', "res/bgm.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('bonus', "res/bonus.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('intro', "res/intro.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('end', "res/end.ogg",1);
        
        window.plugins.LowLatencyAudio.preloadFX('hit', "res/hit.wav");
        window.plugins.LowLatencyAudio.preloadFX('coin', "res/fish.wav");
        window.plugins.LowLatencyAudio.preloadFX('item', "res/item.wav");
        window.plugins.LowLatencyAudio.preloadFX('crash', "res/break.wav");
        window.plugins.LowLatencyAudio.preloadFX('powerup', "res/powerup.wav");
        window.plugins.LowLatencyAudio.preloadFX('jump', "res/jump.wav");
      }else{
        alert("erro plugin");
      }
        
      /*navigator.globalization.getPreferredLanguage(
        function (language) {alert(language.value);},
        function () {alert('Error getting language');}
      );*/
      
      document.addEventListener("webkitvisibilitychange", onVisibilityChange, false);
        
      function onVisibilityChange(event) {
        if (event.target.webkitHidden) {
          window.plugins.LowLatencyAudio.stop(currentBGM);
        }
        else {
          window.plugins.LowLatencyAudio.play(currentBGM);
        }
      }

      document.addEventListener("backbutton", onBackKeyDown, false);
            
      function onBackKeyDown(){
          game.stop();
	      navigator.notification.confirm(
	        'Deseja sair do jogo?', // message
	        onConfirm, // callback to invoke with index of button pressed
	        'Confirmar', // title
	        ['Cancelar','Sair'] // buttonLabels
	      );
	      e.preventDefault();
	    }
	
	    function onConfirm(buttonIndex) {
	      if(buttonIndex == 2){
            window.plugins.LowLatencyAudio.stop(currentBGM);
            window.plugins.LowLatencyAudio.unload('bgm');
            window.plugins.LowLatencyAudio.unload('bonus');
            window.plugins.LowLatencyAudio.unload('intro');
            window.plugins.LowLatencyAudio.unload('end');
          
            window.plugins.LowLatencyAudio.unload('hit');
            window.plugins.LowLatencyAudio.unload('coin');
            window.plugins.LowLatencyAudio.unload('item');
            window.plugins.LowLatencyAudio.unload('crash');
            window.plugins.LowLatencyAudio.unload('powerup');
            window.plugins.LowLatencyAudio.unload('jump');
              
	        if (navigator && navigator.app) {
              navigator.app.exitApp();
	          window.close();
	        } else {
	          if (navigator && navigator.device) {
	            window.close();
	            navigator.device.exitApp();
	          }
	        }
	        //bgm.release();
	        //console.log("exited");
          //window.close();
	      }else game.resume();
	    }
      
    }, false);
    
    // admob.initAdmob("ca-app-pub-8006522456285045/2785327219","ca-app-pub-8006522456285045/4262060411");
    // var admobParam=new  admob.Params();
		// admobParam.isTesting=false;
    // admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_APP,admobParam);
    
    var ad_units = {
      android : {
        banner: "ca-app-pub-8006522456285045/2785327219", // or DFP format "/6253334/dfp_example_ad"
        interstitial: "ca-app-pub-8006522456285045/4262060411"
      }
    };
    
    // select the right Ad Id according to platform
    var admobid = ad_units.android;//( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;
    
    if(AdMob) {
      AdMob.createBanner({
        license: 'hachicom@gmail.com/pub-8006522456285045',
        adId:admobid.banner, 
        position:AdMob.AD_POSITION.BOTTOM_CENTER, 
        overlap:true, 
        isTesting:true,
        autoShow:true,
        isForChild:true
      });
    }
  }
  
	// 7 - Start
  game.start();
  //window.scrollTo(0, 1);
  
  // SceneGame  
  var SceneGame = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function() {
      var game, label, bg, penguin, batGroup, map;

      // 1 - Call superclass constructor
      Scene.apply(this);
      // 2 - Access to the game singleton instance
      game = Game.instance;
      // 3 - Create child nodes
      // Background
      bg = new Sprite(320,128);
      bg.y = 200;
      bg.scale(1,2);
      bg.image = game.assets['res/mountain.png'];
      this.backgroundArray = ['#005555','#6888fc','#0058f8','#0000bc','#004058','#000000','#6844fc'];
      this.backgroundColor = this.backgroundArray[0];
      map = new Map(32, 32);
      //map.y = 315;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
            
      //UI
      gui = new Sprite(320,56);
      gui.backgroundColor = '#000000';
      // Label
      label = new FontSprite('score', 128, 32, 'SC 0');
      label.x = 8;
      label.y = 0;
      this.scoreLabel = label;
      
      label6 = new FontSprite('score', 144, 16, 'TOP 0');
      label6.x = 160;
      label6.y = 0;
      this.hiscoreLabel = label6;
      
      label5 = new FontSprite('score', 96, 32, 'ROLF_ 3');
      label5.x = 100;
      label5.y = 24;
      this.livesLabel = label5;
      
      label3 = new FontSprite('score', 96, 32, 'COIN_0');
      label3.x = 177;
      label3.y = 24;
      this.coinsLabel = label3;
      
      label2 = new FontSprite('score', 80, 32, 'LVL_0');
      label2.x = 268;
      label2.y = 24;
      this.levelLabel = label2;
      
      label4 = new FontSprite('score', 256, 32, 'SHOOT ALL BANDITS!');
      label4.x = 32;
      label4.y = 140;
      this.msgLabel = label4;
      
      bracket1 = new Sprite(5, 32);
      bracket1.image = game.assets['res/brackets.png'];
      bracket1.frame = 1;
      bracket1.x = 93;
      bracket1.y = 24;
      
      bracket2 = new Sprite(11, 32);
      bracket2.image = game.assets['res/brackets.png'];
      bracket2.x = 164;
      bracket2.y = 24;
      
      bracket3 = new Sprite(11, 32);
      bracket3.image = game.assets['res/brackets.png'];
      bracket3.x = 257;
      bracket3.y = 24;
      
      bracket4 = new Sprite(4, 32);
      bracket4.image = game.assets['res/brackets.png'];
      bracket4.x = 314;
      bracket4.y = 24;
      
      dpad = new Sprite(210,156);
      dpad.x = 0;
      dpad.y = game.height - 156;
      dpad.opacity = 0.5;
      dpad.image = game.assets['res/dpad.png'];       
      dpad.addEventListener(Event.TOUCH_START,this.handleTouchControl);
      dpad.addEventListener(Event.TOUCH_MOVE,this.handleTouchControl);
      dpad.addEventListener(Event.TOUCH_END,this.handleTouchControlOff);
      this.dpad = dpad;
      
      actBtn = new Sprite(100,156);
      actBtn.x = 220;
      actBtn.frame = 2;
      actBtn.y = game.height - 156;
      actBtn.opacity = 0.5;
      actBtn.image = game.assets['res/actbtn.png'];       
      actBtn.addEventListener(Event.TOUCH_START,this.handleTouchShootControl);
      this.actBtn = actBtn;
      
      labelPause = new Sprite(64, 64);
      labelPause.image = game.assets['res/pause.png'];
      labelPause.x = 246;
      labelPause.y = 70;
      labelPause.opacity = 0.6;
      labelPause.addEventListener(Event.TOUCH_START,this.pauseGame);
        
      fpslabel = new FontSprite('score', 80, 16, 'fps30');
      fpslabel.x = 8;
      fpslabel.y = 32;
      this.fpslabel = fpslabel;
      
      // Hero
      rolf = new Rolf(145,352);
      this.rolf = rolf;
      
      // Enemy Generators
      batGenerator = new BatGenerator(64,224);
      this.batGenerator = batGenerator;
      
      /* yuki = new Yuki(272,288,levelUpAt);
      this.yuki = yuki; */
      
      // Bats group
      batGroup = new Group();
      this.batGroup = batGroup;
      // Fish group
      fishGroup = new Group();
      this.fishGroup = fishGroup;
      // Player Shots group
      shotGroup = new Group();
      this.shotGroup = shotGroup;
      // Enemy Shots group
      evilShotGroup = new Group();
      this.evilShotGroup = evilShotGroup;
      
      // Instance variables
      this.paused = false;
      this.startLevelMsg = 60;
      this.generateIceTimer = 300;
      this.generateFishTimer = 10;
      this.createPiranha = getRandom(4,6);
      this.fishCount = 0;
      this.fishTimerExp = 20;
      this.heartTimer = 25;
      this.fishTimer = getRandom(3,6)*this.fishTimerExp;
      this.lives = 3;
      this.score = 0;
      this.multiplier = 1;
      this.coins = 0;
      this.hearts = 0;
      this.level = 1; //LEVEL SELECT
      this.levelcalc = this.level;
      this.levelUpAt = levelUpAt;
      this.iceTimer = 320;
      this.gotHit = false;
      this.hitDuration = 0;
      this.endLevel = false;
      this.endLevelDuration = 0; 
      this.sabbath = 0;
      this.bonusMode = false;
      this.bonusDuration = 0; 
      this.heartsGenerated = 0;
      this.scoreTarget = 0; //posição de scoreRewards que aumenta ao ser atingida
      this.winGame = 0; //ao passar do level 34, considera o jogo ganho e apresenta uma mensagem de parabéns no SceneGameOver
      
      // Background music
      if( isAndroid ) {
        currentBGM = 'bgm';
        if(soundOn) window.plugins.LowLatencyAudio.loop(currentBGM);
        //Hide Banner to avoid annoying player with lags from banner
        if(AdMob) AdMob.hideBanner();
      }else{
        //this.bgm = game.assets['res/bgm.mp3']; // Add this line
        //this.jumpSnd = game.assets['res/jump.wav'];
        // Start BGM
        //if(soundOn) this.bgm.play();
      }
      
      // 4 - Add child nodes
      //this.addChild(bg);
      // this.addChild(map);
      // this.addChild(igloo);
      // this.addChild(yuki);
      this.addChild(fishGroup);
      this.addChild(evilShotGroup);
      this.addChild(shotGroup);
      this.addChild(rolf);
      this.addChild(batGenerator);
      this.addChild(batGroup);
      this.addChild(gui);
      this.addChild(label3);
      this.addChild(label2);
      this.addChild(label);
      this.addChild(label4);
      this.addChild(label5);
      this.addChild(label6);
      this.addChild(bracket1);
      this.addChild(bracket2);
      this.addChild(bracket3);
      this.addChild(bracket4);
      this.addChild(dpad);
      this.addChild(actBtn);
      this.addChild(labelPause);
      this.addChild(fpslabel);
            
      //this.addEventListener(Event.TOUCH_START,this.handleTouchControl);
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    pauseGame: function (evt) {
      if(this.parentNode.paused == false) {
        this.parentNode.paused = true;
        if( isAndroid ) {
          if(soundOn) //this.parentNode.bgm.pause();
            window.plugins.LowLatencyAudio.stop(currentBGM);
          //bgm.pause();
        }
      }else {
        this.parentNode.paused = false;
        if( isAndroid ) {
          if(soundOn) //this.parentNode.bgm.play();
            window.plugins.LowLatencyAudio.loop(currentBGM);
        }
      }
      paused = this.parentNode.paused;
    },
    
    handleTouchControl: function (evt) {
      var playSnd, lane;
      if(!this.parentNode.paused){
        if(this.parentNode.startLevelMsg<=0){
          if(evt.x > this.width/2) this.parentNode.rolf.move(1);//lane=1;
          else this.parentNode.rolf.move(-1);//lane=-1;
          
          //Verifica a posição do pinguim e dependendo do caso dispara um som
          // playSnd = this.penguin.switchToLaneNumber(lane,this.igloo.isLit,this.yuki.isThere);
          // if (playSnd=='jump') { //apenas moveu o pinguim
          // }else if(playSnd=='powerup') { //dispara o modo de entrega dos peixes
            // if( isAndroid ) {
              // if(soundOn) //powerup.play();
                // window.plugins.LowLatencyAudio.play('powerup');
            // }/* else{
              // if(soundOn) game.assets['res/powerup.wav'].play();
            // } */
            // this.endLevel=true;
            // this.setCoins(this.levelUpAt*(-1));
          // }
        }
      }
      evt.stopPropagation();
      evt.preventDefault();
    },
    
    handleTouchShootControl: function (evt) {
      var playSnd, lane;
      if(!this.parentNode.paused){
        this.parentNode.rolf.shoot();
      }
      evt.stopPropagation();
      evt.preventDefault();
    },
    
    handleTouchControlOff: function (evt) {
      this.parentNode.rolf.stopMove();
      
      evt.stopPropagation();
      evt.preventDefault();
    },
    
    setScore: function (value,multi) {
      if (multi) this.score = this.score + (value * this.multiplier);
      else this.score = this.score + value;
      if (this.score >= scoreRewards[this.scoreTarget]){
        if(this.scoreTarget<=scoreRewards.length){
          this.lives+=1;
          this.scoreTarget+=1;
        }
      }
      if (this.score >= 99999) {
        this.score = 99999;
        this.winGame = 2;
      }
      if (this.score >= hiscore) hiscore = this.score;
    },
    
    setCoins: function (value) {
      this.coins = this.coins + value;
      this.igloo.turnLights(this.coins);
      this.yuki.smile(this.coins);
    },
    
    setHearts: function (value) {
      this.hearts = this.hearts + value;
    },
    
    incLevelUp: function(){
      this.level = this.level+1;
      if(this.level%7==0){
        this.sabbath++;
        this.bonusMode = true;
        
        //deal with music change
        if( soundOn ) {
          if(isAndroid) {
            window.plugins.LowLatencyAudio.stop(currentBGM);
            currentBGM = 'bonus';
            window.plugins.LowLatencyAudio.loop(currentBGM);            
          }
          /* this.bgm.stop();
          this.bgm = bonus;
          this.bgm.play(); */
        }
        
      }
      if (this.level == 35) this.winGame = 1;
      if (this.winGame == 2) {
        if( soundOn ) {
          if(isAndroid) //this.bgm.stop();
            window.plugins.LowLatencyAudio.stop(currentBGM);
        }
        game.replaceScene(new SceneGameOver(this.scoreLabel,this.coinsLabel,this.levelLabel,this.livesLabel,this.hiscoreLabel,this.winGame)); 
      }
      game.replaceScene(new SceneTitle(0));
    },
    
    update: function(evt) {
      fpscount++;
      var newTime = new Date();
      if(newTime.getTime() - oldTime.getTime() >= 1000){
        this.fpslabel.text = fpscount + "fps";
        fpscount = 0;
        oldTime = newTime;
      }
        
      if(!this.paused){
        coinstr = levelupstr = '';
        if(this.coins < 10) coinstr = '0';
        if(this.levelUpAt < 10) levelupstr = '0';
        
        this.scoreLabel.text = 'SC ' + this.score;// + '_x' + this.multiplier;
        this.coinsLabel.text = glossary.text.municao[language]+'_' + this.rolf.bullets + '/6' //+ levelupstr + this.levelUpAt;//+ '<br>' + this.generateFishTimer;
        this.levelLabel.text = 'LVL_ ' + this.level;// + ' - ' + this.iceTimer+ '<br>' + this.generateIceTimer;
        this.livesLabel.text = 'ROLF_ ' + this.lives;
        this.hiscoreLabel.text = 'TOP '+hiscore;
        if(this.bonusMode == true) this.coinsLabel.text = 'BONUS_STAGE';
        
        if(this.gotHit!=true && this.endLevel!=true && this.bonusMode!=true){
          // Deal with start message        
          if(this.startLevelMsg>0) {
            this.startLevelMsg-=1;
            this.msgLabel.text = '    ROUND '+ this.level;// +'_'+ glossary.text.colete[language] + this.levelUpAt + glossary.text.peixes[language];
            if(this.startLevelMsg<=0) this.batGenerator.modeStart=true;
          }
          //else if(this.coins == this.levelUpAt) this.msgLabel.text = glossary.text.alertaYuki[language];
          else this.msgLabel.text = '';
        
          // Check if it's time to create enemies
          if(this.startLevelMsg<=0) {
            //TODO: Enemy creation code
            
            /*=======================================
              ============= COLLISIONS ==============
              =======================================*/
            
            /*==== PLAYER SHOTS vs BATS ====*/
            for (var i = this.shotGroup.childNodes.length - 1; i >= 0; i--) {
              var shot;
              shot = this.shotGroup.childNodes[i];
              for (var j = this.batGroup.childNodes.length - 1; j >= 0; j--) {
                var bat;
                bat = this.batGroup.childNodes[j];
                if (shot.within(bat,12)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  this.shotGroup.removeChild(shot);
                  bat.gotHit(); //if the bat shot is the last one, batGenerator will be defeated
                  break;
                }
              }
            }
            
            /*==== PLAYER vs BATS ====*/
            for (var i = this.batGroup.childNodes.length - 1; i >= 0; i--) {
              var bat;
              bat = this.batGroup.childNodes[i];
              if (bat.within(this.rolf,18) && this.rolf.isVulnerable()){
                if( isAndroid ) {
                  if(soundOn)
                    window.plugins.LowLatencyAudio.play('hit');
                }/* else{
                  if(soundOn) game.assets['res/hit.wav'].play();
                } */
                //bat.crashToPieces();
                this.gotHit = true; 
                this.rolf.gotHit();
                if( isAndroid ) {
                  if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                  //this.bgm.stop();
                }
                break;
              }
            }
            
            /*==== PLAYER vs ENEMY SHOTS ====*/
            for (var i = this.evilShotGroup.childNodes.length - 1; i >= 0; i--) {
              var evilshot;
              evilshot = this.evilShotGroup.childNodes[i];
              if (evilshot.within(this.rolf,18) && this.rolf.isVulnerable()){
                if( isAndroid ) {
                  if(soundOn)
                    window.plugins.LowLatencyAudio.play('hit');
                }/* else{
                  if(soundOn) game.assets['res/hit.wav'].play();
                } */
                //bat.crashToPieces();
                this.evilShotGroup.removeChild(evilshot);
                this.gotHit = true; 
                this.rolf.gotHit();
                if( isAndroid ) {
                  if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                  //this.bgm.stop();
                }
                break;
              }
            }
            
            if(this.batGenerator.defeated){ //if all enemy generators were defeated
              this.endLevel = true;
            }
            
          }//end startLevelMsg if
        }
        
        //Atingido: dispara o timer e parte para o game over no término
        if(this.gotHit==true){
          if(this.rolf.alive == false){
            this.hitDuration += 1; 
            if(this.hitDuration >= 90){
              this.lives-=1;
              if(this.lives<0){
                if( isAndroid ) {
                  if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                }
                game.replaceScene(new SceneGameOver(this.scoreLabel,this.coinsLabel,this.levelLabel,this.livesLabel,this.hiscoreLabel,this.winGame)); 
              }else{
                this.rolf.resetPosition();
                this.gotHit=false;
                this.hitDuration=0;
              }
            }
          }
          else this.gotHit=false;
        }
        
        //Término da fase: conta os pontos e passa para o próximo level
        if(this.endLevel==true){
          this.msgLabel.text = '   ROUND CLEAR!';
          this.endLevelDuration += 1; 
          if(this.endLevelDuration >= 90){
            this.incLevelUp();
          }
        }
        
        // Bonus Stage Mode
        if(this.bonusMode == true){
          //TODO: Bonus mode code
        }
        
        // Loop BGM
        /*
        if (this.bgm.currentTime >= this.bgm.duration ){
          if(soundOn) this.bgm.play();
        } */
        
        // If Samsung android browser is detected
        /* if (window.navigator && window.navigator.userAgent.indexOf('534.30') > 0) {

          // Tweak the canvas opacity, causing it to redraw
          $('canvas').css('opacity', '0.99');

          // Set the canvas opacity back to normal after 5ms
          setTimeout(function() {
              $('canvas').css('opacity', '1');
          }, 5);
        } */
      }else{
        this.msgLabel.text = '      PAUSE';
      }
      
    }
  });
  
  // SceneGameOver  
  var SceneGameOver = Class.create(Scene, {
    initialize: function(score,coin,level,life,hiscorelb,winGame) {
      var gameOverLabel, scoreLabel;
      Scene.apply(this);    
      this.backgroundColor = '#000000';
      this.winGame = winGame;
      
      // Background
      bg = new Sprite(320,128);
      bg.y = 193;
      //bg.scale(2,2);
      //bg.image = game.assets['res/mountain.png'];
      //map = new Map(32, 32);
      //map.image = game.assets['res/groundSheet.png'];
      
      if(winGame>=1){
        //map.loadData(arrMap2Top,arrMap2Sub);
        //map.y = 16;
      }//else map.loadData(arrMap1Top,arrMap1Sub);
      
      playerData.scoretable.hiscore = hiscore;
      localStorage["com.hachicom.rolfwest.playerData"] = JSON.encode(playerData);
      
      // UI labels
      gui = new Sprite(320,56);
      gui.backgroundColor = '#000000';
      
      scoreLabel = score;
      coinLabel = coin;
      levelLabel = level;
      livesLabel = life;
      hiscoreLabel = hiscorelb;
            
      bracket1 = new Sprite(5, 32);
      bracket1.image = game.assets['res/brackets.png'];
      bracket1.frame = 1;
      bracket1.x = 93;
      bracket1.y = 24;
      
      bracket2 = new Sprite(11, 32);
      bracket2.image = game.assets['res/brackets.png'];
      bracket2.x = 164;
      bracket2.y = 24;
      
      bracket3 = new Sprite(11, 32);
      bracket3.image = game.assets['res/brackets.png'];
      bracket3.x = 257;
      bracket3.y = 24;
      
      bracket4 = new Sprite(4, 32);
      bracket4.image = game.assets['res/brackets.png'];
      bracket4.x = 314;
      bracket4.y = 24;
      
      this.textbook = [
        glossary.text.gameoverHint1[language],
        glossary.text.gameoverHint2[language],
        glossary.text.gameoverHint3[language],
        glossary.text.gameoverHint4[language],
        glossary.text.gameoverHint5[language],
        glossary.text.gameoverHint6[language],
        glossary.text.gameoverHint7[language]
      ];
            
      // Game Over label
      if(winGame==1) gameovertxt = glossary.text.wingame1[language];
      else if(winGame==2) gameovertxt = glossary.text.wingame2[language];
      else gameovertxt = glossary.text.gameover[language]+"____"+this.textbook[getRandom(0,this.textbook.length-1)];
      gameOverLabel = new FontSprite('score', 320, 320, gameovertxt);
      gameOverLabel.x = 0;
      gameOverLabel.y = 140;
      
      this.timeToRestart = 0;
      
      // Add labels
      //this.addChild(bg);
      //if(winGame>=1)this.addChild(map);
      this.addChild(gui);
      this.addChild(gameOverLabel);
      this.addChild(scoreLabel);
      this.addChild(coinLabel);
      this.addChild(levelLabel);
      this.addChild(livesLabel);
      this.addChild(hiscoreLabel);
      this.addChild(bracket1);
      this.addChild(bracket2);
      this.addChild(bracket3);
      this.addChild(bracket4);
      
      if(winGame>=1){
        this.backgroundColor = '#6844fc';
        heart = new Sprite(32,32);
        heart.x = 144;
        heart.y = 240;
        heart.image = game.assets['res/heart.png']; 
      
        snow = new Sprite(32,32);
        snow.x = 134;
        snow.y = 280;
        snow.frame = [4];
        snow.image = game.assets['res/penguinSheet.png'];
        snow.scaleX = -1;
        
        yuki = new Sprite(32,32);
        yuki.x = 156;
        yuki.y = 280;
        yuki.frame = [3];
        yuki.image = game.assets['res/yukiSheet.png']; 
        yuki.scaleX = -1;
        
        this.addChild(heart);
        this.addChild(snow);
        this.addChild(yuki);
        
        if( isAndroid ) {
          if(soundOn) {
            /* ending.seekTo(1);
            ending.play(); */
            currentBGM = 'end';
            window.plugins.LowLatencyAudio.play(currentBGM);
          }
        }
      }
      
      if(winGame==2){
        var heartsArr = [[112,224],[176,224],[80,240],[208,240],[64,272],[224,272],
                         [80,304],[208,304],[112,336],[176,336],[144,368]];
        this.backgroundColor = '#6844fc';
        for(var i=0;i<=10;i++){
          var hearttmp = new Sprite(32,32);
          hearttmp.x = heartsArr[i][0];
          hearttmp.y = heartsArr[i][1];
          hearttmp.image = game.assets['res/heart.png'];
          this.addChild(hearttmp);
        }
      }
      
      if( isAndroid ) {
        if(AdMob) AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
        //admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_APP,admobParam);
      }
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
      if(winGame<1) // Update
        this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    touchToRestart: function(evt) {
      var game = Game.instance;
      if(this.winGame>=1) game.replaceScene(new SceneCredits());
      else game.replaceScene(new SceneTitle(0));
    },
    
    update: function(evt){
      this.timeToRestart += 1;
      if(this.timeToRestart>=200){
        var game = Game.instance;
        game.replaceScene(new SceneTitle(0));        
      }
    }
  });

  // SceneCredits
  var SceneCredits = Class.create(Scene, {
    initialize: function() {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      // title = new Sprite(256,160);
      // title.x = 32;
      // title.y = 32;
      // title.image = game.assets['res/title.png'];      
      this.backgroundColor = '#000000';
      map = new Map(32, 32);
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap2Top,arrMap2Sub);
      map.y = 16;
      
      igloo = new Sprite(48,48);
      igloo.x = 98;
      igloo.y = 416;
      igloo.image = game.assets['res/iglooSheet.png']; 
      
      igloo2 = new Sprite(48,48);
      igloo2.x = 146;
      igloo2.y = 416;
      igloo2.scaleX = -1;
      igloo2.image = game.assets['res/iglooSheet.png']; 
      
      snow = new Sprite(32,32);
      snow.x = 224;
      snow.y = 464;
      snow.frame = [4,4,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1];
      snow.image = game.assets['res/penguinSheet.png']; 
      
      yuki = new Sprite(32,32);
      yuki.x = 192;
      yuki.y = 432;
      yuki.frame = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2];
      yuki.image = game.assets['res/yukiSheet.png']; 
      
      label = new FontSprite('score', 320, 440, '');
      label.x = 0;
      label.y = 8;
      
      label.text = '   ==ROLF WEST==__CODE, ART & DESIGN_'
                  +'Adinan Batista Alves___'
                  //+'ENCHANT.JS TUTORIAL_Thongrop Rodsavas_(raywenderlich.com)___'
                  +'8BIT TRACKS BY_'
                  +'Wonderboy(demoscene)___'
                  +'BMFONT PLUGIN BY_'
                  +'COFFEE DOG GAMES___'
                  +'SOUND EFFECTS_'
                  +'CREATED IN BFXR.NET___'
                  +'THANKS FOR PLAYING!';
            
      // Add labels  
      //this.addChild(title);
      this.addChild(map);
      this.addChild(igloo);
      this.addChild(igloo2);
      this.addChild(snow);
      this.addChild(yuki);
      this.addChild(label);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    touchToStart: function(evt) {
      var game = Game.instance;
      if( isAndroid ) {
        //if(soundOn && endingstatus==2)//ending.stop();
        if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
      }
      game.replaceScene(new SceneTitle());
    }
  });
  
  // SceneTutorial
  var SceneTutorial = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      Scene.apply(this);      
      this.backgroundColor = '#0000bc';
      this.page = 0;
      this.textbook = [glossary.text.tutorialPg1[language],glossary.text.tutorialPg2[language],glossary.text.tutorialPg3[language]];
      this.spritesArr = [];
      dpad = new Sprite(320,156);
      dpad.x = 0;
      dpad.y = 300;
      dpad.image = game.assets['res/dpad.png'];       
      this.spritesArr[0] = dpad; 
      
      snow = new Sprite(32,32);
      snow.x = 144;
      snow.y = 220;
      snow.frame = [0,0,0,0,0,0,0,1,1,1,1,1,1,1];
      snow.image = game.assets['res/penguinSheet.png'];
      this.spritesArr[1] = snow;
      
      ice = new Sprite(48,48);
      ice.x = 260;
      ice.y = 40;
      ice.image = game.assets['res/Ice.png']; 
      this.spritesArr[2] = ice;
            
      fish = new Sprite(24,24);
      fish.x = 270;
      fish.y = 110;
      fish.frame = [0,0,0,0,0,0,0,1,1,1,1,1,1,1];
      fish.image = game.assets['res/batSheet.png']; 
      this.spritesArr[3] = fish;
      
      piranha = new Sprite(24,24);
      piranha.x = 270;
      piranha.y = 170;
      piranha.frame = [0,0,0,0,0,0,0,1,1,1,1,1,1,1];
      piranha.image = game.assets['res/piranhaSheet.png'];
      this.spritesArr[4] = piranha;
      
      yuki = new Sprite(32,32);
      yuki.x = 192;
      yuki.y = 400;
      yuki.scaleX = -1;
      yuki.frame = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2];
      yuki.image = game.assets['res/yukiSheet.png']; 
      this.spritesArr[5] = yuki;
      
      heart = new Sprite(32,32);
      heart.x = 140;
      heart.y = 140;
      heart.image = game.assets['res/heart.png']; 
      this.spritesArr[6] = heart;
      
      label = new FontSprite('score', 320, 440, '');
      label.x = 0;
      label.y = 8;
      
      label.text = this.textbook[0];
      this.labeltext = label;
      
      previousLabel = new FontSprite('score', 144, 16, glossary.UI.voltar[language]);
      previousLabel.x = 20;
      previousLabel.y = game.height - 16 - 60;
      previousLabel.visible = false;
      previousLabel.addEventListener(Event.TOUCH_START, function(e){
        this.parentNode.page-=1;
        this.parentNode.nextlabel.text = glossary.UI.proximo[language];
        if (this.parentNode.page<0) this.parentNode.page=0;
        else if (this.parentNode.page==0) this.visible = false;
        else this.visible = true;
        //this.parentNode.labeltext.text = this.parentNode.textbook[this.parentNode.page];
      });
      this.prevlabel = previousLabel;
      
      nextLabel = new FontSprite('score', 144, 16, glossary.UI.proximo[language]);
      nextLabel.x = 160;
      nextLabel.y = game.height - 16 - 60;
      nextLabel.visible = true;
      nextLabel.addEventListener(Event.TOUCH_START, function(e){
        this.parentNode.page+=1;
        this.parentNode.prevlabel.visible = true;
        if (this.parentNode.page>this.parentNode.textbook.length-1) game.replaceScene(new SceneTitle());
        else if (this.parentNode.page==this.parentNode.textbook.length-1) this.text = glossary.UI.fim[language];
        else this.text = glossary.UI.proximo[language];
        //this.parentNode.labeltext.text = this.parentNode.textbook[this.parentNode.page];
      });
      this.nextlabel = nextLabel;
            
      // Add labels  
      //this.addChild(title);
      //this.addChild(igloo);
      //this.addChild(igloo2);
      this.addChild(snow);
      this.addChild(dpad);
      this.addChild(ice);
      this.addChild(fish);
      this.addChild(piranha);
      this.addChild(yuki);
      this.addChild(heart);
      this.addChild(label);
      this.addChild(nextLabel);
      this.addChild(previousLabel);
      
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    update: function(evt) {
      for (var i = 0; i < this.spritesArr.length; i++){
        this.spritesArr[i].visible = false;
      }
      this.labeltext.text = this.textbook[this.page];
      if(this.page==0){
        this.spritesArr[0].visible = true; //dpad
        this.spritesArr[1].visible = true; //snow
        this.spritesArr[1].x = 144;
        this.spritesArr[1].y = 220;
        this.spritesArr[1].frame = [0,0,0,0,0,0,0,1,1,1,1,1,1,1];
      }
      if(this.page==1){
        this.spritesArr[2].visible = true; //ice
        this.spritesArr[3].visible = true; //fish
        this.spritesArr[4].visible = true; //piranha
        this.spritesArr[5].visible = true; //yuki
        this.spritesArr[1].visible = true; //snow
        this.spritesArr[1].x = 144;
        this.spritesArr[1].y = this.spritesArr[5].y = 400;
        this.spritesArr[1].frame = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1];
        this.spritesArr[5].frame = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,2];
      }
      if(this.page==2){
        this.spritesArr[5].visible = true; //yuki
        this.spritesArr[6].visible = true; //heart
        this.spritesArr[1].visible = true; //snow
        this.spritesArr[1].x = 90;
        this.spritesArr[1].y = this.spritesArr[5].y = 140;
        this.spritesArr[1].frame = [4];
        this.spritesArr[5].frame = [3];
      }
    }
  });
  
  // SceneSettings
  var SceneSettings = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel, tmpLanguage, tmpSound;
      var resetHiscore = false;
      Scene.apply(this);
      
      tmpSound = soundOn;
      tmpLanguage = language;
      
      this.backgroundColor = '#000000';
      // map = new Map(32, 32);
      // map.image = game.assets['res/groundSheet.png'];
      // map.loadData(arrMap1Top,arrMap1Sub);
            
      // snow = new Sprite(32,32);
      // snow.x = 224;
      // snow.y = 288;
      // snow.frame = 4;
      // snow.image = game.assets['res/penguinSheet.png']; 
      
      // yuki = new Sprite(32,32);
      // yuki.x = 192;
      // yuki.y = 288;
      // yuki.frame = 2;
      // yuki.image = game.assets['res/yukiSheet.png']; 
      
      label = new FontSprite('score', 320, 200, glossary.UI.optionsTxt[language]);
      label.x = 0;
      label.y = 8;
      
      // SOUND SETTINGS
      SoundOnLabel = new FontSprite('score', 80, 16, " [ON]");
      SoundOnLabel.x = 16;
      SoundOnLabel.y = 60;
      SoundOnLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpSound = true;
        this.text = '>[ON]';
        SoundOffLabel.text = ' [OFF]';
      });
      if (soundOn) SoundOnLabel.text = '>[ON]';
      
      SoundOffLabel = new FontSprite('score', 96, 16, ' [OFF]');
      SoundOffLabel.x = 140;
      SoundOffLabel.y = 60;
      SoundOffLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpSound = false;
        this.text = '>[OFF]';
        SoundOnLabel.text = ' [ON]';
      });
      if (!soundOn) SoundOffLabel.text = '>[OFF]';
      
      // LANGUAGE SETTINGS
      PtBrLabel = new FontSprite('score', 144, 16, " [BRASIL]");
      PtBrLabel.x = 16;
      PtBrLabel.y = 126;
      PtBrLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpLanguage = 'pt_BR';
        this.text = '>[BRASIL]';
        EnUsLabel.text = ' [WORLD]';
      });
      if (language == 'pt_BR') PtBrLabel.text = '>[BRASIL]';
      
      EnUsLabel = new FontSprite('score', 128, 16, ' [WORLD]');
      EnUsLabel.x = 172;
      EnUsLabel.y = 126;
      EnUsLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpLanguage = 'en_US';
        this.text = '>[WORLD]';
        PtBrLabel.text = ' [BRASIL]';
      });
      if (language == 'en_US') EnUsLabel.text = '>[WORLD]';
      
      // HISCORE SETTINGS
      ResetYesLabel = new FontSprite('score', 96, 16, " "+glossary.UI.sim[language]);
      ResetYesLabel.x = 16;
      ResetYesLabel.y = 190;
      ResetYesLabel.addEventListener(Event.TOUCH_START, function(e){
        resetHiscore = true;
        this.text = '>'+glossary.UI.sim[language];
        ResetNoLabel.text = ' '+glossary.UI.nao[language];
      });
      if (resetHiscore) ResetYesLabel.text = '>'+glossary.UI.sim[language];
      
      ResetNoLabel = new FontSprite('score', 96, 16, ' '+glossary.UI.nao[language]);
      ResetNoLabel.x = 140;
      ResetNoLabel.y = 190;
      ResetNoLabel.addEventListener(Event.TOUCH_START, function(e){
        resetHiscore = false;
        this.text = '>'+glossary.UI.nao[language];
        ResetYesLabel.text = ' '+glossary.UI.sim[language];
      });
      if (!resetHiscore) ResetNoLabel.text = '>'+glossary.UI.nao[language];
      
      saveLabel = new FontSprite('score', 144, 16, glossary.UI.salvar[language]);
      saveLabel.x = 160;
      saveLabel.y = 240;
      saveLabel.addEventListener(Event.TOUCH_START, function(e){
        if(resetHiscore) hiscore = 0;
        soundOn = tmpSound;
        language = tmpLanguage;
        playerData.scoretable.hiscore = hiscore;
        playerData.settings.sound = soundOn;
        playerData.settings.language = language;
        
        localStorage["com.hachicom.rolfwest.playerData"] = JSON.encode(playerData);
        game.replaceScene(new SceneTitle());
      });
      
      exitLabel = new FontSprite('score', 144, 16, glossary.UI.voltar[language]);
      exitLabel.x = 16;
      exitLabel.y = 240;
      exitLabel.addEventListener(Event.TOUCH_START, function(e){
        game.replaceScene(new SceneTitle());
      });
            
      // Add labels
      // this.addChild(map);
      // this.addChild(snow);
      // this.addChild(yuki);
      this.addChild(label);
      this.addChild(SoundOnLabel);
      this.addChild(SoundOffLabel);
      this.addChild(PtBrLabel);
      this.addChild(EnUsLabel);
      this.addChild(ResetYesLabel);
      this.addChild(ResetNoLabel);
      this.addChild(exitLabel);
      this.addChild(saveLabel);
    }
  });
  
  // SceneTitle
  var SceneTitle = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      title = new Sprite(256,160);
      title.x = 32;
      title.y = 32;
      //bg.scale(2,2);
      title.image = game.assets['res/title.png'];      
      this.backgroundColor = '#000000';
      map = new Map(32, 32);
      //map.y = 320;
      map.image = game.assets['res/groundSheet.png'];
      map.loadData(arrMap1Top,arrMap1Sub);
      
      label = new FontSprite('score', 128, 16, 'SC 0');
      label.x = 8;
      label.y = 0;
      this.scoreLabel = label;
            
      label6 = new FontSprite('score', 144, 16, 'TOP '+hiscore);
      label6.x = 160;
      label6.y = 0;
      this.hiscoreLabel = label6;
      
      //Title label
      TitleLabel = new FontSprite('score', 240, 16, "ROLFWEST v0.0.1");
      TitleLabel.x = 48;
      TitleLabel.y = 198;
      
      // Press Start label
      PressStart = new FontSprite('score', 192, 16, glossary.UI.start[language]);
      PressStart.x = 64;
      PressStart.y = 264;
      PressStart.addEventListener(Event.TOUCH_START, function(e){
        if( isAndroid ) {
          //if(soundOn && introstatus==2)intro.stop();
          if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
        }/* else{
          if(soundOn) game.assets['res/intro.mp3'].stop();
        } */
        game.replaceScene(new SceneGame());
      });
      
      tutorialLabel = new FontSprite('score', 192, 16, glossary.UI.tutorial[language]);
      tutorialLabel.x = 64;
      tutorialLabel.y = 304;
      tutorialLabel.addEventListener(Event.TOUCH_START, function(e){
        game.replaceScene(new SceneTutorial());
      });
      
      optionLabel = new FontSprite('score', 160, 16, glossary.UI.settings[language]);
      optionLabel.x = 64;
      optionLabel.y = 344;
      optionLabel.addEventListener(Event.TOUCH_START, function(e){
        if( isAndroid ) {
          //if(soundOn && introstatus==2)intro.stop();
          if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
        }/* else{
          if(soundOn) game.assets['res/intro.mp3'].stop();
        } */
        game.replaceScene(new SceneSettings());
      });
      
      creditLabel = new FontSprite('score', 160, 16, glossary.UI.credits[language]);
      creditLabel.x = 64;
      creditLabel.y = 384;
      creditLabel.addEventListener(Event.TOUCH_START, function(e){
        game.replaceScene(new SceneCredits());
      });
      
      // Copyright label
      copyright = new FontSprite('score', 240, 16, "© 2015 HACHICOM");
      copyright.x = 40;
      copyright.y = game.height - 16 - 60;
      
      // Hiscore label
      // scoreLabel = new Label('HISCORE: ' + score);
      // scoreLabel.x = 0;
      // scoreLabel.y = 0;        
      // scoreLabel.color = 'white';
      // scoreLabel.font = '16px system';
      // scoreLabel.textAlign = 'center';
      // scoreLabel._style.textShadow ="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      
      // Add labels  
      //this.addChild(title);
      //this.addChild(map);
      this.addChild(copyright);
      this.addChild(TitleLabel); 
      this.addChild(PressStart);
      this.addChild(tutorialLabel);
      this.addChild(optionLabel);
      this.addChild(creditLabel);
      this.addChild(label);
      this.addChild(label6);
      
      if( isAndroid ) {
        if(soundOn) {
          currentBGM = 'intro';
          window.plugins.LowLatencyAudio.play(currentBGM);
          /* intro.seekTo(1);
          intro.play(); */
        }
      }/* else{
        if(soundOn) game.assets['res/intro.mp3'].play();
      } */
    }
  });  
};