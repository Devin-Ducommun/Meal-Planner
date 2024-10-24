let mealCache = [];
let weekPlan = ["", "", "", "", "", "", ""]; // Sunday to Saturday

// Load meal cache from localStorage when the page loads
window.onload = function () {
    if (localStorage.getItem('mealCache')) {
        mealCache = JSON.parse(localStorage.getItem('mealCache'));
        console.log("Meal cache loaded:", mealCache); // Debugging log
        displayMealCache();  // Display the cache if data exists
    } else {
        console.log("No mealCache found in localStorage"); // Debugging log
    }
};

// Function to add a meal to the cache
function addMealToCache(mealName) {
    if (mealName.trim() !== "") {
        mealCache.push(mealName);
        displayMealCache();
        saveMealCache(); // Save to localStorage after adding a meal
        console.log("Meal added to cache:", mealCache); // Debugging log
        document.getElementById('meal-name').value = ""; // Clear input after adding
    }
}

// Function to display the meal cache
function displayMealCache() {
    const cacheContainer = document.getElementById("meal-cache");
    cacheContainer.innerHTML = ""; // Clear the previous content

    mealCache.forEach((meal, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${meal} 
            <button class="delete-btn" onclick="removeMealFromCache(${index})">Remove</button>
        `;
        cacheContainer.appendChild(li);
    });
}

// Function to remove a meal from the cache
function removeMealFromCache(index) {
    mealCache.splice(index, 1); // Remove meal at the given index
    displayMealCache(); // Update the meal cache display
    saveMealCache(); // Save the updated cache to localStorage
    console.log("Meal removed, updated cache:", mealCache); // Debugging log
}

// Function to save meal cache to localStorage
function saveMealCache() {
    localStorage.setItem('mealCache', JSON.stringify(mealCache));
    console.log("Meal cache saved to localStorage:", mealCache); // Debugging log
}

// Function to shuffle the array (Fisher-Yates Shuffle Algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to plan the week (with random shuffle)
function planMyWeek() {
    if (mealCache.length === 0) return;

    // Shuffle the meals randomly
    let shuffledMeals = shuffle([...mealCache]);

    // Reset week plan
    weekPlan = ["", "", "", "", "", "", ""];

    // Fill the week plan with meals from shuffled cache
    for (let i = 0; i < 7; i++) {
        weekPlan[i] = shuffledMeals[i % shuffledMeals.length];
    }

    displayWeekPlan();
}

// Function to display the week plan on the calendar
function displayWeekPlan() {
    const weekDays = document.getElementsByClassName("day");
    for (let i = 0; i < weekDays.length; i++) {
        weekDays[i].querySelector("p").innerText = weekPlan[i];
    }
}
