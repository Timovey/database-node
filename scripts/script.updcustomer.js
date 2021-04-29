var name_cus = "";
var surname_cus = "";
var id = -1;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    var elem1 = $('#3');
    var elem2 = $('#4');
    elem1.prop('required', true);
    elem2.prop('required', true);
    name_cus = elem1.attr('value');
    surname_cus = elem2.attr('value');
    //console.log(name_comp);
    let url = `http://localhost:8000/api/Customer?name=${name_cus}&surname=${surname_cus}`

    $.getJSON(url, function (json) {
        id = json.id_customer;
        
    });
});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});

async function updateCustomer(nameval, surnameval) {
    try {
        console.log(id);
        const url = "http://localhost:8000/api/Customer";
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": nameval, "surname": surnameval }), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        document.location.href = "http://localhost:8000/page/customer.html";
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const values = [...data.values()];
    updateCustomer(values[0], values[1]);
});
