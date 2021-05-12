var name_food = "";
var description = "";
var price = 0;
var id = -1;
var arr_ids = new Array();
var compid;
const URL = "http://localhost:8000/api/";
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

    $.getJSON(`http://localhost:8000/api/Foodfil?name_food=${name_food}`, function (json) {
        //console.log(json);
        for (i = 0; i < json.length; i++) {


           //console.log(json[i].id_component);
            arr_ids[i] = json[i].id_component;
        }
        // for(h = 0; h <= arr_ids[h];h++) {
        //     console.log(arr_ids[i]);    
        // }
        
    });

    $.getJSON('http://localhost:8000/api/Components', function (json) {

        var list = $('#6');
        //console.log(json);
        list.remove;
        list.append(`<div> Компоненты:`);
        for (var i in json) {
            //console.log(json[i].id_component);
            if(arr_ids.includes(json[i].id_component)) {
                //console.log("1111111");
                list.append(`<p><input type="checkbox" checked="1" name="listcomp" value="${json[i].name }"> ${json[i].name } </p>`);
            }
            else {
                list.append(`<p><input type="checkbox" name="listcomp" value="${json[i].name }"> ${json[i].name } </p>`);
            }
     
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

async function updateFood(values) {
    try {
        

        if(values.length == 3) {
            $.getJSON(`http://localhost:8000/api/Storagedelall`, function (json) {

            });
            console.log("все удалено из Starage");
        }
        else {
            //console.log(arr_ids);
            for(var i in values) {
                if(i == 0 || i == 1 || i == 2) {
                    continue;
                }
                //console.log(values[i]);

                const url = `http://localhost:8000/api/Component?name_component=${values[i]}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await response.json();
                compid = json.id_component;

                const index = arr_ids.indexOf(compid);
                if (index > -1) {
                    //console.log(`элемент удален + ${arr_ids[index]}`);
                    arr_ids.splice(index, 1);
                //console.log(arr_ids);
                }
                                
                const urlt = `http://localhost:8000/api/Storage?id_food=${id}&id_component=${compid}`;
                const responset = await fetch(urlt, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const jsont = await responset.json();
                //console.log(jsont.id_food);
                
                if(jsont.id_component == -1) {
                    console.log("таких элементов не было, надо добавить");
                            const respon = await  fetch(`${URL}StorageId`, {
                                method: 'POST',
                                body: JSON.stringify({ "id_food": id, "id_component": compid, "amount": 1}), // данные могут быть 'строкой' или {объектом}!
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const js = await respon.json();

                }

                //console.log(jsont);
            }
            console.log(arr_ids);
            for(i = 0; i < arr_ids.length; i++) {
                const urlt = `http://localhost:8000/api/Storagedel?id_food=${id}&id_component=${arr_ids[i]}`;
                const responset = await fetch(urlt, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await responset.json();
                console.log(json);
            }
        }

        const url = "http://localhost:8000/api/Food";
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "name": values[0], "description": values[1], "price": values[2]}), // данные могут быть 'строкой' или {объектом}!
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
    //console.log(values);
    updateFood(values);
});
