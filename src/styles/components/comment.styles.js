import styled from "@emotion/styled";

export const CommentListContainer = styled.div`
  width: 100%;
  margin-top: -11px;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
`;

export const CommentItem = styled.div`
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e3e3e3;
  /* Indent if it is a reply */
  background-color: ${props => props.isReply ? '#f9f9f9' : '#fff'};
  padding-left: ${props => props.isReply ? '40px' : '20px'};
  
  .reply-icon {
    margin-right: 8px;
    color: #ccc;
  }

  .comment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .comment-author {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .profile-icon {
      font-size: 22px;
      color: #ccc;
    }
    
    .name {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .comment-actions {
    display: flex;
    gap: 10px;
    color: #a6a6a6;
    font-size: 12px;
    
    span {
      cursor: pointer;
    }
  }

  .comment-content {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 6px;
    color: #333;
  }

  .comment-date {
    font-size: 12px;
    color: #a6a6a6;
  }
`;