// Define the expected codes for each clue
const codes = {
    "index.html": "1234",
    "clue2.html": "5678",
    "clue3.html": "2468",
    "clue4.html": "1357",
    "clue5.html": "4321",
    "clue6.html": "1111",
    "clue7.html": "9999"
};

// Define the sponsor messages
const sponsors = {
    "index.html": "This gift was sponsored by Alice 🎁",
    "clue2.html": "This gift was sponsored by Bob 🕵️",
    "clue3.html": "This gift was sponsored by Charlie 🎉",
    "clue4.html": "This gift was sponsored by Diana 🎂",
    "clue5.html": "This gift was sponsored by Eve ✨",
    "clue6.html": "This gift was sponsored by Frank 🎈",
    "clue7.html": "This gift was sponsored by Grace 💌"
};

function checkCode(currentPage, nextPage) {
    const entered = document.getElementById('codeInput').value.trim();
    if (entered === codes[currentPage]) {
        alert(sponsors[currentPage]);
        window.location.href = nextPage;
    } else {
        alert("Wrong code! Try again.");
    }
}
