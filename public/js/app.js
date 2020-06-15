const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    if (!location) {
        messageOne.textContent = 'You must enter a search location'
        messageTwo.textContent = ''
        return
    }
    messageOne.textContent = 'Loading data...'
    messageTwo.textContent = ''
    console.log('Getting weather for', location)

    // fetch(`http://api.weatherstack.com/current?access_key=b2fa8e51116e84a0a0281166f761d343&query=${location}`).then(res => {
    fetch(`/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error.info || data.error
            } else {
                const message = data.info || `It is ${data.description[0]}, ${data.temperature} C, probability of rain is ${data.precip}%.`
                messageOne.textContent = data.query
                messageTwo.textContent = message
            }
        })
    })
})