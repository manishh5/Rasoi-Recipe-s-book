const form = document.querySelector('.add-recipe');

// Function to save recipe to local storage
function saveRecipeToStorage(event) {
  event.preventDefault();

  // Get the form data
  const recipeName = document.querySelector('.recipe-name').value;
  const ingredients = document.querySelector('.recipe-name2').value;
  const instructions = document.querySelector('.recipe-name2').value;
  const recipeUrl = document.querySelector('.recipe-name').value;

  // Create a new recipe object
  const recipe = {
    name: recipeName,
    ingredients: ingredients,
    instructions: instructions,
    url: recipeUrl,
  };

  // Get the existing recipes from local storage
  const existingRecipes = localStorage.getItem('recipes');
  if (existingRecipes) {
    const recipes = JSON.parse(existingRecipes);
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
  } else {
    localStorage.setItem('recipes', JSON.stringify([recipe]));
  }

  // Clear the form fields
  document.querySelector('.recipe-name').value = '';
  document.querySelector('.recipe-name2').value = '';
  document.querySelector('.recipe-name2').value = '';
  document.querySelector('.recipe-name').value = '';

  // Display a success message
  alert('Recipe saved successfully!');
}
// Add event listener to the form
form.addEventListener('submit', saveRecipeToStorage);