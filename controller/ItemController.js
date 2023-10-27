import {ItemModel} from "/model/ItemModel.js";
import {customer_db, item_db} from "../db/db.js";

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

const loadItemData = ()=>{

    $("#item_tBody").empty();

    item_db.map((item, index) =>{
        let record = "<tr>\n" +
            "<td class='code1' scope=\"row\">" + item.code + "</td>" +
            "<td class='item1'>" + item.item + "</td>" +
            "<td class='price1'>" + item.price + "</td>" +
            "<td class='qty1'>" + item.qty + "</td>" +
            "</tr>";

        $("#item_tBody").append(record);

    });
};


$("#code2").val("I001");

//reset button
$("#itemBtn").eq(0).on('click', ()=>{
    $("#item2").val("");
    $("#price2").val("");
    $("#qty2").val("");
    generateItemCode();
});

////////////////////save//////////////////////////

$("#itemBtn>button[type='button']").eq(3).on('click', ()=>{
    console.log("Save clicked");

    let code = $("#code2").val();
    let item = $("#item2").val();
    let price = $("#price2").val();
    let qty = $("#qty2").val();

    console.log(`Code : ${code}\n Item: ${item}\n Price: ${price} Qty: ${qty}\n`);

    // $("#item_tBody").append("<tr>\n" +
    //     "<td class='code1' scope=\"row\">" + code + "</td>" +
    //     "<td class='item1'>" + item + "</td>" +
    //     "<td class='price1'>" + price + "</td>" +
    //     "<td class='qty1'>" + qty + "</td>" +
    //     "</tr>"
    // );

    //clear
    // $("#itemBtn>button[type='reset']").click();


    if(code) {
        if (item) {
            if (price) {
                if (qty) {
                    let item_obj = new ItemModel(code, item, price, qty);

                    // save in the db
                    item_db.push(item_obj);

                    console.log(`Code : ${code}\n Item: ${item}\n Price: ${price} Qty: ${qty}\n`);

                    // $("#item_tBody").append("<tr>\n" +
                    //     "<td class='code1' scope=\"row\">" + code + "</td>" +
                    //     "<td class='item1'>" + item + "</td>" +
                    //     "<td class='price1'>" + price + "</td>" +
                    //     "<td class='qty1'>" + qty + "</td>" +
                    //     "</tr>"
                    // );

                    Toast.fire({
                        icon: 'success',
                        title: 'Saved'
                    })

                    // toastr.success('Saved')

                    //clear
                    $("button[type='reset']").click();

                    // load customer data
                    loadItemData();

                    generateItemCode();

                    console.log(item_db);
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Qty is required'
                    })
                }
            }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Price is required'
                })
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Item name is required'
            })
        }
    }else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid Item Code'
        })
    }

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

$("#itemBtn>button[type='button']").eq(2).on("click", ()=> {
    console.log("Update clicked");

    let code = $("#code2").val();
    let item = $("#item2").val();
    let price = $("#price2").val();
    let qty = $("#qty2").val();

    // let record = `<td class= "code1">${code}</td><td class="item1">${item}</td><td class="price1">${price}</td><td className="qty1">${qty}</td>`;
    //
    // $("#item_tBody>tr").eq(row_index).html(record);
    //
    //
    // //clear
    // $("#itemBtn>button[type='reset']").click();


    if(code) {
        if (item) {
            if (price) {
                if (qty) {
                    let item_obj = new ItemModel(code, item, price, qty);

                    //find item index
                    let index = item_db.findIndex(item => item.code === code);

                    //update item in the db
                    item_db[index] = item_obj;

                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully Updated'
                    })

                    // load item data
                    loadItemData();

                    generateItemCode();

                    //clear
                    $("button[type='reset']").click();

                    console.log(item_db);
                }else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Qty is required'
                    })
                }
            }else {
                Toast.fire({
                    icon: 'error',
                    title: 'Price is required'
                })
            }
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Item name is required'
            })
        }
    }else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid Item Code'
        })
    }

});

//delete
$("#itemBtn>button[type='button']").eq(1).on("click", ()=> {
    // console.log("Delete clicked");
    // $("#item_tBody>tr").eq(row_index).remove();

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

            let code = $("#code2").val();

            //find item index
            let index = item_db.findIndex(item => item.code === code);

            //delete item in the db
            item_db.splice(index,1);

            // load item data
            loadItemData();

            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )

            //clear
            $("#itemBtn>button[type='reset']").click();

            generateItemCode();
        }
    })

});



function generateItemCode() {
    // const lastCustomerId = customerIdInput.value;

    // const lastCustomerId = customer_db[length-1].cus_id;

    let length = item_db.length;

    let lastItemCode = item_db[length-1].code;

    if (lastItemCode === "") {
        $("#code2").val("I001");
    } else {
        const number = parseInt(lastItemCode.substr(1)) + 1;
        let newCode = "I" + number.toString().padStart(3, "0");
        $("#code2").val(newCode);
    }

    // $("#cusId1").val(lastCustomerId);
    // $("#cusId1").val(lastCustomerId);
    // console.log("generate");
}

$("#item2").on('keypress' , ()=> {
    // if (e.key === "Enter" || e.keyCode === 13) {
    $("#price2").focus();
    // }

});

$("#price2").on('keypress' , ()=> {
    $("#qty2").focus();
});


const addItemOption = ()=>{
    const selectElement = document.getElementById("cusId3");
    const newOption = document.createElement("option");
    newOption.value = selectElement.options.length + 1;
    newOption.text = "Option " + newOption.value;
    selectElement.appendChild(newOption);
}

// const deleteCusOption = (index) => {
//     const selectElement = document.getElementById("cusId3");
//
//     const indexToRemove = index;
//
//     // Specify the index of the option you want to remove
//     // const indexToRemove = 1; // Replace with the index of the option to remove
//
//     // Check if the index is valid
//     if (indexToRemove >= 0 && indexToRemove < selectElement.options.length) {
//         selectElement.options[indexToRemove].remove();
//     }
// }