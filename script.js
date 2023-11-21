
fetch('https://openlibrary.org/subjects/javascript.json')
    .then(response => response.json())
    .then(data => {


        const apiBooks = data.works || [];
  

        const books = apiBooks.map(apiBook => ({
            name: apiBook.title,
            author: (apiBook.authors || []).map(author => author.name).join(', ')
        }));


        const renderBookList = (booksToRender) => {
            const $booksList = document.getElementById('books-list');
            $booksList.innerHTML = '';

            booksToRender.forEach(book => {
                $booksList.innerHTML += `
                    <li>
                        <h3>${book.name}</h3>
                        <h5>${book.author}</h5>
                    </li>
                `;
            });
        }


        document.getElementById('search-form').addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const phrase = formData.get('phrase');

            if (!phrase) {
                renderBookList(books);
                return;
            }

            const foundBooks = books.filter(book => book.name.toLowerCase().includes(phrase.toLowerCase()));
            renderBookList(foundBooks);
        });


        renderBookList(books);
    })
    .catch(error => {
        console.error('Błąd pobierania danych:', error);
    });
