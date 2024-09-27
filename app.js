const searchInput = document.getElementById('meal-search');
const resultsContainer = document.getElementById('search-results');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 0) {
    const meals = await searchMeals(query);
    displayResults(meals);
  } else {
    resultsContainer.innerHTML = ''; // Clear results if search input is empty
  }
});

// Function to search meals from TheMealDB API
async function searchMeals(query) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  return data.meals || [];
}

// Function to display search results dynamically
function displayResults(meals) {
  resultsContainer.innerHTML = '';
  meals.forEach(meal => {
    const mealCard = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <button class="btn btn-primary" onclick="viewMealDetails(${meal.idMeal})">View Details</button>
            <button class="btn btn-secondary" onclick="addToFavorites(${meal.idMeal})">Add to Favorites</button>
          </div>
        </div>
      </div>
    `;
    resultsContainer.innerHTML += mealCard;
  });
}

// Function to open the meal details page
function viewMealDetails(mealID) {
  window.location.href = `meal.html?mealID=${mealID}`;
}

// Function to add a meal to favorites and store it in localStorage
function addToFavorites(mealID) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(mealID)) {
    favorites.push(mealID);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
