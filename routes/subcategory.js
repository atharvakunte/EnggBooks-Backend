const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  createSubCategory,
  getSubCategoryById,
  getSubCategoryByCategory,
  updateSubCategory,
  removeSubCategory,
} = require("../controllers/subcategory");
const { getCategoryById } = require("../controllers/category");

//params
router.param("userId", getUserById);
router.param("subcategoryId", getSubCategoryById);
router.param("categoryId", getCategoryById);

//routes
router.post(
  "/subcategory/create/:userId",
  isSignedIn,
  isAuthenticated,
  createSubCategory
);

//update main category
router.put(
  "/subcategory/:subcategoryId/:userId",
  isSignedIn,
  isAuthenticated,
  updateSubCategory
);

//read

router.get("/subcategories/:categoryId", getSubCategoryByCategory);

// delete main category
router.delete(
  "/subcategory/:subcategoryId/:userId",
  isSignedIn,
  isAuthenticated,
  removeSubCategory
);

module.exports = router;
