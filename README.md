# Shamba Direct Frontend Project

## 1. Project Overview
Shamba Direct is a digital AgriTech platform empowering smallholder and medium-scale farmers across Tanzania. The frontend provides a seamless marketplace for agricultural products and resources, connecting farmers, suppliers, and buyers. This repository contains all static assets (HTML, CSS, JS, images) required for the user interface, and is now fully prepared for backend integration.

## 2. Folder Structure
```
public/
├── index.html                  # Main landing page
├── pages/                      # All sub-pages (login, registration, service, etc.)
│   ├── about-us.html
│   ├── contact.html
│   ├── faqs.html
│   ├── farmer-registration.html
│   ├── login.html
│   ├── payment.html
│   ├── registration-role-section.html
│   ├── service.html
│   └── supplier-registration.html
├── css/                        # Stylesheets for all pages/components
├── js/                         # JavaScript files for interactivity and API calls
├── assets/                     # Images, videos, and other static assets
│   └── images/
└── README.md                   # This file
```

## 3. Expected Backend API Endpoints
The frontend is designed to interact with the following RESTful API endpoints:

| Route                      | Method | Description                                      |
|----------------------------|--------|--------------------------------------------------|
| `/api/login`               | POST   | Authenticates a user and returns a token/session. |
| `/api/register/farmer`     | POST   | Registers a new farmer user.                     |
| `/api/register/supplier`   | POST   | Registers a new supplier user.                   |
| `/api/contact`             | POST   | Submits a contact form message.                  |
| `/api/checkout`            | POST   | Processes a payment and finalizes the order.     |
| `/api/products`            | GET    | Returns a list of products/services.             |
| `/api/chatbot`             | POST   | Handles chatbot message submission and response.  |

Other endpoints may be required for dynamic select options (e.g., `/api/regions`, `/api/districts`).

## 4. Integration Guide for Backend Developers
To integrate your backend with this frontend, follow these guidelines:

1. **Form Actions & Methods**
   - All forms have `action` and `method` attributes set to the expected backend endpoint and HTTP method (GET/POST).
   - Input fields have clear `name` attributes for backend parsing.

2. **Dynamic Content Injection**
   - HTML files include comments like `<!-- BACKEND: Render product list dynamically here -->` to indicate where backend-rendered content should be injected (e.g., user info, product lists, order summaries, select options).

3. **JavaScript API Calls**
   - Key JS files (e.g., `login.js`, `payment.js`, `chatbot.js`, `app.js`) include placeholder `fetch()` calls to backend endpoints, with comments and basic error handling.
   - These demonstrate the expected request/response formats and how to handle errors.

4. **File Uploads**
   - Registration forms (e.g., supplier/farmer) include file upload fields. The backend should handle `multipart/form-data` for these endpoints.
   - Uploaded files use clear `name` attributes (e.g., `regCertificateUpload`, `idUpload`).

5. **Expected Data Formats**
   - Most API endpoints expect and return JSON. For file uploads, use `multipart/form-data`.
   - Example login request: `{ emailPhone, password, role }`
   - Example chatbot request: `{ message }` → `{ reply }`
   - Example product list response: `[ { id, name, price, ... }, ... ]`

6. **Error Handling**
   - JS fetch() calls include basic error handling and display user-friendly messages on failure.
   - Backend should return clear error messages and appropriate HTTP status codes.

7. **Extending Functionality**push
   - To add new dynamic sections, use the same pattern: add a backend comment in HTML and a fetch() call in JS.

---

For any questions or integration issues, please refer to the backend comments in the HTML files and the fetch() usage in the JS files for guidance on expected data and endpoints.