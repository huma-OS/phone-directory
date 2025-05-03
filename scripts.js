// function sum(a, b) {
//   return a + b;
// }

// module.exports = sum;


const nameInput = document.getElementById('name');
const mobileInput = document.getElementById('mobile');
const emailInput = document.getElementById('email');
const errDiv = document.getElementById('error');
const submitBtn = document.getElementById('submit');
const searchInput = document.getElementById('search');
const contactBody = document.getElementById('contactBody');
const noResult = document.getElementById('noResult');

let valid = true;

const nameRegex = /^[A-Za-z\s]{1,20}$/;
const mobileRegex = /^[0-9]{10,11}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


function validateField(input, regex) {
  if (!regex.test(input.value.trim())) {
    input.classList.add('input-error');
  } else {
    input.classList.remove('input-error');
  }
}

nameInput.addEventListener('input', () => validateField(nameInput, nameRegex));
mobileInput.addEventListener('input', () => validateField(mobileInput, mobileRegex));
emailInput.addEventListener('input', () => validateField(emailInput, emailRegex));


submitBtn.addEventListener('click', function () {
  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const email = emailInput.value.trim();

  const validName = nameRegex.test(name);
  const validMobile = mobileRegex.test(mobile);
  const validEmail = emailRegex.test(email);

  if (!validName || !validMobile || !validEmail) {
    errDiv.style.display = 'block';
    return;
  }

  errDiv.style.display = 'none';

  const defaultRow = document.getElementById('defaultRow');
  if (defaultRow) {
    defaultRow.remove();
  }

  nameInput.value = '';
  mobileInput.value = '';
  emailInput.value = '';
  nameInput.classList.remove('input-error');
  mobileInput.classList.remove('input-error');
  emailInput.classList.remove('input-error');

  const tableBody = document.querySelector('#summaryTable tbody');
  const newRow = tableBody.insertRow();
  newRow.insertCell(0).innerHTML = `<img src="./img/user.png" alt="Name Icon" style="width:30px; vertical-align:middle; margin-right:5px;"> ${name}`;
  newRow.insertCell(1).innerHTML = `<img src="./img/call.png" alt="Name Icon" style="width:30px; vertical-align:middle; margin-right:5px;"> ${mobile}`;
  newRow.insertCell(2).innerHTML = `<img src="./img/email.png" alt="Name Icon" style="width:30px; vertical-align:middle; margin-right:5px;"> ${email}`;
});

searchInput.addEventListener('input', e => {
  const term = e.target.value.trim();
  const rows = contactBody.querySelectorAll('tr');
  let found = false;

  rows.forEach(row => {
    const cell = row.cells[1];
    const text = cell.textContent.replace(/\s+/g, '');
    cell.innerHTML = cell.innerHTML.replace(/<mark>|<\/mark>/g, '');

    if (!term || text.includes(term)) {
      row.style.display = '';
      if (term) {
        const highlighted = text.replace(new RegExp(term, 'g'), `<mark>${term}</mark>`);
        const icon = cell.querySelector('img') ? .outerHTML || '';
        cell.innerHTML = `${icon} ${highlighted}`;
      }
      found = true;
    } else {
      row.style.display = 'none';
    }
  });

  noResult.classList.toggle('dn', found || !term);
});