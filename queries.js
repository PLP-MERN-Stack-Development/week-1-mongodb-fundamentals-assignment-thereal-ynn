// queries.js – MongoDB Shell-style queries for Week 1 Assignment

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 11.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "Animal Farm" })

// Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Use projection to return only title, author, and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)

// Sort books by price – ascending
db.books.find().sort({ price: 1 })

// Sort books by price – descending
db.books.find().sort({ price: -1 })

// Pagination: 5 books per page – Page 1
db.books.find().limit(5).skip(0)

// Pagination: 5 books per page – Page 2
db.books.find().limit(5).skip(5)

// Aggregation: Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Aggregation: Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Aggregation: Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [ { $substr: [ { $toString: "$published_year" }, 0, 3 ] }, "0s" ] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// Index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain() to show index use
db.books.find({ title: "1984" }).explain("executionStats")
