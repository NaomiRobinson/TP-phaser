export default class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init() {
    this.playAgain= false;
}

preload() {}

create() {
    this.add.image(400, 300, "sky").setScale(0.555);
    this.add.image(400, 300, "recuadro").setScale(0.400);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.GameoverText = this.add.text(230,260, "Perdiste", {
        fontSize: "80px",
        fill: "#E6DE35",
        fontStyle: "bold",
        
    });

    this.playAgainText = this.add.text(240,350 , "<SPACE> para volver a intentar", {
        fontSize: "20px",
        fill: "#fff",
    });



}

update() {
    if (this.cursors.space.isDown) {
        this.playAgain = true;
    }

    if (this.playAgain) {
        this.scene.start("game");
      }
}
}
