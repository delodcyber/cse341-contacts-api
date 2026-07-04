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

module.exports = router;