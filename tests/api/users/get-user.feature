Feature: Get a User by ID
  In order to retrieve user information
  As a user
  I want to get a user by their ID


  Scenario: Get an existing user
    Given I send a PUT request to "/api/users/3FA85F64-5717-4562-B3FC-2C963F66AFA6" with body:
    """
    {
      "name": "Juan Perez",
      "username": "juanperez1",
      "email": "juan.perez1@example.com",
      "password": "passwordA1",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/users/3FA85F64-5717-4562-B3FC-2C963F66AFA6"
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      "name": "Juan Perez",
      "username": "juanperez1",
      "email": "juan.perez1@example.com",
      "role": "viewer"
    }
    """

  Scenario: Get a non-existing user
    Given I send a GET request to "/api/users/7C9E6679-7425-40DE-944B-E07FC1F90AE7"
    Then the response status code should be 404
