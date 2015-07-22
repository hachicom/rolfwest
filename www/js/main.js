var version = '0.9.5';

var hiscore = 20000;
var paused = false;
var oldTime = new Date();
var maxbonusDecTime = 30;
var fpscount = 0;
var currentBGM = 'stage1';
var isAndroid = isMobile();
var scoreRewards = [20000,40000,80000,160000];
var soundOn = true;
var language = 'en_US'; //ou en_US
var playerData = {
  scoretable: {
		hiscore: 20000
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
  //alert(gameheight);
  // 3 - Starting point
	//var game = new Core(320, gameheight);
	var game = new Core(320, 569);
	// 4 - Preload resources
	game.preload('res/rolfSheet.png',
               'res/melodySheet.png',
               'res/scoreSheet.png',
               'res/bulletSheet.png',
               'res/bulletDoubleSheet.png',
               'res/bulletBossSheet.png',
               'res/fingerSheet.png',
               'res/itemSheet.png',
               'res/batSheet.png',
               'res/batkidSheet.png',
               'res/batsniperSheet.png',
               'res/boxSheet.png',
               'res/boxPiece.png',
               'res/bossMadbatSheet.png',
               'res/bossChiefSheet.png',
               'res/bossBarthoSheet.png',
               'res/bossAgileSheet.png',
               'res/bossDefeatedSheet.png',
               'res/explosionSheet.png',
               'res/western1Sheet.png',
               'res/western2Sheet.png',
               'res/western3Sheet.png',
               'res/western4Sheet.png',
               'res/title.png',
               'res/dpad.png',
               'res/shootbtn.png',
               'res/reloadbtn.png',
               'res/brackets.png',
               'res/pause.png',
               'res/sega16_0.png',
               'res/sega22_0.png',
               'res/interludeSheet.png');
  
	// 5 - Game settings
	game.fps = 30;
	//game.scale = 1;
	// 6 - Once Game finishes loading
  game.onload = function() {
		// 1 - Variables
    //enchant.bmfont.createFont('score', 'res/font0.fnt', game.assets['res/font0_0.png']);
    enchant.bmfont.createFont('sega12', 'res/sega16.fnt', game.assets['res/sega16_0.png']);
    enchant.bmfont.createFont('sega24', 'res/sega22.fnt', game.assets['res/sega22_0.png']);
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
        //BGMs
        window.plugins.LowLatencyAudio.preloadAudio('stage1', "res/stage1.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('stage2', "res/stage2.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('stage3', "res/stage3.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('stage4', "res/stage4.ogg",1);
        window.plugins.LowLatencyAudio.preloadAudio('credits', "res/credits.ogg",1);
        //Jingles
        window.plugins.LowLatencyAudio.preloadFX('hit', "res/interlude.mp3");
        window.plugins.LowLatencyAudio.preloadFX('coin', "res/gameover.mp3");
        //SFX
        window.plugins.LowLatencyAudio.preloadFX('hit', "res/hit.wav");
        window.plugins.LowLatencyAudio.preloadFX('coin', "res/fish.wav");
        window.plugins.LowLatencyAudio.preloadFX('item', "res/item.wav");
        window.plugins.LowLatencyAudio.preloadFX('crash', "res/break.wav");
        window.plugins.LowLatencyAudio.preloadFX('powerup', "res/powerup.wav");
        window.plugins.LowLatencyAudio.preloadFX('shoot', "res/shoot.wav");
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
            window.plugins.LowLatencyAudio.unload('shoot');
              
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
  var hachiplayer = new Hachiplayer(1,4,scoreRewards,hiscore); //world 1-1, after level 4 world goes up
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
      this.backgroundColor = globalBgColor['stage'+hachiplayer.round];
      
      lvlMap = new Map(32, 32);
      lvlMap.image = game.assets[globalTileMap['stage'+hachiplayer.level]['sheet']];
      lvlMap.loadData(globalTileMap['stage'+hachiplayer.level]['mainlayer']);
      this.lvlMap = lvlMap;
      
      // lvlFrontLayer = new Map(32, 32);
      // lvlFrontLayer.image = game.assets[globalTileMap['stage'+hachiplayer.level]['sheet']];
      // lvlFrontLayer.loadData(globalTileMap['stage'+hachiplayer.level]['toplayer']);
      // this.lvlFrontLayer = lvlFrontLayer;
            
      // GUI
      gui = new Sprite(320,38);
      gui.backgroundColor = '#aaaaaa';
      // GUI Labels
      scoreLabel = new FontSprite('sega12', 144, 14, 'SCORE 0');
      scoreLabel.x = 50;
      scoreLabel.y = 0;
      this.scoreLabel = scoreLabel;
      
      hiscoreLabel = new FontSprite('sega12', 144, 14, 'TOP 0');
      hiscoreLabel.x = 180;
      hiscoreLabel.y = 0;
      this.hiscoreLabel = hiscoreLabel;
      
      livesLabel = new FontSprite('sega12', 96, 28, 'ROLF_ 3');
      livesLabel.x = 8;
      livesLabel.y = 12;
      this.livesLabel = livesLabel;
      
      ammoLabel = new FontSprite('sega12', 96, 28, 'COIN_0');
      ammoLabel.x = 136;
      ammoLabel.y = 12;
      //ammoLabel.scale(2,2);
      this.ammoLabel = ammoLabel;
      
      levelLabel = new FontSprite('sega12', 80, 28, 'LEVEL_0');
      levelLabel.x = 268;
      levelLabel.y = 12;
      this.levelLabel = levelLabel;
        
      fpslabel = new FontSprite('sega12', 80, 14, 'fps30');
      fpslabel.x = 8;
      fpslabel.y = 36;
      this.fpslabel = fpslabel;
      //END GUI BLOCK
      
      msgLabel = new FontSprite('sega24', 256, 28, '');
      msgLabel.x = 32;
      msgLabel.y = 140;
      this.msgLabel = msgLabel;
            
      reloadLabel = new FontSprite('sega24', 256, 28, '');
      reloadLabel.x = 32;
      reloadLabel.y = 320;
      this.reloadLabel = reloadLabel;
      this.reloadLabelShow = true;
      this.reloadLabelTime = 10;
      
      dpad = new Sprite(200,128);
      dpad.x = 0;
      dpad.y = game.height - 110;
      dpad.opacity = 0.8;
      dpad.image = game.assets['res/dpad.png'];       
      dpad.addEventListener(Event.TOUCH_START,this.handleTouchStartControl);
      dpad.addEventListener(Event.TOUCH_MOVE,this.handleTouchMoveControl);
      dpad.addEventListener(Event.TOUCH_END,this.handleTouchEndControl);
      this.dpad = dpad;
      
      shootBtn = new Sprite(120,128);
      shootBtn.x = game.width - 120;
      shootBtn.y = game.height - 110;
      shootBtn.opacity = 0.8;
      shootBtn.image = game.assets['res/shootbtn.png'];       
      shootBtn.addEventListener(Event.TOUCH_START,this.handleTouchShootControl);
      this.shootBtn = shootBtn;
      
      // reloadBtn = new Sprite(64,64);
      // reloadBtn.x = game.width - 64;
      // reloadBtn.y = game.height - 192;
      // reloadBtn.opacity = 0.8;
      // reloadBtn.image = game.assets['res/reloadbtn.png'];       
      // reloadBtn.addEventListener(Event.TOUCH_START,this.handleTouchReloadControl);
      // this.reloadBtn = reloadBtn;
      
      pauseBtn = new Sprite(64, 64);
      pauseBtn.image = game.assets['res/pause.png'];
      pauseBtn.x = 246;
      pauseBtn.y = 40;
      pauseBtn.opacity = 0.6;
      pauseBtn.addEventListener(Event.TOUCH_START,this.pauseGame);
      this.pauseBtn = pauseBtn;
      
      pausewin = new PauseWindow(80,200);
      pausewin.setVisibility(false);
      this.pausewin = pausewin;
      
      // Hero
      rolf = new Rolf(145,424,hachiplayer);
      this.rolf = rolf;
      
      // Melody Kidnapped (level 6-4)
      melodyK = new MelodyKidnapped(game.width-64,424,hachiplayer.level);
      this.melodyK = melodyK;
      
      // Enemy Generators
      batGenerator = new BatGenerator(0,320,globalBatMap['stage'+hachiplayer.level],hachiplayer.world);
      this.batGenerator = batGenerator;
      batkidGenerator = new BatKidGenerator(96,136,globalBatKidMap['stage'+hachiplayer.level],hachiplayer.world);
      this.batkidGenerator = batkidGenerator;
      batsniperGenerator = new BatSniperGenerator(0,280,globalBatSniperMap['stage'+hachiplayer.level],hachiplayer.world);
      this.batsniperGenerator = batsniperGenerator;
      bossGenerator = new BossGenerator(120,136,hachiplayer.world,hachiplayer.round);
      this.bossGenerator = bossGenerator;      
      
      /* melody = new Melody(272,288,levelUpAt);
      this.melody = melody; */
      
      // Bats group
      batGroup = new Group();
      this.batGroup = batGroup;
      // Batkids group
      batkidGroup = new Group();
      this.batkidGroup = batkidGroup;
      //Batsnipers group
      batsniperGroup = new Group();
      this.batsniperGroup = batsniperGroup;
      //Boss group
      bossGroup = new Group();
      this.bossGroup = bossGroup;
      //Explosion group
      explosionGroup = new Group;
      this.explosionGroup = explosionGroup;
      
      // Player Shots group
      shotGroup = new Group();
      this.shotGroup = shotGroup;
      // Enemy Shots group
      evilShotGroup = new Group();
      this.evilShotGroup = evilShotGroup;
      
      //Item group
      itemGroup = new Group();
      this.itemGroup = itemGroup;
      //NPC group
      npcGroup = new Group;
      this.npcGroup = npcGroup;
      //Box group
      boxGroup = new Group();
      this.boxGroup = boxGroup;      
      
      boxGenerator = new BoxGenerator(120,136,globalTileMap['stage'+hachiplayer.level]['boxlayer'],boxGroup);
      this.boxGenerator = boxGenerator;
      
      // Player Instance
      this.hachiplayer = hachiplayer;
      
      // Instance variables
      this.paused = false;
      this.startLevelMsg = 60;
      this.gotHit = false;
      this.hitDuration = 0;
      this.endLevel = false;
      this.endLevelDuration = 0; 
      this.sabbath = 0;
      this.bonusReward = 5000;
      this.bonusDecTime = maxbonusDecTime;
      this.winGame = 0; //ao passar do level 34, considera o jogo ganho e apresenta uma mensagem de parabéns no SceneGameOver
      
      // Background music
      if( isAndroid ) {
        currentBGM = 'stage'+hachiplayer.round;
        if(soundOn) window.plugins.LowLatencyAudio.loop(currentBGM);
        //Hide Banner to avoid annoying player with lags from banner
        if(AdMob) AdMob.hideBanner();
      }//else{
        //this.bgm = game.assets['res/bgm.mp3']; // Add this line
        //this.jumpSnd = game.assets['res/jump.wav'];
        // Start BGM
        //if(soundOn) this.bgm.play();
      //}
      
      // 4 - Add child nodes
      // this.addChild(bg);
      this.addChild(lvlMap);
      this.addChild(batGenerator);
      this.addChild(batkidGenerator);
      this.addChild(batsniperGenerator);
      this.addChild(bossGenerator);
      this.addChild(boxGenerator);
      this.addChild(boxGroup);
      this.addChild(batGroup);
      this.addChild(batkidGroup);
      this.addChild(batsniperGroup);
      this.addChild(bossGroup);
      this.addChild(explosionGroup);
      this.addChild(evilShotGroup);
      this.addChild(shotGroup);
      this.addChild(npcGroup);
      this.addChild(itemGroup);
      this.addChild(melodyK);
      this.addChild(rolf);
      this.addChild(gui);
      this.addChild(ammoLabel);
      this.addChild(levelLabel);
      this.addChild(scoreLabel);
      this.addChild(msgLabel);
      this.addChild(reloadLabel);
      this.addChild(livesLabel);
      this.addChild(hiscoreLabel);
      this.addChild(dpad);
      this.addChild(shootBtn);
      //this.addChild(reloadBtn);
      this.addChild(pauseBtn);
      this.addChild(fpslabel);
      this.addChild(pausewin);
            
      this.addEventListener(Event.TOUCH_START,this.handleTouchReloadControl);
      // this.addEventListener(Event.TOUCH_MOVE,this.handleTouchMoveControl);
      // this.addEventListener(Event.TOUCH_END,this.handleTouchEndControl);
      
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    pauseGame: function (evt) {
      if(this.parentNode.paused == false) {
        this.parentNode.paused = true;
        this.parentNode.pausewin.setVisibility(true);
        if( isAndroid ) {
          if(soundOn) //this.parentNode.bgm.pause();
            window.plugins.LowLatencyAudio.stop(currentBGM);
          //bgm.pause();
        }
      }else {
        this.parentNode.paused = false;
        this.parentNode.pausewin.setVisibility(false);
        if( isAndroid ) {
          if(soundOn) //this.parentNode.bgm.play();
            window.plugins.LowLatencyAudio.loop(currentBGM);
        }
      }
      //paused = this.parentNode.paused;
      // this.parentNode.batGenerator.defeated = true;
      // this.parentNode.batkidGenerator.defeated = true;
    },
  
    showReward: function(x,y,scoreval){
      var sc = new ScoreSprite(x,y,scoreval);
      this.addChild(sc);
    },
    
    handleTouchStartControl: function (evt) {
      var playSnd;
      if(!this.parentNode.paused){
        if(this.parentNode.startLevelMsg<=0){
          hachiplayer.controlx = evt.localX;
          hachiplayer.padtouched = true;
          if(evt.x > this.width/2) this.parentNode.rolf.move(1);
          else this.parentNode.rolf.move(-1);
        }
      }
      // evt.stopPropagation();
      // evt.preventDefault();
    },
    
    handleTouchMoveControl: function (evt) {
      var playSnd;
      if(!this.parentNode.paused){
        if(this.parentNode.startLevelMsg<=0){
          var distance = evt.localX - hachiplayer.controlx;
          //this.parentNode.rolf.moveTouch(distance);//move the hero by dragging
          hachiplayer.controlx = evt.localX;
          if(evt.x > this.width/2) this.parentNode.rolf.move(1);
          else this.parentNode.rolf.move(-1);
        }
      }
      // evt.stopPropagation();
      // evt.preventDefault();
    },
    
    handleTouchEndControl: function (evt) {
      this.parentNode.rolf.stopMove();
      hachiplayer.padtouched = false;
      
      // evt.stopPropagation();
      // evt.preventDefault();
    },
    
    handleTouchShootControl: function (evt) {
      if(!this.parentNode.paused){
        if(this.parentNode.startLevelMsg<=0){
          this.parentNode.rolf.shoot();
        }
      }
      // evt.stopPropagation();
      // evt.preventDefault();
    },
    
    handleTouchReloadControl: function (evt) {
      if(!this.paused){
        if(this.startLevelMsg<=0){
          if(evt.y < this.dpad.y && evt.y > this.pauseBtn.y + 64) this.rolf.reloadBullets();
        }
      }
      // evt.stopPropagation();
      // evt.preventDefault();
    },
    
    setCoins: function (value) {
      hachiplayer.coins = hachiplayer.coins + value;
      //this.igloo.turnLights(hachiplayer.coins);
      //this.melody.smile(hachiplayer.coins);
    },
    
    setHearts: function (value) {
      this.hearts = this.hearts + value;
    },
    
    goToTitleScreen: function (value) {
      hachiplayer.reset();
      game.replaceScene(new SceneTitle(0));
    },
    
    checkLevelComplete: function () {
      if(hachiplayer.round == hachiplayer.levellimit){
        if(this.bossGenerator.defeated == true){
          //Destroy all enemies
          for (var j = this.batGroup.childNodes.length - 1; j >= 0; j--) {
            var bat;
            bat = this.batGroup.childNodes[j];          
            bat.gotKilled(hachiplayer);
          }
          this.batGenerator.defeated = true;
          
          for (var j = this.batkidGroup.childNodes.length - 1; j >= 0; j--) {
            var batkid;
            batkid = this.batkidGroup.childNodes[j];          
            batkid.gotKilled(hachiplayer);
          }
          this.batkidGenerator.defeated = true;
          
          for (var j = this.batsniperGroup.childNodes.length - 1; j >= 0; j--) {
            var batsniper;
            batsniper = this.batsniperGroup.childNodes[j];          
            batsniper.gotKilled(hachiplayer);
          }
          this.batsniperGenerator.defeated = true;
          
          //TODO: create Melody; else... 
          var melpos = game.width;
          var mode = 'normal';
          if(hachiplayer.level==24) {
            melpos -= 64;
            mode = 'distress';
          }
          var melody = new Melody(melpos,424,mode);
          this.npcGroup.addChild(melody);
        }
      }else if(this.batGenerator.defeated && this.batkidGenerator.defeated && this.batsniperGenerator.defeated){ 
        //if all enemy generators were defeated
        var sanduba = new SandubaItem(145,384,hachiplayer.level);
        this.itemGroup.addChild(sanduba);
      }
    },
    
    incLevelUp: function(){
      var worldcomplete = false;
      if(hachiplayer.round==hachiplayer.levellimit) worldcomplete = true;
      hachiplayer.levelUp(1);
      // if (hachiplayer.level == 35) this.winGame = 1;
      // if (this.winGame == 2) {
        // if( soundOn ) {
          // if(isAndroid) //this.bgm.stop();
            // window.plugins.LowLatencyAudio.stop(currentBGM);
        // }
        // game.replaceScene(new SceneGameOver(this.scoreLabel,this.ammoLabel,this.levelLabel,this.livesLabel,this.hiscoreLabel,this.winGame)); 
      // }
      
      if(hachiplayer.level>Object.keys(globalTileMap).length){
        /******************************
         *******  ENDING GAME  ********
         ******************************/
        //TODO: show an ending screen instead of title screen
        hachiplayer.reset();
        game.replaceScene(new SceneEnding(0));
      }else{
        /******************************
         ****  LOADING NEXT LEVEL  ****
         ******************************/
        if(worldcomplete) game.replaceScene(new SceneBonus());
        else game.replaceScene(new SceneInterlude());
        // Reload tilemaps and bgcolor
        // this.backgroundColor = globalBgColor['stage'+hachiplayer.round];
        // this.lvlMap.loadData(globalTileMap['stage'+hachiplayer.level]['mainlayer']);
        // this.lvlFrontLayer.loadData(globalTileMap['stage'+hachiplayer.level]['toplayer']);
        // this.lvlMap.image = game.assets[globalTileMap['stage'+hachiplayer.level]['sheet']];
        // this.lvlFrontLayer.image = game.assets[globalTileMap['stage'+hachiplayer.level]['sheet']];
        
        //Reset Stage Variables      
        // this.startLevelMsg = 60;
        // this.gotHit = false;
        // this.hitDuration = 0;
        // this.endLevel = false;
        // this.endLevelDuration = 0; 
        // this.bonusMode = false;
        // this.bonusDuration = 0;
        
        //Reset Hero Position
        // this.rolf.resetPosition(hachiplayer);
        
        //Reload Enemy Generators
        // this.batGenerator.loadNewLevel(globalBatMap['stage'+hachiplayer.level],hachiplayer.level);
        // this.batkidGenerator.loadNewLevel(globalBatKidMap['stage'+hachiplayer.level],hachiplayer.level);
        // this.batsniperGenerator.loadNewLevel(globalBatSniperMap['stage'+hachiplayer.level],hachiplayer.level);
      }
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
        if(hachiplayer.coins < 10) coinstr = '0';
        if(this.levelUpAt < 10) levelupstr = '0';
        
        this.scoreLabel.text = 'SCORE ' + hachiplayer.score;// + '_x' + this.multiplier;
        this.ammoLabel.text = glossary.text.municao[language]+'_' + this.rolf.bullets + '/6'; //+ levelupstr + this.levelUpAt;//+ '<br>' + this.generateFishTimer;
        this.levelLabel.text = 'BONUS_ ' + this.bonusReward;// + ' - ' + this.iceTimer+ '<br>' + this.generateIceTimer;
        this.livesLabel.text = 'ROLF_ ' + hachiplayer.lives;
        this.hiscoreLabel.text = 'TOP '+hachiplayer.hiscore;
        //if(this.bonusMode == true) this.ammoLabel.text = 'BONUS_STAGE';
        
        if(this.gotHit!=true && this.endLevel!=true){
          // Deal with start message        
          if(this.startLevelMsg>0) {
            this.startLevelMsg-=1;
            this.msgLabel.text = '      READY!';// +'_'+ glossary.text.colete[language] + this.levelUpAt + glossary.text.peixes[language];
            
            /* Starts enemy generators: First is the bat generator.
             * After finishing creation, it will call batkid generator
             * and so on until batsniper generator is done
             *
             * TODO: UNCOMMENT LINE ABOVE NEXT IF TO CREATE BOSSES
             */
            if(this.startLevelMsg<=0) {
              this.batGenerator.modeStart=true;
              if(hachiplayer.round == 4) {
                this.bossGenerator.createBoss();
                if(hachiplayer.world == 6) this.melodyK.disappear = true;
              }
              else this.checkLevelComplete();
            }
          }
          //else if(this.rolf.bullets <= 0) this.msgLabel.text = glossary.text.alertaReload[language];
          else this.msgLabel.text = '';
        
          // Deals with showing the reload message when needed
          if(this.startLevelMsg<=0) {
            this.bonusDecTime-=1;
            if (this.bonusDecTime<=0){
              if(this.bonusReward>0) this.bonusReward-=100;
              this.bonusDecTime = maxbonusDecTime;
            }
            
            if(this.rolf.bullets <= 0){
              this.reloadLabelTime-=1;
              if(this.reloadLabelTime <= 0) 
                if (this.reloadLabelShow){
                  this.reloadLabelShow = false;
                  this.reloadLabel.text = glossary.text.alertaReload[language];
                  this.reloadLabelTime = 10;
                } else {
                  this.reloadLabelShow = true;
                  this.reloadLabel.text = '';
                  this.reloadLabelTime = 10;
                }
            }else {
              this.reloadLabel.text = '';
              this.reloadLabelShow = true;
              this.reloadLabelTime = 10;
            }
          
            /*=======================================
              ============= COLLISIONS ==============
              =======================================*/
            
            /*==== PLAYER SHOTS vs BATS ====*/
            for (var i = this.shotGroup.childNodes.length - 1; i >= 0; i--) {
              var shot;
              shot = this.shotGroup.childNodes[i];
              //BATS
              for (var j = this.batGroup.childNodes.length - 1; j >= 0; j--) {
                var bat;
                bat = this.batGroup.childNodes[j];
                if (shot.intersect(bat)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  this.shotGroup.removeChild(shot);
                  bat.gotHit(hachiplayer); 
                  if(hachiplayer.round != hachiplayer.levellimit)
                    this.checkLevelComplete();//if the bat shot is the last one, batGenerator will be defeated
                  break;
                }
              }

              //BATKIDS
              for (var j = this.batkidGroup.childNodes.length - 1; j >= 0; j--) {
                var batkid;
                batkid = this.batkidGroup.childNodes[j];
                if (shot.intersect(batkid)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  this.shotGroup.removeChild(shot);
                  batkid.gotHit(hachiplayer); 
                  if(hachiplayer.round != hachiplayer.levellimit)
                    this.checkLevelComplete();//if the batkid shot is the last one, batkidGenerator will be defeated
                  break;
                }
              }

              //BATSNIPERS
              for (var j = this.batsniperGroup.childNodes.length - 1; j >= 0; j--) {
                var batsniper;
                batsniper = this.batsniperGroup.childNodes[j];
                if (shot.intersect(batsniper)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = batsniper.gotHit(hachiplayer); 
                  if(ks) {
                    this.shotGroup.removeChild(shot);
                    if(hachiplayer.round != hachiplayer.levellimit)
                      this.checkLevelComplete();//if the batsniper shot is the last one, batkidGenerator will be defeated
                  }
                  break;
                }
              }
              
              //BOSS
              for (var j = this.bossGroup.childNodes.length - 1; j >= 0; j--) {
                var boss;
                boss = this.bossGroup.childNodes[j];
                if (shot.intersect(boss)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = boss.gotHit(hachiplayer); 
                  if(ks) {
                    this.shotGroup.removeChild(shot);
                  }
                  break;
                }
              }
              
              //BOXES
              for (var j = this.boxGroup.childNodes.length - 1; j >= 0; j--) {
                var box;
                box = this.boxGroup.childNodes[j];
                if (shot.intersect(box)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = box.gotHit(hachiplayer,true); 
                  if(ks) {
                    this.shotGroup.removeChild(shot);
                  }
                  break;
                }
              }
            }
            
            /*==== PLAYER vs BATS ====*/
            for (var i = this.batGroup.childNodes.length - 1; i >= 0; i--) {
              var bat;
              bat = this.batGroup.childNodes[i];
              if (bat.within(this.rolf,16) && this.rolf.isVulnerable()){
                if( isAndroid ) {
                  if(soundOn)
                    window.plugins.LowLatencyAudio.play('hit');
                }/* else{
                  if(soundOn) game.assets['res/hit.wav'].play();
                } */
                //bat.crashToPieces();
                this.gotHit = true; 
                this.rolf.gotHit(hachiplayer);
                // if( isAndroid ) {
                  // if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                  //this.bgm.stop();
                // }
                break;
              }
            }
                        
            
            /*==== PLAYER/BOXES vs ENEMY SHOTS ====*/
            for (var i = this.evilShotGroup.childNodes.length - 1; i >= 0; i--) {
              var evilshot;
              evilshot = this.evilShotGroup.childNodes[i];
              
              //PLAYER
              if (evilshot.within(this.rolf,16) && this.rolf.isVulnerable()){
                if( isAndroid ) {
                  if(soundOn)
                    window.plugins.LowLatencyAudio.play('hit');
                }/* else{
                  if(soundOn) game.assets['res/hit.wav'].play();
                } */
                //bat.crashToPieces();
                this.evilShotGroup.removeChild(evilshot);
                this.gotHit = true; 
                this.rolf.gotHit(hachiplayer);
                // if( isAndroid ) {
                  // if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                  //this.bgm.stop();
                // }
                break;
              }
              
              //BOXES
              for (var j = this.boxGroup.childNodes.length - 1; j >= 0; j--) {
                var box;
                box = this.boxGroup.childNodes[j];
                if (evilshot.intersect(box) && (box.y>=384/*  || box.frame==2 */)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = box.gotHit(hachiplayer,false); 
                  if(ks) {
                    this.evilShotGroup.removeChild(evilshot);
                  }
                  break;
                }
              }
            }
            
            /*==== PLAYER/ENEMY/BOX vs EXPLOSIONS ====*/
            for (var i = this.explosionGroup.childNodes.length - 1; i >= 0; i--) {
              var explosion;
              explosion = this.explosionGroup.childNodes[i];
              
              //PLAYER
              if (explosion.intersect(this.rolf) && this.rolf.isVulnerable()){
                if( isAndroid ) {
                  if(soundOn)
                    window.plugins.LowLatencyAudio.play('hit');
                }/* else{
                  if(soundOn) game.assets['res/hit.wav'].play();
                } */
                this.gotHit = true; 
                this.rolf.gotHit(hachiplayer);
                // if( isAndroid ) {
                  // if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                  // this.bgm.stop();
                // }
                break;
              }
              
              //BATS
              for (var j = this.batGroup.childNodes.length - 1; j >= 0; j--) {
                var bat;
                bat = this.batGroup.childNodes[j];
                if (explosion.intersect(bat)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  bat.gotHit(hachiplayer); 
                  if(hachiplayer.round != hachiplayer.levellimit)
                    this.checkLevelComplete();//if the bat shot is the last one, batGenerator will be defeated
                  break;
                }
              }

              //BATKIDS
              for (var j = this.batkidGroup.childNodes.length - 1; j >= 0; j--) {
                var batkid;
                batkid = this.batkidGroup.childNodes[j];
                if (explosion.intersect(batkid)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  batkid.gotHit(hachiplayer); 
                  if(hachiplayer.round != hachiplayer.levellimit)
                    this.checkLevelComplete();//if the batkid shot is the last one, batkidGenerator will be defeated
                  break;
                }
              }

              //BATSNIPERS
              for (var j = this.batsniperGroup.childNodes.length - 1; j >= 0; j--) {
                var batsniper;
                batsniper = this.batsniperGroup.childNodes[j];
                if (explosion.intersect(batsniper)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = batsniper.gotHit(hachiplayer); 
                  if(ks) {
                    if(hachiplayer.round != hachiplayer.levellimit)
                      this.checkLevelComplete();//if the batsniper shot is the last one, batkidGenerator will be defeated
                  }
                  break;
                }
              }
              
              //BOSS
              for (var j = this.bossGroup.childNodes.length - 1; j >= 0; j--) {
                var boss;
                boss = this.bossGroup.childNodes[j];
                if (explosion.intersect(boss)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = boss.gotHit(hachiplayer);
                  break;
                }
              }
              
              //BOXES
              for (var j = this.boxGroup.childNodes.length - 1; j >= 0; j--) {
                var box;
                box = this.boxGroup.childNodes[j];
                if (explosion.intersect(box)){
                  if( isAndroid ) {
                    if(soundOn)
                      window.plugins.LowLatencyAudio.play('hit');
                  }/* else{
                    if(soundOn) game.assets['res/hit.wav'].play();
                  } */
                  var ks = box.gotHit(hachiplayer,false); 
                  break;
                }
              }
            }
            
            /*==== PLAYER vs ITEMS ====*/
            for (var i = this.itemGroup.childNodes.length - 1; i >= 0; i--) {
              var item;
              item = this.itemGroup.childNodes[i];
              if (item.within(this.rolf,16)){
                item.gotHit(hachiplayer,this.rolf); //here the item collected will grant some reward
                break;
              }
            }
            
            /**///npcGroup
            /*==== PLAYER vs NPCs ====*/
            for (var i = this.npcGroup.childNodes.length - 1; i >= 0; i--) {
              var npc;
              npc = this.npcGroup.childNodes[i];
              if (npc.within(this.rolf,16)){
                npc.interact(hachiplayer,this.rolf); //here the item collected will grant some reward
                break;
              }
            }
          }//end startLevelMsg if
        }
        
        //Atingido: dispara o timer e parte para o game over no término
        if(this.gotHit==true){
          if(this.rolf.alive == false){
            this.hitDuration += 1; 
            if(this.hitDuration >= 90){
              hachiplayer.lives-=1;
              if(hachiplayer.lives<0){
                if( isAndroid ) {
                  if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
                }
                game.replaceScene(new SceneGameOver(this.scoreLabel,this.ammoLabel,this.levelLabel,this.livesLabel,this.hiscoreLabel,this.winGame)); 
              }else{
                this.rolf.resetPosition(hachiplayer);
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
          this.reloadLabel.text = '';
          this.endLevelDuration += 1; 
          this.rolf.wonStage();
          if( soundOn ) {
            if(isAndroid) //this.bgm.stop();
              window.plugins.LowLatencyAudio.stop(currentBGM);
          }
          if(this.endLevelDuration >= 90){
            this.incLevelUp();
          }
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
        //this.fpslabel.text = 'PAUSE';
      }
      
    }
  });
  
  // SceneBonus
  var SceneBonus = Class.create(Scene, {
    initialize: function() {
      Scene.apply(this);      
      this.backgroundColor = globalBgColor['bg1'];
      
      /**
       * SCENE ANIMATION
       * pg0  (10 frames)  - shows World Complete! message and starts animation of Rolf and Melody
       * pg1  (60 frames)  - show boxes and message Watch! and the star in a random position
       * pg2  (180 frames) - show star in another random position //3 sec
       * pg3  (270 frames) - show star in another random position //3 sec
       * pg4  (360 frames) - show star in another random position //3 sec
       * pg5  (420 frames) - show star in another random position //2 sec
       * pg6  (480 frames) - show star in another random position //2 sec
       * pg7  (510 frames) - show star in another random position //1 sec
       * pg8  (540 frames) - show star in another random position //1 sec
       * pg9  (555 frames) - show star in another random position //0.5 sec
       * pg10 (570 frames) - show star in another random position //0.5 sec
       * pg11 (578 frames) - show star in another random position //0.25 sec
       * pg12 (586 frames) - show star in another random position //0.25 sec
       * pg13 (589 frames) - show star in another random position //0.1 sec
       * pg14 (592 frames) - show star in another random position //0.1 sec
       * pg15 (595 frames) - hide the star and showa message Select!
       */
      
      this.sceneAnimationTime = 0;
      this.endSceneTime = 120;
      this.mode = 'watch'; //watch/choose/end
      this.starposition = 0;
      
      animationSpr = new Sprite(128, 128);
      animationSpr.image = game.assets['res/interludeSheet.png'];
      animationSpr.frame = 2;
      animationSpr.x = game.width/2 - 64;
      animationSpr.y = game.height/2 - 128;
            
      star = new Sprite(32,32);
      star.x = 0;
      star.y = game.height - 160;
      star.image = game.assets['res/itemSheet.png'];
      star.frame = 15;
      star.visible = false;
      this.star = star;
      
      this.boxes = new Array();
      box1 = new Sprite(32,32);
      box1.x = game.width/2 - 132;
      box1.y = game.height - 160;
      box1.frame = 11;
      box1.image = game.assets['res/itemSheet.png'];
      box1.visible = false;
      box1.addEventListener(Event.TOUCH_START, function(){this.parentNode.chooseBox(1);});
      this.boxes[1] = box1;
      
      box2 = new Sprite(32,32);
      box2.x = box1.x + 80;
      box2.y = game.height - 160;
      box2.frame = 11;
      box2.image = game.assets['res/itemSheet.png']; 
      box2.visible = false;
      box2.addEventListener(Event.TOUCH_START, function(){this.parentNode.chooseBox(2);});
      this.boxes[2] = box2;
      
      box3 = new Sprite(32,32);
      box3.x = box2.x + 80;
      box3.y = game.height - 160;
      box3.frame = 11;
      box3.image = game.assets['res/itemSheet.png']; 
      box3.visible = false;
      box3.addEventListener(Event.TOUCH_START, function(){this.parentNode.chooseBox(3);});
      this.boxes[3] = box3;
      
      box4 = new Sprite(32,32);
      box4.x = box3.x + 80;
      box4.y = game.height - 160;
      box4.frame = 11;
      box4.image = game.assets['res/itemSheet.png']; 
      box4.visible = false;
      box4.addEventListener(Event.TOUCH_START, function(){this.parentNode.chooseBox(4);});
      this.boxes[4] = box4;
      
      titleLabel = new FontSprite('sega24', 320, 40, 'WORLD COMPLETE!');
      titleLabel.x = 60;
      titleLabel.y = 8;
      this.titleLabel = titleLabel;
      
      msgLabel = new FontSprite('sega24', 320, 40, '  WATCH!');
      msgLabel.x = 80;
      msgLabel.y = game.height-100;
      msgLabel.visible = false;
      this.msgLabel = msgLabel;

      this.addChild(box1);
      this.addChild(box2);
      this.addChild(box3);
      this.addChild(box4);
      this.addChild(star);
      this.addChild(titleLabel);
      this.addChild(msgLabel);
      this.addChild(animationSpr);
      
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },

    chooseBox: function(boxnum) {
      //console.log("event activated!");
      if(this.mode == 'choose'){
        this.boxes[boxnum].visible = false;
        if(boxnum == this.starposition){
          this.msgLabel.text = 'NICE! 1-UP!!!';
          hachiplayer.lives+=1;
        }else this.msgLabel.text = '  NO BONUS!';
        this.mode = 'end';
        this.star.visible = true;
      }
    },
    
    changePage: function(page){
      this.page = page;
      switch(this.page){
        case 0: break;
        case 1: 
          this.boxes[1].visible = true;
          this.boxes[2].visible = true;
          this.boxes[3].visible = true;
          this.boxes[4].visible = true;
          this.msgLabel.visible = true;
          break;
        case 2: 
          this.star.visible = true;
          this.starposition = getRandom(1,4);
          this.star.x = this.boxes[this.starposition].x;
          break;
        default: 
          var newpos = getRandom(1,4);
          if (newpos == this.starposition){
            newpos+=1;
            if (newpos > 4) newpos = 1;
          }
          this.starposition = newpos;
          this.star.x = this.boxes[this.starposition].x;
          break;
      }
    },
    
    update: function(evt) {
      this.sceneAnimationTime += 1;
      switch(this.sceneAnimationTime){
        case 10:  this.changePage(0); break;
        case 60:  this.changePage(1); break;
        case 90:  this.changePage(2); break; 
        case 120: this.changePage(3); break; 
        case 150: this.changePage(3); break;
        case 180: this.changePage(3); break;
        case 210: this.changePage(3); break;
        case 240: this.changePage(3); break;
        case 270: this.changePage(3); break;
        case 300: this.changePage(3); break;
        case 320: this.changePage(3); break;
        case 340: this.changePage(3); break
        case 360: this.changePage(3); break;
        case 380: this.changePage(3); break;
        case 400: this.changePage(3); break;
        case 410: this.changePage(3); break;
        case 420: this.changePage(3); break;
        case 430: this.changePage(3); break;
        case 440: this.changePage(3); break;
        case 450: this.changePage(3); break;
        case 455: this.changePage(3); break;
        case 460: this.changePage(3); break;
        case 465: this.changePage(3); break;
        case 470: this.changePage(3); break;
        case 472: this.changePage(3); break;
        case 474: this.changePage(3); break;
        case 476: this.changePage(3); break;
        case 478: this.changePage(3); break;
        case 480: this.changePage(3); break;
        case 481: this.changePage(3); break;
        case 482: this.changePage(3); break;
        case 483: this.changePage(3); break;
        case 484: this.changePage(3); break;
        case 485: this.changePage(3); break;
        case 486: this.changePage(3); break;
        case 487: this.changePage(3); break;
        case 488: this.changePage(3); break;
        case 489: this.changePage(3); break;
        case 490: this.changePage(3); break;
        case 491: this.changePage(3); break;
        case 492: this.changePage(3); break;
        case 493: this.changePage(3); break;
        case 494: this.changePage(3); break;
        case 495:  
          this.msgLabel.text = 'CHOOSE ONE!';
          this.mode = 'choose';
          this.star.visible = false;
        break;
      }
      
      if(this.mode == 'end'){
        this.endSceneTime-=1;
        if(this.endSceneTime<=0)
          game.replaceScene(new SceneInterlude());
      }
    }
  });
  
  // SceneInterlude
  var SceneInterlude = Class.create(Scene, {
    initialize: function() {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      // title = new Sprite(256,160);
      // title.x = 32;
      // title.y = 32;
      // title.image = game.assets['res/title.png'];      
      this.backgroundColor = globalBgColor['bg1'];
      this.timeToStart = 120;
      
      label = new FontSprite('sega24', 320, 320, '');
      label.x = 0;
      label.y = 72;

      animationSpr = new Sprite(128, 128);
      animationSpr.image = game.assets['res/interludeSheet.png'];
      animationSpr.frame = 0;
      animationSpr.x = 160;
      animationSpr.y = 288;
      this.animationSpr = animationSpr;
      this.animationDuration = 0;
      this.animationSpeed = 1.00;
      this.iniFrame = 0;
      this.endFrame = 1;      
      
      label.text = '       WORLD '+ hachiplayer.world + '-' + hachiplayer.round;
      if(hachiplayer.level == 24){
        label.text = glossary.text.finalstageMsg[language];
        animationSpr.visible = false;
        this.backgroundColor = globalBgColor['stage3'];
        this.timeToStart = 300;
      }
      // this.addChild(map);
      // this.addChild(igloo);
      // this.addChild(igloo2);
      this.addChild(animationSpr);
      this.addChild(label);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    update: function(evt) {
      // Animation
      this.animationDuration += 0.05;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.animationSpr.frame<this.endFrame) this.animationSpr.frame ++;
        else this.animationSpr.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      
      // Start stage
      this.timeToStart -= 1;
      if(this.timeToStart<=0)
        game.replaceScene(new SceneGame());
    },
    
    touchToStart: function(evt) {
      var game = Game.instance;
      game.replaceScene(new SceneGame());
    }
  });
  
  // SceneEnding
  var SceneEnding = Class.create(Scene, {
    initialize: function() {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      //this.backgroundColor = '#0026FF';
      
      // Background
      // title = new Sprite(256,160);
      // title.x = 32;
      // title.y = 32;
      // title.image = game.assets['res/title.png'];      
      this.backgroundColor = globalBgColor['bg3'];
      this.timeToStart = 600;
      
      label = new FontSprite('sega24', 320, 400, '');
      label.x = 0;
      label.y = 10;
      
      label.text = glossary.text.wingame1[language];
      
      playerData.scoretable.hiscore = hachiplayer.hiscore;
      localStorage["playerData"] = JSON.encode(playerData);
      
      animationSpr = new Sprite(128, 128);
      animationSpr.image = game.assets['res/interludeSheet.png'];
      animationSpr.frame = 2;
      animationSpr.x = 160;
      animationSpr.y = 288;
            
      // this.addChild(map);
      // this.addChild(igloo);
      // this.addChild(igloo2);
      // this.addChild(snow);
      this.addChild(animationSpr);
      this.addChild(label);
      
      if( isAndroid ) {
        if(soundOn) {
          currentBGM = 'credits';
          window.plugins.LowLatencyAudio.play(currentBGM);
        }
      }
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_END, this.touchToStart);
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    update: function(evt) {
      this.timeToStart -= 1;
      if(this.timeToStart<=0)
        game.replaceScene(new SceneCredits());
    },
    
    touchToStart: function(evt) {
      var game = Game.instance;
      game.replaceScene(new SceneCredits());
    }
  });
  
  // SceneGameOver  
  var SceneGameOver = Class.create(Scene, {
    initialize: function() {
      var gameOverLabel, scoreLabel;
      Scene.apply(this);    
      this.backgroundColor = globalBgColor['stage3'];
      this.timeToStart = 200;
      
      label = new FontSprite('sega24', 320, 60, '');
      label.x = 20;
      label.y = 72;
      
      label.text = glossary.text.gameover[language]+'___  FINAL SCORE: '+hachiplayer.score;
      
      playerData.scoretable.hiscore = hachiplayer.hiscore;
      localStorage["playerData"] = JSON.encode(playerData);
            
      this.addChild(label);
      
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToRestart);
      this.addEventListener(Event.ENTER_FRAME, this.update);
    },
    
    touchToRestart: function(evt) {
      var game = Game.instance;
      
      // Reset player
      hachiplayer.reset();      
      game.replaceScene(new SceneTitle(0));
    },
    
    update: function(evt){
      this.timeToStart -= 1;
      if(this.timeToStart<=0){
        // Reset player
        hachiplayer.reset();
        game.replaceScene(new SceneTitle(0));        
      }
    }
  });

  // SceneCredits
  var SceneCredits = Class.create(Scene, {
    initialize: function() {
      var TitleLabel, scoreLabel;
      Scene.apply(this);     
      this.backgroundColor = globalBgColor['bg4'];
      
      label = new FontSprite('sega24', 320, 640, '');
      label.x = 0;
      label.y = game.height;
      this.label = label;
      
      label.text = '   *ROLF WEST*__CODE, ART & DESIGN__'
                  +'Adinan Batista Alves_____'
                  +'CHIPTUNE MUSIC__'
                  +'SketchyLogic__(OpenGameArt.com)_____'
                  +'BMFONT PLUGIN__'
                  +'COFFEE DOG GAMES_____'
                  +'SOUND EFFECTS__'
                  +'CREATED IN BFXR.NET_____'
                  +'8BIT JINGLES__'
                  +'Little Robot Sound_Factory (.com)_____'
                  +'THANKS FOR PLAYING!____    SEE YOU IN_  THE NEXT GAME!';
                  
      this.addChild(label);
      
      // Listen for taps
      this.addEventListener(Event.ENTER_FRAME, this.update);
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    update: function(evt) {
      this.label.y -= 2;
      if(this.label.y<= -this.label.height) game.replaceScene(new SceneTitle());
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
    initialize: function() {
      Scene.apply(this);      
      this.backgroundColor = globalBgColor['bg3'];
      
      /**
       * SCENE ANIMATION
       * pg0 (10 frames)  - finger moves up, next to dpad
       * pg1 (30 frames)  - finger moves left, and rolf moves along
       * pg2 (60 frames)  - finger moves right, and rolf moves along
       * pg3 (90 frames)  - finger stops, and rolf stops as well
       * pg4 (110 frames) - finger press right side above dpad, rolf shoots
       * pg5 (130 frames) - finger goes up
       * pg6 (160 frames) - finger press right side above dpad, rolf shoots and reload message blinks
       * pg7 (180 frames) - finger goes up
       * pg8 (220 frames) - finger press left side above dpad, reload message disappears
       * pg9 (280 frames) - animation ended, go to next screen
       */
      
      this.sceneAnimationTime = 0;
      // this.page = 0;
      // this.textbook = [glossary.text.tutorialPg1[language],glossary.text.tutorialPg2[language],glossary.text.tutorialPg3[language]];
      this.spritesArr = [];
      dpad = new Sprite(200,128);
      dpad.x = 0;
      dpad.y = 300;
      dpad.image = game.assets['res/dpad.png'];       
      this.dpad = dpad; 
      
      rolf = new Sprite(24,24);
      rolf.x = 144;
      rolf.y = 220;
      rolf.image = game.assets['res/rolfSheet.png'];
      rolf.frame = [3,3,3,3,3,3,3,4,4,4,4,4,4,4];
      this.rolf = rolf;
      
      shot = new Sprite(5,8);
      shot.x = 153;
      shot.y = 220;
      shot.image = game.assets['res/bulletSheet.png'];
      shot.frame = [0];
      shot.visible = false;
      this.shot = shot;
      
      finger = new Sprite(32,42);
      finger.x = dpad.width/2;
      finger.y = 460;
      finger.frame = 0;
      finger.image = game.assets['res/fingerSheet.png']; 
      this.finger = finger;
      
      shootBtn = new Sprite(120,128);
      shootBtn.x = game.width - 120;
      shootBtn.y = dpad.y;
      //shootBtn.opacity = 0.5;
      shootBtn.image = game.assets['res/shootbtn.png'];
      this.shootBtn = shootBtn;
      
      reloadBtn = new Sprite(64,64);
      reloadBtn.x = game.width - 64;
      reloadBtn.y = dpad.y - 64;
      //reloadBtn.opacity = 0.5;
      //reloadBtn.image = game.assets['res/reloadbtn.png'];
      this.reloadBtn = reloadBtn;
      
      this.fingerAddX = 0;
      this.fingerAddY = 0;
      this.shotAddY = 0;
      this.bullets = 2;
      
      titleLabel = new FontSprite('sega24', 320, 440, glossary.text.tutorialTitle[language]);
      titleLabel.x = 32;
      titleLabel.y = 8;
      this.titleLabel = titleLabel;
      
      skipLabel = new FontSprite('sega24', 320, 440, glossary.text.tutorialSkip[language]);
      skipLabel.x = 48;
      skipLabel.y = game.height-100;
      this.skipLabel = skipLabel;
      
      ammoLabel = new FontSprite('sega12', 96, 28, 'AMMO');
      ammoLabel.x = 144;
      ammoLabel.y = 32;
      this.ammoLabel = ammoLabel;
      
      reloadLabel = new FontSprite('sega24', 256, 28, '');
      reloadLabel.x = 32;
      reloadLabel.y = 120;
      this.reloadLabel = reloadLabel;
      this.reloadLabelShow = true;
      this.reloadLabelTime = 10;
      
      //label.text = this.textbook[0];
      //this.labeltext = label;

      this.addChild(shot);
      this.addChild(rolf);
      this.addChild(dpad);
      this.addChild(shootBtn);
      this.addChild(reloadBtn);
      this.addChild(finger);
      this.addChild(titleLabel);
      this.addChild(skipLabel);
      this.addChild(ammoLabel);
      this.addChild(reloadLabel);
      
      // Update
      this.addEventListener(Event.ENTER_FRAME, this.update);
      // Go to next screen
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    changePage: function(page){
      this.page = page;
      switch(this.page){
        case 0: this.fingerAddX = 0; this.fingerAddY = -5; break;
        case 1: this.fingerAddX =-2; this.finger.x = this.dpad.x + 60; this.fingerAddY = 0; this.finger.frame = 1; this.rolf.scaleX = -1; break;
        case 2: this.fingerAddX = 2; this.finger.x = this.dpad.x + 130; this.fingerAddY = 0; this.rolf.scaleX = 1; break;
        case 3: this.fingerAddX = 0; this.fingerAddY = 0; this.finger.frame = 0; this.rolf.frame = 5; break;
        case 4: this.fingerAddX = 0; this.fingerAddY = 0; this.finger.frame = 1; this.finger.x = this.shootBtn.x + 20; this.finger.y = this.shootBtn.y + 32; this.createShot(); break;
        case 5: this.fingerAddX = 0; this.fingerAddY = 0; this.finger.frame = 0; break;
        case 6: this.fingerAddX = 0; this.fingerAddY = 0; this.finger.frame = 1; this.createShot(); break;
        case 7: this.fingerAddX = 0; this.fingerAddY = 0; this.finger.frame = 0; break;
        case 8: this.fingerAddX = 0; this.fingerAddY = 0; this.finger.frame = 1; this.bullets=6; this.finger.x = this.reloadBtn.x + 20; ; this.finger.y = this.reloadBtn.y + 32; break;
      }
    },
    
    createShot: function(){
      //var s = new PlayerShot(this.rolf.x+9, this.rolf.y);
      //this.addChild(s);
      this.bullets-=1;
      this.shot.visible = true;
      this.shotAddY=-20;
    },
    
    update: function(evt) {
      this.sceneAnimationTime += 1;
      switch(this.sceneAnimationTime){
        case 10:  this.changePage(0); break;
        case 30:  this.changePage(1); break;
        case 60:  this.changePage(2); break; 
        case 90:  this.changePage(3); break; 
        case 110: this.changePage(4); break;
        case 130: this.changePage(5); break;
        case 150: this.changePage(6); break;
        case 170: this.changePage(7); break;
        case 220: this.changePage(8); break;
        case 280: 
          if( isAndroid ) {
            //if(soundOn && endingstatus==2)//ending.stop();
            if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
          }
          game.replaceScene(new SceneInterlude());
        break;
      }
      
      this.ammoLabel.text = glossary.text.municao[language]+'_' + this.bullets + '/6';
      
      //movement update
      //this.finger.x += this.fingerAddX;
      this.finger.y += this.fingerAddY;
      this.rolf.x += this.fingerAddX;
      this.shot.y += this.shotAddY;
      if(this.shot.y<=0) {
        this.shotAddY = 0;
        this.shot.visible = false;
        this.shot.y = this.rolf.y;
      }
      
      //reload gun message
      if(this.bullets <= 0){
        this.reloadLabelTime-=1;
        if(this.reloadLabelTime <= 0) 
          if (this.reloadLabelShow){
            this.reloadLabelShow = false;
            this.reloadLabel.text = glossary.text.alertaReload[language];
            this.reloadLabelTime = 10;
          } else {
            this.reloadLabelShow = true;
            this.reloadLabel.text = '';
            this.reloadLabelTime = 10;
          }
      }else {
        this.reloadLabel.text = '';
        this.reloadLabelShow = true;
        this.reloadLabelTime = 10;
      }
    },

    touchToStart: function(evt) {
      var game = Game.instance;
      if( isAndroid ) {
        //if(soundOn && endingstatus==2)//ending.stop();
        if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
      }
      game.replaceScene(new SceneInterlude());
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
      
      this.backgroundColor = globalBgColor['bg3'];
      // map = new Map(32, 32);
      // map.image = game.assets['res/western1Sheet.png'];
      // map.loadData(arrMap1Top,arrMap1Sub);
            
      // snow = new Sprite(32,32);
      // snow.x = 224;
      // snow.y = 288;
      // snow.frame = 4;
      // snow.image = game.assets['res/penguinSheet.png']; 
      
      // melody = new Sprite(32,32);
      // melody.x = 192;
      // melody.y = 288;
      // melody.frame = 2;
      // melody.image = game.assets['res/melodySheet.png']; 
      
      label = new FontSprite('sega24', 320, 200, glossary.UI.optionsTxt[language]);
      label.x = 0;
      label.y = 8;
      
      // SOUND SETTINGS
      SoundOnLabel = new FontSprite('sega24', 80, 24, " [ON]");
      SoundOnLabel.x = 16;
      SoundOnLabel.y = 60;
      SoundOnLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpSound = true;
        this.text = '>[ON]';
        SoundOffLabel.text = ' [OFF]';
      });
      if (soundOn) SoundOnLabel.text = '>[ON]';
      
      SoundOffLabel = new FontSprite('sega24', 96, 24, ' [OFF]');
      SoundOffLabel.x = 140;
      SoundOffLabel.y = 60;
      SoundOffLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpSound = false;
        this.text = '>[OFF]';
        SoundOnLabel.text = ' [ON]';
      });
      if (!soundOn) SoundOffLabel.text = '>[OFF]';
      
      // LANGUAGE SETTINGS
      PtBrLabel = new FontSprite('sega24', 144, 24, " [BRASIL]");
      PtBrLabel.x = 16;
      PtBrLabel.y = 132;
      PtBrLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpLanguage = 'pt_BR';
        this.text = '>[BRASIL]';
        EnUsLabel.text = ' [WORLD]';
      });
      if (language == 'pt_BR') PtBrLabel.text = '>[BRASIL]';
      
      EnUsLabel = new FontSprite('sega24', 128, 24, ' [WORLD]');
      EnUsLabel.x = 172;
      EnUsLabel.y = 132;
      EnUsLabel.addEventListener(Event.TOUCH_START, function(e){
        tmpLanguage = 'en_US';
        this.text = '>[WORLD]';
        PtBrLabel.text = ' [BRASIL]';
      });
      if (language == 'en_US') EnUsLabel.text = '>[WORLD]';
      
      // HISCORE SETTINGS
      ResetYesLabel = new FontSprite('sega24', 96, 24, " "+glossary.UI.sim[language]);
      ResetYesLabel.x = 16;
      ResetYesLabel.y = 202;
      ResetYesLabel.addEventListener(Event.TOUCH_START, function(e){
        resetHiscore = true;
        this.text = '>'+glossary.UI.sim[language];
        ResetNoLabel.text = ' '+glossary.UI.nao[language];
      });
      if (resetHiscore) ResetYesLabel.text = '>'+glossary.UI.sim[language];
      
      ResetNoLabel = new FontSprite('sega24', 96, 24, ' '+glossary.UI.nao[language]);
      ResetNoLabel.x = 140;
      ResetNoLabel.y = 202;
      ResetNoLabel.addEventListener(Event.TOUCH_START, function(e){
        resetHiscore = false;
        this.text = '>'+glossary.UI.nao[language];
        ResetYesLabel.text = ' '+glossary.UI.sim[language];
      });
      if (!resetHiscore) ResetNoLabel.text = '>'+glossary.UI.nao[language];
      
      saveLabel = new FontSprite('sega24', 144, 24, glossary.UI.salvar[language]);
      saveLabel.x = 160;
      saveLabel.y = 256;
      saveLabel.addEventListener(Event.TOUCH_START, function(e){
        if(resetHiscore) hachiplayer.hiscore = 20000;
        soundOn = tmpSound;
        language = tmpLanguage;
        playerData.scoretable.hiscore = hachiplayer.hiscore;
        playerData.settings.sound = soundOn;
        playerData.settings.language = language;
        
        localStorage["com.hachicom.rolfwest.playerData"] = JSON.encode(playerData);
        game.replaceScene(new SceneTitle());
      });
      
      exitLabel = new FontSprite('sega24', 144, 24, glossary.UI.voltar[language]);
      exitLabel.x = 16;
      exitLabel.y = 256;
      exitLabel.addEventListener(Event.TOUCH_START, function(e){
        game.replaceScene(new SceneTitle());
      });
            
      // Add labels
      // this.addChild(map);
      // this.addChild(snow);
      // this.addChild(melody);
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
  
  // SceneStory
  var SceneStory = Class.create(Scene, {
    initialize: function() {
      var TitleLabel, scoreLabel;
      Scene.apply(this);     
      this.backgroundColor = globalBgColor['bg3'];
      
      label = new FontSprite('sega24', 320, 960, '');
      label.x = 0;
      label.y = game.height;
      this.label = label;
      
      label.text = glossary.text.storyPg1[language];
                  
      this.addChild(label);
      
      // Listen for taps
      this.addEventListener(Event.ENTER_FRAME, this.update);
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    update: function(evt) {
      this.label.y -= 1;
      if(this.label.y<= -this.label.height) game.replaceScene(new SceneCharacters());
    },
    
    touchToStart: function(evt) {
      var game = Game.instance;
      if( isAndroid ) {
        //if(soundOn && endingstatus==2)//ending.stop();
        if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
      }
      //game.replaceScene(new SceneTitle());
      game.replaceScene(new SceneCharacters());
    }
  });
  
  // SceneCharacters
  var SceneCharacters = Class.create(Scene, {
    initialize: function() {
      var TitleLabel, scoreLabel;
      Scene.apply(this);     
      this.backgroundColor = globalBgColor['bg2'];
      this.timeToTitle = 600;
      
      label = new FontSprite('sega24', 320, 960, '');
      label.x = 0;
      label.y = 0;
      this.label = label;
      
      label.text = glossary.text.storyPg2[language];
                  
      this.addChild(label);
      
      char1 = new Sprite(24,24);
      char1.x = 10;
      char1.y = 144;
      char1.frame = 4;
      char1.image = game.assets['res/rolfSheet.png'];
      this.addChild(char1);
            
      char2 = new Sprite(24,24);
      char2.x = 10;
      char2.y = 250;
      char2.image = game.assets['res/melodySheet.png']; 
      this.addChild(char2);
      
      char3 = new Sprite(24,24);
      char3.x = 10;
      char3.y = 356;
      char3.image = game.assets['res/bossAgileSheet.png'];
      this.addChild(char3);
      
      //townsfolk at 396
      //wildbat at 456
      
      // Listen for taps
      this.addEventListener(Event.ENTER_FRAME, this.update);
      // Listen for taps
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    update: function(evt) {
      this.timeToTitle -= 1;
      if(this.timeToTitle<= 0) game.replaceScene(new SceneTitle());
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
  
  // SceneTitle
  var SceneTitle = Class.create(Scene, {
    initialize: function(score) {
      var TitleLabel, scoreLabel;
      Scene.apply(this);
      
      // Background
      title = new Sprite(256,160);
      title.x = 32;
      title.y = 64;
      //bg.scale(2,2);
      title.image = game.assets['res/title.png'];      
      this.backgroundColor = globalBgColor['bg1'];
      map = new Map(32, 32);
      //map.y = 320;
      map.image = game.assets['res/western1Sheet.png'];
      //map.loadData(arrMap1Top,arrMap1Sub);
      
      scoreLabel = new FontSprite('sega12', 128, 12, 'SC 0');
      scoreLabel.x = 8;
      scoreLabel.y = 0;
      this.scoreLabel = scoreLabel;
            
      hiscoreLabel = new FontSprite('sega12', 144, 12, 'TOP '+hachiplayer.hiscore);
      hiscoreLabel.x = 160;
      hiscoreLabel.y = 0;
      this.hiscoreLabel = hiscoreLabel;
      
      //Title label
      TitleLabel = new FontSprite('sega24', 240, 24, "        v"+version);
      TitleLabel.x = 88;
      TitleLabel.y = 198;
      
      // Press Start label
      PressStart = new FontSprite('sega24', 192, 24, glossary.UI.start[language]);
      PressStart.x = 64;
      PressStart.y = 264;
      PressStart.addEventListener(Event.TOUCH_END, function(e){
        if( isAndroid ) {
          //if(soundOn && introstatus==2)intro.stop();
          if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
        }/* else{
          if(soundOn) game.assets['res/intro.mp3'].stop();
        } */
        game.replaceScene(new SceneTutorial());
      });
      
      // tutorialLabel = new FontSprite('sega24', 192, 24, glossary.UI.tutorial[language]);
      // tutorialLabel.x = 64;
      // tutorialLabel.y = 304;
      // tutorialLabel.addEventListener(Event.TOUCH_START, function(e){
        // game.replaceScene(new SceneTutorial());
      // });
      
      optionLabel = new FontSprite('sega24', 160, 24, glossary.UI.settings[language]);
      optionLabel.x = 64;
      optionLabel.y = 304;
      optionLabel.addEventListener(Event.TOUCH_END, function(e){
        if( isAndroid ) {
          //if(soundOn && introstatus==2)intro.stop();
          if(soundOn) window.plugins.LowLatencyAudio.stop(currentBGM);
        }/* else{
          if(soundOn) game.assets['res/intro.mp3'].stop();
        } */
        game.replaceScene(new SceneSettings());
      });
      
      creditLabel = new FontSprite('sega24', 160, 24, glossary.UI.credits[language]);
      creditLabel.x = 64;
      creditLabel.y = 344;
      creditLabel.addEventListener(Event.TOUCH_END, function(e){
        game.replaceScene(new SceneCredits());
      });
      
      // Level Select label
      levelLabel = new FontSprite('sega24', 160, 24, "[STAGE "+hachiplayer.level+"]");
      levelLabel.x = 64;
      levelLabel.y = 384;
      levelLabel.addEventListener(Event.TOUCH_END, function(e){
        if(hachiplayer.level>=24) hachiplayer.reset();
        else hachiplayer.levelUp(1);
        this.text = "[STAGE "+hachiplayer.level+"]";
      });
      levelLabel.visible = false;
      this.levelLabel = levelLabel;
      
      // Copyright label
      this.cheatcodeCnt = 0;
      copyright = new FontSprite('sega12', 240, 14, "© 2015 HACHICOM");
      copyright.x = 120;
      copyright.y = game.height - 16 - 60;
      copyright.addEventListener(Event.TOUCH_END, function(e){
        this.parentNode.cheatcodeCnt++;
        if (this.parentNode.cheatcodeCnt>=9) this.parentNode.levelLabel.visible = true;
      });
      
      this.timeToStory = 300;
      
      // Add labels  
      this.addChild(title);
      //this.addChild(map);
      this.addChild(copyright);
      this.addChild(TitleLabel); 
      this.addChild(PressStart);
      //this.addChild(tutorialLabel);
      this.addChild(optionLabel);
      this.addChild(creditLabel);
      this.addChild(levelLabel);
      // this.addChild(scoreLabel);
      // this.addChild(hiscoreLabel);
      
      // if( isAndroid ) {
        // if(soundOn) {
          // currentBGM = 'intro';
          // window.plugins.LowLatencyAudio.play(currentBGM);
          // /* intro.seekTo(1);
          // intro.play(); */
        // }
      // }
      /* else{
        if(soundOn) game.assets['res/intro.mp3'].play();
      } */
            
      this.addEventListener(Event.ENTER_FRAME, this.update);
      this.addEventListener(Event.TOUCH_START, this.touchToStart);
    },
    
    update: function(evt) {
      this.timeToStory--;
      if(this.timeToStory<=0) game.replaceScene(new SceneStory());
    },
    
    touchToStart: function(evt) {
      this.timeToStory=300;
    }
  });  
};
