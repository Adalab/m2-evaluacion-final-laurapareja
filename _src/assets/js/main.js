'use strict';

const form = document.querySelector('.js-form');
const searchButton = document.querySelector('.search-button');
const seriesContainer = document.querySelector('.js-series-container');
const favouriteList = document.querySelector('.js-favourite-list');
// let series = [];
let favourites = [];


//comienzo

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

const paintSeries = (series) => {
    seriesContainer.innerHTML = '';
    for (let serie of series) {
        let nameSerie = serie.show.name;
        let imageSerie = '';

        if (serie.show.image === null) {
            imageSerie = `https://via.placeholder.com/210x295/ffffff/666666/?text=${nameSerie}`;
        } else {
            imageSerie = serie.show.image.original;
        }
        seriesContainer.innerHTML += `<div class="serieContainer"><h2 class="titleSerie">${nameSerie}</h2><img class="img" src="${imageSerie}"></div>`;
    }
};

const listenSeries = () => {
    const serieElements = document.querySelectorAll('.serieContainer');

    for (const serieElement of serieElements) {
        serieElement.addEventListener("click", toggleFavourites);
    }
};


const toggleFavourites = (event) => {
    // console.log(event.currentTarget);
    const containerSelected = event.currentTarget;
    containerSelected.classList.toggle('favourite');

    const nameSerieFavourite = containerSelected.querySelector('h2').textContent;
    const imgSerieFavourite = containerSelected.querySelector('.img').src;

    const listSerieFavourite = { name: nameSerieFavourite, image: imgSerieFavourite };

    // console.log(nameSerieFavourite);
    // console.log(imgSerieFavourite);

    if (containerSelected.classList.contains("favourite")) {
        favourites.push(listSerieFavourite);
    } else {
        favourites.splice(listSerieFavourite);
    }
    console.log(favourites);
    // getIndex(containerSelected);
    // paintFavourites();
    isFavouriteSerie();
    // paintFavourites();

    // function paintFavourites() {
    //     if (foundIndex >= 0) {
    //         console.log(`Check if paletteIndex ${containerSelected} it is favorite >>>`, true);
    //         return true;
    //     } else {
    //         console.log(`Check if paletteIndex ${containerSelected} it is not favorite >>>`, false);
    //         return false;
    //     }
    // }

};

function isFavouriteSerie() {
    for (let favourite of favourites) {
        const foundIndex = favourites.indexOf(favourite);
        if (foundIndex >= 0) {
            console.log(`Check if paletteIndex ${favourite.name} it is favorite >>>`, true);
            const nameFavourite = favourite.name;
            const imageFavourite = favourite.image;

            favouriteList.innerHTML = `<h2>${nameFavourite}</h2> <img class="img" src="${imageFavourite}"></img>`;
            return true;
        }

    }
};

// function paintFavourites(favourite) {
//     favouriteList.innerHTML = '';
//     for (const favourite of favourites) {
//         const nameFavourite = favourite.name;
//         const imageFavourite = favourite.image;

//         favouriteList.innerHTML += `<h2>${nameFavourite}</h2> <img src="${imageFavourite}"></img>`;
//     }
// };

// console.log(favourites);

// favouriteList.innerHTML = `${favourites}`;

searchButton.addEventListener('click', searchSerie);
form.addEventListener('submit', searchSerie);

// const getFavouriteClassName = serieIndex => {

//     if (isFavouriteSerie(serieIndex)) {
//         return 'series__item--favorite';
//     } else {
//         return '';
//     }
// };

// function listenSeries(seriesContainer) {
//     console.log(seriesContainer);
//     // serieContainer.style.background = 'red';
//     const serieContainers = document.querySelectorAll('.serieContainer');
//     for (let serie of serieContainers) {
//         ser// const getFavouriteClassName = serieIndex => {

//     if (isFavouriteSerie(serieIndex)) {
//         return 'series__item--favorite';
//     } else {
//         return '';
//     }
// };

// function listenSeries(seriesContainer) {
//     console.log(seriesContainer);
//     // serieContainer.style.background = 'red';
//     const serieContainers = document.querySelectorAll('.serieContainer');
//     for (let serie of serieContainers) {
//         seriesContainer.addEventListener('click', handleClick);
//     }
// };iesContainer.addEventListener('click', handleClick);
//     }
// };


// const handleClick = ev => {
//     const serieIndex = getClickedPalette(ev);
//     if (isFavouritePalette(serieIndex)) {
//         removeFavourite(serieIndex);
//     } else {
//         addFavourite(serieIndex);
//     }
//     listenSeries();
// };


// const getClickedPalette = ev => {
//     const currentTarget = ev.currentTarget;
//     const clickedSerieIndex = parseInt(currentTarget.dataset.index);
//     console.log('Get clicked palette from event and return the clicked palette index >>> Clicked palette:', clickedSerieIndex);
//     return clickedSerieIndex;
// };


// const isFavouriteSerie = serieIndex => {
//     const foundIndex = favourites.indexOf(serieIndex);
//     if (foundIndex >= 0) {
//         console.log(`Check if serieIndex ${serieIndex} it is favorite >>>`, true);
//         return true;
//     } else {
//         console.log(`Check if serieIndex ${serieIndex} it is not favorite >>>`, false);
//         return false;
//     }
// };

// const addFavorite = serieIndex => {
//     favourites.push(serieIndex);
//     console.log('Add paletteIndex to `favorites` array >>> Favorites:', favourites);
// };

// const removeFavorite = serieIndex => {
//     const favoriteIndex = favourites.indexOf(serieIndex);
//     favourites.splice(favoriteIndex, 1);
//     console.log('Remove paletteIndex from `favorites` array >>> Favorites:', favourites);
// };

// console.log(favourites);





// console.log(series);


// function formataSeries(nameSerie, imageSerie) {
//     const resultSeries = [];

//     resultSeries.push({
//         name: nameSerie,
//         image: imageSerie,
//     });
//     const nameSerieResult = resultSeries[0].name;
//     const imageSerieResult = resultSeries[0].image;

//     console.log('Format JSON data and return it as array', nameSerieResult, imageSerieResult);

//     const seriesContainer = document.querySelector('.js-series-container');
//     let seriesFilter = '';

//     for (let i = 0; i < series.length; i++) {
//         seriesFilter += ` < li > $ { nameSerie[series] } < /li>`;
//         seriesFilter += `<img>${imageSerie[series]} </img>`;
//     }

//     seriesContainer.innerHTML = seriesFilter;

//     // series.push(resultSeries);
//     // console.log(resultSeries);

// }
