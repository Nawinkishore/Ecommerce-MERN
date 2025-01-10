import React from 'react';
import { CiSearch } from "react-icons/ci";
const Header = () => {
    return (
        <div>
            <section className="bg-gray-700 flex  items-center justify-between h-20 p-5">
                <div>
                    <h1 className="font-bold text-2xl text-white">Nawin Cart</h1>
                </div>
                <div className="flex items-center justify-center relative">
                    <input type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs
                    rounded-md p-2"/>
                    <CiSearch className="absolute text-white right-0 w-10 h-8 hover:cursor-pointer" />
                </div>
                <div className="flex items-center gap-5">
                    <button className="btn bg-amber-400 p-3 text-white">Login</button>
                    <button className="btn bg-amber-400 p-3 text-white">Cart</button>
                </div>
            </section>
        </div>
    );
};

export default Header;