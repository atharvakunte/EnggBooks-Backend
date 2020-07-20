const SubCategory = require("../models/subcategory");

//get category by id
exports.getSubCategoryById = (req, res, next, id) => {
  SubCategory.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        err: "SUBCATEGORY NOT FOUND IN DB",
      });
    }
    req.subcategory = cate;
    next();
  });
};

exports.getSubCategoryByCategory = (req, res, cateId) => {
  SubCategory.find(cateId).exec((err, cates) => {
    if (err) {
      return res.status(400).json({
        err: "NOT FOUND",
      });
    }
    res.json(cates);
  });
};

exports.createSubCategory = (req, res) => {
  const category = new SubCategory(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "SUBCATEGORY COULD NOT BE SAVED",
      });
    }
    res.json({ category });
  });
};

//edit a category
exports.updateSubCategory = (req, res) => {
  const category = req.subcategory;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        err: "COULD NOT UPDATE SUBCATEGORY",
      });
    }
    console.log("SUBCATEGORY UPDATED SUCCESSFULLY");
    res.json(updatedCategory);
  });
};

//delete a category
exports.removeSubCategory = (req, res) => {
  const category = req.subcategory;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "FAILED TO DELETE SUBCATEGORY",
      });
    }
    res.json({
      message: "SUBCATEGORY DELETED SUCCESSFULLY",
    });
  });
};
