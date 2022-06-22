/** @format */

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.use(cors());
app.use(express.json());
// app.use(express.static(__dirname + "public"));

app.get(
  "/",
  (req, res) => {
    const content = fs.readFileSync("./data/booksTest.json");
    console.log("Response");
    // console.log(content);
    res.send(content);
  },
  () => {
    console.log("Get Mens Crash");
  }
);

app.get(
  "/covers",
  (req, res) => {
    const rawData = fs.readFileSync("./data/Books_4_1.json");
    const content = JSON.parse(rawData);
    const filterMissingTitle = content.filter((book) => {
      if (book.title != undefined || book.subtitle != undefined) {
        return book;
      }
    });
    const filterNoAuthor = filterMissingTitle.filter((book) => {
      if (book.authors != undefined) {
        return book;
      }
      // return book.authors[0].author;
    });
    const mapFiltered = filterNoAuthor.map((book) => {
      if (
        book.title != null &&
        book.authors[0].author != null &&
        book.covers > 1
      ) {
        //Object goes in here
        // return book.title;
        let newBook = {
          // key: book.key,
          title: book.title,
          author: book.authors[0].author,
          created: book.created.value,
          subjects: book.subjects,
          last_modified: book.last_modified.value,
          covers: book.covers[0],
          revision: book.revision,
          last_revision: book.latest_revision,
        };
        return newBook;
      } else if (
        book.subtitle != null &&
        book.authors[0].author != null &&
        book.covers > 1
      ) {
        // return book.subtitle;
        let newBook = {
          // key: book.key,
          title: book.subtitle,
          author: book.authors[0].author,
          created: book.created.value,
          subjects: book.subjects,
          last_modified: book.last_modified.value,
          covers: book.covers[0],
          revision: book.revision,
          last_revision: book.latest_revision,
        };
        return newBook;
      } else {
        console.log("Error: No Title or SubTitle");
      }
    });
    let data = JSON.stringify(mapFiltered);
    fs.writeFileSync("./data/Books_9.json", data);
    res.send(mapFiltered);
  },
  () => {
    console.log("Covers Crashed");
  }
);

// app.get(
//   "/covers",
//   (req, res) => {
//     const rawData = fs.readFileSync("./data/booksTest.json");
//     const content = JSON.parse(rawData);
//     const mappedContent = content.map((books) => {
//       let authorsBook = books.authors[0].author;
//       let bookCover = books.covers[0];
//       let book = {
//       key: books.key,
//       title: books.title,
//       created: books.created.value,
//       subjects: books.subjects,
//       authors: authorsBook,
//       last_modified: books.value,
//       covers: bookCover,
//       revision: books.revision,
//       last_revision: books.last_revision,
//       };
//       return book;
//       return authorsBook;
//     });
//     // let data = JSON.stringify(mappedContent);
//     // fs.writeFileSync("./data/booksTest.json", data);
//     res.send(mappedContent);
//   },
//   () => {
//     console.log("Covers Crashed");
//   }
// );
