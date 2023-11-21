// PHASE CONTROL
cursor();
progressPhase();
playerInfo();

function runSubtractionGame() {

    function starsScore() {

        const starsScore = document.getElementById('stars-score');

        starsCount = {
            ph1: JSON.parse(localStorage.getItem('sub-stars-ph1')),
            ph2: JSON.parse(localStorage.getItem('sub-stars-ph2')),
            ph3: JSON.parse(localStorage.getItem('sub-stars-ph3')),
            ph4: JSON.parse(localStorage.getItem('sub-stars-ph4')),
            ph5: JSON.parse(localStorage.getItem('sub-stars-ph5')),
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

        console.log('FASE 1');  // DEBUG

        const options = document.querySelectorAll('.option-container .option');
        const polygonA = document.getElementById('polygon-A');
        const polygonB = document.getElementById('polygon-B');
        const feedback = document.getElementById('feedback');
        const nextButton = document.getElementById('next-button');

        const polygonForms = [
            { class: 'polygon-3', dataside: '3' },
            { class: 'polygon-4', dataside: '4' },
            { class: 'polygon-5', dataside: '5' },
            { class: 'polygon-6', dataside: '6' },
            { class: 'polygon-7', dataside: '7' },
            { class: 'polygon-8', dataside: '8' },
            { class: 'polygon-9', dataside: '9' },
            { class: 'polygon-10', dataside: '10' },
        ];

        let questionNumber = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let countAnswer = 0;

        document.addEventListener("DOMContentLoaded", function () {
            initializeQuestion();
        });

        function initializeQuestion() {
            feedback.textContent = '';
            nextButton.disabled = true;

            // Verificar se os elementos existem
            if (!polygonA || !polygonB) {
                console.error('Elementos polygon-A e/ou polygon-B não encontrados no HTML.');
                return;
            }

            // Generate random sides for the polygons
            let sidesA, sidesB;

            const generateRandomSides = () => {
                function shuffleArray(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        // Troca os elementos array[i] e array[j]
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                }

                // shuffe the array
                shuffleArray(polygonForms);

                const polygonForm = polygonForms[0];
                const sides = polygonForm.dataside;
                // console.log('SIDES: ', sides);
                return parseInt(sides);
            }

            do {
                sidesA = generateRandomSides(sidesB);
                sidesB = generateRandomSides(sidesA);
            } while (sidesA <= sidesB);

            console.log(`Polígono A: ${sidesA} lados` + ' - ' + `Polígono B: ${sidesB} lados` + ' = ?');

            const correctResult = sidesA - sidesB;

            // class configuration
            const polygonA_class = polygonForms.find(polygon => polygon.dataside == sidesA).class;
            const polygonB_class = polygonForms.find(polygon => polygon.dataside == sidesB).class;

            console.log('Classe do polígono A: ', polygonA_class);
            console.log('Classe do polígono B: ', polygonB_class);

            // showing up the polygons A and B
            polygonA.classList.add(polygonA_class);
            polygonB.classList.add(polygonB_class);

            // Generate random options
            const generateRandomAnswer = () => {
                const min = Math.max(0, sidesA - sidesB - 10); // avoid negative numbers
                const max = sidesA - sidesB + 10; // add 10 to avoid very large numbers
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            // configuring options
            const optionsAnswers = [];
            optionsAnswers.push(correctResult);

            while (optionsAnswers.length < options.length) {
                const randomAnswer = generateRandomAnswer(sidesA, sidesB);
                if (!optionsAnswers.includes(randomAnswer)) {
                    optionsAnswers.push(randomAnswer);
                }
            } // end while

            optionsAnswers.sort(() => Math.random() - 0.5);

            const correctOptionIndex = Math.floor(Math.random() * options.length);
            options[correctOptionIndex].textContent = correctResult;
            options[correctOptionIndex].value = correctResult;
            console.log(`Opção correta: ${correctResult}`);

            const usedOptions = new Set();
            usedOptions.add(correctResult);

            options.forEach((button, index) => {
                if (index !== correctOptionIndex) {
                    let uniqueRandomAnswer;
                    do {
                        uniqueRandomAnswer = generateRandomAnswer(sidesA, sidesB);
                    } while (usedOptions.has(uniqueRandomAnswer));
                    usedOptions.add(uniqueRandomAnswer);

                    button.textContent = uniqueRandomAnswer;
                    button.value = uniqueRandomAnswer;
                }

                button.disabled = false;

                button.addEventListener("click", () => {
                    checkAnswer(button.value);
                });


            });

            const checkAnswer = (selectedAnswer) => {
                console.log('Opção escolhida: ', selectedAnswer);
                console.log('Verificando resposta...');

                options.forEach((button) => {
                    button.disabled = true;
                });

                nextButton.disabled = false;

                if (selectedAnswer == correctResult) {
                    correctAnswers++;
                    console.log('Acertos: ', correctAnswers);
                    feedback.textContent = 'Resposta correta!';
                    console.log('Resposta correta!');
                    return;
                }
                if (selectedAnswer != correctResult) {
                    wrongAnswers++;
                    console.log('Erros: ', wrongAnswers)
                    console.log('Resposta incorreta!');
                    feedback.textContent = 'Resposta incorreta.';
                }
            };

            // increment question number
            questionNumber++;

            if (questionNumber === 3) {
                finishGame();
            }
            countAnswer = correctAnswers + wrongAnswers;
            console.log('countAnswer: ', countAnswer);
            finishGame();
        } // END function initializeQuestion()  

        const nextQuestion = () => {
            if (questionNumber <= 3 && !nextButton.disabled) {
                initializeQuestion();
                return;
            }

        }; // END function nextQuestion()

        const finishGame = () => {
            const totalQuestions = questionNumber;
            const totalAnswers = countAnswer;
            console.log('Total de perguntas: ', totalQuestions);
            console.log('Total de respostas: ', totalAnswers);
            console.log('Right Answers: ', correctAnswers);
            console.log('Wrong Answers: ', wrongAnswers);

            if (totalAnswers === totalQuestions) {
                console.log('FIM DE JOGO');
                setTimeout(showSuccessModalPH1, 1500);
            }

        }; // END function finishGame()

        initializeQuestion();

        nextButton.addEventListener("click", nextQuestion);


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
                localStorage.setItem('sub-stars-ph1', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph1Stars == 1) {
                starsSpan.textContent = "✨".repeat(1);
                localStorage.setItem('sub-stars-ph1', 1);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph1Stars == 2) {
                starsSpan.textContent = "✨".repeat(3);
                localStorage.setItem('sub-stars-ph1', 3);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph1Stars == 3) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph1', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph1BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR');
                ph1Modal.style.visibility = "hidden";
                localStorage.setItem('sub-stars-ph1', 0);
                starsScore();
                setTimeout(() => {
                    console.log('REINICIAR: Nova rodada!');
                    ph1Modal.style.visibility = "hidden";

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
        } // END function showSuccessModalPH1()

    } // END function runPhase1()

    runPhase1(); // CALL FUNCTION runPhase1()


    // #####################################
    // -------------- FASE 2 ---------------
    // #####################################

    function runPhase2() {

        const sequences = document.querySelectorAll('.sequence');
        const optionsF2 = document.querySelectorAll('.optionF2');
        const answerSequences = document.querySelectorAll('.answerSequence');
        const fase3Button = document.getElementById('fase3');
        const messageElement = document.getElementById('message');

        // Mapeia as respostas corretas para cada sequência.
        const correctAnswers = {
            sequence1: '8',
            sequence2: '11',
            sequence3: '14',
        };

        let correctCount = 0; // Contador para o número de respostas corretas.
        let countDrop = 0; // Contador para o número de respostas arrastadas.
        let ph2Stars = 0;
        let remainingOptions = Array.from(optionsF2);
        let draggedOption; // Mantém uma lista das opções de respostas restantes.


        function mainPH2() {

            answerSequences.forEach((answerSequence) => {
                answerSequence.textContent = "";
                answerSequence.style.color = "black";
            });

            optionsF2.forEach(optionF2 => {
                optionF2.addEventListener('dragstart', dragStart);
                optionF2.addEventListener('dragend', dragEnd);
            });

            sequences.forEach((sequence, index) => {
                sequence.addEventListener('dragover', dragOver);
                sequence.addEventListener('dragenter', dragEnter);
                sequence.addEventListener('dragleave', dragLeave);
                sequence.addEventListener('drop', e => dragDrop(e, index));
            });

            function dragStart(e) {
                if (correctCount === 3) {
                    e.preventDefault(); // Impede o arrasto se todas as respostas estiverem corretas.
                } else {
                    draggedOption = this;
                    e.dataTransfer.setData('text/plain', this.dataset.answer);
                }
                // console.log('dragStart');
            }

            function dragEnd() {
                draggedOption = null;
                // console.log('dragEnd');
            }

            function dragOver(e) {
                e.preventDefault();
                // console.log('dragOver');
            }

            function dragEnter(e) {
                e.preventDefault();
                this.classList.add('hovered');
                // console.log('dragEnter');
            }

            function dragLeave() {
                this.classList.remove('hovered');
                // console.log('dragLeave');
            }

            function dragDrop(e, sequenceIndex) {
                e.preventDefault();
                console.log('dragDrop');
                const answer = e.dataTransfer.getData('text/plain');
                const answerElement = answerSequences[sequenceIndex];
                const sequenceId = sequences[sequenceIndex].id;


                if (answerElement.textContent !== "") {
                    return;
                }

                const optionIndex = remainingOptions.indexOf(draggedOption);
                if (optionIndex !== -1) {
                    remainingOptions.splice(optionIndex, 1); // Remove a opção do array de opções restantes
                }

                if (answer === correctAnswers[sequenceId]) {
                    console.log('Resposta correta!'); // DEBUG
                    console.log('Resposta: ', answer); // DEBUG
                    console.log('Resposta correta: ', correctAnswers[sequenceId]); // DEBUG
                    answerElement.textContent = answer;
                    draggedOption.style.display = 'none'; // Esconde a opção arrastada.
                    answerElement.style.color = 'green'; // Define a cor para verde (resposta correta).
                    correctCount++;
                    console.log('correctCount: ', correctCount); // DEBUG

                    if (correctCount === 3) {
                        messageElement.style.display = 'block';
                        disableRemainingOptions(); // Desabilita as opções restantes.
                    }
                } else {
                    console.log('Resposta incorreta!'); // DEBUG
                    answerElement.textContent = answer;
                    answerElement.style.color = 'red';
                }

                countDrop++;
                console.log('countDrop: ', countDrop); // DEBUG
                if (countDrop === 3) {

                    if (correctCount < 3) {
                        let erros = 3 - correctCount;
                        messageElement.style.display = 'block';
                        messageElement.style.color = 'red';
                        messageElement.textContent = `Você errou ${erros} das continhas! Tente novamente.`;
                    }

                    console.log('FIM DE JOGO');
                    setTimeout(showSuccessModalPH2, 1500);
                }
            }
        } // END function mainPH2()

        mainPH2(); // CALL FUNCTION mainPH2()


        function disableRemainingOptions() {
            remainingOptions.forEach(option => {
                option.draggable = false; // Desabilita o recurso de arrastar.
                option.classList.add('disabled'); // Adiciona uma classe para estilizar visualmente como desabilitado.
            });
        }

        // MODAL
        function showSuccessModalPH2() {
            const ph2Modal = document.getElementById("ph2-modal");
            const ph2BtnRestart = document.getElementById("ph2-btn-r");
            const ph2BtnNext = document.getElementById("ph2-btn-n");
            ph2Modal.style.visibility = "visible";
            ph2Stars = correctCount;

            const starsSpan = ph2Modal.querySelector(".stars");
            if (ph2Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph2', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph2Stars == 1) {
                starsSpan.textContent = "✨".repeat(1);
                localStorage.setItem('sub-stars-ph2', 3);
                starsSpan.style.filter = "grayscale(0%)";
            } else if (ph2Stars == 2) {
                starsSpan.textContent = "✨".repeat(3);
                localStorage.setItem('sub-stars-ph2', 3);
                starsSpan.style.filter = "grayscale(0%)";

            } else if (ph2Stars == 3) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph2', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph2BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR: Nova rodada!');
                ph2Modal.style.visibility = "hidden";
                localStorage.setItem('sub-stars-ph2', 0);
                starsScore();
                setTimeout(() => {
                    ph2Modal.style.visibility = "hidden";
                    ph2Stars = 0;
                    countDrop = 0;
                    correctCount = 0;

                    // Limpar todas as respostas
                    answerSequences.forEach(answerSequence => {
                        answerSequence.textContent = "";
                        answerSequence.style.color = "black";
                    });
                    // Mostrar todas as opções novamente
                    optionsF2.forEach(option => {
                        option.style.display = 'flex';
                    });
                    remainingOptions.forEach(option => {
                        option.draggable = true; // Habilita o recurso de arrastar.
                        option.classList.remove('disabled'); // Remove a classe para estilizar visualmente como desabilitado.
                    });
                    messageElement.style.display = 'none';
                    mainPH2();

                });
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

        } // END function showSuccessModalPH2()

    } // END function runPhase2()

    runPhase2(); // CALL FUNCTION runPhase2()

    // #####################################
    // -------------- FASE 3 ---------------
    // #####################################

    function runPhase3() {

        let ph3Stars = 0;
        let chosedAnswer = '';

        const optionsF3 = document.querySelectorAll(".optionF3");
        const checkButtonF3 = document.getElementById("checkButtonF3");

        function mainPH3() {

            const correctAnswer = "12 ovos"; // Resposta correta

            optionsF3.forEach((button) => {
                button.addEventListener("click", () => {
                    chosedAnswer = button.textContent;
                });
            });

            function validateAnswerF3() {
                console.log('Resposta selecionada: ', chosedAnswer);

                const correct = chosedAnswer === correctAnswer;
                
                optionsF3.forEach((optionF3) => {
                    if (correct) {
                        console.log('Resposta correta!');
                        optionF3.style.backgroundColor = "green";
                    } else {
                        console.log('Resposta incorreta!');
                        optionF3.style.backgroundColor = "red";
                    }
                });

                ph3Stars = correct ? 5 : 0;
                setTimeout(showSuccessModalPH3, 500);
            }

            checkButtonF3.addEventListener("click", validateAnswerF3);

        }

        mainPH3();


        // MODAL
        function showSuccessModalPH3() {
            const ph3Modal = document.getElementById("ph3-modal");
            const ph3BtnRestart = document.getElementById("ph3-btn-r");
            const ph3BtnNext = document.getElementById("ph3-btn-n");
            ph3Modal.style.visibility = "visible";

            const starsSpan = ph3Modal.querySelector(".stars");
            if (ph3Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph3', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph3Stars == 5) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph3', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph3BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR: Nova rodada!');
                ph3Modal.style.visibility = "hidden";
                localStorage.setItem('sub-stars-ph3', 0);
                starsScore();
                setTimeout(() => {
                    ph3Modal.style.visibility = "hidden";
                    ph3Stars = 0;
                    chosedAnswer = '';  

                    optionsF3.forEach((optionF3) => {
                        optionF3.style.backgroundColor = "#fff";
                        optionF3.style.color = "#000";
                    });

                    mainPH3();
                });
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
        let ph4Stars = 0;

        const correctAnswerF4 = "R$ 22,50";
        const playerAvatar = localStorage.getItem("PlayerCharacter");

        const playerImg = document.querySelector(".player-img");
        playerImg.src = `../img/characters/${playerAvatar}.png`;

        const optionsF4 = document.querySelectorAll(".optionF4");

        optionsF4.forEach((button) => {
            button.addEventListener("click", () => {
                checkAnswerF4(button.textContent);
            });
        });

        function checkAnswerF4(selectedOptionF4) {
            console.log('Resposta selecionada: ', selectedOptionF4);

            const isCorrect = selectedOptionF4 === correctAnswerF4;

            optionsF4.forEach((button) => {
                if (button.textContent === selectedOptionF4) {
                    if (isCorrect) {
                        button.style.backgroundColor = "green";
                    } else {
                        button.style.backgroundColor = "red";
                    }
                }
            });

            ph4Stars = isCorrect ? 5 : 0;

            setTimeout(() => {
                showSuccessModalPH4();
            }, 500);
        }

        // MODAL

        function showSuccessModalPH4() {
            const ph4Modal = document.getElementById("ph4-modal");
            const ph4BtnRestart = document.getElementById("ph4-btn-r");
            const ph4BtnNext = document.getElementById("ph4-btn-n");
            ph4Modal.style.visibility = "visible";


            const starsSpan = ph4Modal.querySelector(".stars");
            if (ph4Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph4', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph4Stars == 5) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph4', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph4BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR: Nova rodada!');
                ph4Modal.style.visibility = "hidden";
                localStorage.setItem('sub-stars-ph4', 0);
                starsScore();
                setTimeout(() => {
                    ph4Modal.style.visibility = "hidden";
                    ph4Stars = 0;

                    optionsF4.forEach((button) => {
                        button.style.backgroundColor = "#ccc";
                    });
                });

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
        const checkButtonF5 = document.getElementById('f5-btn');
        const answer = document.getElementById('answerF5');
        const feedback = document.getElementById('feedbackF5');
        let ph5Stars = 0;

        answer.value = '';

        function checkAnswerF5() {

            if (answer.value === '2.25') {
                ph5Stars = 5;
                console.log('Resposta correta!');
                feedback.style.display = 'block';
                feedback.textContent = 'Parabéns! Você acertou!';
                feedback.className = 'correctF5';
                // Aqui você pode adicionar o código para avançar para a próxima pergunta
            } else {
                ph5Stars = 0;
                feedback.style.display = 'block';
                feedback.textContent = 'Resposta errada. Tente novamente.';
                feedback.className = 'incorrectF5';
            }

            setTimeout(showSuccessModalPH5, 800);
        }

        checkButtonF5.addEventListener('click', checkAnswerF5);

        // MODAL
        function showSuccessModalPH5() {
            const ph5Modal = document.getElementById("ph5-modal");
            const ph5BtnRestart = document.getElementById("ph5-btn-r");
            const ph5BtnNext = document.getElementById("ph5-btn-n");
            ph5Modal.style.visibility = "visible";
            
            const starsSpan = ph5Modal.querySelector(".stars");
            if (ph5Stars == 0) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph5', 0);
                starsSpan.style.filter = "grayscale(100%)";
            } else if (ph5Stars == 5) {
                starsSpan.textContent = "✨".repeat(5);
                localStorage.setItem('sub-stars-ph5', 5);
                starsSpan.style.filter = "grayscale(0%)";
            }

            starsScore();

            ph5BtnRestart.addEventListener("click", () => {
                console.log('REINICIAR: Nova rodada!');
                ph5Modal.style.visibility = "hidden";
                localStorage.setItem('sub-stars-ph5', 0);
                starsScore();
                setTimeout(() => {
                    ph5Modal.style.visibility = "hidden";
                    ph5Stars = 0;

                    answer.value = '';

                    feedback.style.display = 'none';
                    answer.value = '';
                });
            });

            ph5BtnNext.addEventListener("click", () => {
                console.log('FIM DE JOGO');
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

} // Fim da função runSubtractionGame()

runSubtractionGame(); // Inicia o jogo de subtração