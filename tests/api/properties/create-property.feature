Feature: Create a Property
  In order to manage properties
  As an admin
  I want to create a property

  Scenario: Valid property creation
    Given I send a PUT request to "/api/users/AB12CD34-EF56-4A78-9B0C-DE12F3456A78" with body:
    """
    {
      "name": "Admin Properties",
      "username": "admin.properties",
      "email": "admin.properties@example.com",
      "password": "AdminPass1",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.properties@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/properties/AA11BB22-CC33-4DD4-8EE5-FF66778899AB" with body:
    """
    {
      "unitNumber": "45528",
      "cadastralCode": "16-425-018-0-00-000",
      "municipality": "Cochabamba",
      "propertyClass": "Single Family Residence",
      "area": "URBAN",
      "taxZone": "ZONE 7",
      "propertyType": "SINGLE",
      "location": "TICTI STREET, UNNAMED AVE"
    }
    """
    Then the response status code should be 201
    And the response should be empty
