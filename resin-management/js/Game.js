class Game {
    constructor(id, description, img, capStamina, staminaPerMinute) {
        this.id = id;
        this.description = description;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
    }
}

var allGames = [];

allGames.push(new Game(id = 1, description = 'Genshin Impact', img = 'img/genshin-icon.png', capStamina = 200, staminaPerMinute = 8));
allGames.push(new Game(id = 2, description = 'Punishing Gray Raven', img = 'img/pgr-icon.png', capStamina = 160, staminaPerMinute = 6));