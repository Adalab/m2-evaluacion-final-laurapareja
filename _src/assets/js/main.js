'use strict';
//declaro constantes o variables a usar en varias funciones

const form = document.querySelector('.js-form'); // console.log(favouriteSelected);
// findFavouriteSelected(favouriteSelected);
const searchButton = document.querySelector('.search-button');
let seriesContainer = document.querySelector('.js-series-container');
const favouriteList = document.querySelector('.js-favourite-list');

// la lista de favoritos se genera con el resultado de esta función
let favourites = getSavedFavouriteList();

//pinto las series guardadas en el localstorage
paintFavouriteSeries();

//busco la serie
function searchSerie(event) {
    event.preventDefault();
    const inputSerie = document.querySelector('.js-input-serie').value;

    fetch(`https://api.tvmaze.com/search/shows?q=${inputSerie}`)
        .then(response => response.json())
        .then(data => {
            event.preventDefault();
            paintSeries(data);
            listenSeries();
        });
};

//guardo la lista de favoritos en el localStorage, parseandolo, of course
function getSavedFavouriteList() {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (savedFavourites === null) {
        return [];
    } else {
        return savedFavourites;
    }
};

//para buscar si el elemento está en la array favourites
//indexOf no es válido porque mi array está formado por objetos
//https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/findIndex
function getClassSerie(serie) {
    if (favourites.findIndex(favourite => favourite.name === serie.show.name) !== -1) {
        return 'serieContainer favourite';
    } else {
        return 'serieContainer';
    }
};

//obtengo la imagen de la serie o pongo una por defecto
function getSerieImageUrl(serie) {
    if (serie.show.image === null) {
        return `https://via.placeholder.com/210x295/ffffff/666666/?text=${serie.show.name}`;
    } else {
        return serie.show.image.original;
    }
};

// pinto las series que han sido filtradas en la búsqueda
const paintSeries = (series) => {
    seriesContainer.innerHTML = '';
    for (let serie of series) {
        let nameSerie = serie.show.name;
        let imageSerie = getSerieImageUrl(serie);
        let classSerie = getClassSerie(serie);

        seriesContainer.innerHTML += `<div class="${classSerie}"><img class="img" src="${imageSerie}"><h2 class="titleSerie">${nameSerie}</h2><div class="favouriteIconContainer"><i class="fas fa-heart favourite-icon"></i></div></div>`;
    }
};

// activo los listeners de todas las series a través de un bucle
const listenSeries = () => {
    const serieElements = document.querySelectorAll('.serieContainer');

    for (const serieElement of serieElements) {
        serieElement.addEventListener("click", toggleFavourites);
    }
};

//añado la clase favorita si no la tiene y lo contrario
const toggleFavourites = (event) => {
    const containerSelected = event.currentTarget;
    containerSelected.classList.toggle('favourite');

    if (containerSelected.classList.contains('favourite')) {
        //creo los elementos que voy a guardar en favoritos
        const nameSerieFavourite = containerSelected.querySelector('h2').textContent;
        const imgSerieFavourite = containerSelected.querySelector('.img').src;
        const serieFavourite = { name: nameSerieFavourite, image: imgSerieFavourite };
        //meto la serie en la array
        favourites.push(serieFavourite);
    } else {
        //quito la serie de la lista de favoritos
        const indexSerie = favourites.findIndex(el => el.name === containerSelected.querySelector('h2').textContent);
        favourites.splice(indexSerie, 1);
    }
    //guardo la lista actualizada
    saveUpdatedFavouriteList(favourites);
    //pinto la lista favorita
    paintFavouriteSeries();
};

//guardo la lista actualizada en el localStorage
function saveUpdatedFavouriteList(updatedFavouriteList) {
    localStorage.setItem('favourites', JSON.stringify(updatedFavouriteList));
};


// elimino el favorito de favoritos
function removeItemFavourite(event) {
    const containerSelected = event.currentTarget;

    const nameSelected = containerSelected.querySelector('h2');
    let favouriteSelected = nameSelected.textContent;

    //busco el elemento a eliminar en la lista de favoritos

    const indexSerie = favourites.findIndex(el => el.name === favouriteSelected);

    //elimino la serie de favoritos
    favourites.splice(indexSerie, 1);

    // actualizo el cambio tanto en el localstorage
    saveUpdatedFavouriteList(favourites);
    paintFavouriteSeries();
    getClassSerie();
};

// pinto las series favoritas
function paintFavouriteSeries() {
    favouriteList.innerHTML = '';
    for (let favourite of favourites) {
        const name = favourite.name;
        const image = favourite.image;
        favouriteList.innerHTML += `<div class="serieContainer favourite"><h2 class="title-favourite">${name}</h2><img class="img imgFavourite" src="${image}"></img><div>`;
    }
    let containersSelected = favouriteList.querySelectorAll('.favourite');
    for (let containerSelected of containersSelected) {
        containerSelected.addEventListener('click', removeItemFavourite);
    }
}

// declaro el listener del input que va a activar las demás funciones
searchButton.addEventListener('click', searchSerie);
form.addEventListener('change', searchSerie);