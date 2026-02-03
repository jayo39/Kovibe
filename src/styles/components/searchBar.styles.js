import styled from "@emotion/styled";

export const CustomSearchBar = styled.div`
    width: 100%;
    font-family: "Pretendard", sans-serif;
    font-weight: bold;

    .search-wrapper {
        display: flex;
        flex-direction: row;
        column-gap: 15px;
        align-items: center;
        width: 100%;
    }

    input.keyword {
        flex-grow: 1;
        transition: border-color 0.2s ease-in-out;
        outline: none;
        font-size: 13px;
        font-weight: 500;
        padding: 0 20px;
        border-radius: 100px;
        border: 2px solid #eeeeee;
        height: 40px;
        background-color: white;
        box-sizing: border-box;
    }

    input.keyword:focus {
        border-color: #ef9a9a;
    }

    & .search-button {
        width: 150px;
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
        .search-wrapper {
            flex-direction: column;
            gap: 10px;
        }

        & .MuiInputBase-root.category,
        input.keyword,
        & .search-button {
            width: 100% !important; 
        }
    }
`;