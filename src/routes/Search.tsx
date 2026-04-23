import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import SearchBar from "../components/SearchBar.tsx";
import MovieCard from "../components/MovieCard.tsx";
import styled from "styled-components";

export type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

type ApiResponseType = { Search: MovieItem[] };

const Wrap = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
`;

function Search() {
    const [list, setList] = useState<MovieItem[]>([]);
    const [loading, setLoading] = useState(true); // loading에 대한 상태값 관리
    const [error, setError] = useState(""); // 에러가 났을 때 화면에 출력해야 하는 string

    const [searchParams] = useSearchParams();
    const k = searchParams.get("keyword");

    useEffect(() => {
        if (!k) return;

        setLoading(true);
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.Search);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("검색하는데 오류가 발생하였습니다.");
                setLoading(false);
            });
    }, [k]);

    return (
        <Wrap>
            <h2>검색 키워드 : {k}</h2>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <SearchBar />

            <List>
                {list.map((value, index) => (
                    <MovieCard movie={value} key={index} />
                ))}
            </List>
        </Wrap>
    );
}

export default Search;
