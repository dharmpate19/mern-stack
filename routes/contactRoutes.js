const express = require("express");
const {getContacts, postContact, getContact, putContact, deleteContact} = require("../controllers/contactController");

const router = express.Router();

router.route("/").get(getContacts).post(postContact);


router.route("/:id").get(getContact).put(putContact).delete(deleteContact);

module.exports = router;