import { Box, HStack } from '@chakra-ui/react'
import * as React from 'react'
import { BsCaretRightFill } from 'react-icons/bs'

interface NavigationItemProps {
  label: string
  subtle?: boolean
  active?: boolean
  disabled?: boolean
  icon: React.ReactElement
  endElement?: React.ReactElement
  children?: React.ReactNode
}

export const NavigationItem = (props: NavigationItemProps) => {
  const { active, subtle, disabled, icon, children, label, endElement } = props
  return (
    <HStack
      as="div"
      w="full"
      px="3"
      py="2"
      cursor={disabled ? "" : "pointer"}
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      bg={active ? 'gray.700' : undefined}
      _hover={disabled ? {} : { bg: 'gray.700' }}
      _active={disabled ? {} : { bg: 'gray.600' }}
    >
      <Box fontSize="lg" color={active ? 'currentcolor' : 'gray.400'}>
        {icon}
      </Box>
      <Box flex="1" fontWeight="inherit" color={subtle ? 'gray.400' : undefined}>
        {label}
      </Box>
      {endElement && !children && <Box>{endElement}</Box>}
      {children && <Box fontSize="xs" flexShrink={0} as={BsCaretRightFill} />}
    </HStack>
  )
}
