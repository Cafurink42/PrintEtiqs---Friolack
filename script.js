JS:

//Evento no conteúdo do DOM que ajusta a formatção da data para dd/mm/yyyy
document.addEventListener("DOMContentLoaded", function () {
    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getUTCDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    //Evento no botão de geração de preview resgatando os valores de cada campo preenchido
    document.getElementById("Btn_gerar_Preview").addEventListener("click", async function () {
        
        //validação dos campos
        const nome = document.getElementById("nome").value;
        const phone = document.getElementById("phone").value;
        alerta_nome = document.querySelector("#span_01");
            if (nome.trim() === ''){
                alerta_nome.innerHTML = "<p style = 'font-size:10px; color:red; padding-top: 0px; padding-left:5px;'>Você precisa inserir o nome para continuar!</p>";
            }else{
                alerta_nome.innerHTML = "";
            }
        const tipo = document.getElementById("tipo").value;
        const empresa = document.getElementById("empresa").value;
        alerta_empresa = document.querySelector("#span_02");
        if (empresa.trim() === ''){
            alerta_empresa.innerHTML = "<p style = 'font-size:10px;color:red;padding-top:0px;padding-left:5px;'> Você precisa inserir o nome da empresa para continuar!</p>";
        }else{
            alerta_empresa.innerHTML = "";
        }        

        const cpf = document.getElementById("cpf").value; //Reconhece string
        validation_cpf = parseInt(cpf);  //validation convertendo para int
        console.log(validation_cpf);
        //valid = parseInt(validation);
        //console.log(valid)
        /*if (valid != Number){
            alerta_cpf.innerHTML = "<p style = 'font-size:10px;color:red;padding-top:0px;padding-left:5px;'> Você precisa inserir um cpf ou cnpj válidos!</p>";
        }
        */

        alerta_cpf = document.querySelector("#span_03");
        if (validation_cpf === ''){ //cpf
            alerta_cpf.innerHTML = "<p style = 'font-size:10px;color:red;padding-top:0px;padding-left:5px;'> Você precisa inserir um cpf ou cnpj para continuar!</p>";
        }
        else if (isNaN(validation_cpf)){
            alerta_cpf.innerHTML = "<p style = 'font-size:10px;color:red;padding-top:0px;padding-left:5px;'> Você precisa inserir um cpf ou cnpj válidos!</p>";
            return;
            
        }
     
        //PAREI AQUI
        const data = formatDate(document.getElementById("data").value);
        const hora = document.getElementById("hora").value;
        const responsavel = document.getElementById("responsavel").value;

        //Insere os valores via innerHTML no preview
        document.getElementById("prev-tipo").innerHTML = tipo;
        document.getElementById("prev-nome").innerHTML = nome;
        document.getElementById("prev-contato").innerHTML = phone;
        document.getElementById("prev-empresa").innerHTML = empresa;
        document.getElementById("prev-cpf").innerHTML = cpf;
        document.getElementById("prev-data").innerHTML = data;
        document.getElementById("prev-hora").innerHTML = hora;
        document.getElementById("prev-responsavel").innerHTML = responsavel;
        
        // Chama a função salvarRegistro
        
        salvarRegistro({ nome, tipo, phone, empresa, cpf, data, hora, responsavel});
    });

    //evento que ocorre quando um elemento perde o foco.
    document.getElementById("nome").addEventListener("blur", function () {
        const nome = this.value;
        const registro = buscarRegistro(nome);
        //se o usuário perder o foco do campo nome e se existir o registro ele fará a busca.

        // fiz a remoção do || "" após o valor. 
        if (registro) {
            document.getElementById("tipo").value = registro.tipo;
            document.getElementById("phone").value = registro.phone;
            document.getElementById("empresa").value = registro.empresa;
            document.getElementById("cpf").value = registro.cpf;
            document.getElementById("data").value = registro.data ? registro.data.split('/').reverse().join('-') : "";
            document.getElementById("hora").value = registro.hora;
            document.getElementById("responsavel").value = registro.responsavel;
        }else{
            alert (`${document.getElementById("nome").value} não encontrado! Por favor tente novamente!`)
        }
    }) 
    
    //Evento que vai gerar a etiqueta pronta para a impressão
    document.getElementById("Btn_imprimir").addEventListener("click", function () {
        //#Commitar ERRO NOVA VERSÃO 1.3.3 linha 95 a 145 data hora e responsavel não acrescentados a etiqueta
            const tipo = document.getElementById("tipo").value;
            const nome = document.getElementById("nome").value;
            const phone = document.getElementById("phone").value;
            const empresa = document.getElementById("empresa").value;
            const cpf = document.getElementById("cpf").value; //Commitar o cpf passando dentro do getElement
            const data = formatDate(document.getElementById("data").value); // calcula uma vez
            const hora = document.getElementById("hora").value;
            const responsavel = document.getElementById("responsavel").value;
            let printWindow = window.open('about:blank', '', 'width=800,height=600');
        //printWindow referencia o método window.open que vai, basicamente escrever um html na janela de impressão 
        //baseada nas informações de registro.
         
        printWindow.document.write(`
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Imprimir Etiqueta</title>
                <style>
                    @page { size: 100mm 80mm; margin: 0; }
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; text-align: center; }
                    p { margin: 5px 0; font-size: 16px; }
                    h2 { font-size: 16px; }
                </style>
            </head>
            <body>
                <h2>S&S PORTARIA LTDA (FRIOLACK)</h2>
                <span style = 'font-size:10px'>ACG Sistemas - 2025<span>
                <hr>
                <p><strong>Tipo: ${tipo}</strong></p>
                <hr>
                <p><strong>Nome: ${nome}</strong></p>
                <hr>
                <p><strong>Contato:${phone}</strong></p>
                <hr>
                <p><strong>Empresa: ${empresa}</strong></p>
                <hr>
                <p><strong>CPF/CNPJ: ${cpf}</strong></p>
                <hr>
                <p><strong>Data: ${data}</strong></p>
                <hr>
                <p><strong>Hora: ${hora}</strong></p>
                <hr>
                <p><strong>Responsável: ${responsavel}</strong></p>        
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });
    
    //Tratamento dos dados

    // Função para salvar registros no LocalStorage corretamente
    function salvarRegistro(dados) {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        const existe = registros.some(r => r.nome === dados.nome);

        /* Caso não existir, essa condição adiciona um push dos dados 
        para o array e então atualiza o LocalStorage convertendo o array para JSON
        */

        for (const chave in dados) {
            if (dados[chave].trim() === "") {
                return; // Cancela a inserção
            }
        }

        if(!existe) {
            registros.push(dados);
            localStorage.setItem("registros", JSON.stringify(registros));
        }

    
    }

    // Função para buscar um registro salvo no LocalStorage
    function buscarRegistro(nome) { //essa função, busca o parâmetro nome e resgata os dados registrados.
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        return registros.find(r => r.nome.toLowerCase() === nome.toLowerCase()); /*o return da função buscarRegistro, retorna todos 
                                                                                   os registros independentes de maiúscula e minúsculas */
    }

    // Exportação dos registros do LocalStorage para backup
    document.getElementById("exportar_LocalStorage").addEventListener("click", function(){
        let registros = localStorage.getItem("registros") || "[]"; // Exporta apenas os registros
        const blob = new Blob([registros], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "backup_registros.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    let dadosTemporarios = null;

    // Importação do arquivo JSON de backup
    document.getElementById("importar_Backup").addEventListener("change", function (event){
        const arquivo = event.target.files[0];
        if (!arquivo) return;

        const leitor = new FileReader();
        leitor.onload = function (e){
            try {
                let dadosImportados = JSON.parse(e.target.result);

                // Verifica se os dados importados são realmente um array
                if (Array.isArray(dadosImportados)) {
                    dadosTemporarios = dadosImportados;
                    alert("O arquivo foi carregado! Clique em Enviar Importação para confirmar.");
                } else {
                    alert("Erro: O arquivo não contém um formato válido de backup.");
                }
            } catch (error) {
                alert("Erro ao processar o arquivo.");
            }
        };

        leitor.readAsText(arquivo);
    });

    // Botão para confirmar a importação dos registros
    document.getElementById("import_Json").addEventListener("click", function (){
        if (!dadosTemporarios){
            alert("Nenhum arquivo carregado");
            return;
        }

        // Salva corretamente os registros importados
        localStorage.setItem("registros", JSON.stringify(dadosTemporarios));
        alert("Dados importados com sucesso!");
        dadosTemporarios = null;
    });
});