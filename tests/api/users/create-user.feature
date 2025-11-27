Feature: Create a new User
  In order to have users in the platform
  As a user
  I want to create a new user


  Scenario: A Valid non existing user
    Given I send a PUT request to "/api/users/16FD2706-8BAF-433B-82EB-8C7FADA847DA" with body:
    """
    {
      "name": "Maria Lopez",
      "username": "marialopez2",
      "email": "maria.lopez2@example.com",
      "password": "passwordB2",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    And the response should be empty


  Scenario: An invalid user with missing required fields
    Given I send a PUT request to "/api/users/1B4E28BA-2FA1-4B3C-9AAF-1D3B9A5A5A5A" with body:
    """
    {
      "name": "Carlos Ruiz"
    }
    """
    Then the response status code should be 422


  Scenario: An invalid user with invalid email
    Given I send a PUT request to "/api/users/5A1B2C3D-4E5F-4A6B-8C7D-9E0F1A2B3C4D" with body:
    """
    {
      "name": "Lucia Gomez",
      "username": "luciagomez3",
      "email": "invalid-email",
      "password": "passwordC3",
      "role": "viewer"
    }
    """
    Then the response status code should be 422


  Scenario: An invalid user with short password
    Given I send a PUT request to "/api/users/9B2D3C4E-5F6A-4B7C-8D9E-0F1A2B3C4D5E" with body:
    """
    {
      "name": "Pedro Sanchez",
      "username": "pedrosanchez4",
      "email": "pedro.sanchez4@example.com",
      "password": "12345",
      "role": "viewer"
    }
    """
    Then the response status code should be 422


  Scenario: An invalid user with invalid role
    Given I send a PUT request to "/api/users/2C963F66-AFA6-4F64-8BAF-433B82EB8C7F" with body:
    """
    {
      "name": "Sofia Diaz",
      "username": "sofiadiaz5",
      "email": "sofia.diaz5@example.com",
      "password": "passwordD4",
      "role": "superadmin"
    }
    """
    Then the response status code should be 422
