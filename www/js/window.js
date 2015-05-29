// Gui Window Class
var GuiWindow = Class.create(Group, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,w,h,title) {
    // Call superclass constructor
    Group.apply(this);
    
    bg = new Sprite(w, h);
    bg.backgroundColor = '#0000FF';
    bg.x = x;
    bg.y = y;
    this.bgwindow = bg;

    titlelable = new FontSprite('sega24', 144, 28, title);
    titlelable.x = bg.x + 16;
    titlelable.y = bg.y + 10;
    
    this.addChild(bg);
    this.addChild(titlelable);
  },
  
  setVisibility: function(visibility) {
    //var game = Game.instance;
    for (var i = this.childNodes.length - 1; i >= 0; i--){
      var kid;
      kid = this.childNodes[i];
      kid.visible = visibility;
    }
  },
  
  update: function(evt) {
    //var game = Game.instance;
  }
});

// Pause Window class
var PauseWindow = Class.create(GuiWindow, {
  // Succeeds Gui Window class
  initialize: function(x, y){
    GuiWindow.call(this, x, y, 160, 160, ' *PAUSE*');
    
    resumelable = new FontSprite('sega24', 144, 28, glossary.UI.continuar[language]);
    resumelable.x = this.bgwindow.x + 16;
    resumelable.y = this.bgwindow.y + 60;
    resumelable.addEventListener(Event.TOUCH_END,this.handleResume);
    
    quitlable = new FontSprite('sega24', 144, 28, glossary.UI.sair[language]);
    quitlable.x = this.bgwindow.x + 16;
    quitlable.y = this.bgwindow.y + 110;
    quitlable.addEventListener(Event.TOUCH_END,this.handleQuit);
    
    this.addChild(resumelable);
    this.addChild(quitlable);
  },
  
  handleResume: function(){
    this.parentNode.setVisibility(false);
    this.parentNode.parentNode.paused = false;
  },
  
  handleQuit: function(){
    this.parentNode.parentNode.goToTitleScreen();
  },
});