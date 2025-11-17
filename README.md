#  Livabl Search & Filter Automation Suite

This repository contains a mock automation project designed to simulate the **Livabl.com** listing search and filter functionality using **Playwright**.  
The goal is to demonstrate practical test design, automation style, data validation reasoning, and clear communication.

---

#  Project Overview

**Feature Under Test:**  
Listing Search & Filters (City Search → Result Page → Filter Options)

**Tech Stack:**
- Playwright (JavaScript)
- Node.js
- Visual Studio Code
- HTML mock data page (offline simulation)

**Test Files:**
- `/tests/search.spec.js`  ->  Smoke Test (Search flow)
- `/tests/filters.spec.js` ->  Filter validation test
- `/tests/api.spec.js`     ->  Mocked Api test 
- `/mock-livabl.html` → Mock Livabl web page replicating home + results UI

---

##  Objectives

1. Verify search functionality navigates correctly from homepage to results page.
2. Validate filters (Price, Bedrooms, Construction, Home Type, etc.) update listings dynamically.
3. Ensure all visible listings contain required fields (Title, Price, Beds, Type, Status).
4. Demonstrate maintainable automation design with Page Object independence and stable locators.
5. Provide SQL validation examples and defect reporting documentation.

---

##  Folder Structure

livable-assignment/
│
├── pages/
│ └── SearchPage.js # (optional abstraction if extended)
│
├── tests/
│ ├── search.spec.js # Smoke Test (Search functionality)
│ └── filters.spec.js # Filter combination validation
│
├── mock-livabl.html # Local mock version of Livabl site
├── playwright.config.js # Base config (headless/slowMo settings)
└── README.md # Documentation



---

##  Environment Setup

### 1️ Install Dependencies

npm init -y
npm install @playwright/test
npx playwright install

### 2 Run Tests 
npx playwright test --headed --slow-mo 500
### to run single test file: 
npx playwright test tests/filters.spec.js
### to run a specific test
npx playwright test -g "Livabl Full Filter Flow"
### to generate test report 
npx playwright show-report
or
npx playwright test --reporter=html



## 3️ Expected Output

 Simulate Livabl homepage search flow (mock)
 Livabl Full Filter Flow – Multiple Filters Work

### API / Network Validation 

Implemented a dedicated api.spec.js to show mocking and network monitoring skills.

The test intercepts calls matching **/api/listings and replaces the response with hard-coded JSON data.

Demonstrates how to:

Stub API responses for predictable testing.

Simulate backend behavior without relying on live servers.

Observe and log real network traffic (page.on('response')).

![alt text](image.png)

