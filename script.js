const productContainer = document.getElementById("products-container");
const headerContainer = document.getElementById("header");
const sortDropdown = document.getElementById("sortMenu");
const filterByPriceDropdown = document.getElementById("filterByPriceMenu");
const inputEl = document.getElementById("search-input");

console.log(inputEl);
let sortValue = "price";
let filterByPriceSelectedValue = "-1";
let filterByPriceValueArray = [
  [0, 20],
  [20, 50],
  [50, 100],
];
let partialName = ''

filterByPriceDropdown.addEventListener("change", (evt) => {
  filterByPriceSelectedValue = evt.target.value;
  console.log(
    "filter by price value changed to: " + filterByPriceSelectedValue
  );
  renderPage();
});

sortDropdown.addEventListener("change", (evt) => {
  sortValue = evt.target.value;
  console.log("sort value changed to: " + sortValue);
  renderPage();
});
inputEl.addEventListener('change', (evt)=>{
    partialName = evt.target.value 
    renderPage()
} )

let productsArray = [];
let headerData = {
  title: "loading...",
};

function onDataSuccess(data) {
  productsArray = data;

  renderPage();
}

function onDataFailed(error) {
  // alert('products data failed to arrive');
}

function renderPage() {
  //sort products by price
  let tempProductArray = productsArray;
  tempProductArray.sort(compareByPriceFunction);
  tempProductArray = filterByPrice(
    tempProductArray,
    filterByPriceValueArray[+filterByPriceSelectedValue]
  );
  
  tempProductArray = filterByName(tempProductArray,partialName)
  console.log(tempProductArray)
  const productsHTML = createProductList(tempProductArray);
  productContainer.innerHTML = "";
  productContainer.appendChild(productsHTML);
  console.log(productsHTML)
  
  const headerHTML = createHeader(headerData);
  headerContainer.innerHTML = "";
  headerContainer.appendChild(headerHTML);
}

fetch("http://localhost:3000/header")
  .then((res) => res.json())
  .then((data) => {
    headerData = data;

    renderPage();
  })
  .catch(() => {
    alert("Error occured!");
    //TODO: //
  });

const responsePromise = fetch("http://localhost:3000/products");
const dataPromise = responsePromise.then((response) => {
  return response.json();
});
dataPromise
  .then(onDataSuccess)
  .catch(onDataFailed)
  .finally(() => {
    console.log("promise ended");
  });

console.log("code still running");

renderPage();

function inputSort(e) {
  const resArr = []
  const inputLowerCase = e.target.value.toLowerCase();

  for (let i = 0; i < productsArray.length; i++) {
    const productName = productsArray[i].name.toLowerCase();
    if (productName.includes(inputLowerCase)) {
       resArr.push(productsArray[i])
       onDataSuccess(resArr)
    } 
  }
}

// for(let i=0; i<productsArray.length;i++) {

//     const productDIV = document.createElement("div");
//     productDIV.classList.add("product");

//     const productNameDIV = document.createElement("div");
//     productNameDIV.innerHTML = productsArray[i].name;
//     productDIV.appendChild(productNameDIV);

//     const productAmountDIV = document.createElement("div");
//     productAmountDIV.innerHTML = "Amount: " + productsArray[i].amount;
//     productDIV.appendChild(productAmountDIV);

//     productContainer.appendChild(productDIV);

// }
