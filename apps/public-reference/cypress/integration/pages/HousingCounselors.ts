describe("Housing counselors page", () => {
  it("renders the provided list of counselors", () => {
    cy.visit("http://localhost:3000/housing-counselors")
    cy.contains("Housing Counselors")
    cy.get("article").should("have.length.of.at.least", 1)
    cy.get("article").first().contains("Language Services: ")
  })
})
