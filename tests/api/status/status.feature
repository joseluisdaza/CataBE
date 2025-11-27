Feature: Api Status
  In order to know the server is up and running
  As a healtch check
  I want to check the api status

  Scenario: Check the api status
    Given I send a GET request to "/api/status"
    Then the response status code should be 200
