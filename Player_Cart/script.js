// GLobal variables
const basket = document.querySelector('span')
const addButton = document.querySelector('.bf-add-to-cart')
const basketCount = document.getElementById('basket-count')
var playerId, playerValue, playerName
// Local storage prefix & key
const LOCAL_STORAGE_PREFIX = "PLAYER_MARKT"
const PLAYER_MARKT_KEY = `${LOCAL_STORAGE_PREFIX}-players`
const TOTAL_MARKT_KEY = `${LOCAL_STORAGE_PREFIX}-cart-total`
// Load stuff
const total = loadCart()
var cartTotal = loadTotal()
// Edgecase catcher
if (cartTotal === null) {
    basketCount.innerHTML = 0
} else {
    basketCount.innerHTML = cartTotal
}

generatePlayerValue()

// Click management
document.addEventListener('click', (e) => {
    if (e.target.matches('.bf-add-to-cart')) {
        const targetedElement = e.target
        playerId = new Date().getTime()
        const priceContainer = targetedElement.parentNode
        const wholeCard = priceContainer.parentNode
        const playerNameContainer = wholeCard.childNodes
        playerName = playerNameContainer[1].innerHTML
        const price = priceContainer.querySelector('span')
        playerValue = price.getAttribute('value', 'value')

        createPlayerObject()
        addPlayerValueToTotal()
        saveTotal()
        saveCart()
    } else if (e.target.matches('.bf-remove-from-cart') && cartTotal > 0) {
        const targetedElement = e.target
        const priceContainer = targetedElement.parentNode
        const price = priceContainer.querySelector('span')
        playerValue = price.getAttribute('value', 'value')

        substractPlayerValueToTotal()
        saveTotal()
        saveCart()
    }
})


//////// Functions ////////
function generatePlayerValue() {
    const priceCards = document.querySelectorAll('.bf-price')

    priceCards.forEach(player => {
        playerValue = Math.floor(Math.random() * (14 - 8 + 1) + 8)
        player.innerHTML = `${playerValue} $`
        player.setAttribute('value', `${playerValue}`)
    })
} 

function createPlayerObject() {
    const player = {
        id: playerId,
        playerPrice: playerValue,
        name: playerName,
        
    }

    total.push(player)
}

function addPlayerValueToTotal() {
    return new Promise(() => {
        if (total.length > 0) {     
            cartTotal = parseInt(cartTotal) + parseInt(playerValue)

            if (cartTotal > 25) {
                alert('Over the spending limit')
                substractPlayerValueToTotal()
            } else {
                updateCart()

            }

        } else {
            console.error('Array is empty. Nothing to sum up.')
        }
    })
}

function substractPlayerValueToTotal() {
    cartTotal = parseInt(cartTotal) - parseInt(playerValue)

    updateCart()
            
}

function updateCart() {
    basketCount.innerHTML = cartTotal

    if (cartTotal < 0) {
        cartTotal = 0
        basketCount.innerHTML = "0"
    }

}

// Save stuff and load functions
function saveCart() {
    localStorage.setItem(PLAYER_MARKT_KEY, JSON.stringify(total))

}

function loadCart() {
    const cartPlayersString = localStorage.getItem(PLAYER_MARKT_KEY)

    return JSON.parse(cartPlayersString) || []
}


function saveTotal() {
    localStorage.setItem(TOTAL_MARKT_KEY, cartTotal)

}

function loadTotal() {
    const cartValue = localStorage.getItem(TOTAL_MARKT_KEY)

    return cartValue || 0
}

// Add players to a cart list. Need to figure out where to run this
function updateCartList() {
    const template = document.querySelector('template')
    const clonedTemplate = template.content.cloneNode('true')
    const cartList = document.querySelector("ul.bf-cart-list")
    const cartItem = clonedTemplate.querySelector('.bf-player-li')
    const cartPlayerName = clonedTemplate.querySelector('span')
    const cartPlayerPrice = clonedTemplate.querySelector('.bf-price')
    const buttonRemove = clonedTemplate.querySelector('button')

    total.forEach(player => {
        cartPlayerName.innerHTML = playerName
        cartPlayerPrice.innerHTML = playerValue
        
        cartList.appendChild(cartItem)
    })
}
