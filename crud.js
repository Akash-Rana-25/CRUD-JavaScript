window.onload = display()
function display() {
    let card = "";
    const product = JSON.parse(localStorage.getItem("Product_Details"));
    product.forEach(newproducts => {
        card += ` <div class="card-group mt-5">
        <div class="card shadow-sm p-3 mb-5 bg-body rounded">
            
    
            <div class="card-body">
    
                <h5 class="card-title">${newproducts.name}</h5>
                <p class="card-text">${newproducts.price}</p>
                <p class="card-text"><small class="text-muted"></small></p>
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

    const newproduct = {
        id: product_id,
        name: product_name,
        price: product_price,
        description: product_description,
        // img: product_img

    }

    const products = JSON.parse(localStorage.getItem("Product_Details")) ?? [];

    products.push(newproduct);
    localStorage.setItem("Product_Details", JSON.stringify(products));

    display();
}


/* <img src="${newproducts.img}" class="card-img-top" alt="..."></img> */

function editProduct(id) {
    const temp = JSON.parse(localStorage["Product_Details"]);

    for (var i = 0; i < temp.length; i++) {
        if (temp[i].id == id) {
            document.getElementById("update_product_id").value = id;
            document.getElementById("update_product_name").value=temp.name;
            document.getElementById("update_product_price").value=temp.price;
            document.getElementById("update_product_description").value=temp.description;
            break;
        }
    }


    // const update_product_id = document.getElementById("update_product_id").value;
    // const update_product_name = document.getElementById("update_product_name").value;
    // const update_product_price = document.getElementById("update_product_price").value;
    // const update_product_description = document.getElementById("update_product_description").value;
}


function removeProduct(id) {
    var items = JSON.parse(localStorage["Product_Details"]);
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            items.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("Product_Details", JSON.stringify(items));
    display();
}


// sorting Function
// function nameSort(){
//     products.sort();
//     console.log(product);
// }
// function highToLow(){
//     products.sort(function(a, b){return a - b});
// }
// function lowTohigh(){
//     products.sort(function(a, b){return b - a});
// }
// function idSort(){
//     products.sort();
// }