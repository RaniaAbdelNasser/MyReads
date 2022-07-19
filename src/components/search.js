

import React from "react";
import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

const SearchScreen = ({ handelGetAllBooks }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [allBooksList, setAllBooksList] = useState([]);

    useEffect(() => {
        const getAllBooksFun = async () => {
            const res = await handelGetAllBooks();
            setAllBooksList(res);
        }
        getAllBooksFun();
    }, [])


    useEffect(() => {
        if (!searchQuery) {
            setTimeout(function () {
                setSearchList([]);
            }, 1000);
        }
    }, [searchQuery,])

    const handelQuerySearch = (e) => {
        setSearchQuery(e.target.value);
        if (!e.target.value) {      
               setSearchList([]);
        } else {
            const getMatchesBook = async () => {
                let resultOne = [];
                try {
                    const result = await BooksAPI.search(e.target.value, 30);
                    if (resultOne.error === "empty query") {
                        resultOne = [];
                    } else {
                        resultOne = [...result];
                    }
                } catch (error) {
                    console.log(error);
                }
                const resultTwo = allBooksList?.filter(book => book.title?.toLowerCase().includes(e.target.value.toLowerCase()) || (book.authors?.filter(author => author?.toLowerCase().includes(e.target.value.toLowerCase())).length > 0));
                setSearchList([...resultOne, ...resultTwo]);
            }
             getMatchesBook();
        }
       
    }


    const handelUpdateShelf = (book, newShelf) => {
        const updateShelf = async () => {
            await BooksAPI.update(book, newShelf);
        }
        updateShelf();
    }


    return (
        <>
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            value={searchQuery}
                            onChange={handelQuerySearch}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchList?.length > 0 && searchList?.map((book) => (
                            <li key={book.id}>
                                <BookCard book={book} setHandelUpdateShelf={handelUpdateShelf} />
                            </li>
                        ))}

                    </ol>
                </div>
            </div>
        </>
    );

}
export default SearchScreen;