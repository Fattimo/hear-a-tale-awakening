import { Flex, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Page from './Page'

const Wrapper = ({ page, ...props }) => {
  const [pageOne, setPageOne] = useState('')
  const [pageTwo, setPageTwo] = useState('')

  useEffect(() => {
    const pageNumber = parseInt(page)
    const odd = pageNumber % 2 === 1
    const getPages = async () => {
      const p1 = odd ? pageNumber : pageNumber - 1
      const p2 = odd ? pageNumber + 1 : pageNumber
      const req = await fetch('/book/lorem.txt')
      const lorem = await req.text()
      setPageOne(`${p1}${lorem}`)
      setPageTwo(`${p2}${lorem}`)
    }
    getPages()
  }, [page])

  return (
    <Flex w="100%" overflow="hidden" {...props}>
      <Spacer />
      <Page text={pageOne} />
      <Spacer />
      <Page d={['none', 'none', 'none', 'block']} text={pageTwo} />
      <Spacer />
    </Flex>
  )
}

export default Wrapper
