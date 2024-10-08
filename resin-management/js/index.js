async function updateGameStamina(gameId) {
    let game = await fetchGameById(gameId);

    const staminaValue = parseInt(document.getElementById(`newStamina${gameId}`).value, 10);
    const pendingTasksValue = document.getElementById(`pendingTasks${gameId}`).value;

    if (!isNaN(staminaValue)) {
        game.currentStamina = staminaValue;
        game.pendingTasks = pendingTasksValue;
        game.dateMaxStamina = calculateMaxStaminaDate(game);
        game.maxStaminaAt = formatDateToDayHour(game.dateMaxStamina);

        document.getElementById(`newMaxStaminaAt${gameId}`).textContent = game.maxStaminaAt;

        await updateGame(game);
        displayAllGames();
    } else {
        alert("Please enter a valid integer number for stamina.");
    }
}

function calculateMaxStaminaDate(game) {
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
    });
}

function initFormEventTimeMethod() {
    let formEventTime = document.getElementById("form-event-time");
    formEventTime.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let eventDay = parseInt(document.getElementById("eventDay").value) | 0;
        let eventHour = parseInt(document.getElementById("eventHour").value) | 0;
        
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + eventDay);
        currentDate.setHours(currentDate.getHours() + eventHour);
        document.getElementById("eventOver").textContent = formatDate(currentDate);
    });
}

async function displayAllGames() {
    var games = await fetchAllGames();
    gameListBody.innerHTML = ''; // clear data

    games.forEach(game => {
        let gameListBody = document.getElementById("gameListBody");
        gameListBody.innerHTML += `
            <tr>
                <td><img src=${game.img} alt="${game.description} Icon" class="icon"></td>
                <td>${game.description}</td>
                <td>
                    <textarea id="pendingTasks${game.id}" name="pendingTasks" spellcheck="false">${game.pendingTasks || ''}</textarea>
                </td>
                <td>
                    <input class="input-centered spacing-left" id="newStamina${game.id}" name="newStamina" type="number" oninput="validateStaminaInput(this)" value="${game.currentStamina | ''}" />
                    <button class="spacing-left" id="${game.id}" onclick="updateGameStamina(${game.id})">Update</button>
                </td>
                <td><span id="newMaxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span></td>
                <td hidden>${game.dateMaxStamina}</td>
            </tr>
        `;
    });
}

function validateStaminaInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');  // Removes non-numeric characters
}

document.addEventListener("DOMContentLoaded", function () {
    initFormCreateMethod();
    initFormEventTimeMethod();
    populateInitialData();
    displayAllGames();
});