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

    const communityRules = `누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 아래의 규칙을 꼭 지켜주세요.

위반 시 게시글 삭제, 이용 제한 또는 강제 탈퇴 등의 조치가 이루어질 수 있습니다.

※ 정치 및 사회 이슈와 관련된 게시글·댓글·분쟁 유발 행위 금지
- 정치인 비하 및 찬양, 정치인에 대한 개인적 감정 표출
- 사회적 갈등 조장, 비난을 유발하는 게시글이나 댓글
- 뉴스 링크 후 유도 심문, 정치 뉴스를 가져와서 논쟁을 유도하는 행위
- 정치적 은어 사용, 정치적 비하 용어나 멸칭 사용

※ 홍보, 광고, 판매, 공동구매 모집 등 상업적 목적의 활동 금지
- 바이럴 마케팅(뒷광고)
- 중고 거래 및 직거래 유도
- 단톡방/오픈채팅 초대
- 개인 채널 홍보

※ 불법촬영물 및 그에 준하는 불법·유해 콘텐츠의 게시 및 유통은 엄격히 금지되며, 적발 시 관련 법령에 따라 조치될 수 있습니다.`;

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
                placeholder={communityRules}
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