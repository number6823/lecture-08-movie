import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
type ApiResponseType = { Search: MovieItem [] };

const Wrap = styled.div`
padding: 30px;
`

const Cover = styled.img`
width: 300px;
height: 446px;
object-fit: cover;
border-radius: 5px;
    border: 0.5px solid #ddd;
    
`

const Title = styled.div`
display: flex;
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;
`

const TitleText = styled(Link)`
font-size: 20px;
font-weight: 700;
color: darkgrey;
    transition: all 0.2s;
    margin: 20px;
    text-decoration: none;
&:hover  {
    color: aqua;
}`

const Stylelink =  styled.div`
text-decoration: none;
`

const Year = styled.h3`
font-size: 20px;
color: slategrey;
margin: 20px;`

export type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

function Search() {
    const [params] = useSearchParams();
    const k = params.get("keyword");
    const [list, setList] = useState<MovieItem[]>([]);

    useEffect(() => {
        if(!k) {
            return;
        }
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.Search)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [k])

    return (
        <Wrap>
            <h3>검색 결과: {k}</h3>
            <Title>
                {list.map((value, index) => (
                    <Stylelink key={index}>
                        <div>
                            <TitleText to={`/detail/${value.imdbID}`}>{value.Title}</TitleText>
                            <Year>{value.Year}</Year>
                        </div>
                        <Cover src={value.Poster} alt={value.Title} />
                    </Stylelink>
                ))}
            </Title>
        </Wrap>
    );
}

export default Search;
