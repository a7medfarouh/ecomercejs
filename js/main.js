// get data from file of product js
import products from './product.js'
let data = document.getElementById("rowData");
let id, container,
counter = document.getElementById("counter");
let view= document.getElementById("viewData");
let viewcontainer=document.getElementById("viewcontainer");
let maincontainer=document.getElementById("maincontainer");
if(localStorage.getItem("product")!=null){
    console.log(JSON.parse(localStorage.getItem("product")))
    container=JSON.parse(localStorage.getItem("product"));
    counter.innerHTML=container.length;
    addToCart();
}
else{
    console.log(JSON.parse(localStorage.getItem("product")))
    container=[];
}

function display(){
    
    
    data.innerHTML=products.map((el,index)=>{
        return`<div class="col-md-4 mt-5 " >
        <div class="content">
            <div class="card" >
                <img src="${el.productImage}" class="card-img-top" alt="${el.productName}">
                <div class="card-body">
                <h4 class="card-title"> productName:  ${el.productName}</h4>
                <h5 class="card-title"> productPrice: ${el.productPrice} $</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <button class="add btn btn-primary" id='${index}'  >Add to card</button>
                  <button  class="view btn btn-success">Quick to view</button>
                </div>
              </div>
        </div>
    </div>`
        
    }).join(" ");
    
}
display();

let addbtn =document.querySelectorAll(".add");

for(let i = 0; i < addbtn.length; i++){
    addbtn[i].addEventListener('click',(e)=>{
    id=e.target.id;
    // console.log(e.target.id);
    container.push(products[id]);
    // console.log(container);
    if(container.length>0){
        counter.innerHTML=container.length;
        addToCart()
    }
    
    } )
    
}
function addToCart(){
    console.log(container)
    let product=''
    for(let i=0; i<container.length;i++){
        product+=`<div class="col-md-4 mt-5 " >
        <div class="content">
            <div class="card" >
                <img src="${container[i].productImage}" class="card-img-top" alt="${container[i].productName}">
                <div class="card-body">
                <h4 class="card-title"> productName:  ${container[i].productName}</h4>
                <h5 class="card-title"> productPrice: ${container[i].productPrice} $</h5>
                <button  class="delete btn btn-danger" id="${i}" >Delete</button>
                </div>
              </div>
        </div>
    </div>`
    }
    view.innerHTML=product;
    localStorage.setItem("product",JSON.stringify(container));
    // let quick = new Quickview(e.target.id);
}

let viewbtn =document.querySelectorAll(".view");
console.log(viewbtn)
for(let i = 0; i < viewbtn.length; i++){
    viewbtn[i].addEventListener('click',()=>{
        displayview();
    } )
    
}
function displayview(){
    maincontainer.classList.add("d-none");
    viewcontainer.classList.replace("d-none","d-block");
}
let deletebtn =document.querySelectorAll(".delete");
console.log(deletebtn);
for(let i = 0; i < deletebtn.length; i++){
    deletebtn[i].addEventListener('click',(e)=>{
        let details=e.target.id;
        console.log(details)
        container.splice(details,1);
        counter.innerHTML=container.length;
        addToCart();
        // deletedata(details);
    } )
    
}
document.querySelector('.home').addEventListener('click',()=>{
    maincontainer.classList.replace("d-none","d-block");
    viewcontainer.classList.replace("d-block","d-none");
})
document.querySelector('.cart').addEventListener('click',()=>{
    displayview()
})
