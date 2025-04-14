const currentMealId = localStorage.getItem('currentMealId');

// Fetch the meal details from the API
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentMealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        // Display the meal details on the page
        const recipeContainer = document.querySelector('.recipe-details');
        const recipeHtml = `
            <img id="recipe-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="details">
                <h1 id="recipe-name">${meal.strMeal}</h1>
                <p id="recipe-area">${meal.strArea}</p>
                <p id="recipe-category">${meal.strCategory}</p>
                <p class="instructions" id="recipe-instructions">${meal.strInstructions}</p>
            </div>
        `;
        recipeContainer.innerHTML = recipeHtml;
    });