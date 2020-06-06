const { createInvoice } = require('../controllers/pdf');
const { createRandomNumber } = require('../connections/password');
const pool = require('../connections/database');
/**
 * assignment variables
 */
const Bill_ = {};
let array_bill = [];



/*const data__ = (value) => {
    array_bill.push(value);
    return array_bill;
}*/

Bill_.create = async(req, res) => {

    /**
     * here create pdfname
     */
    const pdf_name = createRandomNumber();
    let suma = 0;





    /**
     * here take new variables to generate data to insert into pdf file
     */
    const body_bill = req.body;

    const code_ = body_bill.code;
    const code_name_ = body_bill.code_name;
    const cantidad_ = body_bill.cantidad;
    const precio_unity_ = body_bill.precio_unity;
    const Total_ = body_bill.Total;


    const longitud = Total_.length; // longitud del array
    console.log('longitud: ', longitud);


    /**
     * to create the subtotal
     */
    for (let i = 0; i < longitud; i++) {
        /**
         * by this method we're pushing any objects elements into array
         */
        array_bill.push({
            'item': code_[i],
            'description': code_name_[i],
            'quantity': cantidad_[i],
            'amount': precio_unity_[i],
        });
    }
    Total_.forEach(element_total => {
        suma = suma + (parseInt(element_total) * 100);
    });



    console.log('::', array_bill);

    const invoice = {
        shipping: {
            name: body_bill.destinatario_name,
            address: body_bill.address,
            city: 'Guayaquil',
            state: 'Guayaquil',
            country: 'Ecuador',
            postal_code: 'GY0001'
        },
        items: array_bill,
        subtotal: suma,
        paid: 0,
        invoice_nr: 12345
    };
    console.log('invoice=>: ', invoice);
    createInvoice(invoice, pdf_name);
    console.log('bill was generated successfully');
    array_bill = [];
    req.flash('success', 'archivo pdf fue generado satisfactoriamente')
    res.redirect('/main/state');
}




//const body_bill = req.body;
//console.log(body_bill);
//const array_test = [];
/*const object_test = {
    destinatario_name: 'favio Samanez Rosales',
    destinatario_ced: '0918237421',
    fecha_emision: '2020-06-04',
    code: ['desparasitation', 'Intern_rvision', 'data2'],
    code_name: ['quitar parasitos', 'radiografias', 'tomografia'],
    cantidad: ['2', '1', '100'],
    total: ['500', '350', '35000']
};
const code_ = object_test.total;
let suma = 0;
code_.forEach(element_data => {
    suma = suma + parseInt(element_data);
    //console.log(element_data);

});*/

/*for (let i = 0; i < code_.length; i++) {
    console.log('code_: ', code_[i]);
    suma = suma + parseInt(code_[i]);
}*/
//console.log('suma: ', suma);



//
/*const invoice = {
    shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111
    },
    items: [{
            item: "TC 100",
            description: "Toner Cartridge",
            quantity: 2,
            amount: 6000
        },
        {
            item: "USB_EXT",
            description: "USB Cable Extender",
            quantity: 1,
            amount: 2000
        }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
};*/


//createInvoice(invoice, pdf_name);
//console.log('bill was generated successfully');
//res.redirect('/main/state');


module.exports = Bill_;