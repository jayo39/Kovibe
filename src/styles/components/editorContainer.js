import styled from "@emotion/styled";

export const EditorContainer = styled.div`
    border: 1px solid #E0E0E0;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 4px;

    .title-input {
        border: none;
        outline: none;
        margin-top: -7px;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: 10px;
        &::placeholder { color: #ccc; }
    }

    .content-input {
        border: none;
        outline: none;
        resize: none;
        min-height: 150px;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.6;
        &::placeholder { color: #9e9e9e; }
    }

    .bottom-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #f3f3f3;

        .left-icons button {
            background: none; border: none; font-size: 18px; 
            color: #9e9e9e; cursor: pointer; margin-right: 10px;
        }

        .right-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 13px;
            color: #757575;

            .submit-btn {
                background-color: #f91f15;
                color: white;
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`;