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

        console.log(json);    

    });
});

const formElem = document.forms[0];

formElem.addEventListener('submit', function (event) {
    event.preventDefault();
    new FormData(formElem);
});


formElem.addEventListener("formdata", event => {
    const data = event.formData;

    const entries = [...data.entries()];
    const values = [...data.values()];
    console.log(entries);
    console.log(values);

    console.log("Все норм, данные отправлены");

    // var req = new XMLHttpRequest();
    // req.open('GET', "http://localhost:8000/api/Components");
    // req.responseType = 'json';
    // req.send();
    // console.log(req);
    // var request = JSON.stringify("http://localhost:8000/api/Components");
    //console.log(request);

    // fetch("http://localhost:8000/api/Components").then(function (response) {
    //     response.json().then(function (json) {
    //         console.log(json);

    //         var tableelement = $("#1");        //get table id from jquery
    //         console.log(tableelement);
    //         var str = JSON.stringify(json);
    //         console.log(str);
    //         console.log(createRow(str));
    //         tableelement.append(createRow(json, ['name']));            //call this function from the action you want to show table

    //         function createRow(Object) {                              //dynamically adding rows to the Table

    //             var trElement = "<tr>";                 //design this according to your requirement

    //             for (var s = 0; s < Object.length; s++) {
    //                 trElement += "<td >" + Object[s].Time + "</td>";
    //             }

    //             return trElement;
    //         }
    //     });
    // });

});
