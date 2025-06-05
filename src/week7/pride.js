async function quoteList() {   
    const list = document.querySelector('.quotes_list');
    list.innerHTML = ''; // Clear the existing list

    try {
        // Fetch the JSON file
        const response = await fetch('src\week7\quotes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch JSON: ' + response.statusText);
        }

        const quotesData = await response.json(); // Parse JSON data
        const books = quotesData.books; // Access the "books" array
        const allQuotes = [];

        // Iterate through books and quotes
        books.forEach(book => {
            const quotes = book.quotes;
            quotes.forEach(quote => {
                const listItem = document.createElement('li');
                listItem.textContent = quote; // Add quote text
                list.appendChild(listItem);

                // Add the quote to the array
                allQuotes.push(quote);
            });
        });

        // Store the array of quotes in localStorage
        localStorage.setItem('quotes', JSON.stringify(allQuotes));
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach event listener to the button
document.querySelector('#load_quotes').addEventListener('click', quoteList);
