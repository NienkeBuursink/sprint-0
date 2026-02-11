////////////////////
//MARK: Variabelen
////////////////////
const snaren = document.querySelectorAll('.snaar');
const sections = document.querySelectorAll('section');
const heroSection = sections[0];
const colorForm = document.querySelector('form');
const moreStickersButton = document.querySelector('#more-stickers');
const stickerContainer = document.querySelector('klankkast');
const head = document.querySelector('head')



////////////////////
//MARK: Geluidjes maken
////////////////////
snaren.forEach((snaar) => {
    ['mouseover', 'click'].forEach(event => // array met events voor hover op desktop en click op desktop en mobile
        snaar.addEventListener(event, function() {
            let snaarAudio = snaar.nextElementSibling; // sibling die direct onder de div staat, dus audio
            snaarAudio.play();
        })
    );
});



////////////////////
//MARK: H1 invullen
////////////////////
async function insertPerson() {
  	const baseURL = 'https://fdnd.directus.app/items';
	const endpoint = '/person/314';
	const url = baseURL + endpoint;

  	let response = await fetch(url);
	let result = await response.json();
	
	let personHTML = `<h1>Welkom op de site van ${result.data.name}!</h1>`;

	heroSection.insertAdjacentHTML('beforeend', personHTML);
};



////////////////////
//MARK: Kleur buttons
////////////////////
async function insertColorButtons() {
    const baseURL = 'https://fdnd.directus.app/items';
    const endpoint = '/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526&filter[name][_nempty]&filter[fav_color][_nempty]';
    const url = baseURL + endpoint;

    let response = await fetch(url);
    let results = await response.json();

    const validResults = results.data.filter(result => result.fav_color !== '#000000');

    function shuffleArray(array) { //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let randomisedResults = shuffleArray(validResults);

    let limitedResults = randomisedResults.slice(0, 8);
    
    limitedResults.forEach((result) =>{
        let buttonHTML = 
        `<label>
            <input type="radio" name="color-theme" 
            style="background-color: ${result.fav_color}"
            value="${result.fav_color}">
            ${result.name.split(' ')[0]}
        </label>`;

        colorForm.insertAdjacentHTML('beforeend', buttonHTML);

        const colorButtons = document.querySelectorAll('input[name="color-theme"]');

        colorButtons.forEach(colorButton => {
            colorButton.addEventListener('change', event => {
                const color = event.target.value;
                if (color === 'auto') {
                    document.documentElement.style.removeProperty('--g-primary-color');
                } else {
                    document.documentElement.style.setProperty('--g-primary-color', color);
                };
            });
        });
    });  
};  

colorForm.addEventListener('submit', (event) => {
  event.preventDefault();
})



////////////////////
//MARK: Stickers cursus view transitions van Cyd
////////////////////
const stickers = [
    "assets/images/stickers/mier.png",
    "assets/images/stickers/boom.png",
    "assets/images/stickers/bergen.png",
    "assets/images/stickers/hobbit.png",
    "assets/images/stickers/kip.png",
    "assets/images/stickers/bg3.png",
    "assets/images/stickers/druid.webp",
    "assets/images/stickers/hozier.webp",
    "assets/images/stickers/palet.png",
    "assets/images/stickers/mensen.png",
    "assets/images/stickers/navigatie.png",
    "assets/images/stickers/locatie.png"
];

moreStickersButton.addEventListener('click', () => {
	if (document.startViewTransition) {
		document.startViewTransition(() => {
			getRandomSticker();
		});
	} else {
		getRandomSticker();
	}
});

const getRandomSticker = () => {
	const randomIndex = Math.floor(Math.random() * stickers.length);

	const sticker = stickers[randomIndex];
	const stickerElement = document.createElement("img");
	stickerElement.src = sticker;
	stickerElement.alt = "";
	const imageSize = 72; //width van images in pixelgrootte

    const wrapper = document.createElement("div");
    wrapper.classList.add("sticker-wrapper");
    wrapper.appendChild(stickerElement);


	// get random position within stickersContainer bounds
	const bounds = stickerContainer.getBoundingClientRect(); // afmetingen opvragen stickerContainer

    const randomX = Math.floor(Math.random() * (bounds.width - imageSize));
    const randomY = Math.floor(Math.random() * (bounds.height - imageSize));

    const randomRotation = Math.floor(Math.random() * 360);

	stickerElement.style.left = `${randomX}px`;
	stickerElement.style.top = `${randomY}px`;
	stickerElement.style.transform = `rotate(${randomRotation}deg)`;
	stickerContainer.appendChild(wrapper); //stickerElement wordt een child element van stickerContainer(klankkast)
};

    // voor het geval dat ik toch liever safe spaces doe ->
    // const safeSpace = 16;

    // const minX = safeSpace;
    // const maxX = bounds.width - imageSize - safeSpace;
    // const minY = safeSpace;
    // const maxY = bounds.height - imageSize - safeSpace;

    // const randomX = Math.random() * (maxX - minX) + minX;
    // const randomY = Math.random() * (maxY - minY) + minY;


////////////////////
//MARK: Functions aanroepen
////////////////////
insertPerson();
insertColorButtons();