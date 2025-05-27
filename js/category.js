document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button.category').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log(btn.id);
            alert('clicked');
        });
    });
});
