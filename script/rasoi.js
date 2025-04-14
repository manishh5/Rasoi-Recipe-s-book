const searchBar = document.querySelector('.js-search-bar');
const searchBtn = document.querySelector('.search-button');
const recipeContainer = document.querySelector('.js-search-recipes');
const recipePan = document.querySelector('.js-pan-loader');

// Function to handle search
function handleSearch() {
    const searchInput = searchBar.value.trim();
    if (searchInput) {
        // Hide the search text
        recipeContainer.style.display = 'none';
        recipePan.style.display = 'none';

        // Fetch and display the search results
        fetchRecipe(searchInput);
    }
}

// Function to add recipe to favorite list
function addRecipeToFavorites(recipe) {
  const savedRecipes = localStorage.getItem('recipes');
  if (savedRecipes) {
      const savedRecipeArray = JSON.parse(savedRecipes);
      const existingRecipe = savedRecipeArray.find((r) => r.name === recipe.name);
      if (!existingRecipe) {
          savedRecipeArray.push(recipe);
          localStorage.setItem('recipes', JSON.stringify(savedRecipeArray));
      }
  } else {
      const newRecipeArray = [recipe];
      localStorage.setItem('recipes', JSON.stringify(newRecipeArray));
  }
}

// Event listeners for search button and Enter key
searchBtn.addEventListener('click', handleSearch);
searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Event listener for favorite icon click
recipeContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('favorite-icon')) {
      const recipeDiv = event.target.parentNode.parentNode;
      const recipeName = recipeDiv.querySelector('h3').textContent;
      const recipeArea = recipeDiv.querySelector('p:nth-child(2)').textContent;
      const recipeCategory = recipeDiv.querySelector('p:nth-child(3)').textContent;
      const recipe = {
          name: recipeName,
          area: recipeArea,
          category: recipeCategory,
      };
      addRecipeToFavorites(recipe);
  }
});

const fetchRecipe = async (query) => {
    // Fetch recipes from the API
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
  
    // Get saved recipes from local storage
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      const savedRecipeArray = JSON.parse(savedRecipes);
      const filteredSavedRecipes = savedRecipeArray.filter((recipe) => {
        return recipe.name.toLowerCase().includes(query.toLowerCase());
      });
  
      // Combine API recipes and saved recipes
      const combinedRecipes = response.meals.concat(filteredSavedRecipes);
  
      // Clear the recipe container
      recipeContainer.innerHTML = '';
      recipePan.innerHTML = '';
  
      combinedRecipes.forEach((meal) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
  
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
  
        const favoriteIcon = document.createElement('i');
        favoriteIcon.classList.add('fa', 'fa-heart', 'favorite-icon');
  
        let imageSrc;        let imageAlt;
        let recipeName;
        let recipeArea;
        let recipeCategory;
  
        // Check if the recipe is from the API or local storage
        if (meal.strMealThumb) {
          imageSrc = meal.strMealThumb;
          imageAlt = meal.strMeal;
          recipeName = meal.strMeal;
          recipeArea = meal.strArea;
          recipeCategory = meal.strCategory;
        } else {
          imageSrc = meal.url;
          imageAlt = meal.name;
          recipeName = meal.name;
          recipeArea = meal.ingredients;
          recipeCategory = meal.instructions;
        }
  
        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = imageAlt;
        imageContainer.appendChild(favoriteIcon);
        imageContainer.appendChild(image);
  
        // Create a container for the recipe details
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details-container');
        const detailsHtml = `
          <h3>${recipeName}</h3>
          <p>${recipeArea}</p>
          <p>${recipeCategory}</p>
        `;
        detailsContainer.innerHTML = detailsHtml;
  
        // Add both containers to the recipe div
        recipeDiv.appendChild(imageContainer);
        recipeDiv.appendChild(detailsContainer);
        recipeContainer.appendChild(recipeDiv);
  
        // Add event listener to the image container
        image.addEventListener('click', () => {
          // Get the meal ID from the recipe container
          const mealId = meal.idMeal || meal.name;
  
          // Store the meal ID in local storage
          localStorage.setItem('currentMealId', mealId);
          // Redirect to recipe.html page
          window.location.href = 'recipe.html';
        });
      });
  
      // Show the recipe container
      recipeContainer.style.display = 'block';
      recipePan.style.display = 'block';
    } else {
      // If no saved recipes, just display API recipes
      response.meals.forEach((meal) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
  
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
  
        const favoriteIcon = document.createElement('i');
        favoriteIcon.classList.add('fa', 'fa-heart', 'favorite-icon');
  
        const image = document.createElement('img');
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        imageContainer.appendChild(favoriteIcon);
        imageContainer.appendChild(image);
  
        // Create a container for the recipe details
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details-container');
        const detailsHtml = `
          <h3>${meal.strMeal}</h3>
          <p>${meal.strArea}</p>
          <p>${meal.strCategory}</p>
        `;
        detailsContainer.innerHTML = detailsHtml;
  
        // Add both containers to the recipe div
        recipeDiv.appendChild(imageContainer);
        recipeDiv.appendChild(detailsContainer);
  
        recipeContainer.appendChild(recipeDiv);
  
        // Add event listener to the image container
        image.addEventListener('click', () => {
          // Get the meal ID from the recipe container
          const mealId = meal.idMeal;
  
          // Store the meal ID in local storage
          localStorage.setItem('currentMealId', mealId);
          // Redirect to recipe.html page
          window.location.href = 'recipe.html';
        });
      });
  
      // Show the recipe container
      recipeContainer.style.display = 'block';
      recipePan.style.display = 'block';
    }
  };

searchBtn.addEventListener('click', ()=>{
    const searchInput = searchBar.value.trim();
    fetchRecipe(searchInput);
    //console.log('button clicked');
});