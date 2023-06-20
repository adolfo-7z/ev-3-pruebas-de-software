describe('Verification E2E', () => {
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
});