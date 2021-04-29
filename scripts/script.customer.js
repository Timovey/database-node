document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    $.getJSON('http://localhost:8000/api/Customers', function (json) {

        var table = $('#1');
        //console.log(json);
        table.remove;
        table.append(`<thead><tr><th scope="col">Имя</th><th scope="col">Фамилия</th><th scope="col">Действия</th></tr></thead><tbody>`);
        for (var i in json) {

            table.append("<tr><td>" + json[i].name + "</td>" +"<td>" + json[i].surname + "</td>" + `<td class="edit_menu"><a class='edit_menu_item' href="http://localhost:8000/page/customer.update.html?name=${json[i].name}&surname=${json[i].surname}">
            редактировать</a><a class='edit_menu_item' href="http://localhost:8000/api/Customerdel?name=${json[i].name}&surname=${json[i].surname}">удалить</a>
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

async function addSeller(valname, valsurname) {
    try {
        const url = "http://localhost:8000/api/Customer";
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "name": valname, "surname": valsurname }), // данные могут быть 'строкой' или {объектом}!
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
    console.log(values[0], values[1]);
    addSeller(values[0], values[1]);
});
