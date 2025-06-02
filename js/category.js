document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        localStorage.setItem("selectedCategory", category);
        window.location.href = "./quizPage.html";
    });
});
