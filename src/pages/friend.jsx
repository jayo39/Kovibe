import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../provider/userProvider";
import { TextField } from "@mui/material";
import axios from "../api/axios";
import * as S from "../styles/pages/friend.styles";
import Header from "../components/header";
import Footer from "../components/footer";
import { PageMargin } from "../styles/pages/pageMargin";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const FriendPage = () => {
    const [friends, setFriends] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user, loading: authLoading, friendRefreshTrigger } = useContext(UserContext);

    const handleDeleteFriend = async (e, friendId) => {
        e.stopPropagation(); 

        if (!window.confirm("정말 이 친구를 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`/api/friend/${friendId}`);
            setFriends((prev) => prev.filter((f) => f.id !== friendId));
        } catch (error) {
            alert("친구 삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        const fetchFriends = async () => {
            if (authLoading) return;

            try {
                setLoading(true);
                const response = await axios.get("/api/friend");
                setFriends(response.data);
            } catch (error) {
                console.error("Error fetching friends:", error);
                if (error.response?.status === 401) {
                    setFriends([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [user, authLoading, friendRefreshTrigger]);

    const handleSendRequest = async () => {
        if (!inputValue) {
            return;
        }

        try {
        await axios.post(
            "/api/friend/request",
            { identifier: inputValue });
        alert("친구 요청을 보냈습니다!");
        setInputValue("");
        } catch (error) {
            const errorMsg = error.response?.data?.error || "요청 중 오류가 발생했습니다.";
            alert(errorMsg);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendRequest();
        }
    };

    return (
        <>
            <Header />
            <PageMargin>
                <S.Container>
                <S.FriendCard>
                    <S.Title>친구 {friends?.length > 0 && `(${friends.length})`}</S.Title>
                    
                    <S.SearchIconWrapper>
                    <S.StyledAutocomplete
                            options={friends}
                            getOptionLabel={(option) => option.name || ""}
                            value={value}
                            onChange={(event, newValue) => setValue(newValue)}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                            freeSolo 
                            loading={loading}
                            renderInput={(params) => (
                            <TextField 
                                {...params} 
                                placeholder="아이디 혹은 이메일 검색으로 친구 요청" 
                                onKeyDown={onKeyDown}
                        />
                        )}
                    />
                    </S.SearchIconWrapper>
                    <S.FriendList>
                        {loading ? (
                            <p>Loading friends...</p>
                        ) : (
                            friends
                            .filter((user) =>
                                user.name.toLowerCase().includes(inputValue.toLowerCase())
                            )
                            .map((friend) => (
                                <S.FriendItem 
                                    key={friend.id} 
                                    onClick={() => navigate(`/schedule/${friend.id}`)}
                                >
                                    <span>{friend.name}</span>
                                    
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        size="small"
                                        onClick={(e) => handleDeleteFriend(e, friend.id)}
                                        sx={{ fontSize: '12px', padding: '2px 8px' }}
                                    >
                                        친구 삭제
                                    </Button>
                                </S.FriendItem>
                            ))
                        )}
                    </S.FriendList>
                </S.FriendCard>
                </S.Container>
            </PageMargin>
            <Footer />
        </>
    );
};

export default FriendPage;