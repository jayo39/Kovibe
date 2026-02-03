import styled from "@emotion/styled";

export const CustomPostPage = styled.div`
    font-family: "Pretendard", sans-serif;
    color: #000;
    font-size: 15px;
    flex: 1;
    max-width: 1200px;

    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

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