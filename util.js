

function createProduct(product) {

    const productHTML = document.createElement('div');
    productHTML.classList.add('product');

    const productTitle = document.createElement('h2');
    productTitle.innerHTML = product.name;
    productHTML.appendChild(productTitle);

    const productDataContainer = document.createElement('div');
    productDataContainer.classList.add('product-data-container');
    productHTML.appendChild(productDataContainer);

    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productPrice.innerHTML = 'Price: ' + product.price;

    productDataContainer.appendChild(productPrice);
    

    return productHTML;
}

function createProductList(productList) {
    const productListElement = document.createElement('div');
    if(productList && productList.length) {
        for(let i=0;i<productList.length;i++) {
            const product = createProduct(productList[i]);
            productListElement.appendChild(product);
        }
    } else {
        productListElement.innerHTML = 'No Items.';
    }
    return productListElement;
}

function createHeader(headerObject) {
    const headerElement = document.createElement('div');
    headerElement.classList.add('header-container');
    const title = document.createElement('h1');
    title.innerHTML = headerObject.title;
    headerElement.appendChild(title);
    return headerElement;
}

function compareByPriceFunction(productA, productB) {
    if(sortValue === 'price'){
        return productA.price - productB.price;
    } else { //sort by name
        return productA.name.localeCompare(productB.name);
    }
}

//priceRange - [10,20]
//priceRange - [0,50]

function filterByPrice(productArray, priceRange) {
    if(!priceRange) {
        return productArray;
    }
    const filteredArray = productArray.filter((product) => {
        if(product.price >= priceRange[0] && product.price <= priceRange[1]) {
            return true;
        } else {
            return false;
        }
    });
    return filteredArray;
}

//String.includes()
 function filterByName(prodcutArray, partialName) {
    const lowerCaseName = partialName.toLowerCase()
    const filteredArray = prodcutArray.filter((element) => {
        if(element.name.toLowerCase().includes(lowerCaseName)) {
            return true
        } else{
            return false
        }
     })
    return filteredArray 
 
    }

