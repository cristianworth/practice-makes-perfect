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
    let gameTableBody = document.getElementById("gameTableBody");
    gameTableBody.innerHTML += `
        <tr>
            <td><img src=${game.img} alt="${game.description} Icon" class="icon" width="35" height="35"></td>
            <td>${game.description}</td>
            <td>
                <input class="input-centered spacing-left" id="currentStamina${game.id}" name="currentStamina" value="${game.currentStamina | ''}" />
                <button class="spacing-left" id="${game.id}" onclick="calculateTimeForMaxStamina(${game.id})">Refresh</button>
            </td>
            <td><span id="maxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span></td>
            <td>${game.dateMaxStamina}</td>
        </tr>
    `;
}

function calculateTimeForMaxStamina(gameId) {
    let game = allGames.find(g => g.id === gameId);

    let currentStamina = parseInt(document.getElementById(`currentStamina${gameId}`).value);
    game.currentStamina = currentStamina;
    game.dateMaxStamina = forecastMaxStamina(game)

    let maxStaminaAt = formatDateToDayHour(game.dateMaxStamina)
    game.maxStaminaAt = maxStaminaAt;
    document.getElementById(`maxStaminaAt${gameId}`).textContent = maxStaminaAt;

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

function orderGameTableByDate() {
    let table = document.getElementById("gameTable").getElementsByTagName("tbody")[0];
    let rows = Array.from(table.rows);

    rows.sort((a, b) => {
        let dateA = new Date(a.cells[3].innerText);
        let dateB = new Date(b.cells[3].innerText);
        return dateA - dateB;
    });

    rows.forEach(row => table.appendChild(row));
}

document.addEventListener("DOMContentLoaded", function () {
    initFormCreateMethod();
    initFormEventTimeMethod();
    loadGamesList();
    orderGameTableByDate();
});