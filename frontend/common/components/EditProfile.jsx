import React, { useState } from 'react';
import styled from 'styled-components';
import { FontSizes, colors } from 'common';
import { H3, Input, TextArea, Button } from 'common/components';
import { Flex, Grid } from '@chakra-ui/react';
import { Loader } from './loader';

const Container = styled.form`
  display: grid;
  padding: 0 1.5rem;
  width: 100%;
  margin-top: 1rem;
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: ${FontSizes.Small};
  color: ${colors.grey_light};
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${colors.secondary_light};
  border-radius: 0.5rem;
`;

export const EditProfile = ({ data, onUpdate, showLoader }) => {
  const [user, setUser] = useState(data);

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate(user);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <FormContainer>
        <Flex justify="space-between">
          <H3 color={colors.white} margin="0" fontSize={FontSizes.Big}>
            Edit Profile
          </H3>
          {showLoader && <Loader spinnercolor={colors.white} />}
        </Flex>

        <Group>
          <Grid width="100%">
            <Label>Firstname</Label>
            <Input
              placeholder="Firstname"
              value={user.firstname}
              height="2.5rem"
              onChange={e =>
                setUser(prev => ({
                  ...prev,
                  firstname: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid width="100%" gap={1}>
            <Label>Lastname</Label>
            <Input
              value={user.lastname}
              placeholder="Lastname"
              height="2.5rem"
              onChange={e =>
                setUser(prev => ({
                  ...prev,
                  lastname: e.target.value,
                }))
              }
            />
          </Grid>
        </Group>

        <Group>
          <Grid width="100%" gap={1}>
            <Label>About Me</Label>
            <TextArea
              value={user.bio}
              placeholder="About Me"
              onChange={e =>
                setUser(prev => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
            />
          </Grid>
        </Group>

        <Grid justifyContent="center" mt={3}>
          <Button primary type="submit" justifySelf="center" width="200px">
            Update Profile
          </Button>
        </Grid>
      </FormContainer>
    </Container>
  );
};
