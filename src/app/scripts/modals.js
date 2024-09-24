document.addEventListener("DOMContentLoaded", function() {
    const modals = {
        giftModal: document.getElementById("giftListModal"),
        locationModal: document.getElementById("locationModal"),
    };

    const buttons = {
        giftBtn: document.getElementById("giftListButton"),
        locationBtn: document.getElementById("locationButton"),
    };

    const closeBtns = document.getElementsByClassName("close");

    buttons.giftBtn.onclick = function() {
        modals.giftModal.style.display = "block";
    };

    buttons.locationBtn.onclick = function() {
        modals.locationModal.style.display = "block";
    };

    Array.from(closeBtns).forEach(function(closeBtn) {
        closeBtn.onclick = function() {
            modals.giftModal.style.display = "none";
            modals.locationModal.style.display = "none";
        };
    });

    window.onclick = function(event) {
        if (event.target === modals.giftModal) {
            modals.giftModal.style.display = "none";
        } else if (event.target === modals.locationModal) {
            modals.locationModal.style.display = "none";
        }
    };
});
