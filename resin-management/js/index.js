// Game.js
class Game {
    constructor(id, description, img) {
        this.id = id;
        this.description = description;
        this.img = img;
    }
}

var allGachas = [];

allGachas.push(new Game(id = 1, description = 'Genshin Impact', img = 'img/genshin-icon.png'));
allGachas.push(new Game(id = 2, description = 'Punishing Gray Raven', img = 'img/pgr-icon.png'));

function editGacha() {
    alert('Edit not implemented yet');
}

function deleteGacha() {
    alert('Remove not implemented yet');
}

function loadGamesList() {
    allGachas.forEach(game => {
        addNewGachaToList(game);
    });
}

function addNewGachaToList(game) {
    let gachasList = document.getElementById("games-list");
    let index = gachasList.children.length + 1;

    gachasList.innerHTML += `
        <li class="gacha-item">
            <img src=${game.img} alt="${game.description} Icon" width="25" height="25">
            <p class="button-item">${game.description}</p>
            <button id="${index}Edit" class="button-item" onclick="editGacha()">Edit</button>
            <button id="${index}Delete" class="button-item" onclick="deleteGacha()">Delete</button>
        </li>
        `;
}

document.addEventListener("DOMContentLoaded", function () {
    let formCreate = document.getElementById("form-create");
    formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let gachaName = document.getElementById("name").value;
        addNewGachaToList(gachaName)
    });

    loadGamesList();
});