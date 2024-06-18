const prevBtn = document.querySelectorAll(".btn")[0];
const nextBtn = document.querySelectorAll(".btn")[1];
let drinkNum = 0;
let maxDrinkNum = 0;

// fetch drinks func
function getDrinks(n) {
  let query = document.querySelector("input").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.drinks && data.drinks.length > 0) {
        maxDrinkNum = data.drinks.length - 1;
        return data.drinks[n];
      } else {
        maxDrinkNum = 0;
        return null;
      }
    })
    .then((drink) => {
      if (drink) {
        document.querySelector("img").src = drink.strDrinkThumb;
        document.querySelector(".drinkName").innerText = drink.strDrink;
        document.querySelector(".drinkInstructions").innerText =
          drink.strInstructions;
        document.querySelector(".drinkIngredients").innerHTML = "";
        let ingredients = [];
        for (let key in drink) {
          if (key.includes("strIngredient")) {
            drink[key] ? ingredients.push(drink[key]) : null;
          }
        }
        ingredients.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.classList.add("ingredient");
          listItem.innerText = item;
          document.querySelector(".drinkIngredients").appendChild(listItem);
        });
      } else {
        document.querySelector("img").src = "";
        document.querySelector(".drinkName").innerText = "No drink found";
        document.querySelector(".drinkInstructions").innerText = "";
        document.querySelector(".drinkIngredients").innerHTML = "";
      }
      toggleBtn();
    });
}

// fetch drink event listener
document.querySelector("form").addEventListener("submit", (e) => {
  drinkNum = 0;
  e.preventDefault();
  getDrinks(drinkNum);
});

// disable/enable btns
function toggleBtn() {
  if (maxDrinkNum === 0) {
    nextBtn.classList.add("disabled");
    prevBtn.classList.add("disabled");
  } else if (drinkNum === 0) {
    nextBtn.classList.remove("disabled");
    prev.classList.add("disabled");
  } else if (maxDrinkNum === drinkNum) {
    nextBtn.classList.add("disabled");
    prevBtn.classList.remove("disabled");
  } else {
    nextBtn.classList.remove("disabled");
    prevBtn.classList.remove("disabled");
  }
}

// change drinks
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.innerText === "Previous" && drinkNum !== 0) {
      drinkNum -= 1;
    } else if (btn.innerText === "Next" && drinkNum !== maxDrinkNum) {
      drinkNum += 1;
    }
    getDrinks(drinkNum);
  });
});

toggleBtn();
