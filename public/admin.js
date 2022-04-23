// fetch('http://localhost:3001/updateBook',
//   {
//     method: 'PATCH',
//     body: JSON.stringify({
//       id: 3,
//       title: 'The Legends of Arathrae',
//     }),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   }).then((response) => response.json());

// the above code updates the 3rd book selection to The Legends of Arathrae

async function grabBooks() {
  let response = await fetch('http://localhost:3001/listBooks');
  let books = await response.json();
  books.forEach(displayBook);
}

function displayBook(book) {
  let root = document.querySelector('#root');
  let li = document.createElement('li');
  li.textContent = book.title;

  let quantityBox = document.createElement('input');
  quantityBox.value = book.quantity;

  let confirm = document.createElement('button');
  confirm.textContent = 'Confirm';

  confirm.addEventListener('click', () => {
    fetch('http://localhost:3001/updateBook', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: book.id,
        quantity: quantityBox.value,
      }),
    });
  });
  li.append(quantityBox, confirm);
  root.append(li);
}

grabBooks();
