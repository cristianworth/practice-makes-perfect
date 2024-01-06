var allGachas = [
    { id: 1, name: 'Genshin Impact'},
    { id: 2, name: 'Honkai Impact 3rd'},
    { id: 3, name: 'Honkai Star Rail'},
    { id: 4, name: 'Punishing Gray Raven'},
];

function editGacha() {
    console.log('Edit not implemented yet');
}

function deleteGacha() {
    console.log('Remove not implemented yet');
}

function listGachas() {
    allGachas.forEach(e => {
        addNewGachaToList(e.name);
    });
}

function addNewGachaToList(gachaName) {
    let gachasList = document.getElementById("gachas-list");
    let index = gachasList.children.length + 1;

    gachasList.innerHTML += `
        <li class="gacha-item">
            <p>${gachaName}</p>
            <button id="${index}Edit" class="button-item" onclick="editGacha()">Edit</button>
            <button id="${index}Delete" class="button-item" onclick="deleteGacha()">Delete</button>
        </li>
        `;
}

document.addEventListener("DOMContentLoaded", function () {
    let formCreate = document.getElementById("form-create");
    let gachaName = document.getElementById("name").value;

    listGachas();

    formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewGachaToList(gachaName)
    });
});