document.querySelector('.get-started-button').addEventListener('click', () => {
    alert('Get Started button was clicked!');
    // Add code for other functions here
});

document.getElementById('get-started-btn').addEventListener('click', () => {
    // Redirect the user to the next page
    window.location.href = 'Landing.html'; // Replace 'signup.html' with the name of your next HTML file
});