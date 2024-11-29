'use client'

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

// Wrap Stat with motion for animation
const MotionStat = motion(Stat)

function StatsCard(props) {
  const { title, stat } = props
  return (
    <MotionStat
      px={{ base: 4, md: 6 }}
      py={'8'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('green.500', 'green.400')}
      rounded={'lg'}
      mb={10}
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.1, // Expand on hover
        transition: { duration: 0.3, ease: 'easeInOut' },
      }}
      animate={{
        scale: [1, 0.95, 1], // Shrink and expand animation
        transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
      }}
    >
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </MotionStat>
  )
}

export default function BasicStatistics() {
  return (
    <Box maxW="5xl" mx={'auto'} pt={3} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 10, lg: 16 }} // Increased spacing between cards
      >
        <StatsCard title={'Farm 🌾'} stat={'50,000 farmers'} />
        <StatsCard title={'Ship 🚢'} stat={'195 different countries'} />
        <StatsCard title={'Eat 🍽️'} stat={'100k+ consumers'} />
      </SimpleGrid>
    </Box>
  )
}
