// Path: assets/js/main.js
cursor();
progressPhase();
playerInfo();

// Phath assets/js/divisao.js
function runDivisionGame() {

    // SCORE
    function starsScore() {

        const starsScore = document.getElementById('stars-score');

        starsCount = {
            ph1: JSON.parse(localStorage.getItem('div-stars-ph1')),
            ph2: JSON.parse(localStorage.getItem('div-stars-ph2')),
            ph3: JSON.parse(localStorage.getItem('div-stars-ph3')),
            ph4: JSON.parse(localStorage.getItem('div-stars-ph4')),
            ph5: JSON.parse(localStorage.getItem('div-stars-ph5')),
        };

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

        localStorage.setItem('div-stars-score', JSON.stringify(ph1 + ph2 + ph3 + ph4 + ph5));
        starsScore.innerHTML = JSON.parse(localStorage.getItem('div-stars-score'));
    }

    // -------------- FASE 1 ---------------


    function runPhase1() {

        let ph1Stars = 0;
        function mainPH1() {

            // inputs
            const inputs = document.querySelectorAll(".ph1-q input");
            const input_q1 = document.getElementById("input-ph1-q1");
            const input_q2 = document.getElementById("input-ph1-q2");
            const input_q3 = document.getElementById("input-ph1-q3");
            const input_q4 = document.getElementById("input-ph1-q4");
            const verification_seal = document.querySelectorAll(".ph1-q span");

            // button
            const button_checkInputs = document.getElementById("btn-check-inputs");

            inputs.forEach((input) => {
                input.value = "";
                input.style.backgroundColor = "white";
                input.style.color = "black";
                input.disabled = false;
            });

            // correct answers
            const correctAnswers = {
                sentence1: 32,
                sentence2: 12,
                sentence3: 36,
                sentence4: 12,
            };

            // global variables
            let correctSentences = 0;


            input_q1.addEventListener("input", () => {
                console.log('input_q1: ', input_q1.value);

                if (input_q1.value != "") {
                    const seal = verification_seal[0];
                    seal.style.visibility = "visible";
                } else {
                    const seal = verification_seal[0];
                    seal.style.visibility = "hidden";
                }
                // checkAnswer(check);
            });


            input_q2.addEventListener("input", () => {
                console.log('input_q2: ', input_q2.value);

                if (input_q2.value != "") {
                    const seal = verification_seal[1];
                    seal.style.visibility = "visible";
                } else {
                    const seal = verification_seal[1];
                    seal.style.visibility = "hidden";
                }
                // checkAnswer(check);
            });

            input_q3.addEventListener("input", () => {
                console.log('input_q3: ', input_q3.value);

                if (input_q3.value != "") {
                    const seal = verification_seal[2];
                    seal.style.visibility = "visible";
                } else {
                    const seal = verification_seal[2];
                    seal.style.visibility = "hidden";
                }
                // checkAnswer(check);
            });

            input_q4.addEventListener("input", () => {
                console.log('input_q4: ', input_q4.value);

                if (input_q4.value != "") {
                    const seal = verification_seal[3];
                    seal.style.visibility = "visible";
                } else {
                    const seal = verification_seal[3];
                    seal.style.visibility = "hidden";
                }
                // checkAnswer(check);
            });

            // check answers
            function checkAnswer(input, index) {
                // if (input_q1.value == correctAnswers.sentence1) {
                //     verification_seal[0].style.color = "green";
                //     correctSentences++;
                // } else {
                //     verification_seal[0].style.color = "red";
                //     check = false;

                // } // END IF

                // if (input_q2.value == correctAnswers.sentence2) {
                //     verification_seal[1].style.color = "green";
                //     correctSentences++;
                // } else {
                //     verification_seal[1].style.color = "red";
                //     check = false;
                // } // END IF

                // if (input_q3.value == correctAnswers.sentence3) {
                //     verification_seal[2].style.color = "green";
                //     correctSentences++;
                // } else {
                //     verification_seal[2].style.color = "red";
                //     check = false;
                // } // END IF

                // if (input_q4.value == correctAnswers.sentence4) {
                //     verification_seal[3].style.color = "green";
                //     correctSentences++;
                // } else {
                //     verification_seal[3].style.color = "red";
                //     check = false;
                // } // END IF

                const inputValue = input.value;
                const correctAnswer = Object.values(correctAnswers)[index];

                if (inputValue == correctAnswer) {
                    verification_seal[index].style.color = "green";
                    correctSentences++;
                } else {
                    verification_seal[index].style.color = "red";
                    return;
                }

                if (correctSentences == 4) {
                    console.log('Todas as respostas corretas!');
                    ph1Stars = 5;
                    console.log('ESTRELAS: ', ph1Stars);
                } else if (correctSentences == 3) {
                    console.log('3 respostas corretas!');
                    ph1Stars = 3;
                    console.log('ESTRELAS: ', ph1Stars);
                } else if (correctSentences == 2) {
                    console.log('2 respostas corretas!');
                    ph1Stars = 2;
                } else if (correctSentences == 1) {
                    console.log('1 respostas corretas!');
                    ph1Stars = 1;
                } else if (correctSentences == 0) {
                    console.log('0 respostas corretas!');
                    ph1Stars = 0;
                }
            } // END FUNCTION checkAnswer

            // button
            button_checkInputs.addEventListener("click", () => {
                // console.log('VERIFICAR RESPOSTAS');
                // const inputs = document.querySelectorAll(".ph1-q input");

                // for (let i = 0; i < inputs.length; i++) {
                //     if (inputs[i].value == "") {
                //         alert('Preencha todos os campos!');
                //         return;
                //     }

                //     if (inputs[i].value != "") {
                //         setTimeout(checkAnswer, 800);
                //     }
                // }

                console.log('VERIFICAR RESPOSTAS');
                const inputs = document.querySelectorAll(".ph1-q input");

                let allFieldsFilled = true;

                inputs.forEach((input, index) => {
                    if (input.value == "") {
                        allFieldsFilled = false;
                        alert('Preencha todos os campos!');
                        return;
                    }

                    if (input.value !== "") {
                        setTimeout(() => checkAnswer(input, index), 800);
                    }
                });

                if (allFieldsFilled) {
                    setTimeout(showSuccessModalPH1, 2000)
                }
            });

        } // END FUNCTION mainPH1

        mainPH1(); // CALL FUNCTION mainPH1


        // MODAL PHASE #1
        function showSuccessModalPH1() {
            const ph1Modal = document.getElementById("ph1-modal");
            const ph1BtnRestart = document.getElementById("ph1-btn-r");
            const ph1BntNext = document.getElementById("ph1-btn-n");
            ph1Modal.style.visibility = "visible";

            // ESTRELAS
            console.log('ESTRELAS PH1: ', ph1Stars);
            const starsSpan = ph1Modal.querySelector(".stars");

            starsSpan.textContent = "✨".repeat(ph1Stars);
            localStorage.setItem('div-stars-ph1', ph1Stars);
            starsScore();

            if (ph1Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                starsSpan.style.filter = "grayscale(100%)";
            }


            ph1BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph1Modal.style.visibility = "hidden";
                ph1Stars = 0;
                localStorage.setItem('div-stars-ph1', 0);
                starsScore();
                setTimeout(() => {
                    console.log('REINICIAR: Nova rodada!');
                    ph1Modal.style.visibility = "hidden";
                    const verification_seal = document.querySelectorAll(".ph1-q span");
                    verification_seal.forEach((seal) => {
                        seal.style.visibility = "hidden";
                        seal.style.color = "#a1a1a1";
                        seal.style.backgroundColor = "white";
                    });
                    currentExpression = 0;
                    mainPH1();
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
        } // END modal

    } // END FUNCTION runPhase1

    runPhase1(); // CALL FUNCTION runPhase1


    // -------------- FASE 2 ---------------


    function runPhase2() {

        let ph2Stars = 0;
        let currentCarrot = 0;

        function mainPH2() {

            const carrots = document.querySelectorAll(".carrot-box .carrot");

            const basketsCarrots = document.querySelectorAll(".basket-carrots");


            carrots.forEach((carrot) => {
                carrot.addEventListener("dragstart", (event) => {
                    event.dataTransfer.setData("text/plain", event.target.src);
                    console.log('CARROT DRAGGED');
                });
            });

            basketsCarrots.forEach((basketCarrot) => {
                basketCarrot.addEventListener("dragover", (event) => {
                    event.preventDefault();
                    console.log('CARROT OVER BASKET');
                });

                basketCarrot.addEventListener("drop", (event) => {
                    event.preventDefault();
                    const data = event.dataTransfer.getData("text/plain");
                    const img = document.createElement("img");
                    img.classList.add("carrotDrop");
                    img.setAttribute("draggable", false);
                    img.src = data;

                    basketCarrot.appendChild(img); // Add carrot to basket

                    // remove carrot from box
                    const carrotBox = document.querySelector(".carrot-box");
                    carrotBox.removeChild(carrotBox.lastElementChild);

                    for (i = 0; basketsCarrots.length > i; i++) {
                        if (basketsCarrots[i] == basketCarrot) {
                            currentCarrot++;
                        }
                        console.log('currentCarrot:`${basketsCarrots[i]}`', currentCarrot);
                    }

                });
            });

        } // END FUNCTION mainPH2

        mainPH2(); // CALL FUNCTION mainPH2


        // MODAL PHASE #2
        function showSuccessModalPH2() {
            const ph2Modal = document.getElementById("ph2-modal");

            const ph2BtnRestart = document.getElementById("ph2-btn-r");
            const ph2BntNext = document.getElementById("ph2-btn-n");
            ph2Modal.style.visibility = "visible";

            // ESTRELAS
            const starsSpan = ph2Modal.querySelector(".stars");
            starsSpan.textContent = "✨".repeat(5);
            localStorage.setItem('div-stars-ph2', 0);

            starsScore(); // Atualiza o score

            ph2BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph2Modal.style.visibility = "hidden";
                ph2Stars = 0;
                localStorage.setItem('div-stars-ph2', 0);
                starsScore();
                setTimeout(() => {
                    ph2Modal.style.visibility = "hidden";
                    console.log('REINICIAR: Nova rodada!');
                }, 500);
            });

            ph2BntNext.addEventListener("click", () => {
                console.log('FASE 3');
                const phase2 = document.getElementById("phase2");
                const phase3 = document.getElementById("phase3");
                const iconUnlockPH3 = document.querySelectorAll("a[href='#phase3'] span");

                phase2.style.display = "none";
                phase3.style.display = "block";

                iconUnlockPH3.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });
        } // END modal

    } // END FUNCTION runPhase2

    runPhase2(); // CALL FUNCTION runPhase2


    // -------------- FASE 3 ---------------


    function runPhase3() {

        let ph3Stars = 0;

        function mainPH3() {
            const input = document.getElementById("input-ph3");
            const button = document.getElementById("btn-ph3");

            const correctAnswer = 75;
            input.value = "";

            button.addEventListener("click", () => {

                const inputValue = input.value;

                if (inputValue == "") {
                    alert('Digite uma resposta!');
                    return;
                }

                if (inputValue == correctAnswer) {
                    console.log('ACERTOU');
                    ph3Stars = 5;
                    console.log('ESTRELAS: ', ph3Stars);
                    setTimeout(showSuccessModalPH3, 500);
                } else {
                    console.log('ERROU');
                    input.style.backgroundColor = "rgba(247, 60, 60, 0.884)";
                    input.style.color = "white";

                    input.addEventListener("keyup", () => {
                        input.style.backgroundColor = "rgb(133, 255, 133)";
                        input.style.color = "black";
                    });
                }
            });

        } // END FUNCTION mainPH3

        mainPH3(); // CALL FUNCTION mainPH3


        // MODAL PHASE #3
        function showSuccessModalPH3() {
            const ph3Modal = document.getElementById("ph3-modal");
            const ph3BtnRestart = document.getElementById("ph3-btn-r");
            const ph3BntNext = document.getElementById("ph3-btn-n");
            ph3Modal.style.visibility = "visible";

            // ESTRELAS
            const starsSpan = ph3Modal.querySelector(".stars");
            starsSpan.textContent = "✨".repeat(ph3Stars);
            localStorage.setItem('div-stars-ph3', ph3Stars);
            starsScore();

            ph3BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph3Modal.style.visibility = "hidden";
                ph3Stars = 0;
                localStorage.setItem('div-stars-ph3', 0);
                starsScore();
                setTimeout(() => {
                    ph3Modal.style.visibility = "hidden";
                    currentRound = 1;
                    console.log('REINICIAR: Nova rodada (currentRound = 1)');
                });
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
        } // END modal

    } // END FUNCTION runPhase3

    runPhase3(); // CALL FUNCTION runPhase3



    // -------------- FASE 4 ---------------


    function runPhase4() {

        let currentExpression = 0;

        // Função para embaralhar as divs aleatoriamente
        function shuffleElements(containerId) {
            const container = document.getElementById(containerId);
            const elements = Array.from(container.getElementsByClassName("pieces"));

            for (let i = elements.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [elements[i], elements[j]] = [elements[j], elements[i]];
            }

            container.innerHTML = "";
            elements.forEach((element) => {
                container.appendChild(element);
            });
        }

        shuffleElements("pieces-container");

        // Função para atualizar a expressão
        function updateExpression() {
            const pieces = document.querySelectorAll(".pieces");
            const expressions = document.querySelectorAll(".ph4-expression");

            pieces.forEach((piece) => {
                const pieceValue = piece.getAttribute("piece-value");

                piece.addEventListener("click", (event) => {
                    const dataResult = expressions[currentExpression].getAttribute("data-result");
                    console.log('pieceValue: ', pieceValue);
                    console.log('dataResult: ', dataResult);

                    if (pieceValue == dataResult) {
                        console.log('ACERTOU');
                        event.target.style.visibility = "hidden";

                        currentExpression++;

                        if (currentExpression < expressions.length) {
                            expressions[currentExpression].style.display = "block"; // Mostra a próxima expressão

                            expressions[currentExpression - 1].style.display = "none"; // Esconde a expressão atual
                        } else {
                            console.log('Todas as expressões resolvidas.'); // Todas as expressões foram resolvidas
                            setTimeout(showSuccessModalPH4, 500);
                        }

                    } else {
                        console.log('ERROU');
                        event.target.style.visibility = "visible";
                    }
                });
            });
        }

        updateExpression();

        // MODAL PHASE #4
        function showSuccessModalPH4() {
            const ph4Modal = document.getElementById("ph4-modal");
            const ph4BtnRestart = document.getElementById("ph4-btn-r");
            const ph4BntNext = document.getElementById("ph4-btn-n");
            ph4Modal.style.visibility = "visible";

            // ESTRELAS
            const ph4Stars = 5;
            console.log('ESTRELAS: ', ph4Stars);
            const starsSpan = ph4Modal.querySelector(".stars");

            starsSpan.textContent = "✨".repeat(5);
            localStorage.setItem('div-stars-ph4', ph4Stars);
            console.log('storage: ', localStorage.getItem('div-stars-ph4'));
            starsScore();

            // REINICIAR
            ph4BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph4Modal.style.visibility = "hidden";
                localStorage.setItem('div-stars-ph4', 0);
                starsScore();

                const pieces = document.querySelectorAll(".pieces");
                pieces.forEach((piece) => {
                    piece.style.visibility = "visible";
                });
                setTimeout(() => {
                    ph4Modal.style.visibility = "hidden";
                    currentExpression = 0;
                    console.log('REINICIAR: Nova rodada! (currentExpression = 0)');
                    updateExpression();
                }, 500);
            });

            ph4BntNext.addEventListener("click", () => {
                console.log('FASE 5');
                const phase4 = document.getElementById("phase4");
                const phase5 = document.getElementById("phase5");
                const iconUnlockPH5 = document.querySelectorAll("a[href='#phase5'] span");

                phase4.style.display = "none";
                phase5.style.display = "block";

                iconUnlockPH5.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });
        } // END modal

    } // END FUNCTION runPhase4

    runPhase4(); // CALL FUNCTION runPhase4



    // -------------- FASE 5 ---------------


    function runPhase5() {

        function mainPH5() {

            // inputs
            const inputQ1 = document.getElementById("input-Q1");
            const inputQ2 = document.getElementById("input-Q2");
            const inputQ3 = document.getElementById("input-Q3");
            const inputQ4 = document.getElementById("input-Q4");

            const inputs = document.querySelectorAll(".box-input input");
            inputs.forEach((input) => {
                input.value = "";
                input.style.backgroundColor = "white";
                input.style.color = "black";
                input.disabled = false;
            });

            // button
            const sendAnswer1 = document.getElementById("btn-e1");
            const sendAnswer2 = document.getElementById("btn-e2");
            const sendAnswer3 = document.getElementById("btn-e3");
            const sendAnswer4 = document.getElementById("btn-e4");

            let score = 0;

            function checkingAnswers() {

                const correctAnswers = {
                    q1: 344,
                    q2: 8,
                    q3: 34,
                    q4: 0,
                };

                // QUESTION 1
                sendAnswer1.addEventListener("click", () => {
                    const answer1 = inputQ1.value;

                    if (answer1 == "") {
                        alert('Digite uma resposta!');
                        return;
                    }

                    if (answer1 == correctAnswers.q1) {
                        console.log('ACERTOU');
                        inputQ1.style.backgroundColor = "green";
                        inputQ1.style.color = "white";
                        score++;
                        inputQ1.disabled = true;
                        sendAnswer1.disabled = true;
                    } else {
                        console.log('ERROU');
                        inputQ1.style.backgroundColor = "red";
                        inputQ1.style.color = "white";

                        inputQ1.addEventListener("keyup", () => {
                            inputQ1.style.backgroundColor = "white";
                            inputQ1.style.color = "black";
                        });
                    }
                    checkScore();
                }); // END QUESTION 1

                // QUESTION 2
                sendAnswer2.addEventListener("click", () => {
                    const answer2 = inputQ2.value;

                    if (answer2 == "") {
                        alert('Digite uma resposta!');
                        return;
                    }

                    if (answer2 == correctAnswers.q2) {
                        console.log('ACERTOU');
                        inputQ2.style.backgroundColor = "green";
                        inputQ2.style.color = "white";
                        score++;
                        inputQ2.disabled = true;
                        sendAnswer2.disabled = true;

                    } else {
                        console.log('ERROU');
                        inputQ2.style.backgroundColor = "red";
                        inputQ2.style.color = "white";

                        inputQ2.addEventListener("", () => {
                            inputQ2.style.backgroundColor = "white";
                            inputQ2.style.color = "black";
                        });
                    }
                    checkScore();
                }); // END QUESTION 2

                // QUESTION 3
                sendAnswer3.addEventListener("click", () => {
                    const answer3 = inputQ3.value;

                    if (answer3 == "") {
                        alert('Digite qual número corresponde ao  quociente da divisão!');
                        return;
                    }

                    if (answer3 == correctAnswers.q3) {
                        console.log('ACERTOU');
                        inputQ3.style.backgroundColor = "green";
                        inputQ3.style.color = "white";
                        score++;
                        inputQ3.disabled = true;
                        sendAnswer3.disabled = true;
                    } else {
                        console.log('ERROU');
                        inputQ3.style.backgroundColor = "red";
                        inputQ3.style.color = "white";

                        inputQ3.addEventListener("keyup", () => {
                            inputQ3.style.backgroundColor = "white";
                            inputQ3.style.color = "black";
                        });
                    }
                    checkScore();
                }); // END QUESTION 3

                sendAnswer4.addEventListener("click", () => {
                    const answer4 = inputQ4.value;

                    if (answer4 == correctAnswers.q4) {
                        console.log('ACERTOU');
                        inputQ4.style.backgroundColor = "green";
                        inputQ4.style.color = "white";
                        score++;
                        inputQ4.disabled = true;
                        sendAnswer4.disabled = true;
                    } else {
                        console.log('ERROU');
                        inputQ4.style.backgroundColor = "red";
                        inputQ4.style.color = "white";

                        inputQ4.addEventListener("keyup", () => {
                            inputQ4.style.backgroundColor = "white";
                            inputQ4.style.color = "black";
                        });
                    }
                    checkScore();
                }); // END QUESTION 4

                function checkScore() {
                    console.log('SCORE: ', score);
                    if (score == 4) {
                        console.log('Todas as respostas corretas!');
                        setTimeout(showSuccessModalPH5, 500);
                    }
                }
            }
            checkingAnswers();

        } // END FUNCTION mainPH5
        mainPH5();

        // MODAL PHASE #5
        function showSuccessModalPH5() {
            const ph5Modal = document.getElementById("ph5-modal");
            const ph5Stars = 5;
            const ph5BtnRestart = document.getElementById("ph5-btn-r");
            const ph5BntNext = document.getElementById("ph5-btn-n");
            ph5Modal.style.visibility = "visible";

            // ESTRELAS
            console.log('ESTRELAS: ', ph5Stars);
            localStorage.setItem('div-stars-ph5', ph5Stars);
            const starsSpan = ph5Modal.querySelector(".stars");
            starsSpan.textContent = "✨".repeat(5);
            starsScore();

            ph5BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph5Modal.style.visibility = "hidden";
                localStorage.setItem('div-stars-ph5', 0);
                starsScore();
                setTimeout(() => {
                    ph5Modal.style.visibility = "hidden";
                    console.log('REINICIAR: Nova rodada!');
                    const inputs = document.querySelectorAll(".box-input input");
                    const buttons = document.querySelectorAll(".box-input button");
                    inputs.forEach((input) => {
                        input.value = "";
                        input.style.backgroundColor = "white";
                        input.style.color = "black";
                        input.disabled = false;
                    });

                    buttons.forEach((button) => {
                        button.disabled = false;
                    });
                    score = 0;

                    mainPH5();
                }, 500);
            });

            ph5BntNext.addEventListener("click", () => {
                console.log('FASE 5');
                const phase5 = document.getElementById("phase5");
                const phase6 = document.getElementById("phase6");
                const iconUnlockPH6 = document.querySelectorAll("a[href='#phase6'] span");

                phase5.style.display = "none";
                phase6.style.display = "block";

                iconUnlockPH6.forEach((icon) => {
                    icon.textContent = "lock_open_right";
                });
            });

        } // END modal

    } // END FUNCTION runPhase5

    runPhase5(); // CALL FUNCTION runPhase5

} // END FUNCTION runDivisionGame

runDivisionGame(); // CALL FUNCTION runDivisionGame