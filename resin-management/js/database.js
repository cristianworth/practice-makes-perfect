const db = new Dexie("gameDatabase");

db.version(1).stores({
    games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina'
});

db.version(2).stores({
    games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks'
});

db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});

async function populateInitialData() {
    try {
        const count = await db.games.count();
        if (count === 0) {
            await db.games.bulkAdd(allGames);
            console.log("Initial data populated.");
        }
    } catch (error) {
        console.error("Error populating initial data:", error);
    }
}

async function updateGame(game) {
    try {
        await db.games.update(game.id, game);
        console.log("Jogo atualizado com sucesso ID = ", game.id);
    } catch (error) {
        console.error("Erro ao atualizar o jogo:", error);
    }
}

async function fetchAllGames() {
    try {
        const games = await db.games.toArray();
        console.log("Todos os jogos:", games);
        displayGames(games);
    } catch (error) {
        console.error("Erro ao buscar todos os jogos:", error);
    }
}

async function fetchGameById(id) {
    try {
        const game = await db.games.get(id);
        console.log("Jogo encontrado:", game);
        return game;
    } catch (error) {
        console.error("Erro ao buscar o jogo pelo ID:", error);
    }
}

function displayGames(games) {
    games.forEach(game => {
        let gameListBody = document.getElementById("gameListBody");
        gameListBody.innerHTML += `
            <tr>
                <td><img src=${game.img} alt="${game.description} Icon" class="icon" width="50" height="50"></td>
                <td>${game.description}</td>
                <td>
                    <textarea id="pendingTasks${game.id}" name="pendingTasks" spellcheck="false">${game.pendingTasks || ''}</textarea>
                </td>
                <td>
                    <input class="input-centered spacing-left" id="newStamina${game.id}" name="newStamina" value="${game.currentStamina | ''}" />
                    <button class="spacing-left" id="${game.id}" onclick="calculateTimeForMaxStaminaDb(${game.id})">Refresh</button>
                </td>
                <td><span id="newMaxStaminaAt${game.id}" class="spacing-left red-text">${game.maxStaminaAt}<\span></td>
                <td hidden>${game.dateMaxStamina}</td>
            </tr>
        `;
    });
}

async function calculateTimeForMaxStaminaDb(gameId) {
    let game = await fetchGameById(gameId);

    game.pendingTasks = document.getElementById(`pendingTasks${gameId}`).value;
    game.currentStamina = parseInt(document.getElementById(`newStamina${gameId}`).value);
    game.dateMaxStamina = forecastMaxStamina(game);
    game.maxStaminaAt = formatDateToDayHour(game.dateMaxStamina);
    document.getElementById(`newMaxStaminaAt${gameId}`).textContent = game.maxStaminaAt;

    updateGame(game)
}

fetchAllGames();
