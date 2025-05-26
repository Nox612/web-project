let buttonPresses = [];

function registerButtonPress(buttonId) {
    buttonPresses.push({
        id: buttonId,
        time: new Date().toISOString()
    });
    console.log(`Button ${buttonId} pressed.`);
}

// Example usage: attach to buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
        registerButtonPress(this.id || this.textContent);
    });
});