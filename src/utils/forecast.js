const request = require('request')
const urlBase = 'http://api.weatherstack.com/current?access_key=b2fa8e51116e84a0a0281166f761d343&query='

const forecast = (address = 'Kiev', callback) => {
    const url = `${urlBase}${address}`

    request({
        url,
        json: true
    }, (err, resp) => {
        // if (err) {
        //     console.log('Err => ', err)
        //     return
        // }
        console.log(resp.body)
        if (resp.body.error && resp.body.error.info) {
            callback(resp.body.error.info, {})
        }
        callback(err, {
            description: resp.body.current.weather_descriptions,
            temperature: resp.body.current.temperature,
            precip: resp.body.current.precip
        })

    })
}



module.exports = forecast