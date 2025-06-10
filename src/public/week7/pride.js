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
// const quotesKey = "pride-prejudice";

// Function to update the list in the DOM
// function updateList(quotes) {
//   const list = document.querySelector(".quotes_list");
//   list.innerHTML = ""; // Clear existing list
//   quotes.forEach(quote => {
//     const listItem = document.createElement("li");
//     listItem.textContent = quote;
//     list.appendChild(listItem);
//   });
// }

// Function to load quotes from JSON and update the list
// async function loadQuotes() {

//     if (!prideBook) {

//     }
//   try {
//     const response = await fetch("src\public\week7\quotes.json");
//     if (!response.ok) {
//       throw new Error("Failed to load quotes.json");
//     }
//     const data = await response.json();
//     const books = data.books;

//     // Find "Pride and Prejudice" quotes
//     const prideQuotes = books.find(book => book.title === "Pride and Prejudice")?.quotes || [];

//     // Update list and store in localStorage
//     updateList(prideQuotes);
//     localStorage.setItem(quotesKey, JSON.stringify(prideQuotes));

//     // Hide the button after loading quotes
//     const button = document.getElementById("load_quotes");
//     button.style.display = "none";
//   } catch (error) {
//     console.error("Error fetching quotes:", error);
//   }
// }

async function loadQuotes() {
    try {
        const response = await fetch("quotes.json");
        if (!response.ok) {
            throw new Error("Unauthorized or error fetching data");
        }

        const data = await response.json();
        const prideBook = data.books.find(book => book.title == "Pride and Prejudice");
        if (!prideBook) {
            throw new Error("Book not found");
        }

        const quotes = prideBook.quotes;
        displayQuotes(quotes);
        localStorage.setItem('pride-prejudice', JSON.stringify(quotes));
        console.log("Fetched quotes form API and saved to local Storage");

        document.getElementById("load_quotes").classList.add("hide");
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

function displayQuotes(quotes) {
    const list = document.getElementById("quotes_list")
    quotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote; // Add quote text
        list.appendChild(listItem);

        // Add the quote to the array
        allQuotes.push(quote);
    });
}

document.getElementById("load_quotes").addEventListener("click", loadQuotes);
