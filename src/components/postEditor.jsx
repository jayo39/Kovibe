import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorContainer } from "../styles/components/editorContainer";
import { faPencil, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../provider/userProvider";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const PostEditor = ({initialData, onSave, onCancel, isEditMode}) => {
    const { user } = useContext(UserContext);
    const { categoryId } = useParams();
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        if (isEditMode && initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setIsAnonymous(initialData.isAnonymous === 1);
        }
    }, [initialData, isEditMode]);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            if(isEditMode) {
                await axios.put(`/api/post/${initialData.id}`, { title, content, isAnonymous });
            } else {
                const postData = {
                    title,
                    content,
                    userId: user.id,
                    categoryId: categoryId,
                    isAnonymous: isAnonymous ? 1 : 0 
                };
    
                await axios.post("/api/post/write", postData);
            }
            
            setTitle("");
            setContent("");
            if (onSave) onSave();
            onCancel();
        } catch (err) {
            console.error("글 작성 실패:", err);
            alert("글 작성에 실패했습니다.");
        }
    };


return (
        <EditorContainer>
            <input 
                className="title-input" 
                placeholder="글 제목" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea 
                className="content-input" 
                placeholder="누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <div className="bottom-toolbar">
                <div className="left-icons">
                    <button type="button"><FontAwesomeIcon icon={faPaperclip} /></button>
                </div>
                <div className="right-controls">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        /> 익명
                    </label>
                    <button className="submit-btn" onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                </div>
            </div>
        </EditorContainer>
    );
}

export default PostEditor;