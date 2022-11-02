const btnNew = document.querySelector('#add-new');
const form = document.querySelector('#contact-form');
const inputForm = document.querySelector('#create-form');
const btnDeleteAll = document.querySelector('#clear-all');
const btnSearch = document.querySelector('#search-contatcs');
const searchBox = document.querySelector('.search-input');
const searchForm = document.querySelector('#search-form');
const searchContainer = document.querySelector('#search-container');
const btnSort = document.querySelector('#sort-contacts');
const formEdit = document.querySelector('#contact-edit');
const editFormContainer = document.querySelector('#edit-form');

let contactArr = [];
let searchArr = [];

if(localStorage.getItem('Contact')) {
    contactArr = JSON.parse(localStorage.getItem('Contact'));
}

btnNew.addEventListener(('click'), () => {
    inputForm.style.display = 'block';
})


btnSearch.addEventListener(('click'), () => {
    if(searchBox.style.display === 'block'){
        searchBox.style.display = 'none';
    } else {
        searchBox.style.display = 'block';
    }
})

searchForm.addEventListener(('submit'), (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value.toLowerCase();
    if(searchValue) {
        searchArr = contactArr.filter((contact) => {
            if(
                contact.name.toLowerCase().includes(searchValue)  
                || contact.phone.toLowerCase().includes(searchValue)
                || contact.email.toLowerCase().includes(searchValue)
                || contact.address.toLowerCase().includes(searchValue)
            ) {
                return true;
            }
        }); 
    }
    console.log(searchArr);
    renderSearch(searchArr);
})

const sortArr = (a,b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

btnSort.addEventListener(('click'), () => {
    contactArr.sort(sortArr);
    render(contactArr);
})

const renderCard = (contact) => {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute("class", "card");
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');

    p1.textContent = `Name: ${contact.name}`;
    p2.textContent = `Phone number: ${contact.phone}`;
    p3.textContent = `Email: ${contact.email}`;
    p4.textContent = `Home Address: ${contact.address}`;

    cardDiv.append(p1);
    cardDiv.append(p2);
    cardDiv.append(p3);
    cardDiv.append(p4);

    return cardDiv;
}

const renderSearch = (searchArr) => {
    searchContainer.innerHTML = '';
    searchArr.forEach((contact) => {
        searchContainer.append(renderCard(contact));
    });
}

const renderFav = (contactArr) => {
    const favoriteList = document.querySelector('#favorite-list');
    favoriteList.innerHTML = '';
    contactArr.forEach((contact) => {
        if(contact.isFavorite) {
            const newCard = renderCard(contact);

            const btnFavDel = document.createElement('button');
            btnFavDel.textContent = 'Remove from Favorites';
            newCard.append(btnFavDel);
            btnFavDel.addEventListener(('click'), () => {
                contact.isFavorite = false;
                localStorage.setItem('Contact', JSON.stringify(contactArr));
                render(contactArr);
            })
            favoriteList.append(newCard);
        }
    });
}


const render = (contactArr) => {
    const contactList = document.querySelector('#contact-list');
    contactList.innerHTML = '';
    contactArr.forEach((contact, index) => {
        const newCard = renderCard(contact);

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Delete';
        btnDel.value = index;
        btnDel.addEventListener('click', (event) => {
            contactArr.splice(event.target.value, 1);
            localStorage.setItem('Contact', JSON.stringify(contactArr));
            render(contactArr); 
        })
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.addEventListener('click', () => {
            editFormContainer.style.display = 'block';

            document.querySelector('#name').value = contact.name;
            document.querySelector('#phone-num').value = contact.phone;
            document.querySelector('#email').value = contact.email;
            document.querySelector('#home-address').value = contact.address;
            document.querySelector('#index').value = index;
        });
 
        newCard.append(btnDel);
        newCard.append(btnEdit);
        
        if(!contact.isFavorite) {
            const btnFav = document.createElement('button');
            btnFav.textContent = 'Add to Favorites';
            newCard.append(btnFav);
            btnFav.addEventListener(('click'), () => {
                contact.isFavorite = true;
                localStorage.setItem('Contact', JSON.stringify(contactArr));
                render(contactArr); 
            })
        }
        contactList.append(newCard);
    });
    renderFav(contactArr);
}
render(contactArr);

btnDeleteAll.addEventListener(('click'), () => {
   if(confirm('Delete all the files?')){
        localStorage.removeItem('Contact');
        render(contactArr); 
   } 
})

form.addEventListener('submit', (event) => {
   
    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;
    const email = event.target.elements.email.value;
    const address = event.target.elements.address.value;

    if(name || phone || email || address)  {
        const newContact = new Contact(name, phone, email, address);
        contactArr.push(newContact);
        localStorage.setItem('Contact', JSON.stringify(contactArr));
        console.log(newContact);
        console.log(localStorage.getItem('Contact'));
    }
    form.style.display = 'none';
})

formEdit.addEventListener('submit', (event) => {
    event.preventDefault();
    const index = event.target.elements.index.value;

    let editContact = contactArr[index];

    editContact.name = event.target.elements.name.value;
    editContact.phone = event.target.elements.phone.value;
    editContact.email = event.target.elements.email.value;
    editContact.address = event.target.elements.address.value;
    contactArr[index] = editContact;
    localStorage.setItem('Contact', JSON.stringify(contactArr));
    render(contactArr);
    editFormContainer.style.display = 'none';
})

class Contact{
    constructor(name, phone, email, address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.isFavorite = false;
    }
}