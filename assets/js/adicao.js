// // Path: assets/js/main.js
cursor();
progressPhase();
playerInfo();

function runAdditionGame() {

    function starsScore() {

        const starsScore = document.getElementById('stars-score');

        starsCount = {
            ph1: JSON.parse(localStorage.getItem('add-stars-ph1')),
            ph2: JSON.parse(localStorage.getItem('mult-stars-ph2')),
            ph3: JSON.parse(localStorage.getItem('add-stars-ph3')),
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

        // Elementos do DOM
        const questionContainerF1 = document.getElementById("question-containerF1");
        const questionElementF1 = document.getElementById("questionF1");
        const optionsF1 = document.querySelectorAll(".optionF1");
        const nextBtnF1 = document.getElementById("next-btnF1");
        // const phase2Btn = document.getElementById("phase-2-btn");

        // State variables
        let currentQuestion = 0;
        let correctAnswers = 0;

        // Function to generate a random expression
        function generateRandomExpression() {
            const num1 = Math.floor(Math.random() * 80) + 10; // Número aleatório de 10 a 80
            const num2 = Math.floor(Math.random() * 80) + 10;
            const answer = num1 + num2;

            return {
                expression: `${num1} + ${num2} = ?`,
                optionsF1: generateRandomOptions(answer),
                answer: answer,
            };
        }

        // Function to generate random options
        function generateRandomOptions(correctAnswer) {
            const optionsF1 = [correctAnswer];
            while (optionsF1.length < 3) {
                const randomOption = Math.floor(Math.random() * 71) + correctAnswer; // Número aleatório de 10 a 80
                if (!optionsF1.includes(randomOption) && randomOption !== correctAnswer) {
                    optionsF1.push(randomOption);
                }
            }
            return shuffleArray(optionsF1);
        }

        // Function to shuffle an array
        function shuffleArray(array) {
            const shuffledArray = [...array];
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
        }

        // Function to show the next question
        function showQuestion() {
            if (currentQuestion < questions.length) {
                questionElementF1.textContent = questions[currentQuestion].expression;
                const randomOptions = shuffleArray(questions[currentQuestion].optionsF1);
                optionsF1.forEach((optionF1, index) => {
                    optionF1.textContent = randomOptions[index];
                    optionF1.addEventListener("click", checkAnswerF1);
                });
            } else {
                // setTimeout(showSuccessModalPH1, 500);
            }
        }

        // Função para verificar a resposta selecionada pelo usuário
        function checkAnswerF1(event) {
            const selectedOptionF1 = parseInt(event.target.textContent);
            if (selectedOptionF1 === questions[currentQuestion].answer) {
                correctAnswers++;
                event.target.classList.add("correct-option");
            } else {
                event.target.classList.add("incorrect-option");
            }

            // Desabilita os eventos de clique nas opções após a resposta
            optionsF1.forEach((optionF1) => {
                optionF1.removeEventListener("click", checkAnswerF1);
            });

            nextBtnF1.style.display = "block";

            // se a terceira questão for respondida, mostrar o modal de sucesso
            if (currentQuestion === 2) {
                nextBtnF1.textContent = "Finalizado...";
                nextBtnF1.style.backgroundColor = "#28a745";
                nextBtnF1.style.pointerEvents = "none";
                setTimeout(showSuccessModalPH1, 800);
            }

        }

        // Função para limpar as classes de destaque de respostas
        function clearAnswerStyles() {
            optionsF1.forEach((optionF1) => {
                optionF1.classList.remove("correct-option", "incorrect-option");
            });
        }

        // Adiciona um ouvinte de evento para o botão "Próxima Questão"
        nextBtnF1.addEventListener("click", () => {
            currentQuestion++;
            nextBtnF1.style.display = "none";
            clearAnswerStyles(); // Limpa as classes de destaque
            optionsF1.forEach((optionF1) => {
                optionF1.addEventListener("click", checkAnswerF1);
            });
            showQuestion();
        });

        // Inicializa o jogo mostrando a primeira questão
        const questions = [
            generateRandomExpression(),
            generateRandomExpression(),
            generateRandomExpression(),
        ];

        showQuestion();

        // MODAL

        function showSuccessModalPH1() {
            const ph1Modal = document.getElementById("ph1-modal");
            const ph1BtnRestart = document.getElementById("ph1-btn-r");
            const ph1Stars = correctAnswers;
            const ph1BntNext = document.getElementById("ph1-btn-n");
            ph1Modal.style.visibility = "visible";
            console.log('ESTRELAS: ', ph1Stars);


            const starsSpan = ph1Modal.querySelector(".stars");
            if (ph1Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('add-stars-ph1', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph1Stars == 1) {
                starsSpan.textContent = "✨".repeat(1);
                localStorage.setItem('add-stars-ph1', 1);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph1Stars == 2) {
                starsSpan.textContent = "✨".repeat(3);
                localStorage.setItem('add-stars-ph1', 3);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph1Stars == 3) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('add-stars-ph1', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph1BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph1Modal.style.visibility = "hidden";
                localStorage.setItem('add-stars-ph1', 0);
                starsScore();
                setTimeout(() => {
                    console.log('REINICIAR: Nova rodada!');
                    ph1Modal.style.visibility = "hidden";
                    nextBtnF1.textContent = "Próxima Questão";
                    nextBtnF1.style.backgroundColor = "#ccc";
                    nextBtnF1.style.pointerEvents = "auto";
                    nextBtnF1.style.display = "none";
                    correctAnswers = 0;
                    currentQuestion = 0;
                    clearAnswerStyles();
                    for (let i = 0; i < questions.length; i++) {
                        questions[i] = generateRandomExpression();
                    }
                    showQuestion();
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

    } // END runPhase1

    runPhase1(); // CALL runPhase1

    // #####################################
    // -------------- FASE 2 ---------------
    // #####################################

    function runPhase2() {
        // Elementos do DOM
        const currentMoneyElement = document.getElementById("current-money");
        const extraMoneyElement = document.getElementById("extra-money");
        const resultTextElementF2 = document.getElementById("result-textF2");
        const answerButtonsF2 = document.querySelectorAll(".optionsF2 button");

        const correctAnswerF2 = "R$ 43";
        let ph2Stars = 0;

        // Função para verificar a resposta selecionada
        function checkAnswerF2(event) {
            const selectedOptionF2 = event.target.textContent;
            if (selectedOptionF2 === correctAnswerF2) {
                resultTextElementF2.textContent = "Resposta correta! Você ganhou R$ 43!";
                resultTextElementF2.style.color = "green";
                ph2Stars = 5;
            } else {
                resultTextElementF2.textContent = "Resposta incorreta. Tente novamente.";
                resultTextElementF2.style.color = "red";
                ph2Stars = 0;
            }
            // Desabilita os botões de opção
            answerButtonsF2.forEach((button) => {
                button.disabled = true;
            });
            // Mostrar modal
            setTimeout(showSuccessModalPH2, 500);
            console.log('mostrar modal');
        }

        // Adiciona um ouvinte de evento para cada botão de opção
        answerButtonsF2.forEach((button) => {
            button.addEventListener("click", checkAnswerF2);
        });

        // MODAL

        function showSuccessModalPH2() {
            const ph2Modal = document.getElementById("ph2-modal");
            const ph2BtnRestart = document.getElementById("ph2-btn-r");
            const ph2BtnNext = document.getElementById("ph2-btn-n");
            ph2Modal.style.visibility = "visible";

            const starsSpan = ph2Modal.querySelector(".stars");
            if (ph2Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph2', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph2Stars == 5) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph2', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph2BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph2Modal.style.visibility = "hidden";
                localStorage.setItem('mult-stars-ph2', 0);
                starsScore();
                setTimeout(() => {
                    console.log('REINICIAR: Nova rodada!');
                    console.log(correctAnswerF2)
                    ph2Modal.style.visibility = "hidden";
                    resultTextElementF2.textContent = "";

                    answerButtonsF2.forEach((button) => {
                        button.disabled = false;
                    });
                    checkAnswerF2();
                }, 500);
            });

            ph2BtnNext.addEventListener("click", () => {
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

        }

    }

    runPhase2();


    // #####################################
    // -------------- FASE 3 ---------------
    // #####################################

    function runPhase3() {

        let ph3Stars = 0;


        const answerInputF3 = document.getElementById("answerInputF3");
        const checkButtonF3 = document.getElementById("checkButtonF3");
        const resultF3 = document.getElementById("resultF3");

        answerInputF3.value = "";

        checkButtonF3.addEventListener("click", function () {
            const answerF3 = parseInt(answerInputF3.value);
            if (answerF3 === 48 + 23) {
                resultF3.textContent = "Resposta correta! Maria tem agora " + (48 + 23) + " figurinhas.";
                resultF3.style.color = "green";
                answerInputF3.style.backgroundColor = "green";
                answerInputF3.style.disabled = "true";
                ph3Stars = 5;
                setTimeout(showSuccessModalPH3, 1000);
            } else {
                resultF3.textContent = "Resposta incorreta. Tente novamente.";
                resultF3.style.color = "red";
                answerInputF3.style.backgroundColor = "red";
                answerInputF3.style.disabled = "true";
                ph3Stars = 0;
                setTimeout(showSuccessModalPH3, 1000);
            }
        });

        // MODAL

        function showSuccessModalPH3() {
            const ph3Modal = document.getElementById("ph3-modal");
            const ph3BtnRestart = document.getElementById("ph3-btn-r");
            const ph3BtnNext = document.getElementById("ph3-btn-n");
            ph3Modal.style.visibility = "visible";

            const starsSpan = ph3Modal.querySelector(".stars");
            if (ph3Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('add-stars-ph3', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph3Stars == 5) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('add-stars-ph3', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph3BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph3Modal.style.visibility = "hidden";
                localStorage.setItem('add-stars-ph3', 0);
                starsScore();
                setTimeout(() => {
                    console.log('REINICIAR: Nova rodada!');
                    ph3Modal.style.visibility = "hidden";
                    resultF3.textContent = "";
                    answerInputF3.value = "";
                    answerInputF3.style.backgroundColor = "#fff";
                }, 500);
            });

            ph3BtnNext.addEventListener("click", () => {
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

    }

    runPhase3();

    // #####################################
    // -------------- FASE 4 ---------------
    // #####################################

    function runPhase4() {


        const dropzonesF4 = document.querySelectorAll(".dropzoneF4");
        const optionsF4 = document.querySelectorAll(".draggableF4");
        const resultF4 = document.getElementById("resultF4");

        let sequenceF4 = [3, 6, 9, null, null, null];
        let correctOptionsF4 = [12, 15, 18];
        let ph4Stars = 0;
        let correctAnswersF4 = 0;

        optionsF4.forEach((optionF4) => {
            optionF4.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text", event.target.textContent);
            });
        });

        dropzonesF4.forEach((dropzoneF4, index) => {
            dropzoneF4.addEventListener("dragover", (event) => {
                event.preventDefault();
            });

            dropzoneF4.addEventListener("drop", (event) => {
                event.preventDefault();
                const draggedNumberF4 = event.dataTransfer.getData("text");
                dropzoneF4.textContent = draggedNumberF4;
                sequenceF4[index] = parseInt(draggedNumberF4);
                checkZoneF4(dropzoneF4, index);
            });
        });

        function checkZoneF4(dropzoneF4, index) {
            const valueF4 = sequenceF4[index];
            console.log(valueF4);
            console.log(sequenceF4[index])
            if (valueF4 !== null) {
                if (valueF4 === correctOptionsF4[index]) {
                    dropzoneF4.style.color = "green";
                    correctAnswersF4++;
                } else {
                    dropzoneF4.style.color = "red";
                }
            } else {
                dropzoneF4.style.color = "transparent";
            }
            checkSequenceF4();

        }

        function checkSequenceF4() {
            const dropzonesArray = Array.from(dropzonesF4);
            const isComplete = dropzonesArray.every((dropzoneF4) => dropzoneF4.textContent !== "");

            if (isComplete) {
                showSuccessModalPH4();
            }
        }

        // MODAL


        function showSuccessModalPH4() {
            const ph4Modal = document.getElementById("ph4-modal");
            const ph4BtnRestart = document.getElementById("ph4-btn-r");
            const ph4BtnNext = document.getElementById("ph4-btn-n");
            
            ph4Modal.style.visibility = "visible";

            ph4Stars = correctAnswersF4;

            const starsSpan = ph4Modal.querySelector(".stars");
            if (ph4Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph4', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph4Stars == 1) {
                starsSpan.textContent = "✨".repeat(1);
                localStorage.setItem('mult-stars-ph4', 1);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph4Stars == 2) {
                starsSpan.textContent = "✨".repeat(3);
                localStorage.setItem('mult-stars-ph4', 3);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph4Stars == 3) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph4', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph4BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph4Modal.style.visibility = "hidden";
                localStorage.setItem('mult-stars-ph4', 0);
                starsScore();



            });

            ph4BtnNext.addEventListener("click", () => {
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
        }
    }

    runPhase4();

    // #####################################
    // -------------- FASE 5 ---------------
    // #####################################

    function runPhase5() {

        let ph5Stars = 0;

        document.addEventListener("DOMContentLoaded", function () {
            const answerInputF5 = document.getElementById("answerInputF5");
            const checkButtonF5 = document.getElementById("checkButtonF5");
            const resultF5 = document.getElementById("resultF5");

            answerInputF5.value = "";

            function rightAnswerF5() {
                const answer = answerInputF5.value;

                if (answer == null || answer == "") {
                    alert("Digite um número.");
                }

                if (answer == 376 + 1144) {
                    resultF5.textContent = "Resposta correta! A biblioteca agora tem " + (376 + 1144) + " livros de literatura infantil.";
                    resultF5.style.color = "green";
                    checkButtonF5.style.display = "none";
                    ph5Stars = 5;
                    setTimeout(showSuccessModalPH5, 1000);
                }
                if (answer != 376 + 1144 && answer != "") {
                    resultF5.textContent = "Resposta incorreta. Tente novamente.";
                    resultF5.style.color = "red";
                    checkButtonF5.style.display = "none"
                    ph5Stars = 0;
                    setTimeout(showSuccessModalPH5, 1000);
                }
            }

            checkButtonF5.addEventListener("click", function () {
                rightAnswerF5();
            });
        });

        // MODAL
        function showSuccessModalPH5() {
            const ph5Modal = document.getElementById("ph5-modal");
            const ph5BtnRestart = document.getElementById("ph5-btn-r");
            const ph5BtnNext = document.getElementById("ph5-btn-n");
            ph5Modal.style.visibility = "visible";

            const starsSpan = ph5Modal.querySelector(".stars");
            if (answerInputF5.value == 376 + 1144) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph5', 5);
                starsSpan.style.filter = "grayscale(0%)";
            } else {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('mult-stars-ph5', 0);
                starsSpan.style.filter = "grayscale(100%)";
            }

            starsScore();

            ph5BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph5Modal.style.visibility = "hidden";
                localStorage.setItem('mult-stars-ph5', 0);
                starsScore();
                setTimeout(() => {
                    console.log('REINICIAR: Nova rodada!');
                    ph5Modal.style.visibility = "hidden";
                    resultF5.textContent = "";
                    answerInputF5.value = "";
                    checkButtonF5.style.display = "block";
                }, 500);
            });

            ph5BtnNext.addEventListener("click", () => {
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

        }

    }

    runPhase5();

} // Fim da função runAdditionGame

runAdditionGame(); // Chama a função runAdditionGame