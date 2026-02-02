import Header from "../components/header";
import MyEditor from "../components/WYSIWYG/myEditor";
import { CustomPostPage } from "../styles/pages/post.styles";
import { CustomPostCU } from "../styles/pages/postCU.styles";


const PostCUPage = () => {

    return (
        <>
            <Header></Header>
            <CustomPostPage>
                <div style={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
                    <div style={{fontSize: '25px', fontWeight: 'bold'}}>게시판 작성</div>
                </div>
                <CustomPostCU>
                    <input className="custom-input" style={{borderRadius: '5px', width: '100%', fontWeight: 'normal'}} placeholder="제목"/>
                </CustomPostCU>
                <MyEditor></MyEditor>
                <div style={{  
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start',
                    userSelect: 'none'
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 'normal'}}>
                        <input 
                            type="checkbox" 
                            style={{ 
                                width: '18px', 
                                height: '18px', 
                                accentColor: '#5164DB',
                                cursor: 'pointer' 
                            }} 
                        />
                        익명으로 작성하기
                    </label>
                </div>
            </CustomPostPage>
        </>
    )
}

export default PostCUPage;