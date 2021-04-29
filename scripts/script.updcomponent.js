var name_comp = "";
var id = -1;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    var elem = $('#3');
    elem.prop('required', true);
    name_comp = elem.attr('value');
    console.log(name_comp);
    let url = `http://localhost:8000/api/Component?name_component=${name_comp}`

    $.getJSON(url, function (json) {
        id = json.id_component;
        
    });
});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});

async function updateComponent(val) {
    try {
        console.log(val);
        const url = "http://localhost:8000/api/Component";
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({"id": id, "name_component": val }), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        document.location.href = "http://localhost:8000/page/component.html";
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const values = [...data.values()];
    updateComponent(values[0]);
});
