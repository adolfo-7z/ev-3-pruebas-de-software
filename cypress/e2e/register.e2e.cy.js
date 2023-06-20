describe("Register E2E", () => {
    it("R-1 Register correct", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("renecito@example.com");
		cy.get('input[id="register-name"]').type("Rene Puente");
        cy.get('input[id="register-rut"]').type("9091653-k");
        cy.get('input[aria-label="Password"]').type("Rene12345%");
        cy.get('input[aria-label="Confirm the password"]').type("Rene12345%");
		cy.get('button[id="register-submit"]').click();

        cy.url()
		.should("eq", `${Cypress.config().baseUrl}/login`);

        cy.get("div")
		.find(".q-notification")
		.should("be.visible")
		.and("contain.text", "checkPlease login");
	});

    it("R-2 Register incorrect email already in use", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("r.valenzuela.cardenas@hotmail.com");
		cy.get('input[id="register-name"]').type("Esteban Dido");
        cy.get('input[id="register-rut"]').type("20331214-8");
        cy.get('input[aria-label="Password"]').type("Esteban123%");
        cy.get('input[aria-label="Confirm the password"]').type("Esteban123%");
		cy.get('button[id="register-submit"]').click();

        cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the email already exists");
	});

    it("R-3 Register incorrect rut already in use", () => {
		cy.visit("/register");
		cy.get('input[id="register-email"]').type("joe.biden@gmail.com");
		cy.get('input[id="register-name"]').type("Sleepy Joe");
        cy.get('input[id="register-rut"]').type("17915686-5");
        cy.get('input[aria-label="Password"]').type("JoeBiden123%");
        cy.get('input[aria-label="Confirm the password"]').type("JoeBiden123%");
		cy.get('button[id="register-submit"]').click();

        cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the rut already exists");
	});

});