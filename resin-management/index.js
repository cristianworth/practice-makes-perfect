function editGacha() {
    console.log('Edit not implemented yet');
}

function deleteGacha() {
    console.log('Remove not implemented yet');
}

document.addEventListener("DOMContentLoaded", function(){
    let formCreate = document.getElementById("form-create");
    let gachaName = document.getElementById("name");
    let gachasList = document.getElementById("gachas-list");

    formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        
        console.log(gachaName.value);

        gachasList.innerHTML += `
        <li class="gacha-item">
            <p>${gachaName.value}</p>
            <button class="button-item" onclick="editGacha()">Edit</button>
            <button class="button-item" onclick="deleteGacha()">Delete</button>
        </li>
        `;
    });
});