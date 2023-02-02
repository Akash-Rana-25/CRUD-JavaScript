let reader = new FileReader();
reader.readAsDataURL(image);
reader.addEventListener("load", () => {var url = reader.result;
    var productList;if (localStorage.getItem("productList") == null)
 {productList = [];}else {productList = JSON.parse(localStorage.getItem("productList"));}
 productList.push({productid: productid,productname: productname,image: url,price: price,description: description,});





 //sorting

