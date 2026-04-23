import styled from "styled-components";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

const Wrap = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Button = styled.button`
    padding: 12px;
    background-color: #ff5959;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const moveToSearch = (event: SubmitEvent<HTMLFormElement>) => {
        // 사용자를 강제이동
        event.preventDefault();
        if (!keyword.trim()) return;
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        // 사용자를 이동 시키는데 (Link나 a태그나, navigate), 그 주소에 첫 글자가 / 로 시작하지 않으면
        // 지금 현재의 주소 + search 로 이동시킴
        // 그 주소에 첫 글자가 / 로 시작하면
        // /search 로 이동시킴
    };

    const changeInput = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    return (
        <Wrap onSubmit={moveToSearch}>
            <Input onChange={changeInput} />
            <Button type={"submit"}>Search</Button>
        </Wrap>
    );
}

export default SearchBar;
