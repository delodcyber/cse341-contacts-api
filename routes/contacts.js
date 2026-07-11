const express = require("express");
const router = express.Router();

const Contact = require("../DB/contacts");

// GET all contacts
router.get("/", async (req, res) => {
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
  try {
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
      message: "Server error."
    });
  }
});

// POST create a new contact
router.post("/", async (req, res) => {
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

    res.status(20).json({ id: newContact._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error."
    });
  }
});

// PUT update a contact by ID
router.put("/:id", async (req, res) => {
  try {
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
      message: "Server error."
    });
  }
});

// DELETE a contact by ID
router.delete("/:id", async (req, res) => {
  try {
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
      message: "Server error."
    });
  }
});

module.exports = router;