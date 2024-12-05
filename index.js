// Importing the required modules to use in our server application
import express from "express";  // Express framework helps manage routing, HTTP requests, etc.
import bodyParser from "body-parser";  // body-parser helps to parse (analyze) incoming form data in request bodies

const app = express();  // Creates an instance of an Express application
const port = 3000;  // Specifies the port where the server will listen for requests

// Recipe data as a JSON string (contains information about different tacos) this is just for this practice example, this sould be data from an API
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  }, {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  }, {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  }, {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }]}},{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  }, {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  }, {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"] }]}},{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [ "Shredded Cabbage", "Carrot", "Mayonnaise", "Lime Juice", "Salt"]}, {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"] }, {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]}]} }]';

let selectedRecipe;  // Placeholder for the recipe selected by the user

// Middleware to serve static files (e.g., CSS, images) from the "public" folder
app.use(express.static("public"));

// Middleware to parse form data sent via POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// GET request to serve the home page
app.get("/", (req, res) => {
  // Renders the "index.ejs" template and passes the selectedRecipe (if any) to it
  res.render("index.ejs", { recipe: selectedRecipe });
});

// POST request to handle recipe selection
app.post("/recipe", (req, res) => {
  // Extract which button was pressed
  const choice = req.body.choice;  // This gets the "value" of the "choice" button that was pressed in the EJS form labeled as "name"

  // Parse the recipe JSON data to convert it from a string to an object and use it to select the data from the plane string json
  const recipes = JSON.parse(recipeJSON);
  
  // Get the recipe based on user's choice (chicken, beef, or fish)
  // Find the selected recipe based on user's choice
  // We want to determine which recipe (chicken, beef, or fish) the user chose based on their form submission.
  if (choice === "chicken") {
    // if is a conditional statement used to execute a block of code if the condition evaluates to true.
    // choice is the value received from the user's form submission.
    // === "chicken" means that we are checking if the user's choice is exactly equal to the string "chicken".
    // If choice is "chicken", it means the user pressed the Chicken Taco button.
    selectedRecipe = recipes.find(recipe => recipe.name === "Chicken Taco");
    // selectedRecipe is a variable that will store the specific recipe object based on the user's selection.
    // recipes.find(...) is a method used to find a specific object within the recipes array.
    // .find(...) is a built-in array method in JavaScript that looks for an element that matches the specified condition.
    // recipe => recipe.name === "Chicken Taco" is called an arrow function. It’s used here as a shorthand way to define an anonymous function:
    // The arrow function is checking if recipe.name (which is the name of the current recipe object being iterated over in the array) is equal to "Chicken Taco".
    // The .find(...) method will return the first recipe in the recipes array whose name property matches "Chicken Taco".
    // This means that selectedRecipe now contains the Chicken Taco recipe object, which can be passed to the front-end for rendering.
  } else if (choice === "beef") {
    // else if is another conditional statement that provides an alternative if the previous if condition was false.
    // choice === "beef" checks if the user selected "beef" by clicking on the Beef Taco button.
    selectedRecipe = recipes.find(recipe => recipe.name === "Beef Taco");
    // Here, selectedRecipe is set to the Beef Taco recipe object.
    // Similar to the "chicken" section, we use .find(...) to locate the recipe object with the name "Beef Taco" within the recipes array.
    // If found, selectedRecipe now holds the full recipe information for the Beef Taco.
  } else if (choice === "fish") {
    // This else if condition handles the case where the user's choice is "fish".
    // If the form value choice matches "fish", then we move to the next line to assign the correct recipe to selectedRecipe.
    selectedRecipe = recipes.find(recipe => recipe.name === "Fish Taco");
    // The .find(...) method searches for the object within the recipes array where name is equal to "Fish Taco".
    // The selectedRecipe variable now stores the entire Fish Taco recipe object.
  }
  // This is the closing bracket for the conditional statements.

  // Redirect back to the home page to display the selected recipe
  res.redirect("/");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
