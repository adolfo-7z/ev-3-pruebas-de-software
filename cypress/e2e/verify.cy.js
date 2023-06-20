describe('Verification E2E', () => {

	it("V-1 Correct verification", () => {
		cy.visit("/login");
		cy.get('input[type="email"]').type("huevito.rey1337@gmail.com");
		cy.get('input[type="password"]').type("Huevito123%");
		cy.get('button[id="login-submit"]').click();

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
		cy.get('input[id="verify-code"]').type("asd123");
		cy.get('button[id="verify-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Verification successful");

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/`);
	});

	it('V-2 Invalid code on verification', () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.login("MarceloLagos@terremoto.com", "Password1!");

		cy.visit("/");

		cy.wait(1000);

		cy.get('input[id="verify-code').type("Maruchan");
		cy.get('button[id="verify-submit"]').click();

	});

	it("V-3 User already verified", () => {
		cy.visit("/login");
		cy.get('input[id="login-email"]').type("huevito.rey1337@gmail.com");
		cy.get('input[id="login-password"]').type("Huevito123%");
		cy.get('button[id="login-submit"]').click();

		cy.wait(1000);
		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/`);

		cy.wait(2000);

		cy.visit("/verify?verify_error=1");
		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);


		cy.get('input[id="verify-code"]').type("asd123");
		cy.get('button[id="verify-submit"]').click();

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "the user is already verified");

		cy.url()
			.should("eq", `${Cypress.config().baseUrl}/`);

	});
});