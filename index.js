import { menuArray } from "./data.js"

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    }
})

function handleAddClick(itemId) {

    const targetMenuItemObj = menuArray.filter((item) => {
       return item.id == itemId
    })[0]

    let quantity = ++targetMenuItemObj.quantity

    render()

}

function getFeedHtml() {
    let feedHtml = ``
    document.getElementById('checkout').innerHTML = ``

    menuArray.forEach((item) => {
        feedHtml += `

    <div class="menu-item-container">
        <div class="food-container" >
            <span class="emoji-size">${item.emoji}</span>
            <div class="menu-items">
                <p class="menu-item-title">${item.name}
                <span class="item-desc">${item.ingredients}</span>
                <span class="item-price">$${item.price}</span></p>
            </div>
         </div>
        <span class="add-btn"></span><i class="fa-regular fa-plus plus" data-add="${item.id}"></i></span>
    </div>

    `
        document.getElementById('checkout').innerHTML += `
        <div class="hidden" id="item-${item.id}">
            <div class="checkout-container">
                 <div class="checkout-items-container">
                    <h2>${item.name}</h2>
                    <p class="remove-btn">remove</p>
                 </div>
                    <span id="calc-price-${item.id}"class="checkout-price">$${item.price * item.quantity}</spam>
            </div>
        </div>
        `
    })
/*<div class="hidden" id="item-${item.id}"
<div class="checkout-container">
                    <div class="checkout-items-container">
                        <h2>${item.name}</h2>
                        <p class="remove-btn">remove</p>
                    </div>
                    <p class="checkout-price">${item.price * item.quantity</p>
                </div>*/
    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()
