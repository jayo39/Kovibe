import styled from "@emotion/styled";

export const CustomPostPage = styled.div`
    font-family: "Pretendard", sans-serif;
    color: #000;
    font-size: 15px;
    flex: 1;

    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    .table-title {
        color: #f91f15;
        font-weight: bold;
    }

    & .MuiButton-root {
        font-family: "Pretendard", sans-serif;
        font-weight: 500;
        text-transform: none;
        height: 30px;
        padding: 0 20px;
    }

    & .MuiTableCell-root {
        font-size: 13px !important; 
        padding: 10px;
    }
`;

export const WritePostBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    transition: background-color 0.2s;

    &:hover {
        background-color: #fafafa;
    }

    span {
        color: #9e9e9e;
        font-size: 14px;
        font-weight: 400;
    }

    .pencil-icon {
        color: #bdbdbd;
        font-size: 16px;
    }
`;