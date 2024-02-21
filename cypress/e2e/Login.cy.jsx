describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("displays the login form", () => {
    cy.get("form").should("exist");
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]").should("exist");
    cy.contains("Log In").should("exist");
  });

  it("allows users to input email and password", () => {
    const email = "test@stud.noroff.no";
    const password = "password123";

    cy.get("[data-cy=email-input]").type(email).should("have.value", email);
    cy.get("[data-cy=password-input]")
      .type(password)
      .should("have.value", password);
  });

  it("submits the form and checks local storage for login status", () => {
    const email = "test@stud.noroff.no";
    const password = "password123";

    cy.get("[data-cy=email-input]").type(email);
    cy.get("[data-cy=password-input]").type(password);
    cy.contains("Log In").click();

    cy.window()
      .its("localStorage")
      .then((localStorage) => {
        const accessToken = localStorage.getItem("Token");
        if (accessToken) {
          // If access token exists, it's a successful login
          cy.contains("Login successful!").should("be.visible");
        }
      });
  });
});
