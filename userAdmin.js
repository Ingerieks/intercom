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
    })
});

function createUserEvent(event) {
    
    log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    event.preventDefault();
    
    const emailAddress = $("#email").val();

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users',
        data: { emailAddress: emailAddress },
        //processData: false,
        //contentType: false
    }).done(function (data) {
        console.log(data);
  });
  
  event.preventDefault();
};
  
  const form = document.getElementById('form');
  const log = document.getElementById('log');
  form.addEventListener('submit', createUserEvent);

