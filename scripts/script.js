document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM готов!");
    $.getJSON('http://localhost:8000/api/Components', function(json) {

        var table = $('#1');
        table.remove;
        table.append("<th>" + "Ингридиенты" + "</th>");
        for(var i in json)
        {
            table = $('<tr>');
            table.append("<td>" + json[i].name + "</td>");
            $('#1').append(table);
        }

        //console.log(json);    

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
          method: 'POST', 
          body: JSON.stringify({ "name_component": val }), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        return json;
      } catch (error) {
        console.error('Ошибка:', error);
      }
}
formElem.addEventListener("formdata", event => {
    const data = event.formData;

    //const entries = [...data.entries()];
    const values = [...data.values()];
    var c = updateComponent(values[0]);
    console.log("Все норм, данные отправлены");

   
});
