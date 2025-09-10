import React from 'react'
import { HoveredLink, Menu, MenuItem } from './ui/floating_navbar'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

type Props = {}

export default function Navbar({ }: Props) {
  return (

    <Menu>
      <MenuItem item='Services' >
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/web-dev">Guides</HoveredLink>
          <HoveredLink href="/interface-design">Stays</HoveredLink>
          <HoveredLink href="/seo">Food</HoveredLink>
          <HoveredLink href="/branding">Events</HoveredLink>
        </div>
      </MenuItem>
      <MenuItem item='Digital Archives' >
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/web-dev">Manuscript</HoveredLink>
          <HoveredLink href="/interface-design">Murals</HoveredLink>
          <HoveredLink href="/seo">Historical documents</HoveredLink>
          <HoveredLink href="/branding">Others</HoveredLink>
        </div>
      </MenuItem>
      <MenuItem item=''>
      <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      </MenuItem>
    </Menu>

  )
}