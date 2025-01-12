const square = document.getElementById('square')
const counter = document.getElementById('counter')
const cpslabel = document.getElementById('cps')
const doublerbtn = document.getElementById('doubler-btn')
const producerbtn = document.getElementById('producer-btn')
const tierlabels = document.getElementsByClassName('tier')
const pricelabels = document.getElementsByClassName('price')

let totalSquares = 0
let SQperClick = 1
let cps = 0

let doublerTier = 1
let producerTier = 1

let doublerCost = 100
let producerCost = 20

setInterval(function() {
    totalSquares += cps
    updateCounter()
}, 1000)

square.addEventListener('click', () => {
    totalSquares += SQperClick
    updateCounter()
})

doublerbtn.onclick = function() {
    if (totalSquares >= doublerCost) {
        totalSquares -= doublerCost
        SQperClick *= 2
        doublerTier++
        doublerCost *= 10

        tierlabels[0].innerText = "Tier Level: " + doublerTier
        pricelabels[0].innerText = doublerCost + " SQ"

        updateCounter()
    }
}

producerbtn.onclick = function() {
    if (totalSquares >= producerCost) {
        totalSquares -= producerCost
        cps++
        producerTier++
        producerCost *= 2

        tierlabels[1].innerText = "Tier Level: " + producerTier
        pricelabels[1].innerText = producerCost + " SQ"

        updateCounter()
        updateCPS()
    }
}

let updateCounter = () => counter.innerText = "You have " + totalSquares + " squares"

let updateCPS = () => cpslabel.innerText = "SPS: " + cps