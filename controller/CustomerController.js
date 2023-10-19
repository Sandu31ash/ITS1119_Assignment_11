import {CustomerModel} from "/model/CustomerModel.js";
import {customer_db} from "../db/db.js";

// var customer_db = [];

const loadCustomerData = ()=>{

    $("#cus_tBody").empty();

    customer_db.map((item, index) =>{
        let record = "<tr>\n" +
            "<td class='cus_id1' scope=\"row\">" + item.cus_id + "</td>" +
            "<td class='name1'>" + item.name + "</td>" +
            "<td class='contact1'>" + item.contact + "</td>" +
            "<td class='address1'>" + item.address + "</td>" +
            "</tr>";

        $("#cus_tBody").append(record);

    });
};

//////////////////////save//////////////////////////

$("#cusBtn>button[type='button']").eq(2).on('click', ()=>{
    // $("#btnSave").on('click', ()=>{
    console.log("Save clicked");

    // collect data from the array
    let cus_id = $("#cusId1").val();
    let name = $("#name1").val();
    let contact = $("#contact").val();
    let address = $("#address").val();

    // // prepare the obj
    // let customer_obj = {
    //     cus_id : cus_id,
    //     name : name,
    //     contact : contact,
    //     address : address
    // };

    let customer_obj = new CustomerModel(cus_id, name, contact, address);

    // save in the db
    customer_db.push(customer_obj);

    console.log(`CusID : ${cus_id}\n Name: ${name}\n Contact: ${contact} Address: ${address}\n`);

    // let record = "<tr>\n" +
    //     "<td class='cus_id1' scope=\"row\">" + cus_id + "</td>" +
    //     "<td class='name1'>" + name + "</td>" +
    //     "<td class='contact1'>" + contact + "</td>" +
    //     "<td class='address1'>" + address + "</td>" +
    //     "</tr>";
    //
    // $("#stu_tBody").append(record);

    //clear
    $("button[type='reset']").click();

    // load customer data
    loadCustomerData();

    console.log(customer_db);

});

///////////////////////////select row//////////////////////////////////

var row_index;

const clear = () =>{
    $("#cusId1").val("");
    $("#name1").val("");
    $("#contact").val("");
    $("#address").val("");
}

$("#cus_tBody").on("click" , "tr", function () {        //event dedication --> catches the runtime tr

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

    // let record = `<td class= "cus_id1">${cus_id}</td><td class="name1">${name}</td><td class="contact1">${contact}</td><td className="address1">${address}</td>`;
    //
    // $("#cus_tBody>tr").eq(row_index).html(record);

    // // prepare the obj
    // let customer_obj = {
    //     cus_id : cus_id,
    //     name : name,
    //     contact : contact,
    //     address : address
    // };

    let customer_obj = new CustomerModel(cus_id, name, contact, address);

    //find item index
    let index = customer_db.findIndex(item => item.cus_id === cus_id);

    //update item in the db
    customer_db[index] = customer_obj;

    // load customer data
    loadCustomerData();

    //clear
    $("#cusBtn>button[type='reset']").click();

});

//delete
$("#cusBtn>button[type='button']").eq(0).on("click", ()=> {
    console.log("Delete clicked");
    // $("#cus_tBody>tr").eq(row_index).remove();

    let cus_id = $("#cusId1").val();

    //find item index
    let index = customer_db.findIndex(item => item.cus_id === cus_id);

    //delete item in the db
    customer_db.splice(index,1);

    // load customer data
    loadCustomerData();

    //clear
    $("#cusBtn>button[type='reset']").click();
});
