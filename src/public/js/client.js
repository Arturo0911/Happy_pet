$(document).ready(function() {

    const main_sidebar = document.getElementById('sidebar');
    const co_main_sidebar = document.getElementById('sidebar_content');
    const button = document.getElementById('Button_click');

    button.addEventListener('click', function(event) {
        main_sidebar.classList.toggle('active');
        co_main_sidebar.classList.toggle('active');
        event.preventDefault();
    })

})