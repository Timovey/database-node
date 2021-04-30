document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    $.getJSON('http://localhost:8000/api/Components', function (json) {

        var table = $('#1');
        //console.log(table);
        table.remove;
        table.append(`<thead><tr><th scope="col">Название</th><th scope="col">Действия</th></tr></thead><tbody>`);
        for (var i in json) {

            table.append("<tr><td>" + json[i].name + "</td>" + `<td class="edit_menu"><a class='edit_menu_item' href="http://localhost:8000/page/component.update.html?name_component=${json[i].name}">
            редактировать</a><a class='edit_menu_item' href="http://localhost:8000/api/Componentdel?name_component=${json[i].name}" >удалить</a>
            </td></tr>`);

            $('#1').append(table);
        }
        table.append(`</tbody> </table>`);
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
