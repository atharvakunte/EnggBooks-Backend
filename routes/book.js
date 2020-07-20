const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getSubCategoryById } = require("../controllers/subcategory");
const {
  getBookById,
  getBooksBySubcategory,
  updateBook,
  deleteBook,
  createBook,
  searchBooks,
  getSearchtext,
} = require("../controllers/book");

//params
router.param("userId", getUserById);
router.param("subcategoryId", getSubCategoryById);
router.param("bookId", getBookById);
router.param("searchtext", getSearchtext);

//routes
router.post("/book/create/:userId", isSignedIn, isAuthenticated, createBook);
router.put("/book/:bookId/:userId", isSignedIn, isAuthenticated, updateBook);
router.delete("/book/:bookId/:userId", isSignedIn, isAuthenticated, deleteBook);
router.get("/books/get/:subcategoryId", getBooksBySubcategory);
router.get("/books/search/:searchtext", searchBooks);

module.exports = router;
