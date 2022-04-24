import { CheckCircleIcon, ChevronDownIcon, StarIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Sidebar from 'src/components/Home/Sidebar'
import Quiz from 'src/components/modals/Quiz'
import AudioManager from 'src/components/Reader/AudioManager'
import clientPromise from 'utils/mongodb'

const Review = ({ authed, correct, incorrect, words }) => {
  const router = useRouter()
  const [reviewWord, setReviewWord] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [audioSrc, setAudioSrcState] = useState({ src: '', i: 0 })
  const setAudioSrc = (src) => setAudioSrcState({ src, i: audioSrc.i + 1 })
  if (!authed) {
    return (
      <Flex h={'full'}>
        <Sidebar />
        <Flex bgColor={'white'} flexGrow={1} borderRadius="2rem 0 0 2rem" p={6}>
          You must be signed in to use this page.
        </Flex>
      </Flex>
    )
  }

  // word list
  let topScore = 0
  const reviewWordAction = (word) => {
    setShowQuiz(true)
    setReviewWord(word)
  }
  const wordsComponents = words.map((word) => {
    if (word.score && word.score > topScore) topScore = word.score
    return (
      <CuedWord key={word.word} data={word} reviewWord={reviewWordAction} />
    )
  })
  const percentCorrect = (correct / (correct + incorrect)) * 100
  return (
    <Flex h={'100%'}>
      <Sidebar />
      <Flex bgColor={'white'} flexGrow={1} borderRadius="2rem 0 0 2rem" p={6}>
        <Flex w={'50%'} p={4} direction={'column'}>
          <Text fontWeight={'bold'} fontSize={'xl'}>
            Review For <i>The Awakening</i>
          </Text>
          <Flex>
            <Text fontWeight={'semibold'}>Quiz Results&nbsp;</Text>
            <Text fontWeight={'semibold'} display={'inline'} color={'gray.300'}>
              {correct + incorrect} Question{correct + incorrect > 1 ? 's' : ''}{' '}
              Taken
            </Text>
          </Flex>
          <Flex my={6}>
            <CircularProgress
              size={32}
              value={percentCorrect}
              color={'green.400'}
            >
              <CircularProgressLabel fontSize={'lg'} fontWeight={'bold'}>
                {isNaN(percentCorrect) ? 0 : Math.trunc(percentCorrect)}%
                <br />
                Average
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>
          <Flex direction={'column'}>
            <Flex fontWeight={'semibold'}>
              <Center mr={4} borderRadius={8} bgColor={'gray.200'} minW={8}>
                {topScore}
              </Center>
              <Text>Highest Consecutive Answers</Text>
            </Flex>
            <Flex fontWeight={'semibold'} mt={4}>
              <Center mr={4} borderRadius={8} bgColor={'gray.200'} minW={8}>
                {correct}
              </Center>
              <Text>Total Correct Answers</Text>
            </Flex>
            <Flex fontWeight={'semibold'} mt={4}>
              <Center mr={4} borderRadius={8} bgColor={'gray.200'} minW={8}>
                {incorrect}
              </Center>
              <Text>Total Incorrect Answers</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex h={'100%'} w={'50%'} direction={'column'} p={4}>
          <Text>Words Cued</Text>
          <Box overflow={'auto'}>{wordsComponents}</Box>
        </Flex>
      </Flex>
      {showQuiz && (
        <Quiz
          closeQuiz={() => router.reload()}
          word={reviewWord}
          setAudioSrc={setAudioSrc}
        />
      )}
      <AudioManager src={audioSrc} />
    </Flex>
  )
}

const CuedWord = ({ data = {}, reviewWord }) => {
  const [expanded, setExpanded] = useState(false)
  const { word = '', score = 0, count = 0, correct = 0, incorrect = 0 } = data
  const isQuiz = score !== undefined

  return (
    <Box
      borderRadius={10}
      bgColor={expanded ? (score >= 5 ? 'green.100' : 'theme.faintgray') : null}
      my={2}
    >
      <Flex
        justify={'space-between'}
        align={'center'}
        bgColor={'gray.200'}
        p={2}
        px={4}
        borderRadius={10}
        cursor={'pointer'}
        onClick={isQuiz ? () => setExpanded(!expanded) : null}
      >
        <Text>{word}</Text>
        <Flex>
          {score >= 5 && <CheckCircleIcon color={'green.300'} />}
          {isQuiz ? <ChevronDownIcon /> : <Text>{count} Times Cued</Text>}
        </Flex>
      </Flex>
      {isQuiz && (
        <Flex
          display={expanded ? null : 'none'}
          fontSize={'xs'}
          justify={'space-between'}
          align={'center'}
          px={4}
          py={3}
        >
          <Flex
            align={'center'}
            bgColor={'white'}
            borderRadius={8}
            px={3}
            h={5}
          >
            Score: {correct} / {correct + incorrect}
          </Flex>
          <Flex
            bgColor={'white'}
            borderRadius={8}
            px={3}
            h={5}
            align={'center'}
          >
            {[...new Array(5).keys()].map((i) => (
              <StarIcon
                key={i}
                color={i < score ? 'yellow.300' : 'transparent'}
                stroke={i < score ? 'yellow.300' : 'gray.300'}
              />
            ))}
          </Flex>
          <Flex
            bgColor={'theme.lightpurple'}
            color={'white'}
            borderRadius={8}
            px={3}
            h={5}
            minW={8}
            align={'center'}
            cursor={'pointer'}
            onClick={() => reviewWord(word)}
          >
            Review
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session === null) return { props: { authed: false } }
  const client = await clientPromise
  const users = client.db('awakening').collection('users')
  const cues = client.db('awakening').collection('cues')
  const currUser = await users.findOne({ email: session.user.email })
  const results = await cues
    .find({ user: currUser._id }, { projection: { _id: 0, user: 0 } })
    .sort('word', 'asc')
  const data = await results.toArray()
  return {
    props: {
      authed: true,
      correct: currUser.correct ?? 0,
      incorrect: currUser.incorrect ?? 0,
      words: data ?? [],
    },
  }
}

export default Review
