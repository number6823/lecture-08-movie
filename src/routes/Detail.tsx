import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const Wrap = styled.div`
    padding: 40px;
`;

const BackBtn = styled.button`
    padding: 10px 25px;
    border: none;
    background: #222;
    color: white;
    cursor: pointer;
    margin-bottom: 25px;
    border-radius: 8px;
    &:hover {
        background: #444;
    }
`;

const Box = styled.div`
    display: flex;
    gap: 65px;
    align-items: flex-start;
`;

const Cover = styled.img`
border-radius: 8px;`

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<MovieDetail | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => {
                setMovies(json);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);
    if (!movies) return <h3>Loading...</h3>;

    return (
        <Wrap>
            <BackBtn
                onClick={() => {
                    navigate(-1);
                }}>
                &larr; 뒤로 가기
            </BackBtn>
            <div style={{ marginLeft: "50px" }}>
                <h2>{movies.Title}</h2>
                <p style={{fontSize:'18px', fontWeight:'600', color:'#46482b'}}>개봉 날짜:{movies.Year}</p>
            </div>
            <Box>
                {movies.Poster ? <Cover src={movies.Poster} /> : <div>no Cover</div>}
                <div>
                    <h3 style={{ marginBottom: "20px" }}>영화 정보</h3>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <p>장르: {movies.Genre}</p>
                        <p>감독: {movies.Director}</p>
                    </div>
                    <h1>줄거리</h1>
                    <p style={{ lineHeight: "2.5" }}>{movies.Plot}</p>
                </div>
            </Box>
        </Wrap>
    );
}

export default Detail;
