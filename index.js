const btnNew = document.querySelector('#add-new');
const form = document.querySelector('#contact-form');
const inputForm = document.querySelector('.input-form');
const btnDeleteAll = document.querySelector('#clear-all');
const btnSearch = document.querySelector('#search-contatcs');
const searchBox = document.querySelector('.search-input');
const searchForm = document.querySelector('#search-form');

let contactArr = [];


if(localStorage.getItem('Contact')) {
    contactArr = JSON.parse(localStorage.getItem('Contact'));
}

btnNew.addEventListener(('click'), () => {
    inputForm.style.display = 'block';

})


btnSearch.addEventListener(('click'), (event) => {
    if(searchBox.style.display === 'block'){
        searchBox.style.display = 'none';
    } else {
        searchBox.style.display = 'block';
   
    }
   
})

// searchForm.addEventListener(('submit'), () => {
    
// })


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
        btnDel.addEventListener('click', (event) => {
            contactArr.splice(event.target.value, 1);
            localStorage.setItem('Contact', JSON.stringify(contactArr));
            location.reload(); 
        })
   

        p1.textContent = `Name: ${contact.name}`;
        p2.textContent = `Phone number: ${contact.phone}`;
        p3.textContent = `Email: ${contact.email}`;
        p4.textContent = `Home Address: ${contact.address}`;

        cardDiv.append(p1);
        cardDiv.append(p2);
        cardDiv.append(p3);
        cardDiv.append(p4);
        cardDiv.append(btnDel);
        
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


class Contact{
    constructor(name, phone, email, address) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.isFavorite = false;
    }
}