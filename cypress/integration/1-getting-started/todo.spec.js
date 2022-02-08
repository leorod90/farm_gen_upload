describe("farms", () => {
  it("user and add or delete farms", () => {
    //login
    cy.visit("/");
    cy.get(
      ".r-paddingHorizontal-cf760m > .r-height-1ph75f1 > .r-alignItems-1awozwy"
    ).click();
    cy.get(
      ".r-height-1pi2tsx > .r-backgroundColor-14lw9ot > .css-view-1dbjc4n"
    ).click();
    cy.get(".r-backgroundColor-14sbq61 > .css-text-901oao").click();
    cy.get('[placeholder="E-mail"]').type("test@test.com");
    cy.get('[placeholder="Password"]').type("test123");
    cy.get(
      ".r-padding-x5mtel > .css-cursor-18t94o4 > .css-text-901oao"
    ).click();
    //add farm
    cy.get('[placeholder="Enter a store name"]').type("cypress");
    cy.get('[placeholder="Image Url (optional)"]').type(
      "https://secure.img1-fg.wfcdn.com/im/23644624/resize-h445%5Ecompr-r85/4395/43952214/Robert+Harding+Picture+Library+Waterfall+by+Robert+Harding+Picture+Library+-+Graphic+Art+on+Canvas.jpg"
    );
    cy.get(".css-cursor-18t94o4 > .css-text-901oao").click();
    //delete farm
    cy.wait(1000)
    cy.get(
      ".r-flexGrow-16y2uox > :nth-child(1) > .r-borderRadius-1dzdj1l > .r-flex-13awgt0 > .r-padding-1pcd2l5 > .r-justifyContent-1wtj0ep > .r-cursor-1loqt21"
    ).click();
  });
});
