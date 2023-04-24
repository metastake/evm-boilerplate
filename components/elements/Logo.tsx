import React from 'react'
import Image from 'next/image'
import { useMantineColorScheme } from '@mantine/core'

const Logo = () => {
  const { colorScheme } = useMantineColorScheme()
  const logo = colorScheme === 'dark' ? 'logo-white' : 'logo-black'

  return <Image src={`/images/${logo}.png`} height={36} width={36} alt="Home" />
}

export default Logo
