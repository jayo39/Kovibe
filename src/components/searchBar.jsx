import { CustomSearchBar } from "../styles/components/searchBar.styles";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [category, setCategory] = useState("전체");

    return (
        <CustomSearchBar>
            <div className="search-wrapper"> 
                <div className="category-select">
                    <span>{category}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" />
                </div>

                <div className="divider" />

                <input className="keyword" placeholder="검색어를 입력하세요." />
                
                <button className="icon-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </CustomSearchBar>
    )
}

export default SearchBar;