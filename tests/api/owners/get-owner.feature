Feature: Get an Owner by ID
  In order to retrieve owner information
  As a user
  I want to get an owner by their ID


  Scenario: Get an existing owner
    Given I send a PUT request to "/api/users/5A1B2C3D-4E5F-4A6B-8C7D-9E0F1A2B3C4D" with body:
    """
    {
      "name": "Admin Owners",
      "username": "admin.owners2",
      "email": "admin.owners2@example.com",
      "password": "AdminPass1",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners2@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0" with body:
    """
    {
      "name": "Elena Ruiz",
      "ciNit": "87654321",
      "phone": "70000000"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/owners/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0"
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "6A5EC04D-6981-43B1-AD95-9F4C8891D6D0",
      "name": "Elena Ruiz",
      "ciNit": "87654321",
      "phone": "70000000"
    }
    """

  Scenario: Get a non-existing owner
    Given I send a GET request to "/api/owners/7C9E6679-7425-40DE-944B-E07FC1F90AE7"
    Then the response status code should be 404
