const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "CRUD API for managing contacts, backed by MongoDB."
  },
  host: "https://cse341-contacts-api-momc.onrender.com/",
  basePath: "/",
  schemes: ["https"],
  definitions: {
    Contact: {
      firstName: "Peter",
      lastName: "Parker",
      email: "spiderman@example.com",
      favoriteColor: "Black",
      birthday: "2001-08-10"
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);