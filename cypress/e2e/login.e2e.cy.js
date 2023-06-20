describe("Login E2E", () => {
	it("L-1 Login incorrect", () => {
		cy.visit("/login");
		cy.get('input[id="login-email"]').type("john@example.com");
		cy.get('input[id="login-password"]').type("john@example.com");
		cy.get('button[id="login-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "invalid credentials");
	});

	it("L-2 Login incorrect by wrong email", () => {
		cy.visit("/login");
		cy.get('input[id="login-email').type("juanito@example.com");
		cy.get('input[id="login-password"]').type("2aSsword95%");
		cy.get('button[id="login-submit"]').click();

		cy.get("div")
		.find(".q-notification")
		.should("be.visible")
		.and("contain.text", "invalid credentials");
	});

	it("L-4 Correct login", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("john@example.com");
		cy.get('input[type="password"]').type("2aSsword95%");
		cy.get('button[type="submit"]').click();

		cy.on("url:changed", () => {
			cy.url().should("eq", `${Cypress.config().baseUrl}/`);
		});
	});

	it("L-3 Login correct with unverified user", () => {
		cy.visit("/login");
		cy.get('input[id="login-email').type("che.copete12345@gmail.com");
		cy.get('input[id="login-password"]').type("CheCopete123%");
		cy.get('button[id="login-submit"]').click();

		cy.url()
		.should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
		
		cy.get("div")
		.find(".q-notification")
		.should("be.visible")
		.and("contain.text", "You need to verify your account");
	});

});
