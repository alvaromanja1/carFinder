$('a').on('click', function(e){
    e.preventDefault(); 
    var pageRef = $(this).attr('href');
    
    callPage(pageRef)
}); 

function callPage(pageRefInput){
    
    $.ajax({
        url: pageRefInput, 
        
        type: "GET", 
        
        dataType: 'text', 
        
        success: function (response) {
            console.log('the page was loaded', response); 
            $('.content').html(response); 
        },
        
        error: function(error){
            console.log('the page was NOT loades', error); 
        }, 
        
        complete: function (chr, status) {
            console.log("the request is complete"); 
        }
    }); 
}