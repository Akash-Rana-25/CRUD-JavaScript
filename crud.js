window.onload = display();
function display() {
    let card = "";
    const product = JSON.parse(localStorage.getItem("Product_Details"));
    product.forEach(newproducts => {
        card += ` <div class="col shadow-sm p-3 mb-5 bg-body rounded">
        <img src="${newproducts.img}"style="height: 10rem;  width: 12rem;" class="card-img-top" alt="${newproducts.name}"></img> 
            <div class="card-body">
                <h5 class="card-title">Name : ${newproducts.name}</h5>
                <p class="card-text">Price : ${newproducts.price}</p>
                <p class="card-text"><small class="text-muted"></small>Description ${newproducts.description}</p>
                <button type="button" id="update_btn" onclick="editProduct('${newproducts.id}')" class="btn btn-outline-success" data-bs-toggle="modal"
                    data-bs-target="#editModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </button>
                <button type="submit" id="delete_btn"onclick="removeProduct('${newproducts.id}')"class="btn btn-outline-danger"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></button>
            </div>
        </div>`;


    });
    document.getElementById("p1").innerHTML = card;
}

function addData() {

    const product_id = document.getElementById("product_id").value;
    const product_name = document.getElementById("product_name").value;
    const product_price = document.getElementById("product_price").value;
    const product_description = document.getElementById("product_description").value;
    const product_img = document.getElementById("product_img").files[0];


    var fileInput =
        document.getElementById('product_img');

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;
    if (product_id === '' || product_img === '' || product_name === '' || product_price === '' || product_description === '') {
        swal({
            title: 'Please fill all the filed !!',
            text: 'Redirecting...',
            icon: 'error',
            timer: 2000,
            buttons: false,
        })
            .then(() => {
                dispatch(redirect('/'));
            })
    } else {



        if (!allowedExtensions.exec(filePath)) {
            swal({
                title: 'Please Select .jpg ,.jpeg,.png,.gif Only !!',
                text: 'Redirecting...',
                icon: 'error',
                timer: 2000,
                buttons: false,
            })
                .then(() => {
                    dispatch(redirect('/'));
                })
            fileInput.value = '';
            return false;
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(product_img);
            reader.addEventListener("load", () => {
                var url = reader.result;
                const newproduct = {
                    id: product_id,
                    name: product_name,
                    price: product_price,
                    description: product_description,
                    img: url

                }

                var items = JSON.parse(localStorage.getItem("Product_Details"));
                if (items === '') {
                    const products = JSON.parse(localStorage.getItem("Product_Details")) ?? [];
                    products.push(newproduct);
                    localStorage.setItem("Product_Details", JSON.stringify(products));
                    var myModalEl = document.getElementById('addModal');
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();
                    swal({
                        title: 'Product Added',
                        text: 'Redirecting...',
                        icon: 'success',
                        timer: 3000,
                        buttons: false,
                    })
                        .then(() => {
                            dispatch(redirect('/'));
                        })

                    display();
                } else {

                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id == product_id) {
                            console.log(items[i].id);
                            console.log(product_id);

                            swal({
                                title: 'ID alredy eixst',
                                text: 'Redirecting...',
                                icon: 'error',
                                timer: 3000,
                                buttons: false,
                            }).then(() => {
                                dispatch(redirect('/'));
                            })
                            return;
                        }
                    }

                    const products = JSON.parse(localStorage.getItem("Product_Details")) ?? [];
                    products.push(newproduct);
                    localStorage.setItem("Product_Details", JSON.stringify(products));
                    var myModalEl = document.getElementById('addModal');
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();
                    swal({
                        title: 'Product Added',
                        text: 'Redirecting...',
                        icon: 'success',
                        timer: 3000,
                        buttons: false,
                    })
                    var frm = document.getElementsByName('myform')[0];
                    frm.reset();  // Reset all form data
                    display();
                    return false; // Prevent page refresh
                }

            });
        }

        display();
    }
}

var inputBox = document.getElementById("product_price");

var invalidChars = [
    "-",
    "+",
    "e",
];

inputBox.addEventListener("input", function () {
    this.value = this.value.replace(/[e\+\-]/gi, "");
});

inputBox.addEventListener("keydown", function (e) {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
});
function editProduct(id) {

    let index = '';
    var items = JSON.parse(localStorage["Product_Details"]);
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            index = i;
            break;
        }
    }
    document.getElementById("update_product_id").value = items[index].id;
    const update_product_name = document.getElementById("update_product_name").value = items[index].name;
    const update_product_price = document.getElementById("update_product_price").value = items[index].price;
    const update_product_description = document.getElementById("update_product_description").value = items[index].description;
    const update_img = document.getElementById("update_product_img");
    document.querySelector("#submit_btn2").onclick = function () {

        // update_product_name === '' || update_product_price === '' || update_product_description === ''
        if (update_img.value != "") {


            var fileInput =
                document.getElementById('update_product_img');

            var filePath = fileInput.value;

            // Allowing file type
            var allowedExtensions =
                /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;

            if (!allowedExtensions.exec(filePath)) {
                swal({
                    title: 'Please Select .jpg ,.jpeg,.png,.gif Only !!',
                    text: 'Redirecting...',
                    icon: 'error',
                    timer: 2000,
                    buttons: false,
                })
                    .then(() => {
                        dispatch(redirect('/'));
                    })
                fileInput.value = '';
                return false;
            } else {

                const update_product_img = document.getElementById("update_product_img").files[0];

                let reader = new FileReader();
                reader.readAsDataURL(update_product_img);
                reader.addEventListener("load", () => {
                    var url = reader.result;
                    items[index].id = document.getElementById("update_product_id").value;
                    items[index].name = document.getElementById("update_product_name").value;
                    items[index].price = document.getElementById("update_product_price").value;
                    items[index].description = document.getElementById("update_product_description").value;
                    items[index].img = url;

                    if (items[index].id === '' || items[index].name === '' || items[index].price === '' || items[index].description === '') {
                        swal({
                            title: 'Please fill all the filed 1 !!',
                            text: 'Redirecting...',
                            icon: 'error',
                            timer: 2000,
                            buttons: false,
                        })
                            .then(() => {
                                dispatch(redirect('/'));
                            })

                    } else {
                        localStorage.setItem("Product_Details", JSON.stringify(items));
                    }
                       
                    
                    display();
                    var myModalEl = document.getElementById('editModal');
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();
                });

                swal({
                    title: 'Product Updated',
                    text: 'Redirecting...',
                    icon: 'success',
                    timer: 3000,
                    buttons: false,
                })
            }
        }

        else if (update_img.value === "") {
         
                items[index].id = document.getElementById("update_product_id").value;
                items[index].name = document.getElementById("update_product_name").value;
                items[index].price = document.getElementById("update_product_price").value;
                items[index].description = document.getElementById("update_product_description").value;

                if (items[index].id === '' || items[index].name === '' || items[index].price === '' || items[index].description === '') {
                    con
                    swal({
                        title: 'Please fill all the filed !!',
                        text: 'Redirecting...',
                        icon: 'error',
                        timer: 2000,
                        buttons: false,
                    })
                        .then(() => {
                            dispatch(redirect('/'));
                        })
                } else {

                    localStorage.setItem("Product_Details", JSON.stringify(items));
                }
                display();
                var myModalEl = document.getElementById('editModal');
                var modal = bootstrap.Modal.getInstance(myModalEl)
                modal.hide();
                swal({
                    title: 'Product Updated',
                    text: 'Redirecting...',
                    icon: 'success',
                    timer: 3000,
                    buttons: false,
                })
                    .then(() => {
                        dispatch(redirect('/'));
                    })
                // document.getElementById('editModal').innerHTML = ''; 
                localStorage.setItem("Product_Details", JSON.stringify(items));

            }
        
        else {
            console.log("err");
        }


    }


}

function removeProduct(id) {
    var items = JSON.parse(localStorage["Product_Details"]);
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            items.splice(i, 1);
            swal({
                title: 'removed Succesfully',
                text: 'Redirecting...',
                icon: 'error',
                timer: 3000,
                buttons: false,
            })
                .then(() => {
                    dispatch(redirect('/'));
                })
            break;
        }
    }
    localStorage.setItem("Product_Details", JSON.stringify(items));
    display();
}


// sorting Function

document.getElementById("sort_low_to_high").onclick = function () {
    var productList = JSON.parse(localStorage["Product_Details"]);
    productList.sort((a, b) => { return a.price - b.price; });
    localStorage.setItem('Product_Details', JSON.stringify(productList));
    display();
}
document.getElementById("sort_high_to_low").onclick = function () {
    var productList = JSON.parse(localStorage["Product_Details"]);
    productList.sort((a, b) => { return b.price - a.price; });
    localStorage.setItem('Product_Details', JSON.stringify(productList));
    display();
}
document.getElementById("sort_id").onclick = function () {
    var productList = JSON.parse(localStorage["Product_Details"]);
    productList.sort((a, b) => { return a.id - b.id; });
    localStorage.setItem('Product_Details', JSON.stringify(productList));
    display();
}

// sorting with name error
document.getElementById("sort_name").onclick = function () {
    var productList = JSON.parse(localStorage["Product_Details"]);
    productList.sort((a, b) => { return a.name.toString().localeCompare(b.name.toString()); });
    localStorage.setItem('Product_Details', JSON.stringify(productList));
    display();
}




function searchProduct(searchKeyword) {

    let filteredProducts;
    var products = JSON.parse(localStorage["Product_Details"]);
    // Object.keys(product).some(key => product[key].toLowerCase().includes(searchKeyword.toLowerCase())));
    if (searchKeyword === '') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter((product) => product["name"].toLowerCase().includes(searchKeyword.toLowerCase()) || product["price"].toLowerCase().includes(searchKeyword.toLowerCase()) || product["description"].toLowerCase().includes(searchKeyword.toLowerCase()) || product["id"].toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    displayProducts(filteredProducts);
}
function displayProducts(product) {
    console.log(product);
    let card = "";
    product.forEach(newproducts => {
        card += ` <div class="col shadow-sm p-3 mb-5 bg-body rounded">
        <img src="${newproducts.img}"style="height: 10rem;  width: 12rem;" class="card-img-top" alt="${newproducts.name}"></img> 
            <div class="card-body">
                <h5 class="card-title">${newproducts.name}</h5>
                <p class="card-text">${newproducts.price}</p>
                <p class="card-text"><small class="text-muted"></small>${newproducts.description}</p>
                <button type="button" id="update_btn" onclick="editProduct('${newproducts.id}')" class="btn btn-outline-success" data-bs-toggle="modal"
                    data-bs-target="#editModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </button>
                <button type="submit" id="delete_btn"onclick="removeProduct('${newproducts.id}')"class="btn btn-outline-danger"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg></button>
            </div>
        </div>`;


    });
    document.getElementById("p1").innerHTML = card;
}