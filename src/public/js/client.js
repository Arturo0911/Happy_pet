const main_sidebar = document.getElementById('sidebar');
const co_main_sidebar = document.getElementById('sidebar_content');
const button = document.getElementById('Button_click');


const select = document.getElementById('inputTypeFood');
const select_pet_range = document.getElementById('InputRangePet');

button.addEventListener('click', function(event) {
    main_sidebar.classList.toggle('active');
    co_main_sidebar.classList.toggle('active');
    event.preventDefault();
});

const type_pet_humedo = ['Adultos, cena de pavo; trozos jugosos', 'Adultos, festival de pollo; trozos jugosos',
    'Cachorros, Pollo; Trozos Jugosos', 'Adultos, picnic cordero'
];

const type_pet_seco = ['Adultos (madianos y grandes)', 'Adultos (minis y pequeños)',
    'cachorros (medianos y grandes)', 'cachorros salud visible (minis y pequeños)',
    'Adultos (minis y pequeños) general', 'Adultos 7+', 'Adultos control de peso, todos los tamaños'
];

select.addEventListener('change', function(e) {
    const seleccionado = $('#inputTypeFood').val();
    if (seleccionado === 'Humedo') {
        console.log(seleccionado);
        let html = '';
        type_pet_humedo.forEach(Element => {
            html += `
                <option>${Element}</option>
            `
        });
        $('#InputRangePet').html(html);

    } else {
        let html = '';
        type_pet_seco.forEach(Element => {
            html += `
                <option>${Element}</option>
            `
        });
        $('#InputRangePet').html(html);
    }
    e.preventDefault();
});