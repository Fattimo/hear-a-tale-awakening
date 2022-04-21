import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React, { useState } from 'react'

const Login = () => {
  const router = useRouter()
  const isSignUp = router.query.sign_up !== undefined
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const submit = () => {
    if (isSignUp)
      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => router.push('/login'))
    else signIn('credentials', { email, password, callbackUrl: '/' })
  }

  return (
    <Flex justify={'center'} align={'center'} h={'full'}>
      <FormControl bgColor={'white'} p={8} borderRadius={'3xl'} w={'80%'}>
        <Text fontWeight={'semibold'} fontSize={'xl'} py={4}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Text>
        {isSignUp && <FormLabel htmlFor="name">Name</FormLabel>}
        {isSignUp && (
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel htmlFor="password" pt={2}>
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button mt={4} onClick={submit} type="submit">
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
        <NextLink passHref href={'/'}>
          <Link>
            <Button
              bgColor={'#FD4747'}
              color={'white'}
              _hover={{}}
              mt={4}
              mx={2}
            >
              Home
            </Button>
          </Link>
        </NextLink>
        {!isSignUp ? (
          <Text mt={4}>
            Not a user?{' '}
            <NextLink href={'/login?sign_up'} passHref>
              <Link>SIGN UP</Link>
            </NextLink>
          </Text>
        ) : (
          <Text mt={4}>
            Already have an account?{' '}
            <NextLink href={'/login'} passHref>
              <Link>SIGN IN</Link>
            </NextLink>
          </Text>
        )}
      </FormControl>
    </Flex>
  )
}

export default Login
