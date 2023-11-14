// Path: assets/js/main.js
cursor();
progressPhase();
playerInfo();

function runMultiplicationGame() {

    function starsScore() {

        const starsScore = document.getElementById('stars-score');

        starsCount = {
            ph1: JSON.parse(localStorage.getItem('mult-stars-ph1')),
            ph2: JSON.parse(localStorage.getItem('mult-stars-ph2')),
            ph3: JSON.parse(localStorage.getItem('mult-stars-ph3')),
            ph4: JSON.parse(localStorage.getItem('mult-stars-ph4')),
            ph5: JSON.parse(localStorage.getItem('mult-stars-ph5')),
        }

        var ph1 = starsCount.ph1;
        var ph2 = starsCount.ph2;
        var ph3 = starsCount.ph3;
        var ph4 = starsCount.ph4;
        var ph5 = starsCount.ph5;

        if (isNaN(ph1)) {
            ph1 = 0;
        }
        if (isNaN(ph2)) {
            ph2 = 0;
        }
        if (isNaN(ph3)) {
            ph3 = 0;
        }
        if (isNaN(ph4)) {
            ph4 = 0;
        }
        if (isNaN(ph5)) {
            ph5 = 0;
        }

        localStorage.setItem('stars-score', JSON.stringify(ph1 + ph2 + ph3 + ph4 + ph5));
        starsScore.innerHTML = JSON.parse(localStorage.getItem('stars-score'));
    }

    starsScore();



    // #####################################
    // -------------- FASE 1 ---------------
    // #####################################

    function runPhase1() {

        const nextExp = document.querySelector(".next-exp");

        let currentRound = 1;
        const totalRounds = 3;
        let ph1Stars = 0;

        function generateRandomNumbers() {
            const numA = Math.floor(Math.random() * 10) + 1;
            const numB = Math.floor(Math.random() * 10) + 1;
            return { numA, numB };
        }

        // Função para embaralhar as opções de respostas
        function shuffleOptions(options) {
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
        }

        function updateQuestion() {
            const { numA, numB } = generateRandomNumbers();
            document.getElementById("num-A").textContent = numA;
            document.getElementById("num-B").textContent = numB;

            // Exibe os números da expressão
            console.log('numA: ', numA, 'e numB: ', numB);

            document.getElementById("num-A").style.visibility = "visible";
            document.getElementById("num-B").style.visibility = "visible";

            const options = [];
            const correctAnswer = numA * numB;

            // Gere as opções de respostas em um array
            for (let i = 0; i < 3; i++) {
                options.push(correctAnswer + i);
            }

            // Embaralhe as opções de respostas
            shuffleOptions(options);

            const optionsPH1 = document.querySelectorAll(".ph1-option");
            optionsPH1.forEach((option, index) => {
                option.textContent = options[index]; // Opções de resposta embaralhadas
                option.addEventListener("click", () => checkAnswer(option, correctAnswer));
                nextExp.disabled = true;
                option.disabled = false;
                option.style.background = "#ccc";
                option.classList.remove("disabled-option");
            });
        }

        function checkAnswer(option, correctAnswer) {
            const answer = parseInt(option.textContent);

            console.log("OPÇÃO ESCOLHIDA: ", answer);
            console.log("RESPOSTA CORRETA: ", correctAnswer);

            if (answer === correctAnswer) {
                option.style.background = "green"; // Resposta correta (verde)
                ph1Stars++;
            } else {
                option.style.background = "red"; // Resposta errada (vermelho)
            }

            // Desativa todas as opções após a verificação
            const optionsPH1 = document.querySelectorAll(".ph1-option");
            optionsPH1.forEach((opt) => {
                opt.classList.add("disabled-option");
            });

            nextExp.disabled = false;

            if (currentRound === totalRounds) {
                nextExp.disabled = true;
                setTimeout(showSuccessModalPH1, 500);
            }
        }

        function showSuccessModalPH1() {
            const ph1Modal = document.getElementById("ph1-modal");

            const ph1BtnRestart = document.getElementById("ph1-btn-r");
            const ph1BntNext = document.getElementById("ph1-btn-n");
            ph1Modal.style.visibility = "visible";
            console.log('ESTRELAS: ', ph1Stars);

            const starsSpan = ph1Modal.querySelector(".stars");
            if (ph1Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph1', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph1Stars == 1) {
                starsSpan.textContent = "✨".repeat(1);
                localStorage.setItem('mult-stars-ph1', 1);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph1Stars == 2) {
                starsSpan.textContent = "✨".repeat(3);
                localStorage.setItem('mult-stars-ph1', 3);
                starsSpan.style.filter = "grayscale(0%)";

            } else if (ph1Stars == 3) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph1', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }
            
            starsScore();


            ph1BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph1Modal.style.visibility = "hidden";
                ph1Stars = 0;
                localStorage.setItem('mult-stars-ph1', 0);
                starsScore();
                setTimeout(() => {
                    ph1Modal.style.visibility = "hidden";
                    currentRound = 1;
                    console.log('REINICIAR: Nova rodada (currentRound = 1)');
                    updateQuestion();
                }, 500);
            });

            ph1BntNext.addEventListener("click", () => {
                console.log('FASE 2');
                const phase1 = document.getElementById("phase1");
                const phase2 = document.getElementById("phase2");
                const iconUnlockPH2 = document.querySelectorAll("a[href='#phase2'] span");

                phase1.style.display = "none";
                phase2.style.display = "block";

                iconUnlockPH2.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });

        }

        // Evento para o botão "Próxima continha"
        nextExp.addEventListener("click", () => {
            if (currentRound < totalRounds) {
                currentRound++;
                updateQuestion();
            }
        });

        updateQuestion();
    }

    runPhase1();

    // #####################################
    // -------------- FASE 2 ---------------
    // #####################################

    function runPhase2() {

        const dropZones = document.querySelectorAll('.drop-zone');
        const ph2Options = document.querySelectorAll('.ph2-option');

        let ph2Stars = 0;
        let filledZonesCount = 0;

        ph2Options.forEach(ph2Option => {
            ph2Option.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', event.target.textContent);
                console.log('dragstart: ', event.target.textContent);

            });
        });

        dropZones.forEach(dropZone => {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();

                // Verifica se a zona de destino está vazia
                if (!dropZone.textContent) {
                    const data = e.dataTransfer.getData('text');
                    dropZone.textContent = data;
                    const answer = dropZone.getAttribute('data-s');

                    if (data === answer) {
                        dropZone.style.color = "green";
                        console.log('RESPOSTA CORRETA: ', answer);
                        ph2Stars++;
                    } else {
                        dropZone.style.color = "red";
                        console.log('RESPOSTA ERRADA: ', data);
                    }

                    filledZonesCount++;
                }

                if (filledZonesCount === 3) {
                    console.log('todas as zonas preenchidas');
                    setTimeout(showSuccessModalPH2, 500);
                }
            });
        });

        // Função para mostrar o modal de sucesso

        function showSuccessModalPH2() {
            const ph2Modal = document.getElementById("ph2-modal");
            const ph2BtnRestart = document.getElementById("ph2-btn-r");
            const ph2BntNext = document.getElementById("ph2-btn-n");
            ph2Modal.style.visibility = "visible";

            const starsSpan = ph2Modal.querySelector(".stars");
            if (ph2Stars == 1) {
                starsSpan.textContent = "✨".repeat(1);
                localStorage.setItem('mult-stars-ph2', 1);
                console.log('ESTRELAS: ', localStorage.getItem('mult-stars-ph2'));
            } else if (ph2Stars == 2) {
                starsSpan.textContent = "✨".repeat(3);
                localStorage.setItem('mult-stars-ph2', 3);
                console.log('ESTRELAS: ', localStorage.getItem('mult-stars-ph2'));
            } else if (ph2Stars == 3) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph2', 5);
                console.log('ESTRELAS: ', localStorage.getItem('mult-stars-ph2'));
            }
            
            starsScore();

            ph2BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                localStorage.removeItem('mult-stars-ph2');
                window.location.reload();
            });

            ph2BntNext.addEventListener("click", () => {
                console.log('FASE 3');
                const phase2 = document.getElementById("phase2");
                const phase3 = document.getElementById("phase3");
                const iconUnlockPH2 = document.querySelectorAll("a[href='#phase3'] span");

                phase2.style.display = "none";
                phase3.style.display = "block";

                iconUnlockPH2.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });

        }

    }

    runPhase2();

    // #####################################
    // -------------- FASE 3 ---------------
    // #####################################

    function runPhase3() {

        const ph3InputAnswer = document.getElementById("ph3-input-answer");

        let ph3Stars = 0;
        const correctAnswer = 4 * 9;
        const playerAnswer = ph3InputAnswer.value;

        ph3InputAnswer.addEventListener("keyup", (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                if (playerAnswer == correctAnswer) {
                    ph3Stars = 5;
                    console.log('RESPOSTA CORRETA: ', playerAnswer);
                    setTimeout(showSuccessModalPH3, 500);
                } else {
                    ph3Stars = 0;
                    console.log('RESPOSTA ERRADA: ', playerAnswer);
                    setTimeout(showSuccessModalPH3, 500);
                }
            }
        });

        // Função para mostrar o modal de sucesso
        function showSuccessModalPH3() {
            const ph3Modal = document.getElementById("ph3-modal");
            const ph3BtnRestart = document.getElementById("ph3-btn-r");
            const ph3BntNext = document.getElementById("ph3-btn-n");
            ph3Modal.style.visibility = "visible";
            console.log('ESTRELAS: ', ph3Stars);
            localStorage.setItem('mult-stars-ph3', ph3Stars);
            
            const starsSpan = ph3Modal.querySelector(".stars");
            starsSpan.textContent = "✨".repeat(ph3Stars);
            starsScore();

            ph3BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph3InputAnswer.value = "";
                localStorage.removeItem('mult-stars-ph3');
                window.location.reload();
            });

            ph3BntNext.addEventListener("click", () => {
                console.log('FASE 4');
                const phase3 = document.getElementById("phase3");
                const phase4 = document.getElementById("phase4");
                const iconUnlockPH4 = document.querySelectorAll("a[href='#phase4'] span");

                phase3.style.display = "none";
                phase4.style.display = "block";

                iconUnlockPH4.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });
        }

    } // FIM DA FUNÇÃO runPhase3

    runPhase3();

    // #####################################
    // -------------- FASE 4 ---------------
    // #####################################

    function runPhase4() {

        const cards = [
            { emoji: "🐶", text: "2 x 2" },
            { emoji: "🐱", text: "2 x 3" },
            { emoji: "🐭", text: "2 x 4" },
            { emoji: "🐹", text: "2 x 5" },
            { emoji: "🐰", text: "2 x 6" },
            { emoji: "🐸", text: "2 x 7" },
            { emoji: "🐯", text: "2 x 8" },
            { emoji: "🐨", text: "2 x 9" },
            { emoji: "🐻", text: "2 x 10" },
            { emoji: "🐶", text: "4" },
            { emoji: "🐱", text: "6" },
            { emoji: "🐭", text: "8" },
            { emoji: "🐹", text: "10" },
            { emoji: "🐰", text: "12" },
            { emoji: "🐸", text: "14" },
            { emoji: "🐯", text: "16" },
            { emoji: "🐨", text: "18" },
            { emoji: "🐻", text: "20" },
        ];

        const container = document.querySelector('.ph4-game-container');
        let flippedCards = [];

        // Embaralhar as cartas
        const shuffledCards = cards.sort(() => Math.random() > 0.1);

        for (const card of shuffledCards) {
            const cardElement = createCardElement(card);

            cardElement.addEventListener('click', () => {
                if (flippedCards.length < 2 && !flippedCards.includes(cardElement)) {
                    flipCard(cardElement);
                    flippedCards.push(cardElement);

                    if (flippedCards.length === 2) {
                        setTimeout(() => checkMatch(), 300);
                    }
                }
            });

            container.appendChild(cardElement);
        }

        function createCardElement(card) {
            const cardElement = document.createElement('div');
            cardElement.className = 'ph4-card';
            cardElement.innerHTML = `
                <span class="ph4-card-emoji">${card.emoji}</span>
                <span class="ph4-card-expression">${card.text}</span>
            `;
            return cardElement;
        }

        function flipCard(cardElement) {
            cardElement.classList.add('is-flipped');
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            if (card1.querySelector('.ph4-card-emoji').textContent === card2.querySelector('.ph4-card-emoji').textContent) {

                console.log(card1.querySelector('.ph4-card-emoji').textContent, ', ', card2.querySelector('.ph4-card-emoji').textContent);

                card1.classList.add('is-matched');
                card2.classList.add('is-matched');
                console.log('MATCHED');
                flippedCards = [];

                if (document.querySelectorAll('.is-matched').length === shuffledCards.length) {
                    console.log('GANHOU');
                    showSuccessModalPH4();
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('is-flipped');
                    card2.classList.remove('is-flipped');
                    flippedCards = [];
                }, 500);
            }
        }

        function showSuccessModalPH4() {
            const ph4Modal = document.getElementById("ph4-modal");
            const ph4Stars = 5;
            const ph4BtnRestart = document.getElementById("ph4-btn-r");
            const ph4BntNext = document.getElementById("ph4-btn-n");
            ph4Modal.style.visibility = "visible";
            console.log('ESTRELAS: ', ph4Stars);
            localStorage.setItem('mult-stars-ph4', ph4Stars);
            
            const starsSpan = ph4Modal.querySelector(".stars");
            starsSpan.textContent = "✨".repeat(ph4Stars);
            starsScore();

            ph4BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                localStorage.removeItem('mult-stars-ph4');
                window.location.reload();
            });

            ph4BntNext.addEventListener("click", () => {
                console.log('FASE 5');
                const phase4 = document.getElementById("phase4");
                const phase5 = document.getElementById("phase5");
                const iconUnlockPH4 = document.querySelectorAll("a[href='#phase5'] span");

                phase4.style.display = "none";
                phase5.style.display = "block";

                iconUnlockPH4.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });

        }

    } // FIM DA FUNÇÃO runPhase4

    runPhase4();

    // #####################################
    // -------------- FASE 5 ---------------
    // #####################################

    function runPhase5() {
        console.log('FASE 5');

        const updateGame = () => {

            const drop_Zones = document.querySelectorAll('.ph5-multiplication .dropZone');

            const keys = document.querySelectorAll('.ph5-option');

            const btnCheckSentence = document.querySelector('.check-sentence');

            let filledZonesCount = 0;
            btnCheckSentence.disabled = true;

            keys.forEach(key => {
                key.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text', event.target.textContent);
                    console.log('dragstart: ', event.target.textContent);
                });
            });

            drop_Zones.forEach(dropZone => {
                dropZone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });

                dropZone.addEventListener('drop', (e) => {
                    e.preventDefault();

                    // Verifica se a zona de destino está vazia
                    if (!dropZone.textContent) {
                        const data = e.dataTransfer.getData('text');
                        dropZone.textContent = data;
                        const answer = dropZone.getAttribute('data-to-receive');
                        filledZonesCount++;
                    }

                    if (filledZonesCount === 6) {
                        console.log('todas as zonas preenchidas');
                        btnCheckSentence.disabled = false;
                    }
                });
            });


            const verifyAnswers = () => {
                console.log('VERIFICAR RESPOSTAS');
                const drop_Zones = document.querySelectorAll('.ph5-multiplication .dropZone');
                const keys = document.querySelectorAll('.ph5-option');

                let ph5Stars = 0;
                let matched = 0;

                drop_Zones.forEach(dropZone => {
                    const answer = dropZone.getAttribute('data-to-receive');
                    const data = dropZone.textContent;

                    if (data === answer) {
                        dropZone.style.color = "green";
                        console.log('RESPOSTA CORRETA: ', answer);
                    } else {
                        dropZone.style.color = "red";
                        console.log('RESPOSTA ERRADA: ', data);
                    }
                });

                keys.forEach(key => {
                    key.disabled = true;
                });

                drop_Zones.forEach(dropZone => {
                    if (dropZone.textContent === dropZone.getAttribute('data-to-receive')) {
                        matched++;
                    }

                    if (matched === 6) {
                        console.log('GANHOU');
                        ph5Stars = 5;
                        setTimeout(showSuccessModalPH5, 500);
                    } else {
                        console.log('PERDEU');
                        ph5Stars = 0;
                        setTimeout(showSuccessModalPH5, 500);
                    }
                });
            };

            btnCheckSentence.addEventListener('click', () => {
                verifyAnswers();
            });
        };

        updateGame();

        function showSuccessModalPH5() {
            const ph5Modal = document.getElementById("ph5-modal");
            const ph5BtnRestart = document.getElementById("ph5-btn-r");
            const ph5BntNext = document.getElementById("ph5-btn-n");

            let ph5Stars = 0;
            let matched = 0;

            const drop_Zones = document.querySelectorAll('.ph5-multiplication .dropZone');
            drop_Zones.forEach(dropZone => {
                if (dropZone.textContent === dropZone.getAttribute('data-to-receive')) {
                    matched++;
                }

                if (matched === 6) {
                    ph5Stars = 5;
                } else {
                    ph5Stars = 0;
                }
            });

            ph5Modal.style.visibility = "visible";
            localStorage.setItem('mult-stars-ph5', ph5Stars);
            
            const starsSpan = ph5Modal.querySelector(".stars");
            starsSpan.textContent = "✨".repeat(ph5Stars);
            starsScore();

            ph5BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph5Modal.style.visibility = "hidden";
                localStorage.setItem('mult-stars-ph5', ph5Stars);
                starsSpan.textContent = "✨".repeat(5);
                starsSpan.style.filter = "grayscale(100%)";
                filledZonesCount = 0;


                const drop_Zones = document.querySelectorAll('.ph5-multiplication .dropZone');

                drop_Zones.forEach(dropZone => {
                    dropZone.textContent = "";
                    dropZone.style.color = "#000";
                });

                updateGame();

                const btnCheckSentence = document.querySelector('.check-sentence');
                btnCheckSentence.disabled = true;
                btnCheckSentence.addEventListener('click', () => {
                    verifyAnswers();
                });
            });

            ph5BntNext.addEventListener("click", () => {
                console.log('FIM');
                const phase5 = document.getElementById("phase5");
                const phase6 = document.getElementById("phase6");
                const iconUnlockPH6 = document.querySelectorAll("a[href='#phase6'] span");

                phase5.style.display = "none";
                phase6.style.display = "block";

                iconUnlockPH6.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });

        }

    }

    runPhase5();

}

runMultiplicationGame();