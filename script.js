const formEl = document.querySelector("from");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const searchButton = document.getElementById("search-button");
const showMore = document.getElementById("show-more-button");



const API_KEY = '';
let page = 1;
let inputData = "";
searchResult.innerHTML = "";
const getUserInput = (e) => {
    e.preventDefault() 
    inputData = inputEl.value.trim();

    if (!inputData) return;
    
    
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;
    fetch(url).then(res => res.json())
        .then(data => {
            const result = data.results;
            console.log(result);
            result.forEach((image) => {
                searchResult.insertAdjacentHTML("beforeend", createImageCard(image));

            })
        }).catch((error) => {
            console.log(error)
        })
        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }

}
const createImageCard = (image) => {
    return `<div class="image-result">
                <img src="${image.urls.full}"
                    alt="${image.alt_description}">
                <a href="${image.links.download}"
                    target="_blank">${image.alt_description}</a>
            </div>`;
}

searchButton.addEventListener("click", getUserInput);
showMore.addEventListener("click", getUserInput);