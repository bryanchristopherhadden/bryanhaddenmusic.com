'use client'

import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import Content from './content'
import Project from './projects'
import PortfolioSkeleton from './PortfolioSkeleton'
import { FONT_FAMILY, SHADOW_LIGHT, PRIMARY_COLOR, PRIMARY_DARK } from '../styles'

export const AppContainer = styled.div`
  text-align: center;
  display: grid;
  font-family: ${FONT_FAMILY};
`

export const Header = styled.div`
  box-shadow: ${SHADOW_LIGHT};
  background-color: ${PRIMARY_COLOR};
  color: white;
  display: grid;
`

export const Intro = styled.div`
  font-size: 1.25em;
  text-align: left;
  line-height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15rem;
  padding: 0 0 2em;

  span {
    text-decoration: line-through;
    opacity: 0.4;
  }

  a {
    color: ${PRIMARY_DARK};
    opacity: 0.8;
    font-weight: 800;
    text-decoration: none;
  }

  h2 {
    font-weight: 350;
  }
`

export default function PortfolioClient() {
  const [selectedProject, setSelectedProject] = useState('none')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time and ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const projectId = event.currentTarget.id
    if (projectId) {
      setSelectedProject(projectId)
    }
  }

  if (isLoading) {
    return <PortfolioSkeleton />
  }

  return (
    <AppContainer>
      <Header>
        <Intro className="intro" id="intro">
          <h1>I'm Bryan, a FullStack Developer.<br />
            I can solve <span>all some one of your</span> problems, ok?
          </h1>
          <h2>
            Checkout some of the projects I've worked on below!<br />
            Hiring for a project, or have an idea or problem you'd like to discuss?<br />
            Contact me @ <a href="mailto: bryanchrishadden@gmail.com">hey@bryanhadden.com</a>
            <br />
          </h2>
        </Intro>
      </Header>
      {selectedProject === 'none' ? (
        <Content handleCardClick={handleCardClick} />
      ) : (
        <Project selectedProject={selectedProject} onGoBack={() => setSelectedProject('none')} />
      )}
    </AppContainer>
  )
} 