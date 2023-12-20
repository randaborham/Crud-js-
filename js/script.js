var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var categorymassge = document.getElementById("categorymassge");
var namemassge = document.getElementById("namemassge");
var pricemassge = document.getElementById("pricemassge");
var searchInput = document.getElementById("searchInput");
var updatabtn = document.getElementById("updatabtn");
var addbtn = document.getElementById("addbtn");
var descmassge = document.getElementById("descmassge");

var indexupdate = 0;

//array
var productlist = [];

//condition
if (localStorage.getItem("products") != null) {
  productlist = JSON.parse(localStorage.getItem("products")); // save in array
  Display();
}
//Addproduct
function AddProduct() {
  if (
    validitioname() == true &&
    validitionprice() == true &&
    validitioncategory() == true &&
    validitiondiscription() == true
  ) {
    var product = {
      Name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      des: productDescriptionInput.value,
    };
    productlist.push(product);
    localStorage.setItem("products", JSON.stringify(productlist)); //save in local
    Display();
    clearProduct();
  }
  // console.log(productlist);
}
//clear product
function clearProduct() {
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productNameInput.value = "";
  productPriceInput.value = "";
}
//Display in table
function Display() {
  var cartona = "";
  for (var i = 0; i < productlist.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${productlist[i].Name}</td>
    <td>${productlist[i].price}</td>
    <td>${productlist[i].category}</td>
    <td>${productlist[i].des}</td>
    <td>
    <button class="btn btn-outline-warning btn-sm1"onclick="setData(${i});">Update</button>
    <button class="btn btn-outline-danger btn-sm2" onclick="Deleteproduct(${i});">Delete</button>
    </td>
    </tr>`;
  }
  document.getElementById("tablebody").innerHTML = cartona;
}
//Delete
function Deleteproduct(Number) {
  productlist.splice(Number, 1);
  localStorage.setItem("products", JSON.stringify(productlist));
  Display();
}
//search
function searchproduct() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productlist.length; i++) {
    if (productlist[i].Name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<tr>
      <td>${i + 1}</td>
    <td>${productlist[i].Name}</td>
    <td>${productlist[i].price}</td>
    <td>${productlist[i].category}</td>
    <td>${productlist[i].des}</td>
    <td>
    <button class="btn btn-outline-warning btn-sm1" onclick="setData(${i});">Update</button>
    <button class="btn btn-outline-danger btn-sm2" onclick="Deleteproduct(${i});">Delete</button>
    </td>
    </tr>`;
    }
  }
  document.getElementById("tablebody").innerHTML = cartona;
}
//Updata
function setData(index) {
  indexupdate = index;
  var currentelment = productlist[index];
  productNameInput.value = currentelment.Name;
  productPriceInput.value = currentelment.price;
  productDescriptionInput.value = currentelment.des;
  productCategoryInput.value = currentelment.category;
  updatabtn.classList.remove("d-none");
  addbtn.classList.add("d-none");
}
function updateproduct() {
  var product = {
    Name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    des: productDescriptionInput.value,
  };
  productlist.splice(indexupdate, 1, product);
  localStorage.setItem("products", JSON.stringify(productlist)); //save in local
  Display();
  addbtn.classList.remove("d-none");
  updatabtn.classList.add("d-none");
  clearProduct();
}
// validation on name
function validitioname() {
  var text = productNameInput.value;
  var regexName = /^[A-Z][a-z]{3,8}$/;
  // regexName.test(text);
  if (regexName.test(text) == true) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    namemassge.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    namemassge.classList.remove("d-none");
    return false;
  }
}
// validation on price
function validitionprice() {
  var textprice = productPriceInput.value;
  var regexPrice = /^[0-9]{3,10}$/;
  // console.log(regexPrice.test(textprice));
  // regexName.test(text);
  if (regexPrice.test(textprice) == true) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    pricemassge.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    pricemassge.classList.remove("d-none");
    return false;
  }
}
// validation on categry
function validitioncategory() {
  var textcategory = productCategoryInput.value;
  var regexcategory = /^[A-Z][a-z]{3,10}$/;
  // console.log(regexPrice.test(textprice));
  // regexName.test(text);
  if (regexcategory.test(textcategory) == true) {
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
    categorymassge.classList.add("d-none");
    return true;
  } else {
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
    categorymassge.classList.remove("d-none");
    return false;
  }
}
// validation on Disc
function validitiondiscription() {
  var textdesc = productDescriptionInput.value;
  var regexdesc = /[a-z]{1,20}/;
  if (regexdesc.test(textdesc) == true) {
    productDescriptionInput.classList.add("is-valid");
    productDescriptionInput.classList.remove("is-invalid");
    descmassge.classList.add("d-none");
    return true;
  } else {
    productDescriptionInput.classList.add("is-invalid");
    productDescriptionInput.classList.remove("is-valid");
    descmassge.classList.remove("d-none");
    return false;
  }
}
