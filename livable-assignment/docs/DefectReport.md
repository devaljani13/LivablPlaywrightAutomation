# Bug 1 – Search Button Works Without Input
Title: Clicking “Search” without entering city still navigates to results page
Environment: QA / Mock environment
Severity: Medium
Priority: High

Steps to Reproduce:

Navigate to https://www.livabl.com/
Keep the search box empty
Click on the Search button
Observe the results page

Expected Result:
System should prompt user to enter a location or show a validation message (“Please enter city or community”).

Actual Result:
User is redirected to results page showing unrelated or default listings.

Impact:
User confusion and poor experience; incorrect API call triggered without valid query parameters.

# Bug 2 – Filter Logic Returns Incorrect Results
Title: Bedroom and price filters return inconsistent results
Environment: Real API
Severity: High

Steps to Reproduce:

Search for “Toronto”

Apply filters:
Bedrooms: 4+
Price range: $400,000 – $1,000,000
Observe filtered results

Expected Result:
All listings should have exactly 3 bedrooms and price within the specified range.

Actual Result:
Some listings show 2 or 4 bedrooms; few have prices above $1M.

Impact:
Backend filter logic not applied properly; leads to user distrust and poor data reliability.

# Bug 3 Page Refresh Resets Location and Search Results

Title: Search context lost after page refresh
Environment: Livabl mock environment / real API
Severity: Medium

Steps to Reproduce:

Launch the Livabl homepage.
Enter a city (e.g., “Toronto”) in the search bar and click Search.
Verify that correct results appear for the selected city.
Press F5 or manually refresh the browser tab.

Expected Result:
The page should reload while retaining the previously searched city, filters, and listings — allowing users to resume browsing seamlessly.

Actual Result:
Refreshing the page resets the city and clears all filters, displaying default or unrelated results.

Impact:
Users lose their search context, causing frustration and repeated interactions. It also breaks session continuity and affects usability testing of persistent filters.

# Bug 4: Sold-Out Filter Returns Active Listings

Title: Sold-out filter incorrectly displays “For Sale” listings
Environment: Real API (Filters Page)
Severity: High

Steps to Reproduce:

Open the Livabl search results page (e.g., after searching “Toronto”).
Open the Status filter options.
Select “Sold Out” as the only filter and apply.
Observe the returned listings.

Expected Result:
All displayed listings should have their sellingStatus set to “Sold Out” only — no active or registration listings should appear.

Actual Result:
Listings marked “Selling”, “Pending”, or “Registration” are still displayed even though “Sold Out” is the selected filter.

Impact:
Users receive inaccurate inventory data, leading to false assumptions about availability. This undermines trust in the filter system and may result in customer frustration or missed sales opportunities.

# Bug 5 Construction Status Filter Returns Incorrect Listings

Title: “Complete” construction filter shows Preconstruction projects
Environment: Livabl web (Real API – Edmonton search)
Severity: High

Steps to Reproduce:

Open the Livabl website.
Search for “Edmonton, AB.”
In filters, select:
For Sale
Construction Status = Complete
Click Apply Filters.
Review the results.

Expected Result:
Only listings with conStatus = "Complete" or displayConStatus = "Move In Now" should appear.

Actual Result:
Listings labeled as “Preconstruction” are also displayed.

Impact:
Users seeking ready-to-move properties receive irrelevant results, degrading search accuracy and user trust.
It may also cause misinformed inquiries for projects not yet available

# Bug 6 Missing Listing Images After Applying Price Filter

Title: Some listings do not display images when filtering between $400K–$700K
Environment: Livabl website – Edmonton, AB search (Real API)
Severity: Medium

Steps to Reproduce:

Navigate to Livabl.com.
Search for “Edmonton, AB.”
Apply filters:
Price Range: $400K – $700K
For Sale (default)
Observe the returned listing cards.

Expected Result:
Each listing card should include a valid thumbnail image (either imgUrl or communityImageUrl populated).

Actual Result:
Several listings within the $400K–$700K range show broken or missing images — blank placeholders or “no image” icons.

Impact:

Reduces user engagement and trust in listings.
Creates visual inconsistency and lowers conversion rates for those listings.
May indicate missing data in the API response or image hosting issues.


### RECOMENDATIONS AND SUGGESTED IMPROVEMENTS

Strengthen Automation Coverage Across Core Flows:
Expand Playwright test suites to cover end-to-end user journeys including search, filter, and detail page validations. Integrate tests into CI/CD (e.g., GitHub Actions or Jenkins) for early defect detection on every deployment.

Enhance Test Data and API Validation Layer:
Introduce a centralized mock or staging dataset to maintain consistency across UI and API validations. Use SQL-based data sanity checks or Postman collections to detect mismatched or missing data before release.

Implement Continuous Monitoring & Analytics for User Experience:
Add performance and availability tracking (e.g., Lighthouse, New Relic, or Google Analytics event tagging) to monitor page load times, API latency, and broken UI elements across different environments and devices.