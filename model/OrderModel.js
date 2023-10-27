export class OrderModel{
    constructor(iCode, item, price, qty, tot){
        this.iCode = iCode;
        this.item = item;
        this.price = price;
        this.qty = qty;
        this.tot = tot;
    }
}

//
//
// import {OrderModel} from "/model/OrderModel.js";
// import {order_db, item_db, customer_db} from "../db/db.js";
// import {CustomerModel} from "../model/CustomerModel";
//
// //////////////////////Add to cart////////////////////////
//
// $("#orderBtnCart>button[type='button']").eq(0).on('click', ()=>{
//
//     console.log("Add to cart clicked");
//
//     let iCode = $("#iCode").val();
//     let item = $("#item3").val();
//     let price = $("#price3").val();
//     let qty = $("#qty3").val();
//     let tot = ($("#price3").val())*($("#qty3").val());
//
//     if (price) {
//         let order_obj = new OrderModel(iCode, item, price, qty, tot);
//
//         // save in the db
//         order_db.push(order_obj);
//
//         console.log(`Item code : ${iCode}\n item: ${item}\n Unit price: ${price} Qty: ${qty}\n Unit price: ${price} Tot: ${tot}`);
//
//         $("#tot").val(tot);
//
//         Toast.fire({
//             icon: 'success',
//             title: 'Added to cart'
//         })
//
//
//         //clear
//         $("button[type='reset']").click();
//         // $("#orderBtnCart>button[type='reset']").eq(0).click();
//
//     }
//
//
//     // $("#order_tBody").append("<tr>\n" +
//     //     "<td class='icode1' scope=\"row\">" + iCode + "</td>" +
//     //     "<td class='item1'>" + item + "</td>" +
//     //     "<td class='price1'>" + price + "</td>" +
//     //     "<td class='qty1'>" + qty + "</td>" +
//     //     "<td class='tot1'>" + tot + "</td>" +
//     //     "</tr>"
//     // );
//
// });
//
//
// ////////////////////Purchase/////////////////
//
// $("#orderBtnPur>button[type='button']").eq(0).on('click', ()=>{
//     console.log("Purchase clicked");
//
//     let cash = $("#cash").val();
//     let tot = $("#tot").val();
//
//     $("#balance").val(cash-tot);
//
// });
// //
// // const loadCusIds =()=>{
// //     var ar = [];
// //
// //     for (let i = 0; i < customer_db.length; i++) {
// //         ar.push(customer_db[i].cus_id);
// //     }
// //
// //     console.log(ar);
// //     // console.log("Order Manage");
// //
// //     for (let i = 0; i < ar.length; i++) {
// //         $("#cusId3 option").eq(i + 1).text(ar[i]);
// //         $("#cusId3 option").eq(i + 1).val(ar[i]);
// //         // $("#cusName3").val(ar[]);
// //     }
// // }
//
//
// $("#cusId3").on('click', ()=>{
//
//     // let selected = $("#cusId3 option").selected().val();
//
//     // console.log("Selected Value"+selected);
//
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
//
//
//     // Get the select element
//     var selectElement = document.getElementById("cusId3");
//
//     // Get the selected value
//     var selectedValue = selectElement.value;
//
//     // Log the selected value to the console
//     console.log("Selected Value: " + selectedValue);
//
//     // $("#cusName3").val(ar[]);
//
//     for (let i=0; i<ar.length; i++){
//         if(selectedValue === customer_db[i].cus_id){
//             $("#cusName3").val(customer_db[i].name);
//         }
//     }
//
//     // loadCusIds();
//
// });
//
// // $("#cusName3").val();
//
//
//
// $("#iCode").on('click', ()=>{
//
//     // let selected = $("#cusId3 option").selected().val();
//
//     // console.log("Selected Value"+selected);
//
//     var ar = [];
//
//     for (let i = 0; i < item_db.length; i++) {
//         ar.push(item_db[i].code);
//     }
//
//     console.log(ar);
//     // console.log("Order Manage");
//
//     for (let i = 0; i < ar.length; i++) {
//         $("#iCode option").eq(i + 1).text(ar[i]);
//         $("#iCode option").eq(i + 1).val(ar[i]);
//         // $("#cusName3").val(ar[]);
//     }
//
//
//     // Get the select element
//     var selectElement = document.getElementById("iCode");
//
//     // Get the selected value
//     var selectedValue = selectElement.value;
//
//     // Log the selected value to the console
//     console.log("Selected Value: " + selectedValue);
//
//     // $("#cusName3").val(ar[]);
//
//     for (let i=0; i<ar.length; i++){
//         if(selectedValue === item_db[i].code){
//             $("#item3").val(item_db[i].item);
//             $("#price3").val(item_db[i].price);
//             // $("#qty3").val(item_db[i].qty);
//         }
//     }
//
//     // loadCusIds();
//
// });