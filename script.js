const answers = {
    "index": { answer: "578", nextPage: "answer1.html" },
    "clue2": { answer: "Pad thai", nextPage: "answer2.html" },
    "clue3": { answer: "ON9728351", nextPage: "answer3.html" },
    "clue4": { answer: "392", nextPage: "answer4.html" },
    "clue5": { answer: "motolove", nextPage: "answer5.html" },
    "clue6": { answer: "NYC", nextPage: "answer6.html" },
    "clue7": { answer: "key", nextPage: "answer7.html" }
};

function checkCode() {
    const currentPage = window.location.pathname.split('/').pop() || 'index';
    const entered = document.getElementById('codeInput').value.trim();
    const pageData = answers[currentPage];

    console.log("Current Page:", currentPage);
    console.log("Entered Code:", entered);
    console.log("Page Data:", pageData);

    if (!pageData) {
        document.getElementById('errorMsg').innerText = "Error: Page configuration not found!";
        typeWriter(document.getElementById('errorMsg'), 30);
        return;
    }
    
    // Case-insensitive comparison for text answers
    const correctAnswer = pageData.answer;
    const isCorrect = correctAnswer.toLowerCase() === entered.toLowerCase();
    
    if (isCorrect) {
        window.location.href = pageData.nextPage;
    } else {
        document.getElementById('errorMsg').innerText = "Not quite... Try again!";
        typeWriter(document.getElementById('errorMsg'), 30);
    }
}

function revealHint() {
    const hint = document.getElementById('hiddenHint');
    hint.style.display = 'block';
    typeWriter(hint, 50);
}
function revealHint2() {
    const hint2 = document.getElementById('hiddenHint2');
    hint2.style.display = 'block';
    typeWriter(hint2, 30);
}
function revealSolution() {
    const solution = document.getElementById('hiddenSolution');
    solution.style.display = 'block';
    typeWriter(solution, 50);
}

// Typewriter animation function
function typeWriter(element, speed = 50, callback = null) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typewriter', 'typing');
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            element.classList.remove('typing');
            element.classList.add('completed');
            if (callback) callback();
        }
    }, speed);
}

// Initialize typing animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    const elementsToType = [
        { 
            selector: 'h1', 
            delay: 0, 
            speed: 80, 
            callback: showContentAfterH1 // Show content after h1 completes
        },
        { 
            selector: 'p.typewriter', 
            delay: 1500, 
            speed: 40,
            callback: showFirstAnswerInput // Show answer input after main paragraph completes (for index.html)
        }
    ];

    function showContentAfterH1() {
        // Show the main content div after h1 typewriter completes
        const contentDiv = document.getElementById('content');
        if (contentDiv) {
            contentDiv.style.display = 'block';
            
            // Get all direct children that should be animated
            const children = contentDiv.children;
            const animatableElements = [];
            
            // Filter elements that should be animated (exclude hidden hints and error messages)
            Array.from(children).forEach(child => {
                if (child.id !== 'errorMsg' && 
                    child.id !== 'hiddenHint' && 
                    child.id !== 'hiddenHint2' && 
                    child.id !== 'hiddenSolution' &&
                    !child.classList.contains('hidden-hint')) {
                    animatableElements.push(child);
                }
            });
            
            // Show each element one by one with a delay
            animatableElements.forEach((element, index) => {
                element.style.transition = 'opacity 0.6s ease-in';
                setTimeout(() => {
                    element.style.opacity = '1';
                }, index * 500); // 500ms delay between each element
            });
        }
    }

    function showFirstAnswerInput() {
        // Show the first answer input section after paragraph completes (for index.html)
        const firstAnswerInput = document.getElementById('firstAnswerInput');
        if (firstAnswerInput) {
            firstAnswerInput.style.display = 'block';
            firstAnswerInput.style.opacity = '0';
            firstAnswerInput.style.transition = 'opacity 0.8s ease-in';
            setTimeout(() => {
                firstAnswerInput.style.opacity = '1';
                // After firstAnswerInput is shown, show the hints section
                setTimeout(() => {
                    showHintsSection();
                }, 500); // Wait 500ms after firstAnswerInput appears before showing hints
            }, 300);
        }
    }

    function showHintsSection() {
        // Show input and button first, right after main paragraph
        const input = document.getElementById('codeInput');
        const button = document.querySelector('button');                               
        if (input) {
            input.style.transition = 'opacity 0.5s ease-in';
            setTimeout(() => input.style.opacity = '1', 100);
        }
        if (button) {
            button.style.transition = 'opacity 0.5s ease-in';
            setTimeout(() => button.style.opacity = '1', 300);
        }
        
        // Then show hints section after input/button appear
        setTimeout(() => {
            const hintsSection = document.getElementById('hintsSection');
            if (hintsSection) {
                hintsSection.style.opacity = '1';
                hintsSection.style.transition = 'opacity 0.5s ease-in';
            }
            
            // Type out hints section content in order
            const hintElements = hintsSection.querySelectorAll('p');
            hintElements.forEach((element, index) => {
                element.classList.add('typewriter');
                setTimeout(() => {
                    typeWriter(element, 60);
                }, index * 800);
            });
        }, 1500);
        
                        // Show hint buttons after hints section content finishes
        setTimeout(() => {
            const hintButtons = document.querySelectorAll('.clue1, .clue2, .solution');
            hintButtons.forEach((btn, index) => {
                btn.style.transition = 'opacity 0.5s ease-in';
                setTimeout(() => btn.style.opacity = '1', index * 300);
            });
        }, 4500);
    }

    elementsToType.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.classList.add('typewriter');
            setTimeout(() => {
                typeWriter(element, item.speed, item.callback);
            }, item.delay);
        }
    });
});
