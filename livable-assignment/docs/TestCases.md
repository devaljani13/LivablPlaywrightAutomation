# Feature: Listing Search

  Scenario: Search listings using a city name
    Given I am on the Livabl homepage
    When I enter "Toronto" in the search box
    And I click on the search button
    Then I should see the results page load successfully
    And I should see listings related to "Toronto"
    And each listing should display title, price, and bedroom details

#   Scenario: Attempt to search without providing input
    Given I am on the Livabl homepage
    When I click on the search button without entering anything
    Then I should see default listings or a message prompting for input
I think this is a bug because everytime when i perform a search without entering city, it shows different result (defaulting to Toronto and sourrounding areas)

#   Scenario: View dynamic suggestions while typing
    Given I am on the Livabl homepage
    When I type "Tor" in the search input field
    Then I should see search suggestions containing "Toronto"
    And I can select a suggestion to trigger search

# Feature: Filter by Price Range

  Scenario: Filter listings by price
    Given I have searched for listings in "Toronto"
    When I apply a price range filter between "$400,000" and "$1,200,000"
    Then only listings within that price range should be displayed
    And the total number of listings should update accordingly

#   Scenario: Filter listings by number of bedrooms
    Given I have searched for listings in "Toronto"
    When I select "3 Bedrooms" from the filter options
    Then only listings with 3 bedrooms should appear in results
    And each listing card should show "3 Beds"

#   Scenario: Apply multiple filters together
    Given I have searched for listings in "Toronto"
    When I apply the price range "$600,000 – $1,000,000"
    And I select "3 Bedrooms" filter
    Then all visible listings should match both filters
    And listings outside that range should not be displayed

#   Scenario: Clear filters and view all listings
    Given I have applied filters on the search results
    When I click on "Clear All Filters"
    Then all filters should be removed
    And the full list of search results should appear again

# Feature: Pagination or Load More

  Scenario: Load more listings in search results
    Given I have searched for listings in "Toronto"
    When I scroll to the bottom of the results page
    And I click on the "Load More" button
    Then additional listings should be loaded without page refresh

# Feature: Mock API Response Validation

  Scenario: Validate mock data returned by API
    Given I have mocked the API endpoint "/api/listings"
    When I run the search test using mock data
    Then I should receive listings titled "Mock Condo by Deval" and "Mock Townhouse by Deval"
    And each listing should have valid price and bedroom fields

# Feature: Non-Functional Testing

  Scenario: Verify search performance under load
    Given I perform 10 consecutive searches for different cities
    When each search is triggered
    Then the average response time should be under 3 seconds
    And the site should not crash or throttle the user

#   Scenario: View listings on different viewport sizes
    Given I open the search results on desktop, tablet, and mobile viewports
    Then all listings, filters, and buttons should remain visible and usable

# Feature: Exploratory Testing

  Scenario: Observe UI behavior with random inputs
    Given I enter random or invalid characters like "@@@@" in the search box
    When I click search
    Then the system should handle it gracefully
    And not throw any JavaScript or console errors
