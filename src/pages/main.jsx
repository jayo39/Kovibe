import { PageMargin } from "../styles/pages/pageMargin";
import PostSideBar from "../components/postSideBar";
import PostCategory from "../components/postCategory";
import Carousel from "../components/carousel";
import { Box } from '@mui/material';
import banner1 from "../assets/ads/adbanner1.png";
import ProfileSideBar from "../components/profileSideBar";
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/category/list');
                setCategories(res.data);
            } catch(err) {
                console.error("게시판 카테고리 불러오기 실패", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <PageMargin>
            <div style={{ display: 'flex', width: '100%', gap: '25px', alignItems: 'flex-start' }}>
                
                <ProfileSideBar />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', flex: 1 }}>
                    <Carousel items={[
                        <img src={banner1} style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', display: 'block' }} alt="banner" />,
                        <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#eee' }}>Custom Slide 2</Box>,
                        <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#eee' }}>Custom Slide 3</Box>
                    ]} />

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(2, 1fr)', 
                        gap: '25px' 
                    }}>
                        {categories.map((category) => (
                            <PostCategory key={category.id} name={category.name} categoryId={category.id}/>
                        ))}
                    </div>
                </div>

                <PostSideBar />
                
            </div>
        </PageMargin>
    );
}

export default MainPage;