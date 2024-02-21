describe("Logout Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/profile");
  });

  it("allows users to log out if logged in", () => {
    cy.window()
      .its("localStorage")
      .invoke("getItem", "isLoggedIn")
      .then((isLoggedIn) => {
        if (isLoggedIn === "true") {
          cy.get("#hamburger-menu").should("be.visible");

          cy.get("#hamburger-menu").click();

          cy.contains("Logout").click();

          cy.window()
            .its("localStorage")
            .invoke("getItem", "Token")
            .should("be.null");
        } else {
          cy.log("User is not logged in. Skipping logout test.");
        }
      });
  });
});
