// String the URL together from the user input and call the fetchData function.
function showSearchResults() {
    let query = window.sessionStorage.getItem('query');

    let url = 'https://newsapi.org/v2/everything?q=' + query;
    
    if (window.sessionStorage.getItem('language')) {
            url += '&language=' + window.sessionStorage.getItem('language');
    }

    if ($('#sortby')) { if ($('#sortby').val()) {
        url += '&sortBy=' + $('#sortby').val();
    }}

    url += '&apiKey=081f564d356d457982b0cf109a72aea8';

    window.sessionStorage.setItem('url', url);
    
    fetchDataForSearch(url);
}

// Send GET request and call the renderListFromResponseObject function with the response data.
function fetchDataForSearch(url) {

    axios.get(url)
    .then(response => {

        window.sessionStorage.setItem('totalResults', response.data.totalResults);

        renderListFromResponseObject(response.data.articles);       

    })
    .catch(err =>
        console.log(err)
    );
}

// Renders the contents of an array to the search results page.
function renderListFromResponseObject(responseArray) {

    let canvas = document.createElement('div');

    for (article of responseArray) {
        
        newRow = showSearchItem(article);
        canvas.appendChild(newRow);
    }

    $('#searchresults').html(canvas.innerHTML);
}

// Renders the html for a search result.
function showSearchItem(article) {

    let newRow = document.createElement('div');
    newRow.classList.add('row', 'justify-content-center', 'my-1', 'pb-4');

    let newCol = document.createElement('div');
    newCol.classList.add('col-12', 'section-container');

    let newAnchor = document.createElement('a');
    newAnchor.href = article.url;
    newAnchor.target = '_blank';

    let newArticle = document.createElement('article');
    newArticle.classList.add('row');

    let newLine = document.createElement('hr');
    newLine.classList.add('col-12');

    // Image
    var newImgCol = document.createElement('div');
    newImgCol.classList.add('col-12', 'col-sm-3');

    if (article.urlToImage) {
        var newImg = document.createElement('img');
        newImg.src = article.urlToImage;
    }

    // Text
    let newTextCol = document.createElement('div');
    newTextCol.classList.add('col-12', 'col-sm-9');

    let date = new Date(article.publishedAt);
    let newTime = document.createElement('p');
    newTime.classList.add('published-time');
    newTime.innerHTML = date.toString().slice(0,21);

    let newHeading = document.createElement('h3');
    newHeading.innerText = article.title;

    let newParagraph = document.createElement('p');
    newParagraph.classList.add('mb-4');
    newParagraph.innerText = article.description;

    let newSource = document.createElement('p')
    newSource.classList.add('source-text')
    newSource.innerText = article.source.name;

    // Append it together
    newTextCol.appendChild(newTime);
    newTextCol.appendChild(newHeading);
    newTextCol.appendChild(newParagraph);
    newTextCol.appendChild(newSource);

    if (article.urlToImage) {
        newImgCol.appendChild(newImg);
    }

    newArticle.appendChild(newImgCol);
    newArticle.appendChild(newTextCol);
    newAnchor.appendChild(newArticle);
    newCol.appendChild(newAnchor);
    newRow.appendChild(newCol);
    newRow.appendChild(newLine);

    return newRow;
}

// Renders html for the metainfo for the search.
function showSearchMetaInfo() {
    let newRow = document.createElement('div');
    newRow.classList.add('row', 'justify-content-center', 'p-1');

    let newCol = document.createElement('div');
    newCol.classList.add('col-12', 'section-container');

    let newParagraph = document.createElement('p');
    newParagraph.classList.add('mx-3');
    newParagraph.innerHTML = "Showing results for: " + window.sessionStorage.getItem('query');

    // Put it together
    newCol.appendChild(newParagraph);
    newRow.appendChild(newCol);

    $('#metainfo').html(newRow);
}

// Saves the entries from the user input fields to session storage.
function saveUserInputToSessionStorage() {

    if ($('#searchinput').val()) {
        window.sessionStorage.setItem('query', $('#searchinput').val());
    }

    if ($('#language').val()) {
        window.sessionStorage.setItem('language', $('#language').val());
    }

    if ($('#sortby').val()) {
        window.sessionStorage.setItem('sortby', $('#sortby').val());
    }
}