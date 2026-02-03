import styled from "@emotion/styled";

export const CustomPostSideBar = styled.div`
    width: 260px;
    font-family: "Pretendard", sans-serif;
    font-weight: bold;
    min-width: 260px;

    .ad-section {
        width: 260px;
        height: 130px;
        background-color: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .table-title {
        font-weight: bold;
        color: #296EB5;
    }

    & .MuiTableCell-root {
        font-size: 13px !important; 
        padding: 10px;
    }

    @media (max-width: 900px) {
        display: none;
    }
`;