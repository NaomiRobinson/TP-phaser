export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init() {}

  preload() {}

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

     this.gameoverText = this.add.text(210,385 , "Perdiste :(", {
            fontSize: "60px",
            fill: "#fff", 
        });
  }

  update() {}
}
