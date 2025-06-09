// async function quoteList() {   
//     const list = document.querySelector('.quotes_list');
//     list.innerHTML = ''; // Clear the existing list

//     try {
//         // Fetch the JSON file
//         const response = await fetch('../quotes.json');
//         if (!response.ok) {
//             throw new Error('Failed to fetch JSON: ' + response.statusText);
//         }

//         const quotesData = await response.json(); // Parse JSON data
//         const books = quotesData.books; // Access the "books" array
//         const allQuotes = [];

//         // Iterate through books and quotes
//         books.forEach(book => {
//             const quotes = book.quotes;
//             quotes.forEach(quote => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = quote; // Add quote text
//                 list.appendChild(listItem);

//                 // Add the quote to the array
//                 allQuotes.push(quote);
//             });
//         });

//         // Store the array of quotes in localStorage
//         localStorage.setItem('quotes', JSON.stringify(allQuotes));
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Attach event listener to the button
// document.querySelector('#load_quotes').addEventListener('click', quoteList);

// Key for localStorage
const quotesKey = "pride-prejudice";

// Function to update the list in the DOM
function updateList(quotes) {
  const list = document.querySelector(".quotes_list");
  list.innerHTML = ""; // Clear existing list
  quotes.forEach(quote => {
    const listItem = document.createElement("li");
    listItem.textContent = quote;
    list.appendChild(listItem);
  });
}

// Function to load quotes from JSON and update the list
async function loadQuotes() {
  try {
    const response = await fetch("src\public\week7\quotes.json");
    if (!response.ok) {
      throw new Error("Failed to load quotes.json");
    }
    const data = await response.json();
    const books = data.books;

    // Find "Pride and Prejudice" quotes
    const prideQuotes = books.find(book => book.title === "Pride and Prejudice")?.quotes || [];

    // Update list and store in localStorage
    updateList(prideQuotes);
    localStorage.setItem(quotesKey, JSON.stringify(prideQuotes));

    // Hide the button after loading quotes
    const button = document.getElementById("load_quotes");
    button.style.display = "none";
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// Function to initialize the page
function initialize() {
  const button = document.getElementById("load_quotes");
  const storedQuotes = localStorage.getItem(quotesKey);

  if (storedQuotes) {
    // Load quotes from localStorage
    const quotes = JSON.parse(storedQuotes);
    updateList(quotes);

    // Hide the button as quotes are already loaded
    button.style.display = "none";
  } else {
    // Set up event listener for the button
    button.addEventListener("click", loadQuotes);
  }
}

// Initialize the page when DOM content is loaded
document.addEventListener("DOMContentLoaded", initialize);
