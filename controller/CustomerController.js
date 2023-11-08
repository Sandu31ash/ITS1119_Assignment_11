import {CustomerModel} from "/model/CustomerModel.js";
import {customer_db} from "../db/db.js";

// var customer_db = [];
const sriLankanMobileNumberRegex = /^(\+94|0)[1-9][0-9]{8}$/;
const regMobile = new RegExp(sriLankanMobileNumberRegex);

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

$("#cusId1").val("C001");

//reset button
$("#cusBtn").eq(0).on('click', ()=>{
    $("#name1").val("");
    $("#contact").val("");
    $("#address").val("");
    generateCustomerId();
});

//////////////////////save//////////////////////////

$("#cusBtn>button[type='button']").eq(3).on('click', ()=>{
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


    let index = customer_db.findIndex(item => item.cus_id === cus_id);
    // const isExist = customer_db.includes(cus_id);
    console.log("Index" +index);

    // if(index){
    //     console.log(" Index Exists");
    // }else {
    //     console.log("Index Not Exists");
    // }

    if(cus_id && index === -1) {
        console.log(" Not Exists");

        if (name) {

            var contactValid = regMobile.test(contact);

            if (contact && contactValid) {
                if (address) {
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

                     Toast.fire({
                        icon: 'success',
                        title: 'Saved'
                    })

                    // toastr.success('Saved')

                    //clear
                    $("button[type='reset']").click();

                    // load customer data
                    loadCustomerData();

                    generateCustomerId();

                    addCusOption();

                    console.log(customer_db);
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Address is required'
                    })
                }
            }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid contact'
                })
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Name is required'
            })
        }
    }else {
        Toast.fire({
            icon: 'error',
            title: 'ID already exists'
        })
    }

});

///////////////////////////select row//////////////////////////////////

var row_index;

const clear = () =>{
    $("#cusId1").val("");
    $("#name1").val("");
    $("#contact").val("");
    $("#address").val("");
}

$("#cus_tBody").on("click" , "tr", function () {
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

$("#cusBtn>button[type='button']").eq(2).on("click", ()=> {
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

    if(cus_id) {
        if (name) {

            var contactValid = regMobile.test(contact);

            if (contact && contactValid) {
                if (address) {

                    let customer_obj = new CustomerModel(cus_id, name, contact, address);

                    //find item index
                    let index = customer_db.findIndex(item => item.cus_id === cus_id);

                    //update item in the db
                    customer_db[index] = customer_obj;

                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully Updated'
                    })

                    // load customer data
                    loadCustomerData();

                    generateCustomerId();

                    //clear
                    $("#cusBtn>button[type='reset']").click();
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Address is required'
                    })
                }
            }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid contact'
                })
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Name is required'
            })
        }
    }else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid ID'
        })
    }
});

//delete
$("#cusBtn>button[type='button']").eq(1).on("click", ()=> {
    console.log("Delete clicked");
    // $("#cus_tBody>tr").eq(row_index).remove();
    let cus_id = $("#cusId1").val();

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            //find item index
            let index = customer_db.findIndex(item => item.cus_id === cus_id);

            // const index = customer_db.indexOf(cus_id);

            //delete item in the db
            customer_db.splice(index,1);

            // load customer data
            loadCustomerData();

            deleteCusOption(index);

            console.log(customer_db);

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            //clear
            $("#cusBtn>button[type='reset']").click();

            generateCustomerId();

        }
    })

});

////////////////////////Search///////////////////////////

$('#cus_search').on('input', () => {

    console.log("Input reading");

    let search_term = $('#cus_search').val();

    if(search_term){
        let results = customer_db.filter((item) =>

            item.name.toLowerCase().startsWith(search_term.toLowerCase()) || item.contact.startsWith(search_term)

    );

        console.log(results);

        $('#cus_tBody').empty();
        results.map((item, index) => {
            let tbl_row = `<tr><td class="cus_id1">${item.cus_id}</td><td class="name1">${item.name}</td><td class="contact1">${item.contact}</td><td class="address1">${item.address}</td></tr>`;
            $('#cus_tBody').append(tbl_row);
        });
    }else {
        loadCustomerData();
    }

});


// document.addEventListener("DOMContentLoaded", function() {
    // const customerIdInput = document.getElementById("cusId1");

    // $("#cusId1").val("C000");

    // const customerIdInput = $("#cusId1").val();

    // Function to generate the customer ID


    // Automatically generate the customer ID when the page loads
    // generateCustomerId();
// });

// document.addEventListener("DOMContentLoaded", function() {
//     // $("#cusId1").val("C000");
//     generateCustomerId();
// });

function generateCustomerId() {
    // const lastCustomerId = customerIdInput.value;

    // const lastCustomerId = customer_db[length-1].cus_id;

    let length = customer_db.length;

    let lastCustomerId = customer_db[length-1].cus_id;

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

$("#name1").on('keypress' , ()=> {
    // if (e.key === "Enter" || e.keyCode === 13) {
        $("#contact").focus();
    // }

});

$("#contact").on('keypress' , ()=> {
    $("#address").focus();
});

const addCusOption = ()=>{
    const selectElement = document.getElementById("cusId3");
    const newOption = document.createElement("option");
    newOption.value = selectElement.options.length + 1;
    newOption.text = "Option " + newOption.value;
    selectElement.appendChild(newOption);
}

const deleteCusOption = (index) => {
    const selectElement = document.getElementById("cusId3");

    const indexToRemove = index;

    // Check if the index is valid
    if (indexToRemove >= 0 && indexToRemove < selectElement.options.length) {
        selectElement.options[indexToRemove].remove();
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});