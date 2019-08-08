// ejemplo de estructura

let palettes = [];
const favorites = [];



const startApp = () => {
    console.log('Start app');
    let data = getData();
    data = formatData(data);
    saveData(data);
    paintPalettes();
    listenPalettes();
};

const getData = () => {
    const result = {};
    console.log('Fetch data from server and return it as JSON >>> Return', result);
    return result;
};

const formatData = data => {
    const result = [];
    console.log('Format JSON data and return it as array >>> Return', result);
    return result;
};
const saveData = data => {
    palettes = data;
    console.log('Save data in `palettes` array >>> Palettes:', palettes);
};
cnst paintPalettes = () => {
    console.log('Paint palettes form `palettes` array into DOM >>> Palettes:',
        palettes, 'Favorites:', favorites);
};
const listenPalettes = () => {
    console.log('Listen click on new palettes DOM elements');
    const paletteElements = document.querySelectorAll('.js-palette');
    for (const paletteElement of paletteElements) {
        paletteElement.addEventListener('click', handleClick);
    }
};

const handleClick = ev => {
    console.log('Handle click on a palette DOM element');
    const paletteIndex = getClickedPalette(ev);
    if (isFavoritePalette(paletteIndex)) {
        removeFavorite(paletteIndex);
    } else {
        addFavorite(paletteIndex);
    }
    paintPalettes();
};

const getClickedPalette = ev => {
    const clickedPaletteIndex = 1;
    console.log('Get clicked palette from event and return the clicked palette index >>> Clicked palette:', clickedPaletteIndex);
    return clickedPaletteIndex;
};

const isFavoritePalette = paletteIndex => {
    if (paletteIndex === 1) {
        console.log(`Check if paletteIndex ${paletteIndex} it is favorite >>>`, true);
        return true;
    } else {
        console.log(`Check if paletteIndex ${paletteIndex} it is not favorite >>>`, false);
        return false;
    }
};

const addFavorite = paletteIndex => {
    favorites.push(paletteIndex);
    console.log('Add paletteIndex to `favorites` array >>> Favorites:', favorites);
};

const removeFavorite = paletteIndex => {
    console.log('Remove paletteIndex from `favorites` array >>> Favorites:', favorites);
};

startApp();