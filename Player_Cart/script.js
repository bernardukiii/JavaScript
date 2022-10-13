// I need to get the value of the players. -- DONE
// I need to add an event listener to the button so that it adds the value of the player to the total. -- DONE
// Be able to delete a player from the basket. -- DONE
// Display that total at the top right. -- DONE
// I need to store that value in local storage so I don't lose it when I refresh.
// Add a spending limit.


const basket = document.querySelector('span')
const addButton = document.querySelector('.bf-add-to-cart')
const basketCount = document.getElementById('basket-count')
var playerId, playerValue, playerName
var cartTotal = 0
var total = []

basketCount.innerHTML = 0

generatePlayerValue()

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
        const btnRemove = priceContainer.childNodes[3]
        const isPurchased = true

        btnRemove.classList.remove('disabled')

        createPlayerObject()
        addPlayerValueToTotal()
    } else if (e.target.matches('.bf-remove-from-cart') && cartTotal > 0) {
        const targetedElement = e.target
        const priceContainer = targetedElement.parentNode
        const price = priceContainer.querySelector('span')
        playerValue = price.getAttribute('value', 'value')

        substractPlayerValueToTotal()
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
// I need an array of objects that have 3 values each. Player value and the name of the player and the id of the card.
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

            updateCart()
            
        } else {
            console.error('Array is empty. Nothing to sum up.')
        }
    })
}

function substractPlayerValueToTotal() {
    cartTotal = parseInt(cartTotal) - parseInt(playerValue)
    // I also need to remove that player object from the array.

    updateCart()
            
}

function updateCart() {
    basketCount.innerHTML = cartTotal


    if (cartTotal < 0) {
        cartTotal = 0
        basketCount.innerHTML = "0"
    }

    total.forEach(item => {
        console.log(item.name)
    })

}

function saveCartValue() {
    // I need to store that value in local storage so I don't lose it when I refresh.
    // With local storage.
    // 

}