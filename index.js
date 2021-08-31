
const searchMeal = () => {
    const searchText = document.getElementById('search-area');
    const seachArea = searchText.value;
    searchText.value = ''; // clear search field

    if (seachArea == '') {
        return ('Please enter a name')
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seachArea}
`
        fetch(url)
            .then(res => res.json())
            .then(data => searchShow(data.meals))
    }

}

const searchShow = (meals) => {
    const searchResults = document.getElementById('search-result');
    searchResults.textContent = ''; // clear previous menu from the show result menu
    if (meals.length == 0) {
        return 'Please enter a name of a food'
    }

    for (const meal of meals) {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="details(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}
                </p>
        </div>
        
        `;
        searchResults.appendChild(div)
    }
}

const details = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.meals[0]))
}

const displayDetails = meal => {
    console.log(meal);
    const mealDetailsText = document.getElementById('meal-details');
    mealDetailsText.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top w-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's
                content.</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    </div> 
        `;
    mealDetailsText.appendChild(div);



}