'use client'

import React, { useState } from 'react'
import Content from './components/content'
import Project from './components/projects'
import { AppContainer, Header, Intro } from './styles'
import './portfolio.css'

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState('none')

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLDivElement;
    const projectToShow = target.id;
    if (projectToShow) {
      setSelectedProject(projectToShow)
    }
  }

  const showHomepage = selectedProject === "none"
  const DetermineHomepageOrProject = showHomepage ? 
    <Content handleCardClick={handleCardClick} /> : 
    <Project selectedProject={selectedProject} onGoBack={() => setSelectedProject('none')} />

  return (
    <AppContainer>
      <Header>
        <Intro className="intro" id="intro">
          <h1>I'm Bryan, a FullStack Developer.<br />
            I can solve <span>all some one of your</span> problems, ok?
          </h1>
          <h2>
            Below are some of the projects I've worked on.<br />
            Have a project, idea or problem you'd like to discuss?<br />
            Shoot me an email <a href="mailto: bryanchrishadden@gmail.com">hey@bryanhadden.com</a>
            <br />
          </h2>
        </Intro>
      </Header>
      {DetermineHomepageOrProject}
    </AppContainer>
  )
} 