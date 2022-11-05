// GLobal variables
const basket = document.querySelector('span')
const addButton = document.querySelector('.bf-add-to-cart')
const basketCount = document.getElementById('basket-count')
const viewCartBtn = document.getElementById('bf-show-cart')
const closeBtn = document.getElementById('bf-close-btn')
const cart = document.getElementById('cart-with-players')
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

    }
})

// Open and view cart
viewCartBtn.addEventListener('click', () => {
    if (total.length > 0) {
        cart.classList.remove('hidden')
    } else {
        alert('There is nothing in the cart!')
    }
})

closeBtn.addEventListener('click', () => {
    cart.classList.add('hidden')
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
    if (cartTotal < 25) {
        total.push(player)
    } else {
        return
    }
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
                updateCartList()

            }

        } else {
            return
        }
    })
}

function substractPlayerValueToTotal() {
    cartTotal = parseInt(cartTotal) - parseInt(playerValue)
    // I need to find a way to remove the object from the array entirely

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
    updateCartList()

    return cartValue || 0
}

function updateCartList() { 
    if (total.length > 0) {
        total.forEach(player => {
            const template = document.querySelector('template')
            const clonedTemplate = template.content.cloneNode('true')
            const cartList = document.querySelector("ul.bf-cart-list")
            const cartItem = clonedTemplate.querySelector('.bf-player-li')
            const cartPlayerName = clonedTemplate.querySelector('span')
            cartPlayerName.innerHTML = player.name
            cartList.appendChild(cartItem)

        })

        // Remove player from cart list
        const removePlayerFromCart = document.querySelectorAll('.bf-remove-from-cart')

        removePlayerFromCart.forEach(button => {
            button.addEventListener('click', (e) => {
                if (e.target.matches('.bf-remove-from-cart') && cartTotal > 0) {
                    substractPlayerValueToTotal()
                    saveTotal()
                    saveCart()
                }
            })
        })
    } else {
        return
    }
}


// Clear local storage for testing purposes
const clearBtn = document.createElement('button')
clearBtn.innerHTML = 'CLEAR'
document.body.appendChild(clearBtn)

clearBtn.addEventListener('click', () => { clearLocalStorage() })

function clearLocalStorage() {
    localStorage.clear()
}
