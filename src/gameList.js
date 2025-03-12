const gamesData = [
    { name: "GATES OF OLYMPUS", status: 0 },
    { name: "STARLIGHT PRINCESS", status: 0 },
    { name: "GATES OF OLYMPUS X1000", status: 0 },
    { name: "STARLIGHT PRINCESS X1000", status: 0 },
    { name: "SWEET BONANZA", status: 0 },
    { name: "AZTEC GEMS", status: 0 },
    { name: "MAHJONG WAYS", status: 0 }
];

// Function to save game data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("games", JSON.stringify(gamesData));
}

// Function to load game data from localStorage
function loadFromLocalStorage() {
    const storedData = localStorage.getItem("games");
    if (storedData) {
        return JSON.parse(storedData);
    }
    return gamesData;
}

// Function to render the game list
function renderGameList() {
    const tableBody = document.querySelector('#gameTable tbody');
    const games = loadFromLocalStorage();

    tableBody.innerHTML = ""; // Clear existing table rows

    games.forEach((game, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.name}</td>
            <td data-final="${game.status}">${game.status}%</td>
            <td>
                <button class="edit-button" onclick="editGame(this)">Edit</button>
                <button class="delete-button" onclick="deleteGame(this)">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit the game status
function editGame(button) {
    const row = button.closest('tr');
    const gameName = row.querySelector('td:first-child').textContent;
    const statusCell = row.querySelector('td:nth-child(2)');
    const status = statusCell.textContent.trim();

    // Enable the input fields for editing
    document.getElementById('gameName').value = gameName;
    document.getElementById('gameName').disabled = true; // Disable game name input field
    document.getElementById('gameStatus').value = status.replace('%', ''); // Remove "%" symbol for editing
}

// Function to delete a game from the table
function deleteGame(button) {
    const row = button.closest('tr');
    const gameName = row.querySelector('td:first-child').textContent;

    // Remove the game from the array
    const index = gamesData.findIndex(game => game.name === gameName);
    if (index !== -1) {
        gamesData.splice(index, 1);
    }

    saveToLocalStorage(); // Save updated list to localStorage
    renderGameList(); // Re-render the table
}

// Function to update the game status
function updateGameStatus() {
    const gameName = document.getElementById('gameName').value;
    const gameStatus = document.getElementById('gameStatus').value;

    if (!gameStatus) {
        alert('Please enter a valid status!');
        return;
    }

    const game = gamesData.find(game => game.name === gameName);
    if (game) {
        game.status = parseInt(gameStatus); // Update the game status
        saveToLocalStorage(); // Save to localStorage
        renderGameList(); // Re-render the table
        alert('Game status updated successfully!');
    }

    // Clear the input fields
    document.getElementById('gameName').value = '';
    document.getElementById('gameStatus').value = '';
}

// Function to add a new game
function addNewGame() {
    const newGameName = document.getElementById("newGameName").value.trim();
    const newGameStatus = document.getElementById("newGameStatus").value.trim();

    if (!newGameName || newGameStatus === "") {
        alert("Please enter both game name and status.");
        return;
    }

    // Cek apakah game sudah ada
    const existingGame = gamesData.find(game => game.name.toLowerCase() === newGameName.toLowerCase());
    if (existingGame) {
        alert("Game already exists!");
        return;
    }

    // Tambah game baru
    gamesData.push({ name: newGameName, status: parseInt(newGameStatus) });

    saveToLocalStorage();
    renderGameList();

    // Reset input fields
    document.getElementById("newGameName").value = "";
    document.getElementById("newGameStatus").value = "";
}

// Function to edit the game (including name)
function editGame(button) {
    const row = button.closest("tr");
    const gameName = row.querySelector("td:first-child").textContent;
    const statusCell = row.querySelector("td:nth-child(2)");
    const status = statusCell.textContent.replace("%", "").trim();

    // Enable inputs for editing
    document.getElementById("gameName").value = gameName;
    document.getElementById("gameName").disabled = false; // Allow editing game name
    document.getElementById("gameStatus").value = status;
}

// Function to update game status and name
function updateGameStatus() {
    const oldGameName = document.getElementById("gameName").value.trim();
    const newGameStatus = document.getElementById("gameStatus").value.trim();

    if (!oldGameName || newGameStatus === "") {
        alert("Please enter valid data!");
        return;
    }

    const gameIndex = gamesData.findIndex(game => game.name === oldGameName);
    if (gameIndex === -1) {
        alert("Game not found!");
        return;
    }

    // Update game status
    gamesData[gameIndex].status = parseInt(newGameStatus);

    // Perbolehkan user mengganti nama game (opsional)
    const newGameName = prompt("Enter new game name or leave blank to keep the same:", oldGameName);
    if (newGameName && newGameName.trim() !== oldGameName) {
        gamesData[gameIndex].name = newGameName.trim();
    }

    saveToLocalStorage();
    renderGameList();

    // Reset input fields
    document.getElementById("gameName").value = "";
    document.getElementById("gameStatus").value = "";
}


// Initialize the page by rendering the game list
renderGameList();


