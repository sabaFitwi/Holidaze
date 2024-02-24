describe("Create Venue Form", () => {
  beforeEach(() => {
    // Set the isVenueManager flag in the local storage
    localStorage.setItem("isVenueManager", "true");

    cy.visit("http://localhost:3000/create");
  });

  it("allows venue managers to fill out the form and redirect to the profile page", () => {
    // Fill out the form fields
    cy.get("#name").type("Sample Venue");
    cy.get("#description").type("This is a sample venue description");
    cy.get("#price").type("100");
    cy.get("#maxGuests").type("50");
    cy.get("#rating").type("4.5");
    cy.get("#address").type("123 Sample Address");
    cy.get("#city").type("Sample City");
    cy.get("#zip").type("12345");
    cy.get("#country").type("Sample Country");
    cy.get("#lat").type("40.7128");
    cy.get("#lng").type("-74.0060");

    // Select a continent from the dropdown
    cy.get("#continent").select("North America");

    // Check some amenities checkboxes using labels
    cy.get('label[for="wifi"]').click();

    // Click the submit button
    cy.contains("Submit").click();
  });
});
