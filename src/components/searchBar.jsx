import { CustomSearchBar } from "../styles/components/searchBar.styles";
import { Button } from "@mui/material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {

    const [category, setCategory] = useState("");

    return (
        <CustomSearchBar>
            <div className="search-wrapper"> 
                <input className="keyword" placeholder="검색어를 입력해주세요"/>
                <Button 
                    className="search-button"
                    style={{backgroundColor: '#000', fontSize: '13px', borderRadius: '100px', height: '40px', fontWeight: 'bold'}} 
                    variant="contained" 
                    disableElevation
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: '3px'}}/> 검색하기
                </Button>
            </div>
        </CustomSearchBar>
    )
}

export default SearchBar;