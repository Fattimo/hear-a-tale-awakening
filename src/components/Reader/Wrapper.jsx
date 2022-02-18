import { Flex, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Page from './Page'

const Wrapper = ({ page, ...props }) => {
  const [pageOne, setPageOne] = useState('')
  const [pageTwo, setPageTwo] = useState('')

  const pageNumber = parseInt(page)
  const odd = pageNumber % 2 === 1

  useEffect(() => {
    const getPages = async () => {
      const p1 = odd ? pageNumber : pageNumber - 1
      const p2 = odd ? pageNumber + 1 : pageNumber
      const req = await fetch('/book/lorem.txt')
      const lorem = await req.text()
      setPageOne(`${p1}${lorem}`)
      setPageTwo(`${p2}${lorem}`)
    }
    getPages()
    // potentially move odd and pageNumber into state variables
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // if odd, then show the first one, if even, then show the right one -> visibility
  // if screen size is bigger, then show both ->
  return (
    <Flex
      w="100%"
      overflow="hidden"
      {...props}
      direction={odd ? 'row' : 'row-reverse'}
      pt="10"
      px="4"
    >
      <Spacer />
      <Page text={odd ? pageOne : pageTwo} />
      <Spacer d={{ base: 'none', xl: 'block' }} />
      <Page d={{ base: 'none', xl: 'block' }} text={odd ? pageTwo : pageOne} />
      <Spacer />
    </Flex>
  )
}

export default Wrapper
