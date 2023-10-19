
////////////////////save//////////////////////////

$("#itemBtn>button[type='button']").eq(2).on('click', ()=>{
    console.log("Save clicked");

    let code = $("#code2").val();
    let item = $("#item2").val();
    let price = $("#price2").val();
    let qty = $("#qty2").val();

    console.log(`Code : ${code}\n Item: ${item}\n Price: ${price} Qty: ${qty}\n`);

    $("#item_tBody").append("<tr>\n" +
        "<td class='code1' scope=\"row\">" + code + "</td>" +
        "<td class='item1'>" + item + "</td>" +
        "<td class='price1'>" + price + "</td>" +
        "<td class='qty1'>" + qty + "</td>" +
        "</tr>"
    );

    //clear
    $("#itemBtn>button[type='reset']").click();

});

/////////////////////////////select row//////////////////////////////////

var row_index;

const clear2 = () =>{
    $("#code2").val("");
    $("#item2").val("");
    $("#price2").val("");
    $("#qty2").val("");
}

$("#item_tBody").on("click" , "tr", function () {        //event dedication --> catches the runtime tr

    row_index = $(this).index();

    let code = $(this).find(".code1").text();
    let item = $(this).find(".item1").text();
    let price = $(this).find(".price1").text();
    let qty = $(this).find(".qty1").text();

    $("#code2").val(code);
    $("#item2").val(item);
    $("#price2").val(price);
    $("#qty2").val(qty);
});

//////////////////////update/////////////////////////

$("#itemBtn>button[type='button']").eq(1).on("click", ()=> {
    console.log("Update clicked");

    let code = $("#code2").val();
    let item = $("#item2").val();
    let price = $("#price2").val();
    let qty = $("#qty2").val();

    let record = `<td class= "code1">${code}</td><td class="item1">${item}</td><td class="price1">${price}</td><td className="qty1">${qty}</td>`;

    $("#item_tBody>tr").eq(row_index).html(record);


    //clear
    $("#itemBtn>button[type='reset']").click();

});

//delete
$("#itemBtn>button[type='button']").eq(0).on("click", ()=> {
    console.log("Delete clicked");
    $("#item_tBody>tr").eq(row_index).remove();

    //clear
    $("#cusBtn>button[type='reset']").click();
});
