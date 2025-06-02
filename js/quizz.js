window.addEventListener("DOMContentLoaded", async () => {
    const category = localStorage.getItem("selectedCategory");
    if (!category) {
        alert("No category selected.");
        return;
    }

    document.getElementById("category-name").textContent = category;

    const imageContainer = document.querySelector(".proportional-square");
    imageContainer.innerHTML = `<img src="../images/${category}.png" alt="${category}" style="max-width:100%; max-height:100%; object-fit:contain;" />`;

    try {
        const response = await fetch(`../questions/${category}.json`);
        let questions = await response.json();
        questions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

        let current = 0;
        let score = 0;

        const userAnswers = [];

        const questionEl = document.getElementById("question");
        const countEl = document.getElementById("question-count");

        function updateQuestion() {
            const q = questions[current];
            questionEl.textContent = q.question;
            countEl.textContent = `Question ${current + 1}/${questions.length}`;

            for (let i = 0; i < 4; i++) {
                const btn = document.getElementById(`button${i + 1}`);
                btn.textContent = q.answers[i];
                btn.onclick = () => {
                    const isCorrect = i === q.correctIndex;
                    if (isCorrect) score++;
                    userAnswers.push({
                        question: q.question,
                        userAnswer: q.answers[i],
                        isCorrect: isCorrect,
                        correctAnswer: q.answers[q.correctIndex]
                    });
                    current++;
                    if (current < questions.length) {
                        updateQuestion();
                    } else {
                        showResults();
                    }
                };
            }
        }

        function showResults() {
            let resultsHTML = `
                <div class="header-bar">
                    <p class="header-title">Queezie</p>
                    <nav class="nav-links">
                        <a href="./home.html">Home</a>
                        <a href="./about.html">About</a>
                    </nav>
                </div>
                <h1>Quiz completed!</h1>
                <p>Your score: ${score}/${questions.length}</p>
                <h2>Answer breakdown:</h2>
                <ul style="list-style-type: none; padding: 0;">
            `;

            userAnswers.forEach((ans, index) => {
                resultsHTML += `
                    <li style="margin-bottom: 20px; padding: 15px; background: ${ans.isCorrect ? '#d4edda' : '#f8d7da'}; border-radius: 8px;">
                        <strong>Q${index + 1}:</strong> ${ans.question}<br>
                        <strong>Your answer:</strong> ${ans.userAnswer}<br>
                        ${ans.isCorrect
                            ? `<span style="color: green; font-weight: bold;">✅ Correct answer</span>`
                            : `<span style="color: red; font-weight: bold;">❌ Incorrect answer</span><br><strong>Correct answer:</strong> ${ans.correctAnswer}`
                        }
                    </li>
                `;
            });

            resultsHTML += `</ul>`;
            document.body.innerHTML = resultsHTML;
        }

        updateQuestion();
    } catch (err) {
        document.getElementById("question").textContent = "Failed to load questions.";
    }
});
