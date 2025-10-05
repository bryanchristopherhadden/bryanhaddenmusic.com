"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Group, Text, Container, Burger, Drawer, Stack, Anchor, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface NavigationProps {
  mode?: 'music' | 'tech';
  hideOnHomepage?: boolean;
}

const Navigation = ({ mode, hideOnHomepage = false }: NavigationProps): JSX.Element => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(true);
  const [opened, { toggle, close }] = useDisclosure();
  
  // Auto-detect mode based on pathname if not provided
  const currentMode = mode || (pathname.startsWith('/tech') ? 'tech' : 'music');

  useEffect(() => {
    setIsMounted(true);

    setIsWideScreen(window.innerWidth > 999);

    const handleScroll = (): void => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = (): void => {
      setIsWideScreen(window.innerWidth > 999);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  // Hide navigation on homepage if hideOnHomepage is true
  if (hideOnHomepage && pathname === '/') {
    return <></>;
  }

  const navLinks = currentMode === 'music' ? [
    // { href: "/music/listen", label: "Listen", active: isActive("/music/listen") },
    { href: "/music", label: "Purchase", active: isActive("/music") },
    { href: "/music/about", label: "Bio", active: isActive("/music/about") },
    // { href: "/tech", label: "Tech Site", active: false },
  ] : [
    { href: "/tech", label: "Portfolio", active: isActive("/tech") },
    { href: "/music/listen", label: "Music Site", active: false },
  ];

  return (
    <>
      <Box
        component="nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled 
            ? 'rgba(0, 0, 0, 0.9)' 
            : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container size={isMounted && isWideScreen ? "lg" : "fluid"} px="md">
          <Group h={60} justify="space-between">
            <Anchor component={Link} href="/" td="none">
              <Box>
                <Text fw={700} size="lg" c="white">
                  Bryan Hadden
                </Text>
                <Text size="xs" c="rgba(255, 255, 255, 0.8)">
                  {currentMode === 'tech' ? 'FullStack Developer' : 'Music Producer'}
                </Text>
              </Box>
            </Anchor>

            {/* Desktop Navigation */}
            <Group gap="xl" visibleFrom="sm">
              {navLinks.map((link) => (
                <Anchor
                  key={link.href}
                  component={Link}
                  href={link.href}
                  td="none"
                  c={link.active ? "white" : "rgba(255, 255, 255, 0.7)"}
                  fw={link.active ? 600 : 400}
                  style={{
                    transition: 'color 0.3s ease',
                    borderBottom: link.active ? '2px solid #6372ff' : 'none',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                </Anchor>
              ))}
            </Group>

            {/* Mobile Navigation */}
            <Burger
              opened={opened}
              onClick={toggle}
              color="white"
              size="sm"
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="sm"
        styles={{
          content: {
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
        hiddenFrom="sm"
      >
        <Stack gap="lg" mt="md">
          {navLinks.map((link) => (
            <Anchor
              key={link.href}
              component={Link}
              href={link.href}
              td="none"
              c={link.active ? "white" : "rgba(255, 255, 255, 0.7)"}
              fw={link.active ? 600 : 400}
              size="lg"
              onClick={close}
            >
              {link.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default Navigation; 