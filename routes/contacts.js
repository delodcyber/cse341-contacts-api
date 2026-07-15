const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contact = require("../DB/contacts");

// GET all contacts
router.get("/", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get all contacts'
    #swagger.description = 'Returns every contact stored in the database.'
    #swagger.responses[200] = {
      description: 'A list of contacts.',
      schema: [{ $ref: '#/definitions/Contact' }]
    }
    #swagger.responses[500] = { description: 'Server error.' }
  */

  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});

// GET one contact by ID
router.get("/:id", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Get a contact by ID'
    #swagger.description = 'Returns a single contact matching the given ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId of the contact',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'The matching contact.',
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[404] = { description: 'Contact not found.' }
    #swagger.responses[500] = { description: 'Server error.' }
  */

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID."
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server error."
    });
  }
});

// POST create a new contact
router.post("/", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.description = 'Creates a contact. All fields are required.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[201] = {
      description: 'Contact created successfully.',
      schema: {
        id: '6876e44e6b8f5d3e2b123456'
      }
    }
    #swagger.responses[400] = { description: 'One or more required fields are missing.' }
    #swagger.responses[500] = { description: 'Server error.' }
  */

  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, favoriteColor, and birthday are all required."
      });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: newContact._id });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: error.message || "Internal Server error."
    });
  }
});

// PUT update a contact by ID
router.put("/:id", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact by ID'
    #swagger.description = 'Replaces all fields on an existing contact. All fields are required.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId of the contact',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[200] = {
      description: 'Updated contact.',
      schema: { $ref: '#/definitions/Contact' }
    }
    #swagger.responses[404] = { description: 'Contact not found.' }
    #swagger.responses[500] = { description: 'Server error.' }
  */

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID."
      });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, favoriteColor, and birthday are all required."
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, favoriteColor, birthday },
      { returnDocument: "after", runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server error."
    });
  }
});

// DELETE a contact by ID
router.delete("/:id", async (req, res) => {
  /*
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a contact by ID'
    #swagger.description = 'Deletes a single contact matching the given ID.'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB ObjectId of the contact',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = { description: 'Contact deleted successfully.' }
    #swagger.responses[404] = { description: 'Contact not found.' }
    #swagger.responses[500] = { description: 'Server error.' }
  */

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID."
      });
    }``

    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server error."
    });
  }
});

module.exports = router;