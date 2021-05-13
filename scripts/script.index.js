var arr_ids = new Array();
var id;
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    $.getJSON('http://localhost:8000/api/Orders', function (json) {

        var table = $('#1');
        //console.log(json);
        table.remove;
        table.append(`<thead><tr><th scope="col">Продавец</th><th scope="col">Покупатель</th><th scope="col">Цена</th><th scope="col">Действия</th></tr></thead><tbody>`);
        for (var i in json) {

            table.append("<tr><td>" + json[i].sellersurname + " " + json[i].sellername+ "</td>" +"<td>" + json[i].customersurname + json[i].customername+ "</td>" + "<td>" + json[i].totalprice+ "</td>" + `<td><a class='edit_menu_item' href="http://localhost:8000/api/Orderdel?id_order=${json[i].id_order}">удалить</a>
            </td></tr>`);

            $('#1').append(table);
        }
        table.append(`</tbody> </table>`);
    });

    $.getJSON('http://localhost:8000/api/Sellers', function (json) {

        var list = $('#7');
        //console.log(json);
        list.remove;
        for (var i in json) {
            list.append(`<option value="${json[i].id_seller}">${json[i].name} ${json[i].surname}</option>`);
            $('#7').append(list);
        }
        list.append(`</div>`);
    });

    $.getJSON('http://localhost:8000/api/Customers', function (json) {

        var list = $('#8');
        //console.log(json);
        list.remove;
        for (var i in json) {
            list.append(`<option value="${json[i].id_customer}">${json[i].name} ${json[i].surname}</option>`);
            $('#8').append(list);
        }
        list.append(`</div>`);
    });

    $.getJSON('http://localhost:8000/api/Foods', function (json) {

        var list = $('#6');
        
        list.remove;
        list.append(`<div> Меню:`);
        for (var i in json) {

            list.append(`<p><input type="checkbox" name="listfoods" value="${json[i].price}" onchange = 'showOrHide();' id="${json[i].id_food}"> ${json[i].name } ${json[i].price} </p>`);
            console.log(json[i].id_food);
            arr_ids.push(json[i].id_food);

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

async function addOrder(values) {
    try {
        const urlfood = "http://localhost:8000/api/Order";
        //console.log(JSON.stringify({ "name": values[0], "description": values[1], "price": values[2] }));
        const response = await fetch(urlfood, {
            method: 'POST',
            body: JSON.stringify({ "id_seller": values[0], "id_customer": values[1], "totalprice": values[2] }), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        //console.log(json.id_food);
        const urlstorage = "http://localhost:8000/api/OrderFood";
        //console.log(JSON.stringify({ "name": values[0], "description": values[1], "price": values[2] }));
        for(var i in values) {
            if(i == 0 || i == 1 || i == 2) {
                continue;
            }
            console.log(arr_ids);
            console.log(arr_ids[i - 3]);
            //console.log(arr_ids[i - 2]);
            
            const respon = await fetch(urlstorage, {
                method: 'POST',
                body: JSON.stringify({ "id_food": arr_ids[i - 3], "id_order": json.id_order, "amount": 1}), // данные могут быть 'строкой' или {объектом}!
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const js = await respon.json();

            
            console.log('Успех:', JSON.stringify(js));
        }
        //console.log("33333333333333333333")
       document.location.href = "http://localhost:8000/page/index.html";
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}

formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const entries = [...data.entries()];
    const values = [...data.values()];
    //console.log(entries);
    //console.log(values[2]);
    if(values[2] == 0) {
        console.log("Цена не может быть 0");
        return;
    }
    addOrder(values);
});

function showOrHide() {
   //console.log("12123213123");
   var tot = 0;
   for(i = 0; i < arr_ids.length; i++) {
    var el = $(`#${arr_ids[i]}`);
    if(el.is(':checked')) {
    tot = tot + Number(el.val());
    }
   }
   //console.log(tot);
   var price = $('#9').val(tot);

}