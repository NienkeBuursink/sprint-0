const snaren = document.querySelectorAll('.snaar')
const sections = document.querySelectorAll('section')
const heroSection = sections[0]
const colorForm = document.querySelector('form')

let friends = [314, 303, 322, 307, 306, 311]

snaren.forEach((snaar) => {
    ['mouseover', 'click'].forEach(event => // array met events voor hover op desktop en click op desktop en mobile
        snaar.addEventListener(event, function(e) {
            let snaarAudio = snaar.nextElementSibling // sibling die direct onder de div staat, dus audio
            // console.log(snaarAudio)
            snaarAudio.play()
        })
    )
})


insertPerson()
insertColorButtons()


async function insertPerson() {
  	const baseURL = 'https://fdnd.directus.app/items'
	const endpoint = '/person/314'
	const url = baseURL + endpoint

  	let response = await fetch(url)
	const result = await response.json()
	
	let personHTML = `<h1>Welkom op de site van ${result.data.name}!</h1>`

	heroSection.insertAdjacentHTML('beforeend', personHTML)
}


async function insertColorButtons() {
    for (const friend of friends) {
        const baseURL = 'https://fdnd.directus.app/items'
        const endpoint = '/person/' + friend
        const url = baseURL + endpoint

        let response = await fetch(url)
        const result = await response.json()
        const color = result.data.fav_color;
        
        let buttonHTML = 
        `<label>
            <input type="radio" name="color-theme" 
            style="background-color: ${color}"
            value="${color}">
            ${result.data.name.split(' ')[0]}
        </label>`

        colorForm.insertAdjacentHTML('beforeend', buttonHTML)
    }  

    const colorButtons = document.querySelectorAll('input[name="color-theme"]')

    colorButtons.forEach(colorButton => {
        colorButton.addEventListener('change', event => {
        const color = event.target.value
        if (color === 'auto') {
            document.documentElement.style.removeProperty('--g-primary-color')
        } else {
            document.documentElement.style.setProperty('--g-primary-color', color)
        }
        })
    })
}

