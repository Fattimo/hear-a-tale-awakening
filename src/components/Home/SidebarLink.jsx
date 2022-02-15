import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const SidebarLink = ({ href, children }) => {
  const router = useRouter()
  return (
    <Link href={href} passHref={true}>
      <Box
        bgColor={router.pathname === href ? 'white' : ''}
        ml={4}
        p={2}
        m={1}
        mr={0}
        borderRadius={'20px 0 0 20px'}
        cursor={'pointer'}
      >
        <Text fontSize={'sm'} fontWeight={'semibold'} ml={4}>
          {children}
        </Text>
      </Box>
    </Link>
  )
}

export default SidebarLink
