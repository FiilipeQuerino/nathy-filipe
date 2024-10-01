document.addEventListener('DOMContentLoaded', function () {
    function enviarParaGoogleSheets(name, recado) {
        fetch('https://script.google.com/macros/s/AKfycbyCAYu1amj5HouLF_1_m1-Cy6ZDMIxsV0XNXTuL7jpQMWxoeIb3iFaaVi3bw05y4-iZ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "nome": name, "recado": recado })
        })
        .then(() => {
            showRecadoToast('Recado enviado com sucesso!');
            document.getElementById('mensagem').value = ''; // Limpa o campo de recado após o envio
            listarRecados(); // Atualiza a lista de recados
        })
        .catch(error => {
            console.error('Erro ao enviar os dados para o Google Sheets:', error);
            showRecadoToast('Houve um erro ao enviar o recado. Tente novamente.');
        });
    }

    document.getElementById('enviar-recado').addEventListener('click', function () {
        const nome = localStorage.getItem('nome'); // Pega o nome salvo no localStorage
        const recado = document.getElementById('mensagem').value.trim();

        if (!nome) {
            showRecadoToast('Por favor, confirme sua presença antes de enviar um recado.');
            return;
        }

        if (recado) {
            enviarParaGoogleSheets(nome, recado);
        } else {
            showRecadoToast('Por favor, escreva um recado antes de enviar.');
        }
    });

    function listarRecados() {
        fetch('https://script.google.com/macros/s/AKfycbwdlBCqMC_ucMckqvgnZ_KWW-blEqoK97V0GDypfgONU8nbcSt5JnMxZ4sfXnh3f1tU/exec')
        .then(response => response.json())
        .then(data => {
            const recadosLista = document.getElementById('recados-lista');
            recadosLista.innerHTML = ''; // Limpa a lista antes de renderizar novos recados

            data.forEach(item => {
                const recadoElemento = document.createElement('div');
                recadoElemento.classList.add('recado-item');

                recadoElemento.innerHTML = `
                    <strong>${item.nome}:</strong>
                    <p>${item.recado}</p>
                `;

                recadosLista.appendChild(recadoElemento);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os recados:', error);
            showRecadoToast('Houve um erro ao carregar os recados.');
        });
    }

    // Função para exibir o toast personalizado para recados
    function showRecadoToast(message) {
        const toast = document.getElementById('recado-toast');
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); // O toast será exibido por 3 segundos
    }

    // Chamar a função para listar os recados quando a página carregar
    listarRecados();
});
