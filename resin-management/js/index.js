function loadGamesList() {
    document.getElementById("descriptionNewGame").value = '';

    allGames.forEach(game => {
        let storedGame = JSON.parse(localStorage.getItem(game.description));

        if (storedGame) 
        { 
            addNewGameToList(storedGame);
        } else { 
            addNewGameToList(game);
        }
    });
}

function addNewGameToList(game) {
    let gameList = document.getElementById("games-list");
    gameList.innerHTML += `
        <li class="game-item">
            <img src=${game.img} alt="${game.description} Icon" width="35" height="35">

            <label class="spacing-left" for="currentStamina">Current Stamina:</label>
            <input class="spacing-left" id="currentStamina${game.id}" name="currentStamina" value="${game.currentStamina | ''}" />

            <button class="spacing-left" id="${game.id}" onclick="calculateTimeForMaxStamina(${game.id})">Refresh</button>
            <p class="spacing-left">Max stamina at: </p> <span id="maxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span>
        </li>
        `;
}

function calculateTimeForMaxStamina(gameId) {
    let game = allGames.find(g => g.id === gameId);

    let currentStamina = parseInt(document.getElementById(`currentStamina${gameId}`).value);
    game.currentStamina = currentStamina;
    game.dateMaxStamina = forecastMaxStamina(game)

    let maxStaminaAt = formatDateToDayHour(game.dateMaxStamina)
    game.maxStaminaAt = maxStaminaAt;
    document.getElementById(`maxStaminaAt${gameId}`).textContent = formatDateToDayHour(game.dateMaxStamina);

    localStorage.setItem(game.description, JSON.stringify(game))
}

function forecastMaxStamina(game) {
    let totalStaminaLeft = game.capStamina - game.currentStamina;
    let howManyMinutesUntilCapped = totalStaminaLeft * game.staminaPerMinute;

    let forecastDate = new Date();
    forecastDate.setMinutes(forecastDate.getMinutes() + howManyMinutesUntilCapped);

    return forecastDate;
}

function initFormCreateMethod() {
    let formCreate = document.getElementById("form-create");
    formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let descriptionNewGame = document.getElementById("descriptionNewGame").value;
        let newGame = new Game(9999, descriptionNewGame, 'no img');
        addNewGameToList(newGame)
    });
}

function initFormEventTimeMethod() {
    let formEventTime = document.getElementById("form-event-time");
    formEventTime.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let eventDay = parseInt(document.getElementById("eventDay").value);
        let eventHour = parseInt(document.getElementById("eventHour").value);
        
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + eventDay);
        currentDate.setHours(currentDate.getHours() + eventHour);
        document.getElementById("eventOver").textContent = formatDate(currentDate);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initFormCreateMethod();
    initFormEventTimeMethod();
    loadGamesList();
});