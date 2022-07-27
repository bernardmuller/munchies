import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { colors, DataStore } from 'common';
import { apiEndpoint } from 'common/constants';
import { getCookie, setCookies } from 'cookies-next';
import { login, checkAuth } from 'api';
import { useForm } from 'react-hook-form';
import {
  Button,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { PublicContainer } from 'common/hocs';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #080d08;
  opacity: 0.9;

  @media (max-width: 767px) {
    display: none;
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const validateToken = async token => {
    const res = await checkAuth(token);
    if (res && res.auth) {
      router.push('/menus');
    }
  };

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      validateToken(token);
    }
    return () => {};
  }, []);

  const [requestError, setRequestError] = useState({
    email: '',
    password: '',
  });

  async function onSubmit(data) {
    try {
      setLoading(true);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      const res = await fetch(`${apiEndpoint}auth/login`, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include',
        headers,
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const response = await res.json();

      if (response.errors) {
        setRequestError(response.errors.email);
        setRequestError(response.errors.password);
      }
      await DataStore.set('MUNCHIES_USER', response.user);

      setCookies('token', response.token);
      setCookies('user', response.user);

      if (response.user) {
        router.push('/meals');
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <PublicContainer>
      <Head>
        <title>Munchies - Login</title>
      </Head>

      {/* <Background /> */}

      <Stack padding="2rem" gap="5">
        <Flex direction="column">
          <Heading mb={4} fontSize="4xl" fontWeight={800}>
            MUNCHIES
          </Heading>

          <Heading color="grey" fontSize="2xl">
            Log in
          </Heading>
        </Flex>

        <Text>{requestError && requestError.email}</Text>
        <Text>{requestError && requestError.password}</Text>

        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={4}>
            <FormControl isInvalid={errors.email}>
              <InputGroup size="lg">
                <Flex direction="column" width="full">
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <Input
                    type="email"
                    id="email"
                    h="3.2rem"
                    placeholder="Enter email"
                    {...register('email', {
                      required: 'Please enter a valid email',
                    })}
                  />

                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </Flex>
              </InputGroup>
            </FormControl>

            <FormControl isInvalid={errors.email} mt={4}>
              <Text mb={2}>Password</Text>
              <InputGroup size="lg">
                <Flex direction="column" width="full">
                  <Input
                    pr="4rem"
                    h="3.2rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...register('password', {
                      required: 'Please enter a valid password',
                    })}
                  />
                  <InputRightElement width="5.6rem">
                    <Button mt={1} h="2rem" size="md" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </Flex>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              variant="solid"
              backgroundColor="primary.500"
              color="white"
              size="md"
              isLoading={loading}
              mt="1.5rem"
            >
              Log In
            </Button>
          </Flex>
        </form>

        <Flex direction="column" gap="1rem" width="full" align="center">
          {/* <Link href="/forgot-password" passHref>
            <Text fontSize="sm" color={colors.grey_dark}>
              Forgot Password?
            </Text>
          </Link> */}

          <Flex gap="2">
            Need an account?
            <Link href="/register" passHref>
              <strong>Register</strong>
            </Link>
          </Flex>
        </Flex>
      </Stack>
    </PublicContainer>
  );
}

export default Login;
