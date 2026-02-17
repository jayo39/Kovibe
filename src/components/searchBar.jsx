import React, { useState } from 'react';
import { Popper, Paper, MenuItem, ClickAwayListener, Grow } from '@mui/material'; // New imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CustomSearchBar } from "../styles/components/searchBar.styles";

const SearchBar = ({ onSearch }) => {
    const [category, setCategory] = useState("전체");
    const [keyword, setKeyword] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const categoryMap = {
        "전체": "all",
        "글 제목": "title",
        "글 내용": "content"
    };

    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const triggerSearch = () => {
        onSearch(categoryMap[category], keyword);
    };

    return (
        <CustomSearchBar>
            <div className="search-wrapper"> 
                <div 
                    role="button"
                    tabIndex={0}
                    className="category-select" 
                    onClick={handleToggle} 
                    onKeyDown={(e) => e.key === 'Enter' && handleToggle(e)}
                    style={{ cursor: 'pointer' }}
                >
                    <span>{category}</span>
                    <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className="arrow-icon" 
                        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} 
                    />
                </div>

                <Popper 
                    open={open} 
                    anchorEl={anchorEl} 
                    transition 
                    disablePortal={false} 
                    placement="bottom-start"
                    style={{ zIndex: 1300 }}
                >
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
                            <Paper sx={{ mt: 1, minWidth: '90px', boxShadow: 3 }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <div role="menu">
                                        {Object.keys(categoryMap).map((label) => (
                                            <MenuItem 
                                                key={label} 
                                                onClick={() => { 
                                                    setCategory(label); 
                                                    handleClose(); 
                                                }}
                                            >
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>

                <div className="divider" />

                <input 
                    className="keyword" 
                    placeholder="검색어를 입력하세요." 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
                />
                
                <button className="icon-button" onClick={triggerSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </CustomSearchBar>
    );
};

export default SearchBar;