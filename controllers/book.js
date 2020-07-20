const Book = require("../models/book");
const Subcategory = require("../models/subcategory");
const formidable = require("formidable");
const _ = require("lodash");

exports.getBookById = (req, res, next, id) => {
  Book.findById(id)
    .populate()
    .exec((err, book) => {
      if (err) {
        return res.status(400).json({
          err: "Product not found in DB",
        });
      }
      req.book = book;
      next();
    });
};

exports.createBook = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        err: "Please enter all fields",
      });
    }

    //destructure the field
    const {
      name,
      authors,
      publication,
      category,
      subcategory,
      ilink,
      dlink,
    } = fields;

    if (
      !name ||
      !authors ||
      !publication ||
      !category ||
      !subcategory ||
      !ilink ||
      !dlink
    ) {
      return res.status(400).json({
        err: "Please include all fields",
      });
    }

    let book = new Book(fields);

    console.log(book);

    //save to DB
    book.save((err, book) => {
      if (err) {
        return res.status(400).json({
          err: "Saving book in DB failed",
        });
      }

      res.json(book);
    });
  });
};

exports.deleteBook = (req, res) => {
  let book = req.book;
  book.remove((err, deletedBook) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to delete the book",
      });
    }
    res.json({
      message: "Book deleted successfully",
      deletedBook,
    });
  });
};

exports.updateBook = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(400).json({
        err: "Enter all fields",
      });
    }

    //updation code
    let book = req.book;
    book = _.extend(book, fields);

    //save to DB
    book.save((err, book) => {
      if (err) {
        return res.status(400).json({
          err: "Updation of book in DB failed",
        });
      }

      res.json(book);
    });
  });
};

exports.getBooksBySubcategory = (req, res) => {
  Book.find({ subcategory: req.subcategory._id })
    .populate()
    .exec((err, books) => {
      if (err) {
        res.status(400).json({
          err: "No Books Found",
        });
      }
      res.json(books);
    });
};
