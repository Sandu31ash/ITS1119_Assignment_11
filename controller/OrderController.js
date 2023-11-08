import {OrderItemModel} from "/model/OrderItemModel.js";
import {OrderModel} from "/model/OrderModel.js";
import {order_db, order_item_db, item_db, customer_db} from "../db/db.js";
import {ItemModel} from "../model/ItemModel.js";
// import {ItemModel} from "../model/ItemModel";


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

        // $("#order_tBody").append(record);

        if ($("#code3").val() === "O001" ){
            $("#order_tBody").append(record);
        }else if(item.oCode === $("#code3").val()) {
            $("#order_tBody").append(record);
        }

    });
};

const loadOrderData = ()=>{

    $("#orderD_tBody").empty();

    order_db.map((item, index) =>{
        let record = "<tr>\n" +
            "<td class='oCode1' scope=\"row\">" + item.oCode + "</td>" +
            "<td class='date1'>" + item.date + "</td>" +
            "<td class='cusID1'>" + item.cusId + "</td>" +
            "<td class='cusName1'>" + item.cusName + "</td>" +
            "<td class='tot1'>" + item.tot + "</td>" +
            "<td class='dis1'>" + item.discount + "</td>" +
            "<td class='subTot1'>" + item.subTot + "</td>" +
            "<td class='cash1'>" + item.cash + "</td>" +
            "<td class='balance1'>" + item.balance + "</td>" +
            "</tr>"

            $("#orderD_tBody").append(record);

    });
};

const currentDate = new Date().toISOString().split('T')[0];

// Set the value of the date input to the current date
document.getElementById("date").value = currentDate;

//////////////////////Add to cart////////////////////////

$("#orderBtnCart>button[type='button']").eq(0).on('click', ()=>{

    console.log("Add to cart clicked");

    // $("#disc").val("");
    // $("#cash").val("");
    // $("#balance").val("");

    let oCode = $("#code3").val();
    let iCode = $("#iCode").val();
    let item = $("#item3").val();
    let price = parseFloat($("#price3").val());
    let qty = parseInt($("#qty3").val());
    let tot = price*qty;

    console.log(`Order code : ${oCode}\n Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);

    // let qtyOnH = $("#qty2").val();
    // console.log("QtyOnH"+qtyOnH);

    let indexO = order_item_db.findIndex(item => item.oCode === oCode);

    let index = order_item_db.findIndex(item => item.iCode === iCode);

    let index1 = item_db.findIndex(item => item.code === iCode);

    let qty_on_hand = item_db[index1].qty;

    console.log("Qty On Hand : "+qty_on_hand);
    console.log("Qty : "+qty);

    if(qty && qty > 0) {
        console.log("Qty not 0, add to cart");

        if(qty_on_hand>=qty){
            console.log("Stock available, add to cart");

            if (index === -1 && indexO === -1){
                console.log("Not yet in db, add as a new item");

                let order_item_obj = new OrderItemModel(iCode, item, price, qty, tot, oCode);

                // save in the db
                order_item_db.push(order_item_obj);

                console.log(`Order code : ${oCode}\n Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);


                Toast.fire({
                    icon: 'success',
                    title: 'Added to cart'
                })

                console.log("Order item db oCode" + order_item_db[0].oCode);

                $("#btnResetAdd").click();

                loadOItemData();

                // let tot_val = 0;
                //
                // for (let i=1; i < order_item_db.length; i++){
                //     tot_val += order_item_db[i].tot;
                //
                //     $("#tot").val(tot_val);
                // }

                // let tot_val_db = order_item_db[index].tot;
                // console.log("tot_val_db : "+tot_val_db);
                //
                // $("#tot").val(tot_val_db);

                // let calTot;
                //
                // for (let i=0; i < order_item_db.length; i++){
                //     calTot = order_item_db[i] + order_item_db[i+1].tot;
                // }

                // $("#tot").val(order_item_db[0].tot);

                // $("#tot").val(calTot);

                const totArray = order_item_db.map(item => item.tot); // Extract the 'tot' values into a separate array
                const sumTot = totArray.reduce((sum, tot) => sum + tot, 0);

                console.log(sumTot);

                $("#tot").val(sumTot);

                $("#subTot").val(sumTot);

                // $("#balance").val(0);

            }else if(index !== -1){
                console.log("Already in the db, add as an update");

                let indexOld = order_item_db.findIndex(item => item.iCode === iCode);
                let qtyOld = order_item_db[indexOld].qty;

                let qtyNew = qty + qtyOld;

                if(qtyNew <= qty_on_hand){
                    order_item_db[indexOld].qty = qtyNew;

                    let new_tot = qtyNew*price;
                    order_item_db[indexOld].tot = new_tot;

                    let order_item_obj = new OrderItemModel(iCode, item, price, qtyNew, new_tot, oCode);

                    //find item index
                    let index = order_item_db.findIndex(item => item.iCode === iCode);

                    //update item in the db
                    order_item_db[index] = order_item_obj;

                    console.log(`Order code : ${oCode}\n Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);


                    Toast.fire({
                        icon: 'success',
                        title: 'Added to cart'
                    })

                    loadOItemData();

                    const totArray = order_item_db.map(item => item.tot);
                    const sumTot = totArray.reduce((sum, tot) => sum + tot, 0);

                    console.log(sumTot);

                    $("#tot").val(sumTot);

                    $("#subTot").val(sumTot);

                }else {
                    Toast.fire({
                        icon: 'error',
                        // title: `Please enter a qty less than ${qty_on_hand}`
                        title: 'Out of stock'
                    })
                }

            }else if(indexO !== -1){

            }
        }else {
            console.log("Out of stock");

            Toast.fire({
                icon: 'error',
                // title: `Please enter a qty less than ${qty_on_hand}`
                title: 'Out of stock'
            })

        }
    }else {
        console.log("Qty 0, don't add to cart");

        Toast.fire({
            icon: 'error',
            title: `Invalid qty`
        })

    }

    ////////////////////////////////////////////////////////////

    // if(qty_on_hand>=qty && qty != 0) {
    //
    //     if (index === -1) {
    //
    //         console.log("Qty is correct");
    //
    //         // if(qty<qtyOnH && qty>=1){
    //
    //         // let item_code = $("#iCode").val();
    //         // const isExist = order_item_db.includes(iCode);
    //
    //         // if(!isExist) {
    //
    //         // console.log("Not Exists");
    //
    //         let order_item_obj = new OrderItemModel(iCode, item, price, qty, tot, oCode);
    //
    //         // save in the db
    //         order_item_db.push(order_item_obj);
    //
    //         console.log(`Order code : ${oCode}\n Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);
    //
    //         $("#tot").val(tot);
    //
    //         $("#subTot").val(tot);
    //
    //         // $("#balance").val(0);
    //
    //         Toast.fire({
    //             icon: 'success',
    //             title: 'Added to cart'
    //         })
    //
    //         console.log("Order item db oCode" + order_item_db[0].oCode);
    //
    //         $("#btnResetAdd").click();
    //
    //         loadOItemData();
    //
    //         // generateOrderCode();
    //
    //         //clear
    //         // $("button[type='reset']").click();
    //         // $("#orderBtnCart>button[type='reset']").eq(0).click();
    //         // }else{
    //         //     Toast.fire({
    //         //         icon: 'error',
    //         //         title: 'Enter the qty'
    //         //     })
    //         // }
    //
    //         // $("#order_tBody").append("<tr>\n" +
    //         //     "<td class='icode1' scope=\"row\">" + iCode + "</td>" +
    //         //     "<td class='item1'>" + item + "</td>" +
    //         //     "<td class='price1'>" + price + "</td>" +
    //         //     "<td class='qty1'>" + qty + "</td>" +
    //         //     "<td class='tot1'>" + tot + "</td>" +
    //         //     "</tr>"
    //         // );
    //
    //         //clear
    //         // $("button[type='reset']").click();
    //         // $("#orderBtnCart>button[type='reset']").eq(0).click();
    //         // $("#btnReset").click();
    //
    //     }else {
    //         console.log("Item is already in the order_item_db");
    //
    //         let indexOld = order_item_db.findIndex(item => item.iCode === iCode);
    //         let qtyOld = order_item_db[indexOld].qty;
    //         let qtyNew = qty + qtyOld;
    //         order_item_db[indexOld].qty = qtyNew;
    //
    //         loadOItemData();
    //
    //     }
    //
    // }else {
    //     // let qty = $("#qty3").val();
    //     //
    //     // let index = order_item_db.findIndex(item => item.iCode === iCode);
    //     //
    //     // let qtyOld = order_item_db[index].qty;
    //
    //     console.log("Please enter a qty less than "+qty_on_hand);
    //
    //     Toast.fire({
    //         icon: 'error',
    //         title: `Please enter a qty less than ${qty_on_hand}`
    //     })
    //
    // }

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

    $("#cash").on("input", function() {

        // let balanceS = $("#balance").val();
        // console.log("Ba" + disc);

        let cashS = $("#cash").val();
        let subS = $("#subTot").val();

        let balanceS = cashS-subS;

        $("#balance").val(balanceS);

    });



$("#orderBtnPur>button[type='button']").eq(0).on('click', ()=>{
    console.log("Purchase clicked");

    // let cash = $("#cash").val();
    // let subTot = $("#subTot").val();

    // $("#balance").val(cash-subTot);

    //save order details in the order_db

    let oCode = $("#code3").val();
    let date = $("#date").val();
    let cusId = $("#cusId3").val();
    let cusName = $("#cusName3").val();
    let tota = parseFloat($("#tot").val());
    let subTota = $("#subTot").val();
    let discounta = $("#disc").val();
    let casha = $("#cash").val();
    let balancea = $("#balance").val();

    // if(qty<qtyOnH && qty>=1){

    let index = order_db.findIndex(item => item.oCode === oCode);

    if(oCode && index === -1) {

        if (cusId && cusName) {

            // if(!$("#order_tBody").children().length === 0){

            if(tota>0 && subTota>0){

            if(casha) {

                if(balancea>=0) {

                    let order_obj = new OrderModel(oCode, date, cusId, cusName, tota, subTota, discounta, casha, balancea);

                    // let order_item_obj = new OrderItemModel(oCode, iCode,);

                    // save in the db
                    order_db.push(order_obj);
                    // order_item_db.push(order_item_obj);

                    console.log(`Order code : ${oCode}\n Date : ${date}\n CustomerId: ${cusId}\n CustomerName: ${cusName} Tot: ${tot}\n SubTot: ${subTota} Discount: ${discounta} Cash: ${casha} Balance: ${balancea}`);

                    Toast.fire({
                        icon: 'success',
                        title: 'Order is done'
                    })

                    console.log("Order db oCode" + order_db[0].oCode);

                    // loadOItemData();
                    //
                    // updateItemData();
                    //
                    // $("#order_tBody").empty();
                    //
                    // generateOrderCode();
                    //
                    // // $("#code3").val("");
                    // // $("#date").val("");
                    // $("#cusId3").val("");
                    // $("#cusName3").val("");
                    // // $("#iCode").val("");
                    // // $("#item3").val("");
                    // // $("#").val("");
                    //
                    // //clear
                    // $("#btnResetAdd").click();
                    // $("#btnReset").click();

                    loadOItemData();

                    loadOrderData();

                    generateOrderCode();
                    $("#cusId3").val("");
                    $("#cusName3").val("");

                    $("#order_tBody").empty();
                    //clear
                    $("button[type='reset']").click();
                    $("#oderBtnPur>button[type='reset']").click();

                    // $("#orderBtnCart>button[type='reset']").eq(0).click();
                    // }else{
                    //     Toast.fire({
                    //         icon: 'error',
                    //         title: 'Enter the qty'
                    //     })
                    // }

                    // for (let i=0; i<order_item_db.length; i++){
                    //     order_item_db[i].iCodeode = "";
                    //     order_item_db[i].item = "";
                    //     order_item_db[i].price = 0;
                    //     order_item_db[i].qty = 0;
                    //     order_item_db[i].tot = 0;
                    //     order_item_db[i].oCode = "";
                    // }

                    // order_item_db = [];

                }else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Insufficient cash'
                    })
                }

            }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Enter the cash'
                })
            }

            }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Add items to the cart'
                })
            }

            // }else {
            //     Toast.fire({
            //         icon: 'error',
            //         title: 'Add items to cart'
            //     })
            // }

        }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Select Customer Id'
                })
        }
    }

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


const updateItemData = ()=>{
    console.log("update---");

    for (let i=0; i<order_item_db.length; i++) {
        let iCode = order_item_db[i].iCode;
        let item = order_item_db[i].item;
        let price = order_item_db[i].price;
        let qty = order_item_db[i].qty;
        let l_index = item_db.findIndex(item => item.iCode === iCode);
        let old_qty = item_db[l_index].qty;
        console.log("11-04--ind"+l_index);
        console.log("11-04--old");
        let updated_qty = old_qty-qty;

        let item_obj = new ItemModel(iCode, item, price, updated_qty);

        //update item in the db
        item_db[l_index] = item_obj;

    }
    console.log("update---end");
};

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

function generateOrderCode() {
    let length = order_db.length;

    let lastOrderCode = order_db[length-1].oCode;

    if (lastOrderCode === "") {
        $("#code3").val("O001");
    } else {
        const number = parseInt(lastOrderCode.substr(1)) + 1;
        let newCode = "O" + number.toString().padStart(3, "0");
        $("#code3").val(newCode);
    }

    // $("#cusId1").val(lastCustomerId);
    // $("#cusId1").val(lastCustomerId);
    // console.log("generate");
}

////////////////////////Search///////////////////////////

$('#order_search').on('input', () => {

    console.log("Input reading");

    let search_term = $('#order_search').val();

    if(search_term){
        let results = order_db.filter((item) =>

            item.cusName.toLowerCase().startsWith(search_term.toLowerCase()) || item.oCode.toLowerCase().startsWith(search_term) || item.date.startsWith(search_term) || item.cusId.toLowerCase().startsWith(search_term)

        );

        console.log(results);

        $('#orderD_tBody').empty();
        results.map((item, index) => {
            let tbl_row = `<tr><td class="oCode1">${item.oCode}</td><td class="date1">${item.date}</td><td class="cusID1">${item.cusId}</td><td class="cusName1">${item.cusName}</td><td class="tot1">${item.tot}</td><td class="disc1">${item.discount}</td><td class="subTot1">${item.subTot}</td><td class="cash1">${item.cash}</td><td class="bal1">${item.balance}</td></tr>`;
            $('#orderD_tBody').append(tbl_row);
        });
    }else {
        loadOrderData();
    }

});

$("#disc").on('keypress' , ()=> {
    $("#cash").focus();
});