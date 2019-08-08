'use strict';

const form = document.querySelector('.js-form');
const searchButton = document.querySelector('.search-button');
// let favourite = [];
// const favouriteList = document.querySelector('.js-favourite-list');
let series = [];


//comienzo

function searchSerie(event) {
    event.preventDefault();
    const inputSerie = document.querySelector('.js-input-serie').value;
    console.log(`Voy a buscar ${inputSerie}`);

    fetch(`http://api.tvmaze.com/search/shows?q=${inputSerie}`)
        .then(response => response.json())
        .then(data => {
            event.preventDefault();
            console.log(data);
            const seriesContainer = document.querySelector('.js-series-container');
            seriesContainer.innerHTML = '';

            for (let serie of data) {

                let nameSerie = serie.show.name;
                let imageSerie = serie.show.image.original;
                console.log(nameSerie);
                const seriesContainer = document.querySelector('.js-series-container');
                seriesContainer.innerHTML += `<div class="serieContainer"><h2 class="titleSerie">${nameSerie}</h2><img class="img" src="${imageSerie}"></div>`;

            }
        });

}
console.log(series);
searchButton.addEventListener('click', searchSerie);
form.addEventListener('submit', searchSerie);


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
