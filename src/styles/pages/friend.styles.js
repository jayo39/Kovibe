import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-height: 100vh;
`;

export const FriendCard = styled.div`
  width: 100%;
  max-width: 700px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 30px;
`;

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1a1a1a;
  text-align: left;
`;

export const SearchIconWrapper = styled.div`
  position: relative;
  width: 100%;

  &::before {
    content: "🔍";
    position: absolute;
    left: 15px;
    top: 28px; /* Adjusted for MUI height */
    transform: translateY(-50%);
    font-size: 0.9rem;
    opacity: 0.4;
    z-index: 2; /* Ensures icon stays above input background */
  }
`;

export const FriendList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FriendItem = styled.div`
  padding: 18px 8px;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  color: #4a4a4a;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #fafafa;
  }

  &:last-child {
    border-bottom: none;
  }
    
  a {
        /* This ensures the entire area of the item is clickable */
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const StyledAutocomplete = styled(Autocomplete)`
  margin-bottom: 25px;
  width: 100%;

  .MuiOutlinedInput-root {
    padding: 8px 12px 8px 40px !important; /* Space for the search icon */
    background-color: #f5f5f5;
    border-radius: 10px;
    border: none;
    
    & fieldset {
      border: none; /* Removes the default MUI border */
    }
  }

  .MuiAutocomplete-endAdornment {
    /* Adjusting the position of the clear/arrow icons */
    right: 10px !important;
  }
`;