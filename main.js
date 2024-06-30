class Persona {
  constructor(id, firstname, lastname, birthday, phone) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthday = new Date(birthday);
    this.phone = phone;
  }

  getFullName() {
    return this.firstname + ' ' + this.lastname;
  }
}

let contacts = [];
let currentId = 0;

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const id = document.getElementById('contactId').value;
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const birthday = document.getElementById('birthday').value;
  const phone = document.getElementById('phone').value;

  if (id) {
    const contact = contacts.find(function(c) {
      return c.id === parseInt(id);
    });
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.birthday = new Date(birthday);
    contact.phone = phone;
  } else {
    const newContact = new Persona(currentId++, firstname, lastname, birthday, phone);
    contacts.push(newContact);
  }

  document.getElementById('contactForm').reset();
  document.getElementById('contactId').value = '';
  renderContacts();
});

document.getElementById('search').addEventListener('input', function() {
  renderContacts();
});

function renderContacts() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const filteredContacts = contacts.filter(function(contact) {
    return contact.firstname.toLowerCase().includes(searchValue) || contact.lastname.toLowerCase().includes(searchValue);
  });

  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';
  filteredContacts.forEach(function(contact) {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item p-2 mb-2 border rounded';
    contactItem.innerHTML = `
      <strong>${contact.getFullName()}</strong> - Data di nascita: ${contact.birthday.toLocaleDateString()} - Telefono: ${contact.phone}
      <button class="btn btn-sm btn-secondary ml-2" onclick="editContact(${contact.id})">Modifica</button>
    `;
    contactList.appendChild(contactItem);
  });
}

function editContact(id) {
  const contact = contacts.find(function(c) {
    return c.id === id;
  });
  document.getElementById('contactId').value = contact.id;
  document.getElementById('firstname').value = contact.firstname;
  document.getElementById('lastname').value = contact.lastname;
  document.getElementById('birthday').valueAsDate = contact.birthday;
  document.getElementById('phone').value = contact.phone;
}

function sortContacts(criteria) {
  if (criteria === 'birthday') {
    contacts.sort(function(a, b) {
      return a.birthday - b.birthday; // Confronto diretto delle istanze Date
    });
  } else if (criteria === 'name') {
    contacts.sort(function(a, b) {
      if (a.lastname < b.lastname) return -1;
      if (a.lastname > b.lastname) return 1;
      if (a.firstname < b.firstname) return -1;
      if (a.firstname > b.firstname) return 1;
      return 0;
    });
  }
  renderContacts();
}

renderContacts();
