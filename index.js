import { menuArray } from "./data.js"

const form = document.getElementById('form')

form.addEventListener('submit', displayThankYouBanner)

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
    else if (e.target.id === "complete-order-btn") {
        document.getElementById('payment-modal').style.display = 'flex'
    }
})

function submitted() {
    alert('here I am')
}
function handleAddClick(itemId) {
    document.getElementById('order-section').classList.remove('hidden')
    if (!document.getElementById('thank-you-banner').classList.contains('hidden'))   {
        document.getElementById('thank-you-banner').classList.toggle('hidden')
    }

    const targetMenuItemObj = menuArray.filter((item) => {
       return item.id == itemId
    })[0]

    targetMenuItemObj.quantity++
    calculateTotalPrice()
}

function handleRemoveClick(itemId) {
    const targetMenuItemObj = menuArray.filter((item) => {
        return item.id == itemId
     })[0]

     targetMenuItemObj.quantity = 0
     document.getElementById(`item-${targetMenuItemObj.id}`).classList.toggle('hidden')
     calculateTotalPrice()
}


function calculateTotalPrice() {

        let calculatePrice = 0

        menuArray.forEach((item) => {
            calculatePrice += (item.quantity * item.price)
        })
        if (calculatePrice === 0 ) {
        document.getElementById('order-section').classList.add('hidden')
        }

        document.getElementById('calculated-price').innerHTML = `$${calculatePrice}`
        render()
        showHideOrderedItems()
}

function showHideOrderedItems(){
    menuArray.forEach((item) => {
        if (item.quantity > 0) {
            document.getElementById(`item-${item.id}`).classList.remove('hidden')
        }
        else {
            document.getElementById(`item-${item.id}`).classList.add('hidden')
        }
    })
}

function displayThankYouBanner(e) {
    e.preventDefault()
    const paymentName = document.getElementById('payment-name')
    document.getElementById('thank-you-banner').innerHTML = `
        Thanks, ${paymentName.value}!  Your order is on it's way!
    `
    document.getElementById('payment-modal').style.display = 'none'
    document.getElementById('order-section').classList.toggle('hidden')
    document.getElementById('thank-you-banner').classList.toggle('hidden')
    resetQuantities()
    resetForm()
}

function resetQuantities() {
    menuArray.forEach((item) => {
        item.quantity = 0
    })

}

function resetForm() {
    const formInputs = document.querySelectorAll('input[class^="modal"]')
    formInputs.forEach((formInput) => {
        formInput.value = ``
    })
}


function getFeedHtml() {
    let feedHtml = ``
    document.getElementById('checkout').innerHTML = ``

    menuArray.forEach((item) => {
        feedHtml += `
    <div class="menu-item-container" id="menu-item-${item.id}">
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
                <p class="remove-btn" data-remove="${item.id}">remove</p>
             </div>
                <span id="calc-price-${item.id}"class="checkout-price">$${item.price * item.quantity}</spam>
        </div>
    </div>
    `
    })

    return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()
