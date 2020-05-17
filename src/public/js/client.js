const e = require("express");

const main_sidebar = document.getElementById('sidebar');
const co_main_sidebar = document.getElementById('sidebar_content');
const button = document.getElementById('Button_click');


/**
 * To messagges
 */
const toggle_button = document.getElementById('btn_toggle');
const messagge = document.getElementById('messagge');



button.addEventListener('click', function(event) {
    main_sidebar.classList.toggle('active');
    co_main_sidebar.classList.toggle('active');
    event.preventDefault();
});


toggle_button.addEventListener('click', function(event) {
    messagge.classList.toggle('active');
    e.preventDefault();
});