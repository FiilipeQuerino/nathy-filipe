document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(function(button) {
        button.addEventListener("mouseover", function() {
            button.style.color = "#2e8b57";
        });

        button.addEventListener("mouseleave", function() {
            button.style.color = "darkolivegreen";
        });
    });
});
