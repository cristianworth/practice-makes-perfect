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

// addNewGame(7);

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
        const games = await db.games.orderBy("dateMaxStamina").toArray();
        console.log("Todos os jogos:", games);
        return games;
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

async function addNewGame(gameId) {
    try {
        var gameFound = await fetchGameById(gameId);

        if (!gameFound)
        {
            var newGame = allGames.find(x => x.id === gameId);

            if (newGame) {
                await db.games.add(newGame);
                console.log("Game added successfully:", newGame);
            } else {
                console.error("Game not found in the allGames array.");
            }
        } else {
            console.log("Game already exists in the database:", gameFound);
        }
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}