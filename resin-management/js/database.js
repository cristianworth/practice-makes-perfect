const db = new Dexie("gameDatabase");

db.version(1).stores({
    games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina'
});

db.version(2).stores({
    games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks'
});

db.version(3).stores({
    // games: 'id, description, abbreviation, img, capStamina, staminaPerMinute, currentStamina, maxStaminaAt, dateMaxStamina, pendingTasks',
    tasks: 'id, description, expirationDate, isDone, refreshType, gameId',
});

db.open().then(populateInitialData).catch((error) => {
    console.error("Failed to open the database:", error);
});

async function populateInitialData() {
    try {
        for (const game of allGames) {
            await addGameIfNotExists(game);
        }
        console.log("Initial data populated.");
    } catch (error) {
        console.error("Error populating initial data:", error);
    }
}

async function addGameIfNotExists(newGame) {
    // Method used to populate the initial set o data predefined on the Game.js file
    try {
        const gameFound = await fetchGameById(newGame.id);

        if (!gameFound)
        {
            await db.games.add(newGame);
            console.log(`Game added successfully: ${newGame}`);
        } else {
            console.log("Game already exists in the database:", gameFound);
        }
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

async function updateGame(game) {
    // Method used to mainly update the amout of stamina on the main screen
    if (!game.id) {
        console.log("Invalid game object id: ", game);
        return;
    }

    try {
        await db.games.update(game.id, game);
        console.log("Jogo atualizado com sucesso ID = ", game.id);
    } catch (error) {
        console.error("Erro ao atualizar o jogo:", error);
    }
}

async function deleteGameById(gameId) {
    // Not really used at the moment but can be used to update an existing Game, 
    //      delet it and then when the pages reload the populateInitialData will create it again
    // Examples:
    // deleteGameById(2);
    // deleteGameById(6);
    // deleteGameById(7);
    try {
        const gameFound = await fetchGameById(gameId);

        if (gameFound) {
            await db.games.delete(gameId);
            console.log(`Game with ID ${gameId} deleted successfully.`);
        } else {
            console.log(`Game with ID ${gameId} not found in the database.`);
        }
    } catch (error) {
        console.error(`Failed to delete game with ID ${gameId}:`, error);
    }
}

async function fetchAllGames() {
    // Method used to load allGames into the main page. 
    try {
        const games = await db.games.orderBy("dateMaxStamina").toArray();
        console.log("Todos os jogos:", games);
        return games;
    } catch (error) {
        console.error("Erro ao buscar todos os jogos:", error);
        return [];
    }
}

async function fetchGameById(id) {
    // Method to verify if the game exists
    try {
        const game = await db.games.get(id);
        console.log("Jogo encontrado:", game);
        return game;
    } catch (error) {
        console.error("Erro ao buscar o jogo pelo ID:", error);
        return null;
    }
}

async function addTask(task) {
    try {
        await db.tasks.add(task);
        console.log(`Task added successfully: ${task}`);
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

async function updateTask(task) {
    if (!task.id) {
        console.log("Invalid task object id: ", task);
        return;
    }

    try {
        await db.tasks.update(task.id, task);
        console.log("Tarefa atualizado com sucesso ID = ", task.id);
    } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
    }
}

async function fetchTasksByGame(gameId) {
    try {
        var task = await db.tasks.where("gameId").equals(gameId).toArray();
        console.log(`Task finded successfully: ${task}`);
        return task;
    } catch (error) {
        console.error("Failed to add game:", error);
    }
}

async function fetchAllTasks() {
    try {
        const tasks = await db.tasks.orderBy("expirationDate").toArray();
        console.log("Todas as tarefas:", tasks);
        return games;
    } catch (error) {
        console.error("Erro ao buscar todas as tarefas:", error);
        return [];
    }
}

async function completeTask(taskId) {
    try {
        var task = await db.tasks.update(taskId, { status: "completed" });
        console.log(`Task updated successfully: ${task}`);
        return task;
    } catch (error) {
        console.error("Failed to update game:", error);
    }
}