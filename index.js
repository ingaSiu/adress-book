const btnNew = document.querySelector('#add-new');
const form = document.querySelector('#contact-form');
const inputForm = document.querySelector('#create-form');
const btnDeleteAll = document.querySelector('#clear-all');
const btnSearch = document.querySelector('#search-contatcs');
const searchBox = document.querySelector('.search-input');
const searchForm = document.querySelector('#search-form');
const searchContainer = document.querySelector('#search-container');
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

const renderSearch = (searchArr) => {
    searchContainer.innerHTML = '';
    searchArr.forEach((contact) => {
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
        
        searchContainer.append(cardDiv);

    });
}

const render = (contactArr) => {
    const contactList = document.querySelector('#contact-list');
    contactArr.forEach((contact, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.setAttribute("class", "card");
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Delete';
        btnDel.value = index;
        btnDel.style.marginRight = '5px';
        btnDel.addEventListener('click', (event) => {
            contactArr.splice(event.target.value, 1);
            localStorage.setItem('Contact', JSON.stringify(contactArr));
            location.reload(); 
        })
        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Edit';
        btnEdit.style.marginRight = '5px';
        btnEdit.addEventListener('click', (event) => {
            editFormContainer.style.display = 'block';

            document.querySelector('#name').value = contact.name;
            document.querySelector('#phone-num').value = contact.phone;
            document.querySelector('#email').value = contact.email;
            document.querySelector('#home-address').value = contact.address;
            document.querySelector('#index').value = index;
        });
          
        
        p1.textContent = `Name: ${contact.name}`;
        p2.textContent = `Phone number: ${contact.phone}`;
        p3.textContent = `Email: ${contact.email}`;
        p4.textContent = `Home Address: ${contact.address}`;

        cardDiv.append(p1);
        cardDiv.append(p2);
        cardDiv.append(p3);
        cardDiv.append(p4);
        cardDiv.append(btnDel);
        cardDiv.append(btnEdit);
        
        if(!contact.isFavorite) {
            const btnFav = document.createElement('button');
            btnFav.textContent = 'Add to Favorites';
            cardDiv.append(btnFav);
            btnFav.addEventListener(('click'), () => {
                contact.isFavorite = true;
                localStorage.setItem('Contact', JSON.stringify(contactArr));
                location.reload(); 
            })
        }
     
        contactList.append(cardDiv);

    });
}
render(contactArr);


const renderFav = (contactArr) => {
    const favoriteList = document.querySelector('#favorite-list');
    contactArr.forEach((contact) => {
        if(contact.isFavorite) {
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
            
            const btnFavDel = document.createElement('button');
            btnFavDel.textContent = 'Remove from Favorites';
            cardDiv.append(btnFavDel);
            btnFavDel.addEventListener(('click'), () => {
                contact.isFavorite = false;
                localStorage.setItem('Contact', JSON.stringify(contactArr));
                location.reload(); 
            })

            favoriteList.append(cardDiv);
        }
    });
}
renderFav(contactArr);

btnDeleteAll.addEventListener(('click'), () => {
   if(confirm('Delete all the files?')){
        localStorage.removeItem('Contact');
        location.reload(); 
   } 
})


form.addEventListener('submit', (event) => {
    
    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;
    const email = event.target.elements.email.value;
    const address = event.target.elements.address.value;

    const newContact = new Contact(name, phone, email, address);
    contactArr.push(newContact);
    localStorage.setItem('Contact', JSON.stringify(contactArr));
    console.log(newContact);
    console.log(localStorage.getItem('Contact'));
})

formEdit.addEventListener('submit', (event) => {
    
    const index = event.target.elements.index.value;

    let editContact = contactArr[index];

    editContact.name = event.target.elements.name.value;
    editContact.phone = event.target.elements.phone.value;
    editContact.email = event.target.elements.email.value;
    editContact.address = event.target.elements.address.value;
    contactArr[index] = editContact;
    localStorage.setItem('Contact', JSON.stringify(contactArr));

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