function createUserEvent(event) {

    const emailAddress = $("#email").val();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users',
        data: $.param({ email_address: emailAddress }), 
        dataType: 'json',
    }).done(function(data) {
       console.log(data);
       if ( data.length <= 0 ) {
         return console.log("no matching user, try again");
       } else {
        localStorage.setItem("user-id", data[0].id);
       };
       
    }).fail(function(xhr, status, error){
       console.log("whoops", xhr, status, error);
    });
    
    event.preventDefault();
};

const form = document.getElementById('form');
form.addEventListener('submit', createUserEvent);