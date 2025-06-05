async function quoteList() {   
    const list = document.querySelector('.quotes_list');
    list.innerHTML = '';
    const response = fetch('./quotes.json')
    if (!response.ok) {
        throw new Error('Failed to fetch JSON: ' + response.statusText);
    }
    const quoteDate = await response.json();
    const books = quoteData[1];
    const allQuotes = [];
    books.forEach(book => {
        const quotes = book.quotes;
        quotes.forEach(quote => {
            const listItem = document.createElement('li');
            listItem.textContent = `${quote}`;
            list.appendChild(listItem);
            allQuotes.push(quote);
        });
    });
    localStorage.setItem('quotes', JSON.stringify(allQuotes));
}

document.querySelector('button').addEventListener('click', quoteList());