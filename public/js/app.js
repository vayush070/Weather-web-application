
const inputAddress = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')


inputAddress.addEventListener('submit', (e) => {

    const location = search.value
    e.preventDefault()
    message1.textContent = ('Please Wait..')
    message2.textContent = ('')

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {

                message1.textContent = (data.location)
                message2.textContent = (data.forecast)
                //     console.log(data.location)
                //     console.log(data.forecast)
            }
        })
    })
})