Feature: Create a new Owner
  In order to manage property owners
  As an admin
  I want to create a new owner


  Scenario: A Valid non existing owner
    Given I send a PUT request to "/api/users/16FD2706-8BAF-433B-82EB-8C7FADA847DA" with body:
    """
    {
      "name": "Admin Owners",
      "username": "admin.owners",
      "email": "admin.owners@example.com",
      "password": "AdminPass1",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/3FA85F64-5717-4562-B3FC-2C963F66AFA6" with body:
    """
    {
      "name": "Juan Perez",
      "ciNit": "12345678",
      "phone": "70000000"
    }
    """
    Then the response status code should be 201
    And the response should be empty


  Scenario: An invalid owner with missing required fields
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/1B4E28BA-2FA1-4B3C-9AAF-1D3B9A5A5A5A" with body:
    """
    {
      "name": "Carlos Ruiz"
    }
    """
    Then the response status code should be 422


  Scenario: An invalid owner with invalid CI/NIT
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/5A1B2C3D-4E5F-4A6B-8C7D-9E0F1A2B3C4D" with body:
    """
    {
      "name": "Lucia Gomez",
      "ciNit": "ABC123",
      "phone": "70000000"
    }
    """
    Then the response status code should be 422


  Scenario: An invalid owner with invalid phone
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/9B2D3C4E-5F6A-4B7C-8D9E-0F1A2B3C4D5E" with body:
    """
    {
      "name": "Pedro Sanchez",
      "ciNit": "987654321",
      "phone": "12"
    }
    """
    Then the response status code should be 422


  Scenario: Unauthorized when missing token
    Given I set header "Authorization" with value ""
    Given I send a PUT request to "/api/owners/8F1E2D3C-4B5A-6C7D-8E9F-0A1B2C3D4E5F" with body:
    """
    {
      "name": "Laura Molina",
      "ciNit": "55555111",
      "phone": "71234567"
    }
    """
    Then the response status code should be 401


  Scenario: Forbidden when user is not admin
    Given I send a PUT request to "/api/users/550E8400-E29B-41D4-A716-446655440000" with body:
    """
    {
      "name": "Viewer Owners",
      "username": "viewer.owners",
      "email": "viewer.owners@example.com",
      "password": "ViewerPass1",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "viewer.owners@example.com",
      "password": "ViewerPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "viewer_token"
    Given I set bearer token from variable "viewer_token"
    Given I send a PUT request to "/api/owners/0F1A2B3C-4D5E-6F7A-8B9C-0D1E2F3A4B5C" with body:
    """
    {
      "name": "Carlos Lima",
      "ciNit": "77777111",
      "phone": "71234567"
    }
    """
    Then the response status code should be 403
