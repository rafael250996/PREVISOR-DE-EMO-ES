$(document).ready(function(){

    console.log('Ready')

    // Busque a data atual e atualize-a no DOM (se necessário)

    // Escreva um evento, quando o botão Enviar for clicado
    $('#submitBtn').click(function(){

        // Obtenha o valor do texto da área de texto usando o método 'val()'
        let text_value = $('#textInput').val()

        // Converta-o em um objeto JS.
        // Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
        let input_text = {'review': text_value}
        console.log(input_text)

        // Requisição ajax
        $.ajax({

            // Tipo da requisição web
            type: 'POST',

            // URL do endpoint no servidor Flask (assumindo que está executando localmente)
            url: 'http://localhost:5000/review',

            // Dados a serem enviados no formato JSON
            data: JSON.stringify(input_text),

            // O tipo de resposta esperado é JSON
            dataType: 'json',

            // ContentType
            contentType: 'application/json',

            // Se tudo funcionar, execute esta função
            success: function(result){

                // Extraia previsão e a URL do emoticon do resultado
                let sentiment = result.sentiment;
                let image_path = result.image_path;

                // Atualize os elementos DOM (exemplo: você precisa ter elementos com ids 'sentimentResult' e 'emoticonImage')
                $('#sentimentResult').text('Sentimento: ' + sentiment);
                $('#emoticonImage').attr('src', image_path);

                // Exiba-os (se necessário)
                $('#resultContainer').show();
            },

            // Se houver algum erro, execute esta função
            error: function(result){

                console.log(result);
            }
        });

        // Limpando a caixa de texto após cada pressionamento de botão
        $('#textInput').val("");
    });
});
