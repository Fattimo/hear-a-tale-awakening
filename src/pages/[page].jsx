import React from 'react'
import { useRouter } from 'next/router'
import Wrapper from 'src/components/Reader/Wrapper'
import { Flex } from '@chakra-ui/react'
import Panel from 'src/components/Reader/Panel'
import ReaderSidebar from 'src/components/Reader/ReaderSidebar'

const Page = () => {
  const router = useRouter()
  const { page } = router.query

  return (
    <Flex h="100%">
      <ReaderSidebar />
      <Flex
        direction="column"
        h="100%"
        w="100%"
        bgColor={'white'}
        borderRadius={'2rem 0 0 2rem'}
      >
        <Wrapper page={page} />
        <Panel page={page} />
      </Flex>
    </Flex>
  )
}

export default Page
