// to change the price  change it on line 36 and 40;
// Get the width of the web page
// let choosenProducts = JSON.parse(localStorage.getItem("choosenProducts")) || [];
let choosenProducts = JSON.parse(sessionStorage.getItem("choosenProducts")) || [];
let images = [
"images/image-product-1.jpg",
"images/image-product-2.jpg",
"images/image-product-3.jpg",
"images/image-product-4.jpg"]
const navToggle = document.querySelector(".nav-toggle");
const iconToggle = document.querySelector(".nav-toggle i");
const title = document.querySelector(".title");
const linksContainer = document.querySelector(".nav-links");
const links = document.querySelector(".nav-links ul");
const callToAction = document.querySelector(".call-to-action");
const cartContent = document.querySelector(".cart-content");
const galleryContent = document.querySelector(".gallery");
const galleryImage = document.querySelector(".main-image");
const thumbnailImages = document.querySelectorAll(".thumbnail ul li");
const cartToggle = document.querySelector(".toggle-cart");
const myModal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-icon");
const checkBtn = document.querySelector(".modal__btn");
// let pageWidth = window.innerWidth;
// // Log the width to the console
// console.log("The width of the web page is: " + pageWidth);

if(choosenProducts.length) {
    cartContent.textContent = choosenProducts.length
    cartContent.classList.add("cart");
    renderProducts(choosenProducts);
}

let toggled = true;
navToggle.addEventListener("click", ()=> {
    title.classList.toggle("d-none");
    linksContainer.classList.toggle("show-links");
    links.classList.toggle("d-flex");
    linksContainer.classList.toggle("d-none");
    if(toggled) {
        iconToggle.classList.remove("fa-bars");
        iconToggle.classList.add("fa-times");
        toggled = false;
    }else {
        iconToggle.classList.remove("fa-times");
        iconToggle.classList.add("fa-bars");

    }
    
})

callToAction.addEventListener("click", (e)=> {

    target = e.target;
    if (target.classList.contains("minus")){
        const paragraphEL = target.nextElementSibling;
        let amount = parseInt(paragraphEL.dataset.id) - 1; 
        if(amount){
            paragraphEL.dataset.id = amount;
            paragraphEL.textContent = paragraphEL.dataset.id;
        }
    }

    if (target.classList.contains("plus")){
        const paragraphEL = target.previousElementSibling;
        paragraphEL.dataset.id = parseInt(paragraphEL.dataset.id) + 1; 
        paragraphEL.textContent = paragraphEL.dataset.id;
    }

    if (target.classList.contains("call-btn")){
        const image = images[document.querySelector(".thumbnail li.active").dataset.index]
        const amount = document.querySelector("[data-id]").dataset.id;
        const priceForUnit = document.querySelector("[data-price]").dataset.price;
        choosenProducts = [{img: image, units: parseInt(amount), price: parseFloat(priceForUnit)}];
        // localStorage.setItem("choosenProducts", JSON.stringify(choosenProducts));
        sessionStorage.setItem("choosenProducts", JSON.stringify(choosenProducts));
        cartContent.textContent = amount;
        cartContent.classList.add("cart");
    }
    
})

thumbnailImages.forEach(element => {
    // console.log(element);
    element.addEventListener("click", (e)=> {
        const currentItem = document.querySelector('.thumbnail ul li.active');
        const index = e.target.parentElement.dataset.index;
        galleryImage.src = images[parseInt(index)];
        if (currentItem) {
            currentItem.classList.remove('active');
        }
        e.target.parentElement.classList.add('active');
    })
})

let imgCounter = 0;

galleryContent.addEventListener("click", (e)=> {
    if(imgCounter >= images.length){
        imgCounter = 0;
    }

    if(e.target.classList.contains("next")){
        galleryImage.src = images[imgCounter]
        imgCounter++
    }
    if(e.target.classList.contains("previous")){
        imgCounter--;
        if(imgCounter < 0){
            imgCounter = images.length - 1;
        }
        galleryImage.src = images[imgCounter]
    }
})

cartToggle.addEventListener("click", ()=> {
    myModal.style.display = "grid"
    myModal.showModal();
    if(!choosenProducts.length){
        const infoPara = document.querySelector(".modal__content");
        infoPara.style.display ="flex";
    }
    else {
        renderProducts(choosenProducts);
    }
})

closeModal.addEventListener("click", () => {
    myModal.close();
    myModal.style.display = "none";
});


function renderProducts(arr) {
    const modalContent = document.querySelector(".modal__content--products");
    const products = arr.map(product => {
        return `
            <div class="product d-flex">
                <div class="img-container">
                    <img class="product__image" src="${product.img}" alt="">
                </div>
                <div class="text">
                 <p class="title">Fall Limited Edition sneakers products</p>
                <p class="final-price">$${product.price} * ${product.units}  <strong>$${product.price * product.units}.00</strong></p>
                </div>
                <img src="images/icon-delete.svg">
            </div>
            <button class="modal__btn">Checkout</button>
        `
    }).join("");

    modalContent.innerHTML = products;
}