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



function StatsCard(props) {
  const { title, stat } = props
  return (
    <Stat
      px={{ base: 4, md: 6 }}
      mb={10}
      py={'8'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('green.500', 'green.400')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  )
}

export default function BasicStatistics() {
  return (
    <Box maxW="5xl" mx={'auto'} pt={3} px={{ base: 2, sm: 12, md: 17 }}>
      {/* <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        What do we do?
      </chakra.h1> */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
      <StatsCard title={'Farm 🌾'} stat={'50,000 farmers'} />
      <StatsCard title={'Ship 🚢'} stat={'195 different countries'} />
      <StatsCard title={'Eat 🍽️'} stat={'100k+ consumers'} />

      </SimpleGrid>
    </Box>
  )
}