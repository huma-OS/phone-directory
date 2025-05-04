
/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Phone Directory App', () => {
  let nameInput, mobileInput, emailInput, submitBtn, contactBody, searchInput, errorDiv, noResult;

  beforeEach(() => {

    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.body.innerHTML = html; 

    const script = fs.readFileSync(path.resolve(__dirname, '../scripts.js'), 'utf8');
    eval(script); 

    nameInput = document.getElementById('name');
    mobileInput = document.getElementById('mobile');
    emailInput = document.getElementById('email');
    submitBtn = document.getElementById('submit');
    contactBody = document.getElementById('contactBody');
    searchInput = document.getElementById('search');
    errorDiv = document.getElementById('error');
    noResult = document.getElementById('noResult');
  });

  test('Form should show error with invalid inputs', () => {
    nameInput.value = '123';
    mobileInput.value = '12345';
    emailInput.value = 'invalid.com';

    submitBtn.click();

    expect(errorDiv.style.display).toBe('block');
  });

  test('Form should add new input on valid input', () => {

    nameInput.value = 'John Doe';
    mobileInput.value = '9876543210';
    emailInput.value = 'john@example.com';

    submitBtn.click();

    const rows = contactBody.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0].textContent).toMatch(/John Doe/);
    expect(rows[0].textContent).toMatch(/9876543210/);
    expect(rows[0].textContent).toMatch(/john@example.com/);
  });

  test('Search should filter by mobile number', () => {

    nameInput.value = 'Alice';
    mobileInput.value = '1234567890';
    emailInput.value = 'alice@example.com';
    submitBtn.click();

    nameInput.value = 'Bob';
    mobileInput.value = '0987654321';
    emailInput.value = 'bob@example.com';
    submitBtn.click();

    searchInput.value = '123';
    searchInput.dispatchEvent(new Event('input'));

    const rows = contactBody.querySelectorAll('tr');
    const visibleRows = [...rows].filter(row => row.style.display !== 'none');

    expect(visibleRows.length).toBe(1);
    expect(visibleRows[0].textContent).toMatch(/1234567890/);
  });

  test('Search "No Results Found" appears if nothing matches', () => {
    nameInput.value = 'Alice';
    mobileInput.value = '1234567890';
    emailInput.value = 'alice@example.com';
    submitBtn.click();
    
    searchInput.value = '9999999999';
    searchInput.dispatchEvent(new Event('input'));

    expect(noResult.classList.contains('dn')).toBe(false);
  });

  test('Search resets when input is cleared', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));

    const rows = contactBody.querySelectorAll('tr');
    const visibleRows = [...rows].filter(row => row.style.display !== 'none');

    expect(visibleRows.length).toBe(rows.length);
  });

  test('noResult element exists and is initially hidden', () => {
    expect(noResult).not.toBeNull();
    expect(noResult.classList.contains('dn')).toBe(true);
  });
});
