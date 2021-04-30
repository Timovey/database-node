document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    $.getJSON('http://localhost:8000/api/Foods', function (json) {

        var table = $('#1');
        //console.log(json);
        table.remove;
        table.append(`<thead><tr><th scope="col">Название</th><th scope="col">Описание</th><th scope="col">Цена</th><th scope="col">Действия</th></tr></thead><tbody>`);
        for (var i in json) {

            table.append("<tr><td>" + json[i].name + "</td>" +"<td>" + json[i].description + "</td>" + "<td>" + json[i].price+ "</td>" + `<td class="edit_menu"><a class='edit_menu_item' href="http://localhost:8000/page/food.update.html?name=${json[i].name}">
            редактировать</a><a class='edit_menu_item' href="http://localhost:8000/api/Fooddel?name=${json[i].name}">удалить</a>
            </td></tr>`);

            $('#1').append(table);
        }
        table.append(`</tbody> </table>`);
    });

    $.getJSON('http://localhost:8000/api/Components', function (json) {

        var list = $('#6');
        //console.log(json);
        list.remove;
        list.append(`<div> Компоненты:`);
        for (var i in json) {

            list.append(`<p><input type="checkbox" name="listcomp" value="${json[i].name }"> ${json[i].name } </p>`);

            $('#6').append(list);
        }
        list.append(`</div>`);
    });
});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});

async function addFood(values) {
    let valname = values[0];
    let valdesc = values[1];
    let valprice = values[2];
    console.log(valname, valdesc, valprice);
    try {
        const url = "http://localhost:8000/api/Food";
        console.log(JSON.stringify({ "name": values[0], "description": values[1], "price": values[2] }));
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ "name": values[0], "description": values[1], "price": values[2] }), // данные могут быть 'строкой' или {объектом}!
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

    const entries = [...data.entries()];
    const values = [...data.values()];
    console.log(entries);
    console.log(values);
    addFood(values);
});
