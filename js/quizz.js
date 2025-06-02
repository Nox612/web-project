window.addEventListener("DOMContentLoaded", async () => {
    const category = localStorage.getItem("selectedCategory");
    if (!category) {
        alert("No category selected.");
        return;
    }

    document.getElementById("category-name").textContent = category;

    try {
        const response = await fetch(`../questions/${category}.json`);
        let questions = await response.json();
        questions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

        let current = 0;
        let score = 0;

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
                    if (i === q.correctIndex) score++;
                    current++;
                    if (current < questions.length) {
                        updateQuestion();
                    } else {
                        document.body.innerHTML = `
                            <div class="header-bar">
                                <p class="header-title">Queezie</p>
                                <nav>
                                    <a href="./home.html">Home</a>
                                    <a href="./about.html">About</a>
                                </nav>
                            </div>
                            <h1>Quiz terminé !</h1>
                            <p>Votre score : ${score}/${questions.length}</p>
                        `;
                    }
                };
            }
        }

        updateQuestion();
    } catch (err) {
        document.getElementById("question").textContent = "Erreur de chargement.";
    }
});
