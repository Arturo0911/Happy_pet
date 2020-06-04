/**
 * get the inputs and selects values
 */
const Btn_bill = document.getElementById('Btn_bill');
const InputPrecio = document.getElementById('InputPrecio');
const InputCuantity = document.getElementById('InputCuantity');
const inputCode = document.getElementById('inputCode');
const input__Total = document.getElementById('inputTotal');
/**
 * const to generate pay
 */
const create_bill = document.getElementById('create_bill');
const Add_bill = document.getElementById('Add_bill');
const carrito = [];


/**
 * form
 */
const form_bill = document.getElementById('form_bill');





const description = [
    'Medicina general y consulta',
    'Corte de pelo y uñas',
    'Corte de pelo, uñas y baño (con desparasitacion incluida)',
    'Desparasitacinn, antibioticos con recet',
    'Consulta medica con dieta incluida',
    'Radiografias, tomografias'
];
const values_ = [200, 50, 150, 250, 275, 350];
inputCode.addEventListener('change', (e) => {
    const selected_value = $('#inputCode').val();
    let iner_1 = '';
    let iner_2 = '';

    if (selected_value === 'Medicine_general') {
        iner_1 = `<option>${description[0]}</option>`;
        iner_2 = `<option>${values_[0]}</option>`;
        $('#inputDescription').html(iner_1);
        $('#InputPrecio').html(iner_2);
    } else if (selected_value === 'Corte_stetic') {
        iner_1 = `<option>${description[1]}</option>`;
        iner_2 = `<option>${values_[1]}</option>`;
        $('#inputDescription').html(iner_1);
        $('#InputPrecio').html(iner_2);
    } else if (selected_value === 'Corte_stetic_unias') {
        iner_1 = `<option>${description[2]}</option>`;
        iner_2 = `<option>${values_[2]}</option>`;
        $('#inputDescription').html(iner_1);
        $('#InputPrecio').html(iner_2);
    } else if (selected_value === 'Desparasitation') {
        iner_1 = `<option>${description[3]}</option>`;
        iner_2 = `<option>${values_[3]}</option>`;
        $('#inputDescription').html(iner_1);
        $('#InputPrecio').html(iner_2);
    } else if (selected_value === 'Dieta') {
        iner_1 = `<option>${description[4]}</option>`;
        iner_2 = `<option>${values_[4]}</option>`;
        $('#inputDescription').html(iner_1);
        $('#InputPrecio').html(iner_2);
    } else if (selected_value === 'Intern_revision') {
        iner_1 = `<option>${description[5]}</option>`;
        iner_2 = `<option>${values_[5]}</option>`;
        $('#inputDescription').html(iner_1);
        $('#InputPrecio').html(iner_2);
    }


    e.preventDefault();
});

InputCuantity.addEventListener('input', (evento) => {
    input__Total.value = $('#InputCuantity').val() * $('#InputPrecio').val();
    evento.preventDefault();

});

Add_bill.addEventListener('click', (evento) => {
    let innerHtml = '';
    const carrito_object = {
        codigo: $('#inputCode').val(),
        description: $('#inputDescription').val(),
        cantidad: $('#InputCuantity').val(),
        precio_unity: $('#InputPrecio').val(),
        Total: $('#inputTotal').val()
    };
    carrito.push(carrito_object);
    if (carrito.length < 1) {
        alert('El carrito de la factura está vacio');
    } else {
        //console.log(carrito_object);
        console.log('carrito: ', carrito);
        $('#inputCode').val('');
        $('#inputDescription').val('');
        $('#InputCuantity').val('');
        $('#InputPrecio').val('');
        $('#inputTotal').val('');
        create_bill.classList.add('active');
        carrito.forEach(Element => {
            innerHtml += `
            <tr>
                <td><input class="form-control" readonly="readonly" name="code" value= ${Element.codigo}></td>
                <td><input class="form-control" readonly="readonly" name="code_name" value=${Element.description}></td>
                <td><input class="form-control" readonly="readonly" name="cantidad" value=${Element.cantidad}></td>
                <td><input class="form-control" readonly="readonly" name="precio_unity" value=${Element.precio_unity}></td>
                <td><input class="form-control" readonly="readonly" name="Total" value=${Element.Total}></td>
            </tr>
            `;
        });
        $('#tbody_').html(innerHtml);
    }
    evento.preventDefault();
});