Feature: List Owners
  In order to view all owners
  As a user
  I want to list all owners

  Scenario: Empty list returns array
    Given I send a GET request to "/api/owners"
    Then the response status code should be 200

  Scenario: List after creating two owners
    Given I send a PUT request to "/api/users/2D931510-DED0-4F78-8A6A-2C2A4C0B0D7D" with body:
    """
    {
      "name": "Admin Owners",
      "username": "admin.owners.list",
      "email": "admin.owners.list@example.com",
      "password": "AdminPass1",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners.list@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/3F2504E0-4F89-41D3-9A0C-0305E82C3301" with body:
    """
    {
      "name": "Owner One",
      "ciNit": "11111222",
      "phone": "71234567"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/9B2D3C4E-5F6A-4B7C-8D9E-0F1A2B3C4D5E" with body:
    """
    {
      "name": "Owner Two",
      "ciNit": "33333444",
      "phone": "71234568"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/owners"
    Then the response status code should be 200
    And the response should contain an item with:
    """
    {
      "name": "Owner One",
      "ciNit": "11111222",
      "phone": "71234567"
    }
    """
    And the response should contain an item with:
    """
    {
      "name": "Owner Two",
      "ciNit": "33333444",
      "phone": "71234568"
    }
    """
