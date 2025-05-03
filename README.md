
# 📁 Portfolio Project – HTML, CSS, JavaScript + Jest

This is a front-end project built with **HTML**, **CSS**, and JavaScript, featuring unit tests written with **Jest**. The application validates user input fields (Name, Mobile, Email) and provides real-time feedback on form submissions.

## Features

* Clean and responsive UI
* Form validation using regex
* Dynamic user feedback
* Unit testing with Jest

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Jest (for testing)

---

## Getting Started Locally

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. **Open in VS Code**

Make sure you have the **Live Server** extension installed.

### 3. **Start the Live Server**

Right-click the `index.html` file and select:

```
Open with Live Server
```

This will launch the project in your default web browser.

---

## Dummy Users (Valid Test Data)

Use the following users to test the form functionality (or come up with your own):

```
Name: Simi Huum
Mobile: 1234567890
Email: okooh.simihuum@gmail.com

Name: Lora Benzi
Mobile: 2345678901
Email: benzi.lora@gmail.com

Name: Mira Solan
Mobile: 4567890123
Email: solan.mira@gmail.com

Name: Theo Rux
Mobile: 5678901234
Email: rux.theo@gmail.com

Name: Omar Jexin
Mobile: 9012345678
Email: jexin.omar@gmail.com

Name: Zane Vort
Mobile: 1122334455
Email: vort.zane@gmail.com
```

---

## ❌ Invalid Test Cases (Should Fail Validation)

The following data should **not** pass validation based on these regex rules:


| Name                           | Mobile       | Email                                         |
| ------------------------------ | ------------ | --------------------------------------------- |
| J0hn D03                       | 12345        | not-an-email                                  |
| Anna!                          | 012345678912 | anna@@example..com                            |
| @Lex                           | abcdefghij   | lex\@site                                     |
|                                | 000          | user\@domain.                                 |
| TooLongNameWithMoreThan20Chars | 1234567890   | [valid@example.com](mailto:valid@example.com) |

---

## Running Tests

Install dependencies and run tests using Jest:

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Run Tests**

```bash
npm test
```

Or:

```bash
npm run test
```

Make sure your `package.json` includes the following:

```json
"scripts": {
  "test": "jest"
}
```

---
