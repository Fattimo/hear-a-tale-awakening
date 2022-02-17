import { Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Page from './Page'

const Wrapper = ({ config }) => {
  const router = useRouter()
  const { page } = router.query
  const pageNumber = parseInt(page)
  const [pageOne, setPageOne] = useState('')
  const [pageTwo, setPageTwo] = useState('')

  const odd = pageNumber % 2 === 1

  useEffect(() => {
    const getPages = async () => {
      const p1 = odd ? pageNumber : pageNumber - 1
      const p2 = odd ? pageNumber + 1 : pageNumber
      const pageOneData = config.pages[p1]
      if (!pageOneData) {
        setPageOne('Not Available')
        setPageTwo('Not Available')
        return
      }
      const pageTwoData = config.pages[p2]
      const reqs = await Promise.all([
        fetch(`/book/pages/${pageOneData.chapter}/${pageOneData.page}.txt`),
        pageTwoData
          ? fetch(`/book/pages/${pageTwoData.chapter}/${pageTwoData.page}.txt`)
          : Promise.resolve({ text: () => Promise.resolve('End') }),
      ])
      const pageTexts = await Promise.all(reqs.map((r) => r.text()))
      setPageOne(`${pageTexts[0]}`)
      setPageTwo(`${pageTexts[1]}`)
    }
    getPages()
    // potentially move odd and page into state variables
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  // if odd, then show the first one, if even, then show the right one -> visibility
  // if screen size is bigger, then show both ->
  return (
    <Flex
      w="100%"
      h="100%"
      overflow="hidden"
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
