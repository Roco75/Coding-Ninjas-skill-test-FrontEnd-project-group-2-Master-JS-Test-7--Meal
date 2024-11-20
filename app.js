const apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Fetch meals based on search query
async function searchMeals(event) {
  const query = event ? event.target.value : "";
  const response = await fetch(apiURL + query);
  const data = await response.json();
  displayMeals(data.meals || []);
}

// Display meals in search results
function displayMeals(meals) {
  const mealList = document.getElementById("mealList");
  mealList.innerHTML = "";
  meals.forEach(meal => {
    const mealItem = document.createElement("div");
    mealItem.className = "meal-item card p-2";

    mealItem.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded">
      <div>
        <h5>${meal.strMeal}</h5>
        <button class="btn btn-link p-0" onclick="viewMeal(${meal.idMeal})">View Details</button>
      </div>
      <button class="btn btn-outline-danger favourite-btn" onclick="addToFavourites(${meal.idMeal}, '${meal.strMeal}', '${meal.strMealThumb}')">Add to Favourites</button>
    `;

    mealList.appendChild(mealItem);
  });
}

// View meal details on a new page
function viewMeal(id) {
  window.location.href = `meal.html?mealId=${id}`;
}

// Add meal to favourites and save to localStorage
function addToFavourites(id, name, thumb) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (!favourites.some(meal => meal.id === id)) {
    favourites.push({ id, name, thumb });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert("Added to Favourites!");
  } else {
    alert("Already in Favourites!");
  }
}

// Display favourite meals on favourites.html page
function displayFavouriteMeals() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const favList = document.getElementById("favList");
  favList.innerHTML = favourites.map(meal => `
    <div class="meal-item card p-2">
      <img src="${meal.thumb}" alt="${meal.name}" class="img-fluid rounded">
      <div>
        <h5>${meal.name}</h5>
        <button class="btn btn-link p-0" onclick="viewMeal(${meal.id})">View Details</button>
      </div>
      <button class="btn btn-outline-danger remove-btn" onclick="removeFromFavourites(${meal.id})">Remove from Favourites</button>
    </div>
  `).join("");
}

// Remove meal from favourites
function removeFromFavourites(id) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter(meal => meal.id !== id);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  displayFavouriteMeals();
}

// Initial load of all meals
window.onload = () => {
  searchMeals();  // Fetch and display all meals on page load
};

// Run displayFavouriteMeals on favourites.html page load
if (window.location.pathname.includes("favourites.html")) {
  displayFavouriteMeals();
}
