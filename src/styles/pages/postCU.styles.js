import styled from "@emotion/styled";

export const CustomPostCU = styled.div`
    font-family: "Pretendard", sans-serif;
    color: #000;

    .custom-input {
        padding: 15px 15px;
        border: 1px solid #c4c4c4;
        outline: none;
        transition: border-color;
        font-family: "Pretendard", sans-serif;
        font-weight: 600;
        box-sizing: border-box;
    }

    .custom-input:hover {
        border-color: #000000;
    }

    .custom-input:focus {
        outline: 2px solid #5164DB; 
        outline-offset: -1px;
    }
`;