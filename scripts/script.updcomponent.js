const name_comp;
const id;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    var elem = $('#3');
    
    name_comp = elem.attr('value');
    let url = "http://localhost:8000/api/Component"
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "name_component": val }), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});

async function addComponent(val) {
    try {
        console.log(val);
        const url = "http://localhost:8000/api/Component";
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "name_component": val }), // данные могут быть 'строкой' или {объектом}!
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
    addComponent(values[0]);
});
