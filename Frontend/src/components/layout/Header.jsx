import React from 'react';
import { CiSearch } from "react-icons/ci";
import Search from "./Search.jsx";
import {Link} from "react-router-dom";



const Header = () => {


    return (
        <div>
            <section className="bg-gray-700 flex  items-center justify-between h-20 p-5">
                <Link to={'/'}>
                    <h1 className="font-bold text-2xl text-white">Nawin Cart</h1>
                </Link>
                <Search />
                <div className="flex items-center gap-5">
                    <button className="btn bg-amber-400 p-3 text-white">Login</button>
                    <button className="btn bg-amber-400 p-3 text-white">Cart</button>
                </div>
            </section>

        </div>
    );
};

export default Header;