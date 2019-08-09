'use strict';

const form = document.querySelector('.js-form');
const searchButton = document.querySelector('.search-button');
let seriesContainer = document.querySelector('.js-series-container');
const favouriteList = document.querySelector('.js-favourite-list');
// let series = [];
let favourites = getSavedFavouriteList();
const footer = document.querySelector('.js-footer');
paintFavouriteSeries();

function searchSerie(event) {
    event.preventDefault();
    const inputSerie = document.querySelector('.js-input-serie').value;
    // console.log(`Voy a buscar ${inputSerie}`);

    fetch(`http://api.tvmaze.com/search/shows?q=${inputSerie}`)
        .then(response => response.json())
        .then(data => {
            event.preventDefault();
            // console.log(data);
            paintSeries(data);
            listenSeries();
        });
};

function getSavedFavouriteList() {
    const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (savedFavourites === null) {
        return [];
    } else {
        return savedFavourites;
    }
};


function getClassSerie(serie) {
    if (favourites.findIndex(favourite => favourite.name === serie.show.name) !== -1) {
        return 'serieContainer favourite';
    } else {
        return 'serieContainer';
    }
};


function getSerieImageUrl(serie) {
    if (serie.show.image === null) {
        return `https://via.placeholder.com/210x295/ffffff/666666/?text=${serie.show.name}`;
    } else {
        return serie.show.image.original;
    }
};


const paintSeries = (series) => {
    seriesContainer.innerHTML = '';
    for (let serie of series) {
        let nameSerie = serie.show.name;
        let imageSerie = getSerieImageUrl(serie);
        let classSerie = getClassSerie(serie);

        seriesContainer.innerHTML += `<div class="${classSerie}"><h2 class="titleSerie">${nameSerie}</h2><img class="img" src="${imageSerie}"></div>`;
    }
};


const listenSeries = () => {
    const serieElements = document.querySelectorAll('.serieContainer');

    for (const serieElement of serieElements) {
        serieElement.addEventListener("click", toggleFavourites);
    }
};


const toggleFavourites = (event) => {
    const containerSelected = event.currentTarget;
    containerSelected.classList.toggle('favourite');

    if (containerSelected.classList.contains('favourite')) {
        //acabo de añadirlo a favoritos
        const nameSerieFavourite = containerSelected.querySelector('h2').textContent;
        const imgSerieFavourite = containerSelected.querySelector('.img').src;
        const listSerieFavourite = { name: nameSerieFavourite, image: imgSerieFavourite };
        favourites.push(listSerieFavourite);
    } else {
        //acabo de quitarlo de favoritos
        const indexSerie = favourites.findIndex(el => el.name === containerSelected.querySelector('h2').textContent);
        favourites.splice(indexSerie, 1);
    }
    saveUpdatedFavouriteList(favourites);
    paintFavouriteSeries();
};


function saveUpdatedFavouriteList(updatedFavouriteList) {
    localStorage.setItem('favourites', JSON.stringify(updatedFavouriteList));
};

function findFavouriteSelected(favouriteSelected) {
    fetch(`http://api.tvmaze.com/search/shows?q=${favouriteSelected}`)
        .then(response => response.json())
        .then(data => {
            paintSeries(data);
            listenSeries();
        });
}

// no se como clickar y eliminar directamente.. redirecciono y asi el usuario lo hace a mano, y si encuentra una peli con ese nombre q tambien le llame, puede aprovechar

function removeItemFavourite(event) {
    const containerSelected = event.currentTarget;
    // console.log(containerSelected);
    // console.log(containerSelected.querySelector('h2'));
    const nameSelected = containerSelected.querySelector('h2');
    const favouriteSelected = nameSelected.textContent;
    console.log(favouriteSelected);
    findFavouriteSelected(favouriteSelected);
};



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

searchButton.addEventListener('click', searchSerie);
form.addEventListener('submit', searchSerie);
