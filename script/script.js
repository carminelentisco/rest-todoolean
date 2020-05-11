jQuery(document).ready(function() {

    // Setup
    var inputText = $('#input-text');
    var sendButton = $('#send-button');
    var listContainer = $('#todo-item-list')

    // Handlebar 
    var source = $('#todo-item-template').html();
    var template = Handlebars.compile(source);

    var myUrl = "http://157.230.17.132:3009/todos";
    ajaxCall(myUrl, 'GET' , template, listContainer);
    
    sendButton.on('click', function() {
        
        var text = inputTex.val().trim();
        ajaxCall(myUrl, 'PUSH' , template, listContainer);

    });


    

}); //____________ End Script Pageù


//____________________ FUNCTIONS _________________//

function ajaxCall(myUrl, method , template, listContainer) {
    
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