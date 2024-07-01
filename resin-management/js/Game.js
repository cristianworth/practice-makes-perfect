class Game {
    constructor(id, description, img, capStamina, staminaPerMinute, currentStamina = 0, maxStaminaAt = 'not defined') {
        this.id = id;
        this.description = description;
        this.img = img;
        this.capStamina = capStamina;
        this.staminaPerMinute = staminaPerMinute;
        this.currentStamina = currentStamina;
        this.maxStaminaAt = maxStaminaAt;
    }
}

var allGames = [];

allGames.push(new Game(id = 1, description = 'Genshin Impact', img = 'img/genshin-icon.png', capStamina = 200, staminaPerMinute = 8));
allGames.push(new Game(id = 2, description = 'Punishing Gray Raven', img = 'img/pgr-icon.png', capStamina = 160, staminaPerMinute = 6));
allGames.push(new Game(id = 3, description = 'Star Rail', img = 'img/star-rail-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(id = 4, description = 'Wuthering Waves', img = 'img/wuthering-waves-icon.png', capStamina = 240, staminaPerMinute = 6));
allGames.push(new Game(id = 5, description = 'Nikke', img = 'img/nikke-icon.png', capStamina = 1, staminaPerMinute = 1440));