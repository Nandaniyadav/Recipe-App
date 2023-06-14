const searchbox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".searchbtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeDetailsContent = document.querySelector(".recipe-details-content");

//function to get recipes
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipe....</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea}<span> Dish </p>
    <p>Belongs to </span>
    ${meal.strCategory}</p>
    `;

      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      //Add EventListener to recipe button
      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in fetching Recipes....</h2>";
  }
};

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
  let ingredentsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredentsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredentsList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
  <div class="recipeInstructions">
   <h3>Ingredents:</h3>
   <p >${meal.strInstructions}</p>
  </div>
  `;

  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchbtn.addEventListener("click", (e) => {
  //preventDefault se page bar bar reload nhi hota h
  e.preventDefault();
  const searchInput = searchbox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal You want to search</h2>`;
    return;
  }
  fetchRecipes(searchInput);
  // console.log("Button Clicked");
});
