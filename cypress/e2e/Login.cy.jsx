// cypress/integration/login.spec.js
describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("  http://localhost:3000/login"); // Assuming "/login" is the route to the login page
  });

  it("displays the login form", () => {
    cy.get("form").should("exist");
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
    cy.get("Button[type='submit']").should("exist");
  });

  it("allows users to input email and password", () => {
    const email = "test@stud.noroff.no";
    const password = "password123";

    cy.get("#email").type(email).should("have.value", email);
    cy.get("#password").type(password).should("have.value", password);
  });

  it("submits the form and displays success message on successful login", () => {
    const email = "test@stud.noroff.no";
    const password = "password123";

    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.contains("Log In").should("exist");

    cy.contains("Login successful!").should("be.visible");
  });

  it("displays error message on failed login", () => {
    const email = "invalid@example.com";
    const password = "invalidpassword";

    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.contains("Log In").should("exist");

    cy.contains("Login failed. Please check your credentials.").should(
      "be.visible",
    );
  });
});
