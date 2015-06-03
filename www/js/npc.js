// Score Sprite
var ScoreSprite = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,scoreval) {
    // Call superclass constructor
    Sprite.apply(this,[24, 12]);
    this.image  = Game.instance.assets['res/scoreSheet.png'];    
    this.frame = 0;
    switch(scoreval){
      case 50: this.frame = 0; break;
      case 100: this.frame = 1; break;
      case 250: this.frame = 2; break;
      case 500: this.frame = 3; break;
      case 1000: this.frame = 4; break;
      default: this.visible=false; break;
    }
    
    this.x = x;
    this.y = y;
    this.yUp = 20;
    this.aboutToDieTime = 60;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  remove: function(){
    this.parentNode.removeChild(this);
    delete this;
  },
    
  update: function(evt) { 
    //this object must be added directly to the scene
    if (!this.parentNode.paused){
      this.aboutToDieTime-=1;
      if(this.yUp>0) {
        this.yUp-=1;
        this.y-=1;
      }
      // if(this.aboutToDieTime%2==0){
        // this.visible=false;
      // }else this.visible=true;
      if(this.aboutToDieTime<=0){
        this.remove();
      }
    }
  }
});

// Yuki
var Melody = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x, y) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/melodySheet.png'];    
    this.frame = 0;  
    this.scaleX = -1;
    this.iniFrame = 0;
    this.endFrame = 1;
    this.animationDuration = 0;
    this.animationSpeed = 0.25;
    
    this.x = x;
    this.y = y;
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  interact: function(playerObj,hero){
    // this.frame = 3;
    // this.iniFrame = 3;
    // this.endFrame = 3;
    playerObj.addScore(this.parentNode.parentNode.bonusReward,false);
    for (var i = this.parentNode.parentNode.itemGroup.childNodes.length - 1; i >= 0; i--) {
      var item;
      item = this.parentNode.parentNode.itemGroup.childNodes[i];
      item.gotHit(playerObj,hero); //collect all itens
    }
    this.parentNode.parentNode.endLevel = true;
  },
    
  update: function(evt) { 
    // Movement
    if (this.x > 280) this.x-=1;
    else {
      this.x = 280;
      this.frame = 0;
      this.iniFrame = 0;
      this.endFrame = 0;
    }
    // Animation
    if (!this.parentNode.paused){
      this.animationDuration += 0.05;
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
    }
  }
});
