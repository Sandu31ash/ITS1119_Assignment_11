
//////////////////////Add to cart////////////////////////

$("#orderBtnCart>button[type='button']").eq(0).on('click', ()=>{
    console.log("Add to cart clicked");

    let iCode = $("#iCode").val();
    let item = $("#item3").val();
    let price = $("#price3").val();
    let qty = $("#qty3").val();
    let tot = ($("#price3").val())*($("#qty3").val());

    console.log(`Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);

    $("#order_tBody").append("<tr>\n" +
        "<td class='icode1' scope=\"row\">" + iCode + "</td>" +
        "<td class='item1'>" + item + "</td>" +
        "<td class='price1'>" + price + "</td>" +
        "<td class='qty1'>" + qty + "</td>" +
        "<td class='tot1'>" + tot + "</td>" +
        "</tr>"
    );

    $("#tot").val(tot);

    //clear
    // $("button[type='reset']").click();
    $("#orderBtnCart>button[type='reset']").eq(0).click();

});


////////////////////Purchase/////////////////

$("#orderBtnPur>button[type='button']").eq(0).on('click', ()=>{
    console.log("Purchase clicked");

    let cash = $("#cash").val();
    let tot = $("#tot").val();

    $("#balance").val(cash-tot);

});