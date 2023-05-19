export default class Help extends Phaser.Scene {
    constructor() {
      super("help");
    }
  
    init() {
        this.isGame= false;
    }
  
    preload() {
        this.load.image("instrucciones", "./assets/images/Instrucciones.png");
    }
  
    create() {
      this.add.image(400, 300, "sky").setScale(0.555);
      this.add.image(390, 300, "instrucciones").setScale(0.40);


      this.cursors = this.input.keyboard.createCursorKeys();

    }
  

    update() {

        if (this.cursors.space.isDown) {
            this.isGame = true;
        }

        if (this.isGame) {
            this.scene.start("game");
          }
    }
}