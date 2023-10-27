import {OrderModel} from "/model/OrderModel.js";
import {order_db, order_item_db, item_db, customer_db} from "../db/db.js";


const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

$("#code3").val("O001");

const loadOItemData = ()=>{

    $("#order_tBody").empty();

    order_item_db.map((item, index) =>{
        let record = "<tr>\n" +
            "<td class='icode1' scope=\"row\">" + item.iCode + "</td>" +
            "<td class='item1'>" + item.item + "</td>" +
            "<td class='price1'>" + item.price + "</td>" +
            "<td class='qty1'>" + item.qty + "</td>" +
            "<td class='tot1'>" + item.tot + "</td>" +
            "</tr>"

        $("#order_tBody").append(record);

    });
};

//////////////////////Add to cart////////////////////////

$("#orderBtnCart>button[type='button']").eq(0).on('click', ()=>{


    console.log("Add to cart clicked");

    // $("#disc").val("");
    // $("#cash").val("");
    // $("#balance").val("");

    let iCode = $("#iCode").val();
    let item = $("#item3").val();
    let price = $("#price3").val();
    let qty = $("#qty3").val();
    let tot = ($("#price3").val())*($("#qty3").val());

    console.log(`Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);

    let qtyOnH = $("#qty2").val();
    console.log("QtyOnH"+qtyOnH);

    // if(qty<qtyOnH && qty>=1){

        let order_obj = new OrderModel(iCode, item, price, qty, tot);

        // save in the db
        order_item_db.push(order_obj);

        console.log(`Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);

        $("#tot").val(tot);

        Toast.fire({
            icon: 'success',
            title: 'Added to cart'
        })

        loadOItemData();

        generateOrderCode();

        //clear
        $("button[type='reset']").click();
        // $("#orderBtnCart>button[type='reset']").eq(0).click();
    // }else{
    //     Toast.fire({
    //         icon: 'error',
    //         title: 'Enter the qty'
    //     })
    // }

    // $("#order_tBody").append("<tr>\n" +
    //     "<td class='icode1' scope=\"row\">" + iCode + "</td>" +
    //     "<td class='item1'>" + item + "</td>" +
    //     "<td class='price1'>" + price + "</td>" +
    //     "<td class='qty1'>" + qty + "</td>" +
    //     "<td class='tot1'>" + tot + "</td>" +
    //     "</tr>"
    // );

    $("#tot").val(tot);

    $("#subTot").val(tot);

    //clear
    $("button[type='reset']").click();
    $("#orderBtnCart>button[type='reset']").eq(0).click();

});


////////////////////Purchase/////////////////

// document.addEventListener("DOMContentLoaded", function() {
//     const myInput = document.getElementById("disc");

//     myInput.addEventListener("change", function () {

$("#disc").on("input", function() {

        let disc = $("#disc").val();
        console.log("DiscountS" + disc);

        let totS = $("#tot").val();
        console.log("TotS" + totS);
        let discount = (totS/100)*disc;
        let subTotS = totS - discount;
        console.log("SubTotS" + subTotS);
        $("#subTot").val(subTotS);
    });

// });

$("#orderBtnPur>button[type='button']").eq(0).on('click', ()=>{
    console.log("Purchase clicked");

    let cash = $("#cash").val();
    let subTot = $("#subTot").val();

    $("#balance").val(cash-subTot);


    //save order details in the order_db


});
//
// const loadCusIds =()=>{
//     var ar = [];
//
//     for (let i = 0; i < customer_db.length; i++) {
//         ar.push(customer_db[i].cus_id);
//     }
//
//     console.log(ar);
//     // console.log("Order Manage");
//
//     for (let i = 0; i < ar.length; i++) {
//         $("#cusId3 option").eq(i + 1).text(ar[i]);
//         $("#cusId3 option").eq(i + 1).val(ar[i]);
//         // $("#cusName3").val(ar[]);
//     }
// }


$("#cusId3").on('click', ()=>{

    // let selected = $("#cusId3 option").selected().val();

    // console.log("Selected Value"+selected);

    var ar = [];

    for (let i = 0; i < customer_db.length; i++) {
        ar.push(customer_db[i].cus_id);
    }

    console.log(ar);
    // console.log("Order Manage");

    for (let i = 0; i < ar.length; i++) {
        $("#cusId3 option").eq(i + 1).text(ar[i]);
        $("#cusId3 option").eq(i + 1).val(ar[i]);
        // $("#cusName3").val(ar[]);
    }


    // Get the select element
    var selectElement = document.getElementById("cusId3");

    // Get the selected value
    var selectedValue = selectElement.value;

    // Log the selected value to the console
    console.log("Selected Value: " + selectedValue);

    // $("#cusName3").val(ar[]);

    for (let i=0; i<ar.length; i++){
        if(selectedValue === customer_db[i].cus_id){
            $("#cusName3").val(customer_db[i].name);
        }
    }

    // loadCusIds();

});

// $("#cusName3").val();



$("#iCode").on('click', ()=>{

    // let selected = $("#cusId3 option").selected().val();

    // console.log("Selected Value"+selected);

    var ar = [];

    for (let i = 0; i < item_db.length; i++) {
        ar.push(item_db[i].code);
    }

    console.log(ar);
    // console.log("Order Manage");

    for (let i = 0; i < ar.length; i++) {
        $("#iCode option").eq(i + 1).text(ar[i]);
        $("#iCode option").eq(i + 1).val(ar[i]);
        // $("#cusName3").val(ar[]);
    }


    // Get the select element
    var selectElement = document.getElementById("iCode");

    // Get the selected value
    var selectedValue = selectElement.value;

    // Log the selected value to the console
    console.log("Selected Value: " + selectedValue);

    // $("#cusName3").val(ar[]);

    for (let i=0; i<ar.length; i++){
        if(selectedValue === item_db[i].code){
            $("#item3").val(item_db[i].item);
            $("#price3").val(item_db[i].price);
            // $("#qty3").val(item_db[i].qty);
        }
    }

    // loadCusIds();

});

//
function generateOrderCode() {
    let length = order_db.length;

    let lastOrderCode = order_db[length-1].cus_id;

    if (lastCustomerId === "") {
        $("#cusId1").val("C001");
    } else {
        const number = parseInt(lastCustomerId.substr(1)) + 1;
        let newId = "C" + number.toString().padStart(3, "0");
        $("#cusId1").val(newId);
    }

    // $("#cusId1").val(lastCustomerId);
    // $("#cusId1").val(lastCustomerId);
    // console.log("generate");
}