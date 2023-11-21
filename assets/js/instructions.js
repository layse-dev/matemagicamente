// Path: assets/js/main.js
cursor();

// Path: assets/js/instructions.js

const Form1 = document.getElementById("Form1");
const Form2 = document.getElementById("Form2");
const Form3 = document.getElementById("Form3");

const Next1 = document.getElementById("btn-next1");
const Next2 = document.getElementById("btn-next2");
const Back1 = document.getElementById("btn-back1");
const Back2 = document.getElementById("btn-back2");

const progress = document.getElementById("progress");
const playerNameInput = document.getElementById("playerNameInput");
const showPlayerName = document.getElementById("showPlayerName");
const goMenu = document.getElementById("goMenu");
const goHome = document.getElementById("btn-HOME");

playerNameInput.addEventListener('keyup', (e) => {
    const isValid = validateForm();

    if (isValid) {
        Next1.style.background = "linear-gradient(to right, #08ac10, #006d06)";
        localStorage.setItem('playerName', playerNameInput.value);
    }
    if (!isValid) {
        Next1.style.background = "#ccc";
    }
});

playerNameInput.addEventListener('keypress', (e) => {

});

Next1.addEventListener('click', (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
        alert('Para ir para o jogo, preencha os nomes dos jogadores! ;)');
        return;
    }

    Form1.style.left = "-150%";
    Form2.style.left = "50%";
    progress.style.width = "66.66%";
    showPlayerName.innerHTML = playerNameInput.value;
    console.log('Player:', showPlayerName.innerHTML);

    playerNameInput.value = '';
});

document.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            alert('Para ir para o jogo, preencha os nomes dos jogadores! ;)');
            return;
        }

        Form1.style.left = "-150%";
        Form2.style.left = "50%";
        progress.style.width = "66.66%";
        showPlayerName.innerHTML = playerNameInput.value;
        console.log('Player:', showPlayerName.innerHTML);

        playerNameInput.value = '';
    }
});


const validateForm = () => {
    return playerNameInput.value.trim().length >= 3;
}


Back1.onclick = function () {
    console.log("Back1 Clicked");
    Form1.style.left = "50%";
    Form2.style.left = "150%";
    progress.style.width = "33.33%";
    console.log('step1 undone')
}

Next2.style.disabled = true;
Next2.style.filter = "grayscale(100%)";


Back2.onclick = function () {
    Form2.style.left = "50%";
    Form3.style.left = "150%";
    progress.style.width = "66.66%";
    console.log('step2 undone')
}

goMenu.onclick = function () {
    window.location.href = "menu.html";
}

goHome.onclick = function () {
    window.location.href = "/index.html";
}

function characterOptions() {
    const characters = document.querySelectorAll(".character");

    characters.forEach((character) => {
        character.addEventListener("click", () => {
            characters.forEach((c) => c.classList.remove("choosed"));
            character.classList.add("choosed");

            Next2.style.filter = "grayscale(0%)";
            Next2.onclick = function () {
                Form2.style.left = "-150%";
                Form3.style.left = "50%";
                progress.style.width = "100%";
                console.log('step2 done')
            }
        });
    });
}

function chooseCharacter() {
    const character = document.getElementsByClassName("character");

    for (let i = 0; i < character.length; i++) {
        character[i].addEventListener("click", function () {

            let characterName = this.getAttribute("value");
            localStorage.setItem('PlayerCharacter', characterName);

            const selectedCharacter = document.querySelector("#selectedCharacter img");

            selectedCharacter.src = `../img/characters/${characterName}.png`;

            console.log("Character:", characterName);
        });

        characterOptions();
    }
}

function passInfo() {

    const Info1 = document.getElementById('info-1');
    const Info2 = document.getElementById('info-2');
    const Info3 = document.getElementById('info-3');

    const btnPass1 = document.getElementById('pass1');
    const btnPass2 = document.getElementById('pass2');

    const btnBackPass1 = document.getElementById('back-pass1');
    const btnBackPass2 = document.getElementById('back-pass2');

    btnPass1.onclick = function () {
        Info1.style.left = "-150%";
        Info2.style.left = "30%";
        Info1.style.visibility = "hidden";
        console.log('info1 done');
    }

    btnPass2.onclick = function () {
        Info2.style.left = "-150%";
        Info3.style.left = "30%";
        Info1.style.visibility = "hidden";
        Info2.style.visibility = "hidden";
        console.log('info2 done');
    }

    btnBackPass1.onclick = function () {
        Info1.style.left = "30%";
        Info2.style.left = "150%";

        Info1.style.visibility = "visible";
        Info2.style.visibility = "visible";

        console.log('info1 undone');
    }

    btnBackPass2.onclick = function () {
        Info2.style.left = "30%";
        Info3.style.left = "150%";

        Info1.style.visibility = "visible";
        Info2.style.visibility = "visible";

        console.log('info2 undone');
    }
}

chooseCharacter();
passInfo();
