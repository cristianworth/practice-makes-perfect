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
            <img src=${game.img} alt="${game.description} Icon" width="25" height="25">
            <p class="button-item">${game.description}</p>

            <label class="button-item" for="currentStamina">Current Stamina:</label>
            <input id="currentStamina${game.id}" name="currentStamina" value="${game.currentStamina | ''}" />

            <button id="${game.id}" onclick="calculateTimeForMaxStamina(${game.id})">Refresh</button>
            <p class="button-item">Max stamina at: </p> <span id="maxStaminaAt${game.id}" class="red-text">${game.maxStaminaAt}<\span>
        </li>
        `;
}

function calculateTimeForMaxStamina(gameId) {
    let game = allGames.find(g => g.id === gameId);

    let currentStamina = parseInt(document.getElementById(`currentStamina${gameId}`).value);
    game.currentStamina = currentStamina;

    let maxStaminaAt = calculateMaxStaminaAt(game)
    game.maxStaminaAt = maxStaminaAt;
    document.getElementById(`maxStaminaAt${gameId}`).textContent = game.maxStaminaAt;

    localStorage.setItem(game.description, JSON.stringify(game))
}

function calculateMaxStaminaAt(game) {
    let totalStaminaLeft = game.capStamina - game.currentStamina;
    let howManyMinutesUntilCapped = totalStaminaLeft * game.staminaPerMinute;

    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + howManyMinutesUntilCapped);

    let day = currentDate.getDate();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let formattedDate = `Day ${day} at ${hour}:${minutes < 10 ? '0' + minutes : minutes}`
    return formattedDate;
}

document.addEventListener("DOMContentLoaded", function () {
    let formCreate = document.getElementById("form-create");
    formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let descriptionNewGame = document.getElementById("descriptionNewGame").value;
        let newGame = new Game(9999, descriptionNewGame, 'no img');
        addNewGameToList(newGame)
    });

    loadGamesList();
});