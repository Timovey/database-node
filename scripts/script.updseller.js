var name_sell = "";
var surname_sell = "";
var salary = 0;
var id = -1;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    var elem1 = $('#3');
    var elem2 = $('#4');
    var elem3 = $('#5');
    elem1.prop('required', true);
    elem2.prop('required', true);
    elem3.prop('required', true);
    name_sell = elem1.attr('value');
    surname_sell = elem2.attr('value');
    salary = elem3.attr('value');
    //console.log(name_comp);
    let url = `http://localhost:8000/api/Seller?name=${name_sell}&surname=${surname_sell}`

    $.getJSON(url, function (json) {
        id = json.id_seller;
        
    });
});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});

async function updateSeller(nameval, surnameval, salaryval) {
    try {
        //console.log(val);
        const url = "http://localhost:8000/api/Seller";
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({"id": id, "name": nameval, "surname": surnameval, "salary": salaryval }), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        document.location.href = "http://localhost:8000/page/seller.html";
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const values = [...data.values()];
    updateSeller(values[0], values[1], values[2]);
});
