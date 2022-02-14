import React from 'react'
import { useRouter } from 'next/router'
import Wrapper from 'src/components/Reader/Wrapper'
import { Flex } from '@chakra-ui/react'
import Panel from 'src/components/Reader/Panel'

const Page = () => {
  const router = useRouter()
  const { page } = router.query

  return (
    <Flex direction="column" h="100%">
      <div>the awakening</div>
      <Wrapper page={page} />
      <Panel page={page} />
    </Flex>
  )
}

export default Page
