export default class Winner extends Phaser.Scene {
 constructor() {
   super("winner");
    }
  
    init() {
        this.playAgain= false;
    }
  
    preload() {}
  
    create() {
        this.add.image(400, 300, "sky").setScale(0.555);
        this.add.image(400, 300, "recuadro").setScale(0.400);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.winnerText1 = this.add.text(150,255 , "¡Felicitaciones!", {
            fontSize: "56px",
            fill: "#E6DE35",
            fontStyle: "bold",
            
        });

        this.winnerText2 = this.add.text(290,350 , "Ganaste", {
            fontSize: "60px",
            fill: "#fff",
        });

        this.playAgainText = this.add.text(280,430 , "<SPACE> jugar de nuevo", {
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
  