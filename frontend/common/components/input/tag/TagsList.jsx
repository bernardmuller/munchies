import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  colors,
  Images
} from 'common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin: ${props => props.margin || ""};
`

const Tags = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const Tag = styled.li`
  position: relative;
  width: auto;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.primary};
  padding: 1rem;
  font-size: 1rem;
  list-style: none;
  border-radius: 10px;
  margin: 0 0 0 0;
  background-color: ${colors.white};
  margin: 0.2rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

    div{
        display: flex;
        align-items: center;
    }
`;

const Image = styled.div`
  position: relative;
  left: -0.4rem;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: #aaaaaa;
`

const TagTitle = styled.span`
  margin-top: 3px;
`;

const TagCloseIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  font-size: 26px;
  margin-left: 1rem;
  color: ${colors.black};
  border-radius: 50%;
  background: none;
  cursor: pointer;
  img{
      height: 100%;
      width: 100%;
  }
`;

export const TagsList = props => {
    // let tags = props.tags;
    const [tags, setTags] = useState([]);

    // const removeTags = (index) => {
    //     setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
    // };

    // useEffect(() => {
    //     props.selectedTags(tags)
    // }, [tags])


    useEffect(() => {
        // props.selectedTags(tags)
        setTags(props.tags)
    })


    return (
        <Container props={props}>
            <Tags>
                {tags.map((tag, index) => (
                    <Tag key={index}>
                        <div>
                            <Image/>
                            <TagTitle>{tag}</TagTitle>
                        </div>
                        <TagCloseIcon onClick={() => {props.onRemoveTag(index)}}>
                        <img src={Images.Icons.Close}/>
                        </TagCloseIcon>
                    </Tag>
                ))}
            </Tags>
        </Container>
    );
};

