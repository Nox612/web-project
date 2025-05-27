let category = Array(10).fill(null);
let buttonPressed = Array(10).fill(false);

const categories = ['animal', 'art', 'cinema', 'economic', 'geography', 'history', 'music', 'politic', 'medicine', 'vegetable'];

for (let i = 1; i <= 10; i++) {
    document.getElementById(`button-${i}`).addEventListener("click", function() {
        if(!buttonPressed[i-1]){
            category[i - 1] = categories[i - 1];
            buttonPressed[i - 1] = true;
            console.log('Categories:', category);
            this.style.transform = "scale(0.8)";
            this.style.transition = "transform 0.2s";
        }
        else
        {
            category[i - 1] = null;
            buttonPressed[i - 1] = false;
            this.style.transform = "scale(1)";
            this.style.transition = "transform 0.2s";
            console.log('Categories:', category);
        }
    });
}