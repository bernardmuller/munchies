import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { colors, Images, FontSizes } from 'common';

import { Text } from 'common/components';

// import {
//   participantData
// } from 'variables';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin: ${props => props.margin || ''};
`;

const TagInput = styled.div`
  width: ${props => props.width || '100%'};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: ${props => props.height || '3.5rem'};
  border-radius: 0.6rem;
  padding: 0.3rem 1rem;
  border: 1px solid ${colors.grey_light};
  margin: ${props => props.margin || ''};
  position: relative;

  & > input {
    height: 100%;
    outline: none;
    background: fixed;
  }

  @media screen and (max-width: 567px) {
    width: calc(100vw - 32px);
  }
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const Tag = styled.li`
  position: relative;
  width: auto;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.primary};
  padding: 0.4rem;
  font-size: 1rem;
  list-style: none;
  border-radius: 10px;
  margin: 0 0 0.1rem 0;
  background: ${colors.white};
  z-index: 11;
  width: 100%;

  &:hover {
    background-color: ${colors.lighterGrey};
    cursor: pointer;
  }
`;

const Image = styled.div`
  /* position: relative; */
  left: -0.4rem;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: #aaaaaa;
  margin-right: 1rem;
`;

const List = styled.div`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  position: absolute;
  z-index: 10;
  bottom: -12.5rem;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemLeft = styled.div`
  display: flex;
`;

export const TagsInput = props => {
  const [searchTags, setSearchTags] = useState([]);
  const [showList, setShowList] = useState(false);

  const addTags = val => {
    // if (event.key === "Enter" && event.target.value !== "") {
    props.selectedTags(val);
    // event.target.value = "";
    // }
  };

  return (
    <Container props={props}>
      <TagInput props={props}>
        <input
          type="text"
          // onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          // onMouseEnter={(event) => {setShowList(true)}}
          // onMouseLeave={(event) => {setShowList(false)}}
          onClick={event => {
            setShowList(true);
          }}
          placeholder={props.placeholder || 'Press enter to add tags'}
        />

        {showList && (
          <List
            onMouseEnter={event => {
              setShowList(true);
            }}
            onMouseLeave={event => {
              setShowList(false);
            }}
          >
            {searchTags.map((item, index) => (
              <Tag
                key={index}
                onClick={() => {
                  addTags(item.name);
                }}
              >
                <ItemLeft>
                  <Image />
                  <ItemInfo>
                    <Text
                      fontSize={FontSizes.Smaller}
                      fontFamily="Arial"
                      fontWeight="bold"
                    >
                      {item.name}
                    </Text>

                    <Text fontSize={FontSizes.Smaller} fontFamily="Arial">
                      {item.host}
                    </Text>
                  </ItemInfo>
                </ItemLeft>

                <ItemInfo>
                  <Text fontSize={FontSizes.Smaller} fontFamily="Arial">
                    {item.sportType}
                  </Text>

                  <Text fontSize={FontSizes.Smaller} fontFamily="Arial">
                    {item.country}
                  </Text>
                </ItemInfo>
              </Tag>
            ))}
          </List>
        )}
      </TagInput>
    </Container>
  );
};
