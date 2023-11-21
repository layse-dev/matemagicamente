// CURSOR

function cursor() {
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });

    document.addEventListener('dragov', e => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
}
cursor();

// PHASE CONTROL

function progressPhase() {

    const links = document.querySelectorAll(".btn-phase");
    const divs = document.querySelectorAll(".phase");
    
    // Adicione um ouvinte de evento para cada link
    links.forEach((link) => {
        link.setAttribute("draggable", false);
        link.style.userSelect = "none";
        link.addEventListener("click", (event) => {
            // Impedir o comportamento padrão de navegação
            event.preventDefault();
    
            // Obter o alvo da âncora (href)
            const targetId = event.target.getAttribute("href").substring(1); // Remove o "#" do href
    
            // Ocultar todas as divs
            divs.forEach((div) => {
                div.style.display = "none";
            });
    
            // Mostrar a div correspondente ao link clicado
            const targetDiv = document.getElementById(targetId);
            if (targetDiv) {
                targetDiv.style.display = "flex";
            }
        });
    });
}

function playerInfo() {
    const playerName = document.getElementById("player-name");
    const playerCharacter = document.querySelector("#player-character img");

    playerName.innerHTML = localStorage.getItem('playerName');
    const character = localStorage.getItem('PlayerCharacter');
    console.log(character);

    playerCharacter.src = `../img/characters/${character}.png`;
    if(character) {
        playerCharacter.classList.add("selected");
    }
}

progressPhase();
playerInfo();