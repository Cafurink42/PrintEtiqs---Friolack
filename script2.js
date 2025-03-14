document.addEventListener("DOMContentLoaded", function () {
    // Função para formatar a data no formato DD-MM-YYYY
    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses começam em 0, então adiciona 1
        const year = d.getFullYear();
        return `${day}-${month}-${year}`; // Formato final DD-MM-YYYY
    }

    // Gerar a pré-visualização ao clicar no botão "Gerar Etiqueta"
    document.getElementById("gerarPreview").addEventListener("click", function () {
        document.getElementById("prev-tipo").innerHTML = document.getElementById("tipo").value;
        document.getElementById("prev-nome").innerHTML = document.getElementById("nome").value;
        document.getElementById("prev-empresa").innerHTML = document.getElementById("empresa").value;
        document.getElementById("prev-cpf").innerHTML = document.getElementById("cpf").value;

        // Formatar a data no formato DD-MM-YYYY
        const formattedDate = formatDate(document.getElementById("data").value);
        document.getElementById("prev-data").innerHTML = formattedDate;
        document.getElementById("prev-hora").innerHTML = document.getElementById("hora").value;
        document.getElementById("prev-responsavel").innerHTML = document.getElementById("responsavel").value;
    });

    // Imprimir a pré-visualização em uma nova aba ao clicar no botão "Imprimir"
    document.getElementById("imprimir").addEventListener("click", function () {
        // Cria uma nova janela (aba) em branco
        let printWindow = window.open('about:blank', '', 'width=800,height=400');

        // Preenche o conteúdo da nova aba com os dados da etiqueta
       
        printWindow.document.write(`
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Imprimir Etiqueta</title>
                <style>
                    /* Configuração para definir as dimensões da etiqueta em mm */
                    @page {
                        size: 100mm 80mm; /* 100mm x 80mm para a etiqueta */
                        margin: 0;
                        font-size:16px;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 10mm; /* Define um pequeno padding para a impressão */
                        margin: 0;
                        width: 100%;
                        height: 100%;
                    }
                    p {
                        margin: 2px 0;
                        font-size: 20px;
                    }
                    @media print {
                        body {
                            width: 100%;
                            height: 100%;
                            font-size: 30px; /*Ajusta o tamanho da fonte para melhor adequação*/
                        }
                    }
                </style>
            </head>
            <body>
                <p>Tipo: ${document.getElementById("tipo").value}</p>
                <p><strong>Nome:</strong> ${document.getElementById("nome").value}</p>
                <p><strong>Empresa:</strong> ${document.getElementById("empresa").value}</p>
                <p><strong>CPF/CNPJ:</strong> ${document.getElementById("cpf").value}</p>
                <p><strong>Data:</strong> ${formatDate(document.getElementById("data").value)}</p>
                <p><strong>Hora:</strong> ${document.getElementById("hora").value}</p>
                <p><strong>Responsável:</strong> ${document.getElementById("responsavel").value}</p>
            </body>
            </html>
        `);
        // Espera o conteúdo carregar e imprime
        printWindow.document.close();
        printWindow.print();
    });
});
