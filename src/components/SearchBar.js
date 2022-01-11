import React, { useState } from "react";

export function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.whatToDoOnSubmit(searchTerm);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <section className="search">

            <form className="d-flex ms-5 mb-5" onSubmit={handleSubmit}>
                <label className="mt-1 me-2" htmlFor="searching"> Search: </label>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                <button className="btn btn-outline-primary me-5" type="submit" >Search</button>
            </form>

        </section>
    );
}