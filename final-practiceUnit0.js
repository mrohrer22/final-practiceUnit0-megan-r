/*
Final Practice Unit 0
Create a repo with example code for how you would use the skills you have learned from Unit 0 in your application.  Keep in mind: you will not be building a complete application!  You are instead creating examples of code that might need to exist in this application, using the skills you have learned in Unit 0.

The code in your repo should:
- Include commented pseudocode to break down the logic for what you are trying to accomplish in each example.
- Use console logs to test your outputs and ensure your code works as expected.
- Follow all of the syntax rules and conventions you have learned about in Unit 0.
- Include comments to identify where the skill from each module is represented in the code.
    - You’ll have comments to explain 6 total skills. One from each of the following modules:
        - Values, Data Types, and Operations
        - Stringing Characters Together
        - Control Structures and Logic
        - Building Arrays
        - Using Arrays
        - Working With Loops
    - Keep in mind that you may use multiple skills on one line of code–just make sure you explain each skill in the comment.

Psuedo Code:
Megan’s Bakery Order System
1. Initialize Data
Create an array of bakery items and their prices:
    - Sourdough: $14
    - Sandwich Bread: $12
    - Brownies: $10
    - Shortbread: $10
Set totalOrderPrice = 0
Create an empty array called shoppingCart

2. User Authentication
Prompt user: "Login or Checkout as Guest?"
If user chooses "Login":
    - (Simple logic for login success)
Else:
    - Prompt user for "Full Name".
    - Store in a variable customerName.
    - Prompt user for "Shipping Address".
    - Store in a variable customerAddress.
    - Display "Welcome, " + customerName + ". Let's start your order."

3. Ordering Loop
While the user wants to keep shopping:
    - Display the list of items and prices.
    - Prompt user to select an item.
    - Add the item name to the shoppingCart list using .join()
    - Add the price of the selected item to totalOrderPrice.
Prompt user: "Would you like to add another item? (Yes/No)"
    - If "No", Display "Items in your cart: " + shoppingCart
        - Display "Your total is: $" + totalOrderPrice
    - Exit the loop.

4. Payment Processing
Display totalOrderPrice.
Prompt user: "Pay by Cash or Card?"
If user chooses "Cash":
    - Go to Checkout.
Else if user chooses "Card":
    - Repeat until valid:
        - Prompt for 15-digit card number.
        - Validate (Check if length is 15 and is a number).
    - Repeat until valid:
        - Prompt for Expiration Date.
        - Validate (Check format).
    - Repeat until valid:
        - Prompt for CVV.
        - Validate (Check if length is 3 and is a number).
    - Go to Checkout.

5. Checkout
Display "Thank you for your business!"
End Program.

*/

// Link to Final Worksheet: https://docs.google.com/document/d/1dMeHtR4QGKxIWDjEaJFO1rxFAB_5RihILjxjGWhCRGg/edit?usp=sharing

//1. Initialize Data
const readline = require('readline-sync');
console.log("Hello and Welcome to Megan's Bakery!");

//2. User Authentication
let customerName = "";
let customerAddress = "";

let returning = readline.question("Are you a returning customer? (yes/no): ");

if (returning.toLowerCase() === "yes") {
    customerName = readline.question("Please enter your username: ");
    
    let isValidPassword = false;
    let password = "";

    while (!isValidPassword) {
        password = readline.question("Please enter your password: ");
        let isLongEnough = password.length >= 8;
        let hasNumber = false;
        for (let i = 0; i < password.length; i++) {
            if (password[i] !== " " && !isNaN(password[i])) {
                hasNumber = true;
                break; 
            }
        }
        if (isLongEnough && hasNumber) {
            isValidPassword = true;
            console.log("Login successful! Welcome back, " + customerName + "!");
        } else {
            console.log("Error: Password must be at least 8 characters long and include at least one number.");
        }
    }
} else {
    // Guest Flow
    customerName = readline.question("Please enter your full name: ");
    customerAddress = readline.question("Please enter your shipping address: ");
    
    console.log("Thank you, " + customerName + ". We will ship your order to: " + customerAddress);
}
//3. Ordering Loop

console.log("\nLet's start your order, " + customerName + "!"); //Stringing Characters Together
let itemNames = ["Sourdough Bread", "Sandwich Bread", "Brownies", "Shortbread"]; //Building Arrays
let itemPrices = [14, 12, 10, 10];
let totalOrderPrice = 0;
let shoppingCart = [];

let shopping = true;

while (shopping) {
    console.log("\n--- MEGAN'S BAKERY MENU ---");
    for (let i = 0; i < itemNames.length; i++) {
        console.log((i + 1) + ". " + itemNames[i] + " - $" + itemPrices[i]);
    }

    let choice = readline.question("\nPlease enter the number of the item you'd like to add: ");
    
    // Convert choice to an index (since arrays start at 0, we subtract 1)
    let index = parseInt(choice) - 1;

    // Check if the choice is valid
    if (index >= 0 && index < itemNames.length) {
        let pickedItem = itemNames[index];
        let pickedPrice = itemPrices[index];

        shoppingCart.push(pickedItem);
        totalOrderPrice += pickedPrice;

        console.log("Added " + pickedItem + " to your cart.");
    } else {
        console.log("Invalid selection. Please choose a number from the menu.");
    }

    let continueShopping = readline.question("Would you like to add another item? (yes/no): ");
    if (continueShopping.toLowerCase() !== "yes") {
        shopping = false;
    }
}

console.log("\n--- YOUR ORDER SUMMARY ---");
console.log("Items: " + shoppingCart.join(", "));
console.log("Total: $" + totalOrderPrice);

console.log("\n--- PAYMENT ---");
let paymentMethod = readline.question("How would you like to pay? (Cash/Card): ");

if (paymentMethod.toLowerCase() === "cash") {
    // Cash is simple - just move to checkout
    console.log("Cash payment selected.");
} else {
    console.log("Card payment selected. Please enter your details.");

    let cardNumber = "";
    while (cardNumber.length !== 15 || isNaN(cardNumber)) {
        cardNumber = readline.question("Enter your 15-digit card number: ");
        if (cardNumber.length !== 15 || isNaN(cardNumber)) {
            console.log("Error: Please enter exactly 15 numbers.");
        }
    }

    let expDate = "";
    while (expDate === "") {
        expDate = readline.question("Enter Exp Date (MM/YY): ");
        if (expDate === "") {
            console.log("Error: Expiration date cannot be blank.");
        }
    }

    let cvv = "";
    while (cvv.length !== 3 || isNaN(cvv)) {
        cvv = readline.question("Enter your 3-digit CVV: ");
        if (cvv.length !== 3 || isNaN(cvv)) {
            console.log("Error: Please enter exactly 3 numbers.");
        }
    }
}

// Final Checkout Message
console.log("\n*********************************");
console.log("Thank you for your business, " + customerName + "!");
console.log("Your order of " + shoppingCart.join(", ") + " is complete.");
console.log("*********************************");