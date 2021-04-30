var name_food = "";
var description = "";
var price = 0;
var id = -1;
var arr_ids = new Array();
var arr_finish = new Array();
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


           console.log(json[i].id_component);
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
        //console.log(val);
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

        for(var i in values) {
            if(i == 0 || i == 1 || i == 2) {
                continue;
            }
            //console.log(arr_ids);
            var svar;
            $.getJSON(`http://localhost:8000/api/Component?name_component=${values[i]}`, function (jsong) {
                svar = jsong.id_component;
                //console.log(svar);
               // console.log(arr_ids);
            });
            console.log(arr_ids);
            console.log(svar);
            if(arr_ids.includes(svar)) {
                console.log(1);
                for(i = 0; i < arr_ids.length;i++) {
                    if(arr_ids[i] == svar) {
                        arr_ids.splice(i, 1);
                    }
                }
                //arr_ids.remove(svar);
            }
            else {
                //console.log(JSON.stringify({ "id_food": id, "name_component": values[i], "amount": 1 }));
                const respon = await fetch("http://localhost:8000/api/Storage", {
                    method: 'POST',
                    body: JSON.stringify({ "id_food": id, "name_component": values[i], "amount": 1 }), // данные могут быть 'строкой' или {объектом}!
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const js = await respon.json();
    
                console.log("app");
                console.log('Успех:', JSON.stringify(js));
            }
            for(var i in arr_ids) {
                $.getJSON(`http://localhost:8000/api/Storagedel?id_food=${id}&id_component=${i}`, function (json) {

                    console.log("del");
                   // console.log(arr_ids);
                });
            }

           
        }
        document.location.href = "http://localhost:8000/page/food.html";
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const values = [...data.values()];
    console.log(values);
    updateFood(values);
});
