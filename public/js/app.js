// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    if (!location) {
        console.log('You must enter a search location')
        messageOne.textContent = 'You must enter a search location'
        messageTwo.textContent = ''
        return
    }
    messageOne.textContent = 'Loading data...'
    messageTwo.textContent = ''
    console.log('Getting weather for', location)

    fetch(`http://api.weatherstack.com/current?access_key=b2fa8e51116e84a0a0281166f761d343&query=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error.info || data.error
                console.log(data.error)
            } else {
                console.log(data)
                const message = data.info || `It is ${data.current.weather_descriptions[0]}, ${data.current.temperature} C, probability of rain is ${data.current.precip}%.`
                messageOne.textContent = data.request.query
                messageTwo.textContent = message
            }
        })
    })
})