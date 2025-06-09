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


// Check if quotes are in localStorage
const quotesKey = "pride-prejudice";
const storedQuotes = localStorage.getItem(quotesKey);

const list = document.querySelector(".quotes_list");
const button = document.getElementById("load_quotes");

// Function to update the list
function updateList(quotes) {
  list.innerHTML = ""; // Clear existing list
  quotes.forEach(quote => {
    const listItem = document.createElement("li");
    listItem.textContent = quote;
    list.appendChild(listItem);
  });
}

// Load from localStorage or fetch from JSON
if (storedQuotes) {
  const quotes = JSON.parse(storedQuotes);
  updateList(quotes);
  button.style.display = "none"; // Hide button if quotes exist
} else {
  button.addEventListener("click", async () => {
    try {
      const response = await fetch("./quotes.json");
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
      button.style.display = "none";
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  });
}
