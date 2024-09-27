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
            })
            .catch(error => {
                console.error('Erro ao enviar os dados para o Google Sheets:', error);
                showToast('Houve um erro ao enviar o recado. Por favor, tente novamente.');
            });
    }

    document.getElementById('enviar-recado').addEventListener('click', function () {
        const nome = localStorage.getItem('nome');
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
                recadosLista.innerHTML = '';

                data.forEach(item => {
                    const recadoElemento = document.createElement('div');
                    recadoElemento.innerHTML = `<strong>${item.nome}:</strong> ${item.recado}`;
                    recadosLista.appendChild(recadoElemento);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar os recados:', error);
                showToast('Houve um erro ao carregar os recados.');
            });
    }

    listarRecados();
});