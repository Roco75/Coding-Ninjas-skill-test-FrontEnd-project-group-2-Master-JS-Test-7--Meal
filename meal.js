document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const mealID = params.get('mealID');
    const meal = await fetchMealDetails(mealID);
    displayMealDetails(meal);
  });
  
  async function fetchMealDetails(mealID) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await response.json();
    return data.meals[0];
  }
  
  function displayMealDetails(meal) {
    const mealDetailsDiv = document.getElementById('meal-details');
    mealDetailsDiv.innerHTML = `
      <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
        </div>
      </div>
    `;
  }
  