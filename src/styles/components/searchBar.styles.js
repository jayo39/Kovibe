import styled from "@emotion/styled";

export const CustomSearchBar = styled.div`
    width: 100%;
    font-family: "Pretendard", sans-serif;

    .search-wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 15px;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        background-color: white;
        box-sizing: border-box;
    }

    .category-select {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #757575;
        font-size: 15px;
        cursor: pointer;
        padding-right: 10px;
        min-width: fit-content;

        .arrow-icon {
            font-size: 12px;
            color: #9e9e9e;
        }
    }

    .divider {
        width: 1px;
        height: 20px;
        background-color: #eee;
        margin: 0 10px;
    }

    input.keyword {
        flex-grow: 1;
        border: none;
        outline: none;
        font-size: 15px;
        color: #333;
        padding: 0 15px;
        background: transparent;

        &::placeholder {
            color: #9e9e9e;
        }
    }

    .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: #757575;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;

        &:hover {
            color: #333;
        }
    }

    @media (max-width: 768px) {
        .search-wrapper {
            height: 45px;
        }
    }
`;