const btnNew = document.querySelector('#add-new');
const form = document.querySelector('#contact-form');
const inputForm = document.querySelector('.input-form');
const btnDeleteAll = document.querySelector('#clear-all');

let contactArr = [];


if(localStorage.getItem('Contact')) {
    contactArr = JSON.parse(localStorage.getItem('Contact'));
}

btnNew.addEventListener(('click'), () => {
    inputForm.style.display = 'block';
})

const render = (contactArr) => {
    const contactList = document.querySelector('#contact-list');
    contactArr.forEach((contact) => {
        const cardDiv = document.createElement('div');
        cardDiv.setAttribute("class", "card");
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        p1.textContent = `Name: ${contact.name}`;
        p2.textContent = `Phone number: ${contact.phone}`;
        p3.textContent = `Email: ${contact.email}`;
        p4.textContent = `Home Address: ${contact.address}`;

        cardDiv.append(p1);
        cardDiv.append(p2);
        cardDiv.append(p3);
        cardDiv.append(p4);
        cardDiv.append(btn);

        contactList.append(cardDiv);
    });
}
render(contactArr);

btnDeleteAll.addEventListener(('click'), () => {
    localStorage.removeItem('Contact');
    location.reload(); 
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
    }
}