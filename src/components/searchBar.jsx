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
                <Select
                    className="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <span className="placeholder">카테고리</span>;
                        }
                        if (selected === "tech") return "기술";
                        if (selected === "daily") return "일상";
                        if (selected === "school") return "학교";
                        return selected;
                    }}
                >
                    <MenuItem value="" disabled>카테고리</MenuItem>
                    <MenuItem value="tech">기술</MenuItem>
                    <MenuItem value="daily">일상</MenuItem>
                    <MenuItem value="school">학교</MenuItem>
                </Select>
                <input className="keyword" placeholder="검색어를 입력해주세요"/>
                <Button 
                    className="search-button"
                    style={{backgroundColor: '#000', borderRadius: '100px', height: '52px', fontWeight: 'bold'}} 
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