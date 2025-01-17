import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {useRef} from "react";

const Search = () => {
    const inputRef = useRef();
    const resetSearch = () => {
        inputRef.current.value = '';
    }
    const [keyword, setKeyword] = React.useState('');
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <form className="flex items-center justify-center relative" onSubmit={searchHandler}>
                <input
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    type="text"
                    ref={inputRef}
                    placeholder="Search here"
                    className="input input-bordered w-full max-w-xs rounded-md p-2"
                />
                <CiSearch
                    className="absolute text-white right-0 w-10 h-8 hover:cursor-pointer"
                    onClick={searchHandler}
                />
            </form>
        </>
    );
};

export default Search;