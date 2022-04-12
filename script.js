async function fetchData() {
    addSpinner();
    try {
        let response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json');
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            searchBar();
            show(data);
            hideSpinner();
        }
        else{
            throw "API error!";
        }
    } catch (error) {
        alert(error);
        console.log(error);
        hideSpinner();
    }
}

async function searchData() {
    var inputVal = document.getElementById("search-product").value;
    if(inputVal == ''){
        document.getElementById("search-bar").remove();
        document.getElementById("spinner").remove();
        document.getElementById("product-list").remove();
        fetchData();
        return;
    }
    showSpinner();
    try {
        let response = await fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand='+inputVal);
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            document.getElementById("product-list").remove();
            show(data);
            highlight(inputVal);
            hideSpinner();
        }
    } catch (error) {
        alert(error);
        console.log(error);
        hideSpinner();
    }
}

function show(data) {
    let tab = ``;
    // Loop to access all rows 
    for (let r of data) {
        tab += `
        <div class="product">
            <img src="${r.image_link}" href="${r.product_link}" class="product-image" alt=""> 
            <h5 class="title"> ${r.brand} - ${r.name} </h5>
            <h5 class="price"> ${r.price_sign} ${r.price} </h5>
            <div class="product-link"><a href="${r.product_link}" target="_blank"> ${r.product_link} </a></div>
            <p class="description"> ${r.description} </p>
        </div>`;
    }
    // Setting innerHTML as tab variable
    let div = document.createElement('div');
    div.classList.add('product-list', 'row');
    div.setAttribute('id', 'product-list');
    div.innerHTML = tab;
    document.body.appendChild(div);
}

function searchBar(){
    let div = document.createElement('div');
    div.setAttribute('class', 'mt-5');
    div.setAttribute('id', 'search-bar');
    div.innerHTML = `<input placeholder="Search..." id="search-product" class="search-product" type="text" autofocus>
    <button class="btn btn-success" onclick="searchData();">Search</button>`;
    document.body.appendChild(div);
}

function addSpinner() {
    let div = document.createElement('div');
    div.setAttribute('id', 'spinner');
    div.innerHTML = '<div class="d-flex justify-content-center"> <div class="spinner-border" role="status"> <span class="sr-only">Loading...</span> </div> </div>';
    document.body.appendChild(div);
}
function showSpinner() {
    document.getElementById('spinner')
            .style.display = 'block';
}
function hideSpinner() {
    document.getElementById('spinner')
            .style.display = 'none';
}

function highlight(text) {
    var inputTexts = document.querySelectorAll(".title");
    inputTexts.forEach(inputText => {
        var innerHTML = inputText.innerHTML;
        var index = innerHTML.indexOf(text);
        if (index >= 0) { 
        innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
        }
    })
}

fetchData();

