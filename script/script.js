jQuery(document).ready(function() {

    // Setup
    var inputText = $('#input-text');
    var sendButton = $('#send-button');
    var listContainer = $('#todo-item-list')

    // Handlebar 
    var source = $('#todo-item-template').html();
    var template = Handlebars.compile(source);

    var myUrl = "http://157.230.17.132:3009/todos";
    ajaxGetCall(myUrl, 'GET' , template, listContainer);
    
    sendButton.on('click', function() {
        var text = inputText.val().trim();
        ajaxPostCall(myUrl, 'POST' , text, template, listContainer);
    });



    

}); //____________ End Script Pageù


//____________________ FUNCTIONS _________________//

function ajaxGetCall(myUrl, method , template, listContainer) {
    
    $.ajax({
        url: myUrl,
        method : method ,
        success: function (result) {
            for ( var i = 0; i < result.length; i++ ) {
                var elementApi = result[i];

                var itemDescription = {
                    text: elementApi.text
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
    
    clear(listContainer);

    $.ajax({
        url: myUrl,
        method : method ,
        data: {
          "text": text  
        },
        success: function() {
            ajaxGetCall(myUrl, 'GET' , template, listContainer);
        }
    });
}

function clear(element) {
    element.html('');
}