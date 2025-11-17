# Validate listing returned with Price range
SELECT id, title, price, bedrooms
FROM Listings
WHERE city = 'Toronto'
  AND price BETWEEN 400000 AND 1200000
ORDER BY price ASC;

# Verify Bedroom filter 
SELECT id, title, bedrooms
FROM Listings
WHERE city = 'Toronto'
  AND bedrooms = 3;

# Get all precontruction projcets in Toronto ( looked up network call to understand the possible data mapping to sql table)
SELECT devName, address, salesPriceRange, salesBldngType, sellingStatus
FROM Listings
WHERE conStatus = 'Preconstruction'
  AND address LIKE '%Toronto%'
ORDER BY devName;

# Verify the numbers of listings where price range is missing and selling status is pending which is marked correct (no data error)
SELECT devName, salesPriceRange, sellingStatus
FROM Listings
WHERE salesPriceRange = 'Pending'
  AND sellingStatus != 'Pending';

# Identify all listings by a specific developer
SELECT devName, address, conStatus, salesPriceRange
FROM Listings
WHERE dbaName LIKE '%Bianca Pollak%';

# Validate listings by City and Building Type
SELECT devName, salesBldngType, address
FROM Listings
WHERE city = 'Toronto'
  AND salesBldngType = 'Condos'
ORDER BY devName;

# Validate that listings marked “isHomeForSale = true” are not in “Construction = Complete
SELECT devName, conStatus, isHomeForSale
FROM Listings
WHERE isHomeForSale = TRUE
  AND conStatus = 'Complete';
