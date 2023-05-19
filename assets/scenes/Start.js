export default class Start extends Phaser.Scene {
    constructor() {
      super("start");
    }
  
    init() {
        this.goHelp= false;
    }
  
    preload() {
        this.load.image("player", "../assets/images/Ninja.png");
        this.load.image("sky", "../assets/images/Cielo.png");
        this.load.image("recuadro", "../assets/images/Recuadro.png");
    }
  
    create() {
      this.add.image(400, 300, "sky").setScale(0.555);
      this.add.image(390, 250, "recuadro").setScale(0.40);


      this.cursors = this.input.keyboard.createCursorKeys();

      this.titleText = this.add.text(148,200 , "NINJA MONCHO", {
        fontSize: "70px",
        fill: "#E6DE35",
        fontStyle: "bold",
    });

      this.startText = this.add.text(110,300 , "Presione <ESPACIO> para comenzar", {
        fontSize: "30px",
        fill: "#fff",
        fontStyle: "bold",
    });

    }
  

    update() {

        if (this.cursors.space.isDown) {
            this.goHelp = true;
        }

        if (this.goHelp) {
            this.scene.start("help");
          }
    }
}