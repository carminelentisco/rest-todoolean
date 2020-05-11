jQuery(document).ready(function() {

    // Setup
    var inputText = $('#input-text');
    var sendButton = $('#send-button');
    var listContainer = $('#todo-item-list')
    var rule = $('#rule');
    var buttonRule = $('#button-rule');
    var todoApp = $('#todo-app');

    // Handlebar 
    var source = $('#todo-item-template').html();
    var template = Handlebars.compile(source);

    buttonRule.click(function() {
        rule.slideUp();
        setTimeout(function() {
            todoApp.slideDown();
        }, 500);
    });

    var myUrl = "http://157.230.17.132:3009/todos";
    ajaxGetCall(myUrl, 'GET' , template, listContainer);
    
    sendButton.on('click', function() {
        var text = inputText.val().trim();
        if ( text !== '') {
            clearInput(inputText);
            ajaxPostCall(myUrl, 'POST' , text, template, listContainer);
        } else {
            alert('Testo non valido');
        }
    });

    inputText.keyup(function (e) { 
        var key = e.which;
        if ( key == 13) {
            var text = inputText.val().trim();
            if ( text !== '') {
                clearInput(inputText);
                ajaxPostCall(myUrl, 'POST' , text, template, listContainer);
            } else {
                alert('Testo non valido');
            }
            
        }
    });

    $(document).on('click','.delete', function() {
        var todoId = $(this).data('id');
        clearDoom(listContainer);
        ajaxDeleteCall(myUrl, "DELETE" , todoId, template, listContainer);
    });

}); //____________ End Script Page

//____________________ FUNCTIONS _________________//

function ajaxGetCall(myUrl, method , template, listContainer) {
    
    $.ajax({
        url: myUrl,
        method,
        success: function (result) {
            for ( var i = 0; i < result.length; i++ ) {
                var elementApi = result[i];

                var itemDescription = {
                    text: elementApi.text,
                    id: elementApi.id
                } 

                var html = template(itemDescription);
                listContainer.append(html);
            }

        }, 
        error: function() {
            console.log('Si è verificato un errore nella chiamata');
        }
    });
}

function ajaxPostCall(myUrl, method , text, template, listContainer) {
    
    clearDoom(listContainer);

    $.ajax({
        url: myUrl,
        method,
        data: {
          "text": text  
        },
        success: function() {
            ajaxGetCall(myUrl, 'GET' , template, listContainer);
        }
    });
}

function ajaxDeleteCall(myUrl, method , todoId, template, listContainer) {
    $.ajax({
        url: myUrl + '/' + todoId,
        method,
        success: function () {
            
            ajaxGetCall(myUrl, 'GET' , template, listContainer);
        }
    });
}

function clearDoom(element) {
    element.html('');
}

function clearInput(element) {
    element.val('');
}