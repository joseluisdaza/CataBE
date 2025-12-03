Feature: Delete an Owner
  In order to manage property owners
  As an admin
  I want to delete an owner

  Scenario: Delete an existing owner
    Given I send a PUT request to "/api/users/AA11BB22-CC33-4DD4-8EE5-FF66778899AA" with body:
    """
    {
      "name": "Admin Owners",
      "username": "admin.owners.delete",
      "email": "admin.owners.delete@example.com",
      "password": "AdminPass1",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.owners.delete@example.com",
      "password": "AdminPass1"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "admin_token"
    Given I set bearer token from variable "admin_token"
    Given I send a PUT request to "/api/owners/A1B2C3D4-E5F6-4A7B-8C9D-0E1F2A3B4C5D" with body:
    """
    {
      "name": "Owner To Delete",
      "ciNit": "13579135",
      "phone": "70000000"
    }
    """
    Then the response status code should be 201
    And the response should be empty
    Given I send a DELETE request to "/api/owners/A1B2C3D4-E5F6-4A7B-8C9D-0E1F2A3B4C5D"
    Then the response status code should be 204
