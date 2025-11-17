Test Plan – Livabl Listing Search

Author: Deval Jani
Role: QA Analyst


1. Objective

The goal of this test plan is to verify the Listing Search functionality on Livabl.com
The main focus is to make sure that users can search for new homes by city or community, apply different filters like price range and number of bedrooms, and see relevant results on the page.
I’ve used Playwright with JavaScript to automate these tests and also included an API test that mocks the backend response and monitors network activity to confirm everything works end-to-end.

2. Scope
In Scope

Basic search using the main input box.
Verifying search results and listing cards (title, price, and bedrooms).
Applying filters (price range, bedroom count).
Validating that filtered results display correctly.
Capturing and mocking API responses for /api/listings.
Observing network calls made by the front end.

Out of Scope

Login, account creation, or saving favorites.
Mobile app or responsive layout testing.
Backend API validation against the real database.
Accessibility and localization checks.

3. Test Approach

I’ve used both manual and automated testing to make sure the coverage is realistic.
Manual testing helped explore the search and filters, observe boundary cases, and identify visual issues.
Automation (Playwright) focuses on verifying core flows that can be repeated — search, filters, and mock API validation.
The framework follows a simple Page Object Model (POM) structure and uses Playwright’s built-in expect assertions for clarity and stability.

4. Test Environment and Tools
Category	Details
Application	https://www.livabl.com/
Automation Tool	Playwright (JavaScript)
IDE	Visual Studio Code
Browser	Chromium (default)
Reports	HTML with screenshots & video
Mocking	Playwright’s page.route() for API stubbing

5. Test Data and Configurations

The main test data revolves around city = "Toronto", which is used for all search-related test cases.

Field	Example
City	Toronto
Price Range	$400,000 – $1,200,000
Bedrooms	2, 3, 4
Mock API Data	Hardcoded inside api.spec.js

Example mock:

listings: [
  { id: 1, title: 'Mock Condo by Deval', price: 600000, bedrooms: 2 },
  { id: 2, title: 'Mock Townhouse by Deval', price: 950000, bedrooms: 4 }
]

6. Types of Testing Covered
Type	Description
Smoke	Basic validation that the search flow works and listings appear.
Functional	Filter behavior for price and bedrooms.
Regression	Retesting stable flows after updates.
API Mock Test	Replace /api/listings call with a controlled dataset.
Network Validation	Listen to and log real network requests/responses.
Exploratory	Freestyle testing to uncover UI or UX issues.

7. Priority Areas
Priority	Description
High	Search flow, listing card visibility, filter logic.
Medium	Pagination or “load more” functionality.
Low	UI styling or layout issues.

8. Risks and Assumptions
 Risks

The live Livabl site may block automated runs due to bot verification.
Dynamic data can change frequently, making it harder to assert specific results.
Filters and buttons might not have static selectors (React DOM changes).

Assumptions

The search functionality is accessible without login.
Listing information (title, price, bedrooms) is visible to public users.
Mock API or local HTML fallback (mock-livabl.html) can be used for consistent test runs.

9. Deliverables
Deliverable	Description
README.md	Contains setup, instructions, and project overview.
search.spec.js	Smoke test for search workflow.
filters.spec.js	Functional test for filters (price and bedrooms).
api.spec.js	Mock and network validation test.
playwright.config.js	Browser and report settings.
TestPlan.md	This document describing test strategy and coverage.

10. SQL Validation Examples

If database access was available, these queries could be used to validate data integrity.

-- Validate listings within a given price range
SELECT * FROM Listings WHERE city = 'Toronto' AND price BETWEEN 400000 AND 1200000;

-- Find incomplete records
SELECT * FROM Listings WHERE title IS NULL OR price IS NULL OR bedrooms IS NULL;

-- Count listings by bedroom category
SELECT bedrooms, COUNT(*) FROM Listings GROUP BY bedrooms;

11. Summary

This test plan ensures that the Livabl Search and Filter feature is tested thoroughly through both manual and automated methods.
Automation focuses on core flows, stable assertions, and realistic mocking, while manual exploration covers visual and behavioral checks.

I’ve also included API interception and network validation to show how UI interacts with backend systems — something critical in real-world testing.
Overall, this setup provides a strong, maintainable foundation for regression and CI/CD integration.



