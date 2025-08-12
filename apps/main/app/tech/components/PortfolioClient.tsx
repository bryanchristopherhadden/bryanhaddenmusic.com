'use client'

import React, { useState, useEffect } from 'react'
import Content from './content'
import Project from './projects'
import PortfolioSkeleton from './PortfolioSkeleton'
import { AppContainer, Header, Intro } from '../styles'

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
            Have a project, idea or problem you'd like to discuss?<br />
            Shoot me an email <a href="mailto: bryanchrishadden@gmail.com">hey@bryanhadden.com</a>
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