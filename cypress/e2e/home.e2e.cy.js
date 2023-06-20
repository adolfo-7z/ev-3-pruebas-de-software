describe("Home E2E", () => {
	it("H-1 Home correct", () => {
		cy.login("john@example.com", "2aSsword95%");

		cy.visit("/");

		cy.get(".user-name").should("have.text", "John Doe");
		cy.get(".user-rut").should("have.text", "22.222****");
		cy.get(".user-email").should("have.text", "john@example.com");
	});

	it("H-2 Home incorrect due to invalid token", () => {
		
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.login("r.valenzuela07@ufromail.cl", "Password1!");

		cy.visit("/");

		cy.wait(5000);

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "You need to verify your account");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/verify?verify_error=1`);
		});
	});

	it("H-3 Home incorrect", () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});

		cy.visit("/");

		cy.get("div")
			.find(".q-notification")
			.should("be.visible")
			.and("contain.text", "Please enter your credentials");

		cy.on("url:changed", (newurk) => {
			console.log(newurk);
			cy.url().should("eq", `${Cypress.config().baseUrl}/login?login_error=1`);
		});
	});

	it("H-4 Obtain RUT and avatar of user on card interaction", () => {
		

		cy.login("r.valenzuela.cardenas@hotmail.com", "Password1!");

		cy.visit("/");

		cy.get("div")
		.find("#user.q-item")
		.click();

		cy.get("div")
		.find(".q-card")
		.should("contain.text", "RUT: 7.589.686-7");
		
		cy.get("div")
		.find(".q-card")
		.find("img")
		.should("be.visible");
		
		
	});

	it("H-5 Block user", () => {
		
		cy.window().then((win) => {
			win.localStorage.clear();
		});
		
		cy.login("r.valenzuela.cardenas@hotmail.com", "Password1!");

		cy.visit("/");

		cy.wait(5000);

		cy.get(".block")
		.contains("block")
		.click();

		cy.wait(5000);

		cy.get("div")
		.find("#user.q-item")
		.should("contain.text", "This user is blocked");

	});

	it("H-6 Unblock user", () => {
		cy.window().then((win) => {
			win.localStorage.clear();
		});
		
		cy.login("r.valenzuela.cardenas@hotmail.com", "Password1!");

		cy.visit("/");

		cy.wait(5000);

		cy.get(".block")
		.contains("unblock")
		.click();

		cy.wait(5000);

		cy.get("div")
		.find("#user.q-item")
		.should("contain.text", "This user is unblocked");
	});



});
