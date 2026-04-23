import styled from "styled-components";
import SearchBar from "../components/SearchBar.tsx";

const Wrap = styled.div`
    padding: 30px;
`;

function Home() {
    return (
        <Wrap>
            <h1>movie Search!</h1>
           <SearchBar />
        </Wrap>
    );
}

export default Home;
