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
            showToast('Recado enviado com sucesso!');
            document.getElementById('mensagem').value = '';
            listarRecados(); // Atualiza a lista de recados
        })
        .catch(error => {
            console.error('Erro ao enviar os dados para o Google Sheets:', error);
            showToast('Houve um erro ao enviar o recado. Por favor, tente novamente.');
        });
    }

    document.getElementById('enviar-recado').addEventListener('click', function () {
        const nome = document.getElementById('nome-recado').value;
        const recado = document.getElementById('mensagem').value;

        if (nome && recado) {
            enviarParaGoogleSheets(nome, recado);
        } else {
            showToast('Por favor, preencha todos os campos antes de enviar.');
        }
    });

    function listarRecados() {
        fetch('https://script.google.com/macros/s/AKfycbwdlBCqMC_ucMckqvgnZ_KWW-blEqoK97V0GDypfgONU8nbcSt5JnMxZ4sfXnh3f1tU/exec')
        .then(response => response.json())
        .then(data => {
            const recadosLista = document.getElementById('recados-lista');
            recadosLista.innerHTML = ''; // Limpa a lista antes de renderizar novos recados

            data.forEach(item => {
                // Criar o elemento de recado com a formatação correta
                const recadoElemento = document.createElement('div');
                recadoElemento.classList.add('recado-item'); // Adiciona a classe para estilização

                // Inserir o HTML para o nome e o recado
                recadoElemento.innerHTML = `
                    <strong>${item.nome}:</strong>
                    <p>${item.recado}</p>
                `;

                // Adicionar o recado à lista de recados
                recadosLista.appendChild(recadoElemento);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os recados:', error);
            showToast('Houve um erro ao carregar os recados.');
        });
    }

    // Chamar a função para listar os recados quando a página carregar
    listarRecados();
});
