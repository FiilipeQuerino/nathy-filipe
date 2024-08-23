// Se no futuro quiser adicionar alguma lógica interativa, você pode usar este arquivo
document.addEventListener("DOMContentLoaded", function() {
    const inviteButton = document.querySelector(".button");

    // Animação personalizada para o botão (opcional)
    inviteButton.addEventListener("mouseover", function() {
        inviteButton.style.color = "#2e8b57"; // Cor escura quando o mouse passa sobre o botão
    });

    inviteButton.addEventListener("mouseleave", function() {
        inviteButton.style.color = "darkolivegreen"; // Volta à cor original
    });

    // Exemplo de uma função que poderia ser usada no futuro para mais interações
    inviteButton.addEventListener("click", function() {
        alert("Você será redirecionado para mais detalhes!");
    });
});
