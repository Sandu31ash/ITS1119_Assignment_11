AOS.init();

$("#con2").css("display", "none");
$("#con3").css("display", "none");
$("#con4").css("display", "none");

$(".nav-link").eq(0).css("color" , "black");
$(".nav-link").eq(0).css("font-weight" , "bold");

$("#homeSec").on('click' , ()=>{
    $("#con2").css("display", "none");
    $("#con3").css("display", "none");
    $("#con4").css("display", "none");
    $("#con1").css("display", "block");

    $(".nav-link").eq(0).css("color" , "black");
    $(".nav-link").eq(0).css("font-weight" , "bold");

    $(".nav-link").eq(1).css("color" , "blue");
    $(".nav-link").eq(1).css("font-weight" , "normal");

    $(".nav-link").eq(2).css("color" , "blue");
    $(".nav-link").eq(2).css("font-weight" , "normal");

    $(".nav-link").eq(3).css("color" , "blue");
    $(".nav-link").eq(3).css("font-weight" , "normal");
});

$("#cusSec").on('click' , ()=>{
    $("#con1").css("display", "none");
    $("#con3").css("display", "none");
    $("#con4").css("display", "none");
    $("#con2").css("top", "0");
    $("#con2").css("display", "block");

    $(".nav-link").eq(0).css("color" , "blue");
    $(".nav-link").eq(0).css("font-weight" , "normal");

    $("#cusSec").css("color" , "black");
    $("#cusSec").css("font-weight" , "bold");
    $("#cusSec").css("color" , "black");

    $(".nav-link").eq(2).css("color" , "blue");
    $(".nav-link").eq(2).css("font-weight" , "normal");

    $(".nav-link").eq(3).css("color" , "blue");
    $(".nav-link").eq(3).css("font-weight" , "normal");
});

$("#itemSec").on('click' , ()=>{
    $("#con1").css("display", "none");
    $("#con2").css("display", "none");
    $("#con4").css("display", "none");
    $("#con3").css("top", "0");
    $("#con3").css("display", "block");

    $(".nav-link").eq(0).css("color" , "blue");
    $(".nav-link").eq(0).css("font-weight" , "normal");

    $(".nav-link").eq(1).css("color" , "blue");
    $(".nav-link").eq(1).css("font-weight" , "normal");

    $(".nav-link").eq(2).css("color" , "black");
    $(".nav-link").eq(2).css("font-weight" , "bold");

    $(".nav-link").eq(3).css("color" , "blue");
    $(".nav-link").eq(3).css("font-weight" , "normal");
});

$("#orderSec").on('click' , ()=>{
    $("#con1").css("display", "none");
    $("#con2").css("display", "none");
    $("#con3").css("display", "none");
    $("#con4").css("top", "0");
    $("#con4").css("display" , "block");

    $(".nav-link").eq(0).css("color" , "blue");
    $(".nav-link").eq(0).css("font-weight" , "normal");

    $(".nav-link").eq(1).css("color" , "blue");
    $(".nav-link").eq(1).css("font-weight" , "normal");

    $(".nav-link").eq(2).css("color" , "blue");
    $(".nav-link").eq(2).css("font-weight" , "normal");

    $(".nav-link").eq(3).css("color" , "black");
    $(".nav-link").eq(3).css("font-weight" , "bold");

});

//////////////////////////////////////////

$("#btnCus").on('click', ()=>{
    $("#con1").css("display", "none");
    $("#con3").css("display", "none");
    $("#con4").css("display", "none");
    $("#con2").css("top", "0");
    $("#con2").css("display", "block");
});

$("#btnItem").on('click', ()=>{
    $("#con1").css("display", "none");
    $("#con2").css("display", "none");
    $("#con4").css("display", "none");
    $("#con3").css("top", "0");
    $("#con3").css("display", "block");
});

$("#btnOrder").on('click', ()=>{
    $("#con1").css("display", "none");
    $("#con2").css("display", "none");
    $("#con3").css("display", "none");
    $("#con4").css("top", "0");
    $("#con4").css("display" , "block");
});



///////////////////////////////////////////////Customer Js/////////////////////////////////////////////////

//////////////////////save//////////////////////////

$("#cusBtn>button[type='button']").eq(2).on('click', ()=>{
    // $("#btnSave").on('click', ()=>{
    console.log("Save clicked");

    let cus_id = $("#cusId1").val();
    let name = $("#name1").val();
    let contact = $("#contact").val();
    let address = $("#address").val();

    console.log(`CusID : ${cus_id}\n Name: ${name}\n Contact: ${contact} Address: ${address}\n`);

    $("#stu_tBody").append("<tr>\n" +
        "<td class='cus_id1' scope=\"row\">" + cus_id + "</td>" +
        "<td class='name1'>" + name + "</td>" +
        "<td class='contact1'>" + contact + "</td>" +
        "<td class='address1'>" + address + "</td>" +
        "</tr>"
    );

    //clear
    $("button[type='reset']").click();

});

///////////////////////////select row//////////////////////////////////

var row_index;

const clear = () =>{
    $("#cusId1").val("");
    $("#name1").val("");
    $("#contact").val("");
    $("#address").val("");
}

$("#stu_tBody").on("click" , "tr", function () {        //event dedication --> catches the runtime tr

    console.log("Row selected");

    row_index = $(this).index();

    let cus_id = $(this).find(".cus_id1").text();
    let name = $(this).find(".name1").text();
    let contact = $(this).find(".contact1").text();
    let address = $(this).find(".address1").text();

    $("#cusId1").val(cus_id);
    $("#name1").val(name);
    $("#contact").val(contact);
    $("#address").val(address);
});


//////////////////////update/////////////////////////

$("#cusBtn>button[type='button']").eq(1).on("click", ()=> {
    console.log("Update clicked");

    let cus_id = $("#cusId1").val();
    let name = $("#name1").val();
    let contact = $("#contact").val();
    let address = $("#address").val();

    let record = `<td class= "cus_id1">${cus_id}</td><td class="name1">${name}</td><td class="contact1">${contact}</td><td className="address1">${address}</td>`;

    $("#stu_tBody>tr").eq(row_index).html(record);


    //clear
    $("#cusBtn>button[type='reset']").click();

});

//delete
$("#cusBtn>button[type='button']").eq(0).on("click", ()=> {
    console.log("Delete clicked");
    $("#stu_tBody>tr").eq(row_index).remove();
});







///////////////////////////////////////////Item Js/////////////////////////////////////////////////

////////////////////save//////////////////////////

$("#itemBtn>button[type='button']").eq(2).on('click', ()=>{
    console.log("Save clicked");

    let code = $("#code2").val();
    let item = $("#item2").val();
    let price = $("#price2").val();
    let qty = $("#qty2").val();

    console.log(`Code : ${code}\n Item: ${item}\n Price: ${price} Qty: ${qty}\n`);

    $("#stu_tBody2").append("<tr>\n" +
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

$("#stu_tBody2").on("click" , "tr", function () {        //event dedication --> catches the runtime tr

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

    $("#stu_tBody2>tr").eq(row_index).html(record);


    //clear
    $("#itemBtn>button[type='reset']").click();

});

//delete
$("#itemBtn>button[type='button']").eq(0).on("click", ()=> {
    console.log("Delete clicked");
    $("#stu_tBody2>tr").eq(row_index).remove();
});




/////////////////////////////////////////////Order Js/////////////////////////////////////////////////


//////////////////////Add to cart////////////////////////

$("#orderBtnCart>button[type='button']").eq(0).on('click', ()=>{
    console.log("Add to cart clicked");

    let iCode = $("#iCode").val();
    let item = $("#item3").val();
    let price = $("#price3").val();
    let qty = $("#qty3").val();
    let tot = ($("#price3").val())*($("#qty3").val());

    console.log(`Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);

    $("#stu_tBody3").append("<tr>\n" +
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