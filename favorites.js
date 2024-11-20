document.addEventListener('DOMContentLoaded', async () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteMealsDiv = document.getElementById('favorite-meals');
  
    if (favorites.length === 0) {
      favoriteMealsDiv.innerHTML = '<p>No favorite meals added yet!</p>';
    } else {
      const meals = await fetchFavoriteMeals(favorites);
      displayFavoriteMeals(meals);
    }
  });
  
  async function fetchFavoriteMeals(favoriteIDs) {
    const promises = favoriteIDs.map(id => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json()));
    const results = await Promise.all(promises);
    return results.map(result => result.meals[0]);
  }
  
  function displayFavoriteMeals(meals) {
    meals.forEach(meal => {
      const mealCard = `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <button class="btn btn-danger" onclick="removeFromFavorites(${meal.idMeal})">Remove from Favorites</button>
            </div>
          </div>
        </div>
      `;
      document.getElementById('favorite-meals').innerHTML += mealCard;
    });
  }
  
  function removeFromFavorites(mealID) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== mealID);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    location.reload();
  }
  