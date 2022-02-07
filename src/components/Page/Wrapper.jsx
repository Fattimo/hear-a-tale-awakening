import { Flex, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Page from './index'

const Wrapper = (/*{ page }*/) => {
  // invariant: left odd right even
  // store data on odd, even
  // render both when big enough
  // qs = page number, page number + 2 if double size, page number + 1 otherwise
  const [pageOne, setPageOne] = useState('')
  const [pageTwo, setPageTwo] = useState('')
  useEffect(() => {
    // convert into useeffect dependency on page state variable
    const getPages = async () => {
      const req = await fetch('/book/lorem.txt')
      const lorem = await req.text()
      setPageOne(lorem)
      setPageTwo(lorem)
    }
    getPages()
  }, [])

  return (
    <Flex w="100%" h="100%">
      <Spacer />
      <Page text={pageOne} />
      <Spacer />
      <Page d={['none', 'none', 'block']} text={pageTwo} />
      <Spacer />
    </Flex>
  )
}

export default Wrapper
