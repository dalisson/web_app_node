
console.log('Client side js executed')
/*
fetch("http://localhost:3000/weather?address=virginopolis").then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const addressOutput = document.querySelector('#addrtxt')
const weatherOutput = document.querySelector('#weathertxt')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            addressOutput.textContent = data.location
            weatherOutput.textContent = data.forecast
        }
    })
})
})