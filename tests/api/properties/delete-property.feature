Feature: Delete a Property
  In order to manage properties
  As an admin
  I want to delete a property

  Scenario: Delete existing property
    Given I send a PUT request to "/api/users/AA22BB33-CC44-4DD4-8EE5-FF66778899AC" with body:
    """
    {
      "name": "Admin Properties Delete",
      "username": "admin.properties.delete",
      "email": "admin.properties.delete@example.com",
      "password": "AdminPass1",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.properties.delete@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/properties/BB11CC22-DD33-4EE4-8FF5-AA66778899AD" with body:
    """
    {
      "unitNumber": "45529",
      "cadastralCode": "16-425-018-0-00-000-001",
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
    Given I send a DELETE request to "/api/properties/BB11CC22-DD33-4EE4-8FF5-AA66778899AD"
    Then the response status code should be 204
