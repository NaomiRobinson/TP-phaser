export default class Winner extends Phaser.Scene {
 constructor() {
   super("winner");
    }
  
    init() {}
  
    preload() {}
  
    create() {
        this.add.image(400, 300, "sky").setScale(0.555);

        this.winnerText = this.add.text(265,385 , "Ganaste!", {
            fontSize: "60px",
            fill: "#fff",
        });
    }
  
    update() {}
}
  