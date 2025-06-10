function displayQuotes(quotes) {
    const list = document.getElementById("quotes_list");
    list.innerHTML = "";
    quotes.forEach(quote => {
        const listItem = document.createElement('li');
        listItem.textContent = quote; // Add quote text
        list.appendChild(listItem);
    });
}

function checkForQuotes() {
    const localQuotes = localStorage.getItem('pride-prejudice');
    if (localQuotes) {
        const quotes = JSON.parse(localQuotes);
        displayQuotes(quotes);
        console.log("Loaded quotes from localStorage");
        document.getElementById("load_quotes").classList.add("hide");
    }
}

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


checkForQuotes()
document.getElementById("load_quotes").addEventListener("click", loadQuotes);
