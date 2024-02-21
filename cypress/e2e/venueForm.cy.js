describe("Create Venue Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/create"); // Adjust URL as needed
  });

  it("allows users to fill out and submit the form", () => {
    cy.fixture("venuedata").then((data) => {
      cy.get("#name").type(data.name);
      cy.get("#description").type(data.description);
      cy.get("#wifi").check();
      cy.get("#parking").check();
      cy.get("#breakfast").check();
      cy.get("#pets").check();
      cy.get("#media").type(data.image);
      cy.get("#address").type(data.address);
      cy.get("#city").type(data.city);
      cy.get("#zip").type(data.zip);
      cy.get("#country").type(data.country);
      cy.get("#price").type(data.price);
      cy.get("#maxGuests").type(data.maxGuests);
      cy.contains("Submit").click();
    });
  });
});
