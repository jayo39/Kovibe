import CategoryTitle from "../components/categoryTitle";
import Header from "../components/header";
import PostSideBar from "../components/postSideBar";
import { useEffect } from 'react';
import { PageMargin } from "../styles/pages/pageMargin";
import { CustomPostPage } from "../styles/pages/post.styles";
import { useParams } from 'react-router-dom';

const PostSinglePage = () => {
    const { categoryId, postId } = useParams();

    useEffect(() => {
        // axios.get(`/api/post/detail/${postId}`)
    }, [postId]);

    return (
        <>
            <Header></Header>
            <PageMargin>
                <div style={{display: 'flex', width: '100%', gap: '25px', alignItems: 'flex-start'}}>
                    <CustomPostPage>
                        <CategoryTitle name={'temporary'}/>
                    </CustomPostPage>
                    
                    <PostSideBar></PostSideBar>
                </div>
            </PageMargin>
        </>
    )
}

export default PostSinglePage;