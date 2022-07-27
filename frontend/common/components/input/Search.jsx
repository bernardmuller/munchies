import React, {
    useState,
    useEffect
} from 'react';

import styled from 'styled-components';

import { 
    colors
} from 'common';

import { IoSearchSharp } from "react-icons/io5";


const SearchInput = styled.input`
    border: none;
    background: none;
    color: ${props => props.dark ? colors.white : colors.black};
    width: 100%;
    margin-left: 0.3rem;

    &:focus {
        outline: none;
    }
`

const Container = styled.div`
    width: ${props => props.width || "100%"};
    height: ${props => props.height || "3rem"};
    border: ${props => props.focus ? `2px solid ${colors.primary}` : `1px solid ${colors.grey_light}`};
    padding: 0 0 0 0.7rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    background-color: ${props => props.dark ? colors.secondary_light : colors.white_dark};
`

export const Searchbar = props => {
    const [searchText, setSearchText] = useState("");
    const [focus, setFocus] = useState(false);

    const handleChange = (e) => {
        setSearchText(e.target.value)
    };

    useEffect(() => {
        props.onSearch(searchText)
    }, [searchText])

    return (
        <Container
            focus={focus}
            width={props.width}
            height={props.height}
            dark={props.dark}
        >

            <IoSearchSharp 
                size={25}
                color={props.dark ? colors.white_dark : colors.black}
            />

            <SearchInput
                type="text"
                placeholder={props.placeholder|| "Search"}
                onChange={handleChange}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                dark={props.dark}
            />

        </Container>
    )
};

