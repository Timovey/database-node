var name_food = "";
var description = "";
var price = 0;
var id = -1;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    var elem1 = $('#3');
    var elem2 = $('#4');
    var elem3 = $('#5');
    elem1.prop('required', true);
    elem2.prop('required', true);
    elem3.prop('required', true);
    name_food = elem1.attr('value');
    description = elem2.attr('value');
    price = elem3.attr('value');
    //console.log(name_comp);
    let url = `http://localhost:8000/api/Food?name=${name_food}`

    $.getJSON(url, function (json) {
        id = json.id_food;
        
    });

});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});

async function updateFood(nameval, descval, priceval) {
    try {
        //console.log(val);
        const url = "http://localhost:8000/api/Food";
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": nameval, "description": descval, "price": priceval }), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        document.location.href = "http://localhost:8000/page/food.html";
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const values = [...data.values()];
    updateFood(values[0], values[1], values[2]);
});
