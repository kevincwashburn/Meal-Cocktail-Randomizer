var mealTitle;
var drinkTitle;


function generateMeal() {
    var userIngredient = $("#userIngredient").val();
    var ingredient = userIngredient.replace(" ", "_");

    if ($("#mealCatTab").hasClass("is-active")) {
        var mealQueryUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + ingredient;
    }
    else if ($("#areaTab").hasClass("is-active")) {
        var mealQueryUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + ingredient;
    }
    else {
        var mealQueryUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
    }

    $.ajax({
        url: mealQueryUrl,
        method: "GET"

    }).then(function (response) {

        mealsArray = response.meals;
        var randomMeal = mealsArray[Math.floor(Math.random() * mealsArray.length)];
        mealTitle = randomMeal.strMeal;

        $("#mealContent").empty();
        $("#mealContent").append("<img class='is-100x100' src='" + randomMeal.strMealThumb + "'>");
        $("#mealTitle").text(mealTitle);

        $("#btnMealNext").on("click", function (event) {
            event.preventDefault();
            mealsArray = response.meals;
            randomMeal = mealsArray[Math.floor(Math.random() * mealsArray.length)];
            mealTitle = randomMeal.strMeal;

            $("#mealContent").empty();
            $("#mealContent").append("<img class='is-100x100' src='" + randomMeal.strMealThumb + "'>");
            $("#mealTitle").text(mealTitle);
        });

    });
};

function generateRandomMeal() {
    var queryUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

    $.ajax({
        url: queryUrl,
        method: "GET"

    }).then(function (response) {
        mealTitle = response.meals[0].strMeal;
        $("#mealTitle").text(mealTitle);
        $("#mealContent").empty();
        $("#mealContent").append("<img class='is-100x100' src='" + response.meals[0].strMealThumb + "'>");
    });
};

function generateCocktail() {
    var userLiquor = $("#userLiquor").val();
    var liquor = userLiquor.replace(" ", "_");

    if ($("#catTab").hasClass("is-active")) {
        var drinkQueryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + liquor;
    }
    else {
        var drinkQueryUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + liquor;
    }

    $.ajax({
        url: drinkQueryUrl,
        method: "GET"
    }).then(function (response) {
        drinksArray = response.drinks;
        var randomDrink = drinksArray[Math.floor(Math.random() * drinksArray.length)];
        drinkTitle = randomDrink.strDrink;

        $("#cocktailContent").empty();
        $("#cocktailContent").append("<img class='image is-100x100' src='" + randomDrink.strDrinkThumb + "'>");
        $("#cocktailTitle").text(drinkTitle);

        $("#btnDrinkNext").on("click", function (event) {
            event.preventDefault();
            drinksArray = response.drinks;
            randomDrink = drinksArray[Math.floor(Math.random() * drinksArray.length)];
            drinkTitle = randomDrink.strDrink;

            $("#cocktailContent").empty();
            $("#cocktailContent").append("<img class='image is-100x100' src='" + randomDrink.strDrinkThumb + "'>");
            $("#cocktailTitle").text(drinkTitle);
        });

    });
}
// getCocktailDetails("11007");
function getCocktailDetails(a) {
    var Url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + a;
    $.ajax({
        url: Url,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        for (var prop in response.drinks[0]) {
            // console.log(response.drinks[0][prop])
            if (prop === "strInstructions" || (prop.includes("strIngredient") || prop.includes("strMeasure")) && response.drinks[0][prop] !== null) {
                console.log(prop, ":", response.drinks[0][prop]);
            };
        };
    });
};

// getMealDetails("52772")
function getMealDetails(a) {
    var Url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + a;
    $.ajax({
        url: Url,
        method: "GET"
    }).then(function(response){
        console.log(response.meals[0])
        for (var prop in response.meals[0]){
            // console.log(prop)
            if (prop === "strInstructions" || (prop.includes("strIngredient") || prop.includes("strMeasure")) && response.meals[0][prop] !== null && response.meals[0][prop] !== "") {
            console.log(prop, ":", response.meals[0][prop]);
            };
        };
    });
};

function generateRandomCocktail() {
    var queryUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    $.ajax({
        url: queryUrl,
        method: "GET"

    }).then(function (response) {
        drinkTitle = response.drinks[0].strDrink;
        $("#cocktailTitle").text(drinkTitle);
        $("#cocktailContent").empty();
        $("#cocktailContent").append("<img class='image is-100x100' src='" + response.drinks[0].strDrinkThumb + "' alt='" + response.drinks[0].strDrink + "'>");
    });
};

$("#btnMealNext").on("click", function (event) {
    event.preventDefault();
    if (!$("#userIngredient").val()) {
        generateRandomMeal();
    } else {
        generateMeal()
    };
});

$("#btnDrinkNext").on("click", function (event) {
    event.preventDefault();
    if (!$("#userLiquor").val()) {
        generateRandomCocktail();
    } else {
        generateCocktail()
    };
});

$("#btnSubmit").on("click", function (event) {
    event.preventDefault();

    if (!$("#userIngredient").val()) {
        generateRandomMeal();
    } else {
        generateMeal()
    };


    if (!$("#userLiquor").val()) {
        generateRandomCocktail();
    } else {
        generateCocktail()
    };

});

$("#btnMealSave").on("click", function (event) {
    event.preventDefault();

    $("#savedMeal").text(mealTitle);
    $("#mealRecipe").text("reciple list placeholder");

});

$("#btnDrinkSave").on("click", function (event) {
    event.preventDefault();

    $("#savedCocktail").text(drinkTitle);
    $("#cocktailRecipe").text("recipe list placeholder");
});

// Listeners for radio buttons
$(document).on("click", ".mealSearchParams", function () {
    $(".mealSearchParams").removeClass("is-active")
    $(this).addClass("is-active")

    console.log($(this).text())
    console.log("Category")
    if ($(this).text().trim() === "Category") {
        console.log("KJHBH")
        $("#userIngredient").attr("placeholder", "e.g., Seafood");
    }
    else if ($(this).text().trim() === "Area") {
        $("#userIngredient").attr("placeholder", "e.g., Canadian");
    }
    else if ($(this).text().trim() === "Ingredient") {
        $("#userIngredient").attr("placeholder", "e.g., Chicken Breast");
    }
});

$(document).on("click", ".cocktailSearchParams", function () {
    $(".cocktailSearchParams").removeClass("is-active")
    $(this).addClass("is-active")

    if ($(this).text().trim() === "Category") {
        $("#userLiquor").attr("placeholder", "e.g., Cocktail");
    }
    else if ($(this).text().trim() === "Ingredient") {
        $("#userLiquor").attr("placeholder", "e.g., Gin");
    }
});
