/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

import SingleBook from "../singleBook/SingleBook";

function Books() {
  const [books, setBooks] = useState([]);

  const getAllBooks = () => {
    axios.get("http://localhost:8080/").then((response) => {
      const oldBooks = response.data;
      setBooks(oldBooks);
    });
  };

  // console.log(books);

  useEffect(() => {
    getAllBooks();
  }, []);

  console.log(books);

  // books.forEach((book) => console.log(book));

  return (
    <div>
      <h1>Books</h1>
      {/* {books.length > 0 &&
        books.map((books) => {
          return <SingleBook books={books} />;
        })} */}
    </div>
  );
}

export default Books;
