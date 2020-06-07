// when page loads get full list of users and show in user list container - one on each row
// when someone clicks submit do POST request to user end point, to create new user
// reload user list and update

const api = "http://localhost:3000";

$.get(api + "/users", function (users) {
    const usersContainer = $("#users-container");

    users.forEach(user => {
        console.log(user);
        var userContainer = $(document.createElement('div'));
        userContainer.addClass("user-container");
        userContainer.text(user.emailAdress);

        usersContainer.append(userContainer);
    });
});

function createUserEvent(event) {

    log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;

    const emailAddress = $("#email").val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users',
        data: JSON.stringify({ emailAddress: emailAddress }), 
        dataType: 'json',
        contentType: 'application/json',
    }).done(function(data) {
       console.log(data);
    }).fail(function(xhr, status, error){
       console.log("whoops", xhr, status, error);
    });

    event.preventDefault();
};

const form = document.getElementById('form');
const log = document.getElementById('log');
form.addEventListener('submit', createUserEvent);

