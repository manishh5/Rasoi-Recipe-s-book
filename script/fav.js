function displayFavoriteRecipes() {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
        const savedRecipeArray = JSON.parse(savedRecipes);
        const favoriteRecipesContainer = document.querySelector('.body-color');
        favoriteRecipesContainer.innerHTML = '';

        const recipesContainer = document.createElement('div');
        recipesContainer.classList.add('recipes-container');
        favoriteRecipesContainer.appendChild(recipesContainer);

        if (savedRecipeArray.length > 0) {
            savedRecipeArray.forEach((recipe) => {
                if (recipe && recipe.name && recipe.area && recipe.category) {
                    const recipeDiv = document.createElement('div');
                    recipeDiv.classList.add('recipe');

                    const wrapperDiv = document.createElement('div');
                    wrapperDiv.classList.add('wrapper');

                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');
                    imageContainer.style.width = '150px';
                    imageContainer.style.height = '150px';
                    imageContainer.style.margin = '10px';
                    imageContainer.style.display = 'block';

                    const image = document.createElement('img');
                    image.src = recipe.name; // Use the recipe URL instead of a placeholder
                    image.alt = recipe.name;
                    image.style.width = '100%';
                    image.style.height = '100%';
                    image.style.objectFit = 'cover';

                    imageContainer.appendChild(image);

                    // Create a container for the recipe details
                    const detailsContainer = document.createElement('div');
                    detailsContainer.classList.add('details-container');
                    const detailsHtml = `
                        <h3>${recipe.name}</h3>
                        <p>${recipe.area}</p>
                        <p>${recipe.category}</p>
                    `;
                    detailsContainer.innerHTML = detailsHtml;

                    // Add both containers to the wrapper div
                    wrapperDiv.appendChild(imageContainer);
                    wrapperDiv.appendChild(detailsContainer);

                    // Add the wrapper div to the recipe div
                    recipeDiv.appendChild(wrapperDiv);

                    // Add an event listener to the recipe div
                    recipeDiv.addEventListener('click', () => {
                        // Store the recipe data in local storage
                        localStorage.setItem('currentRecipe', JSON.stringify(recipe));

                        // Redirect to the recipe.html page
                        window.location.href = 'recipe.html';
                    });

                    recipesContainer.appendChild(recipeDiv);
                } else {
                    console.log('Recipe data is missing or incorrect:', recipe);
                }
            });
        } else {
            const favoriteRecipesContainer = document.querySelector('.body-color');
            favoriteRecipesContainer.innerHTML = `
                <div class="text-style">
                    Your favourite list is empty!☹️
                </div>
            `;
        }
    } else {
        const favoriteRecipesContainer = document.querySelector('.body-color');
        favoriteRecipesContainer.innerHTML = `
            <div class="text-style">
                Your favourite list is empty!☹️
            </div>
        `;
    }
}

// Call the function to display favorite recipes
displayFavoriteRecipes();