import styled from "@emotion/styled";

export const PostDetailContainer = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 4px 4px 0px 0px;
  padding: 20px;
  background: #fff;
  margin-bottom: 0;

  .post-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
  }

  .profile-icon {
    font-size: 40px;
    color: #ccc;
    margin-right: 10px;
  }

  .author-info .name {
    font-weight: bold;
    font-size: 14px;
  }

  .author-info .date {
    font-size: 12px;
    color: #999;
  }

  .post-actions {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    color: #999;
    span { margin-left: 10px; cursor: pointer; }
  }

  .post-title {
    font-size: 20px;
    margin: 10px 0;
  }

  .post-content {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .post-stats {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      svg { font-size: 16px; }
    }
    .red { color: #f91f15; }
    .blue { color: #0589f5; }
    .yellow { color: #f9bc15; }
  }

  .button-group {
    display: flex;
    gap: 10px;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    border: 1px solid #e3e3e3;
    background: #f9f9f9;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const CommentSection = styled.div`
  background: #f9f9f9;
  border: 1px solid #e3e3e3;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 10px;
  margin-top: -11px;

  .comment-input-wrapper {
    display: flex;
    background: #fff;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    align-items: center;
    overflow: hidden;
    padding-left: 10px;
    
    input {
      flex: 1;
      border: none;
      padding: 12px 10px;
      outline: none;
      background: transparent;
    }
  }

  .input-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
    
    label { 
      font-size: 12px; 
      color: #666; 
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
  }

  .submit-comment {
    background: #f91f15;
    color: white;
    border: none;
    padding: 15px;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #d31b14;
    }

    svg { 
      font-size: 20px; 
    }
  }
`;