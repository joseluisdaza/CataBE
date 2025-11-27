Feature: Authenticate a User
  In order to login to the platform
  As a user
  I want to authenticate with my credentials


  Scenario: Authenticate with valid credentials
    Given I send a PUT request to "/api/users/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0" with body:
    """
    {
      "name": "Elena Ruiz",
      "username": "elena.ruiz6",
      "email": "elena.ruiz6@example.com",
      "password": "superpass456",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "elena.ruiz6@example.com",
      "password": "superpass456"
    }
    """
    Then the response status code should be 200
    And the response should contain field "token"


  Scenario: Authenticate with invalid email
    Given I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "no.user7@example.com",
      "password": "password123"
    }
    """
    Then the response status code should be 401


  Scenario: Authenticate with invalid password
    Given I send a PUT request to "/api/users/550E8400-E29B-41D4-A716-446655440000" with body:
    """
    {
      "name": "Miguel Torres",
      "username": "miguel.torres7",
      "email": "miguel.torres7@example.com",
      "password": "passwordE5",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "miguel.torres7@example.com",
      "password": "wrongpassword"
    }
    """
    Then the response status code should be 401


  Scenario: Authenticate with missing credentials
    Given I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "miguel.torres7@example.com"
    }
    """
    Then the response status code should be 422
