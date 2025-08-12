import React from 'react';
import VesselTrackerContent from './vessel-tracker-content'
import VTPrototypeContent from './vt-prototype-content'
import InternalFramework from './internal-framework'
import { styled } from 'styled-components';
import { FONT_FAMILY, PRIMARY_COLOR, TEXT_COLOR, SHADOW_MEDIUM } from '../../styles'

interface ProjectProps {
  selectedProject: string;
  onGoBack?: () => void;
}

export const ProjectContainer = styled.div`
  background: white;
  padding: 0 10%;

  .description {
    font-family: ${FONT_FAMILY};
    font-size: 1.15em;
    text-align: left;
    line-height: 3rem;

    span {
      font-weight: 900;
    }

    h2 {
      font-weight: 400;
      text-align: center;
    }

    .img {
      min-height: 15em;
      font-weight: 800;
      justify-self: center;
      transition: all 0.4s ease-in-out;
      text-decoration: none;
      background-color: white;
      cursor: pointer;
      padding-top: 5em;

      h2 {
        color: grey;
        margin-top: 6em;
      }
    }

    .tech-stack {
      font-weight: 400;
      color: black;
      margin: 5rem 0 1rem;back

      span {
        font-weight: 900;
        color: black;
        opacity: 1;
      }
    }

    .back {
      font-weight: 900;
      box-shadow: ${SHADOW_MEDIUM};
      top: 50.5rem;
      font-size: 0.9em;
      padding: 1em 2em;
      cursor: pointer;
      color: ${PRIMARY_COLOR};
      position: absolute;
    }

    .text {
      text-align: left;
      font-size: 2rem;
      line-height: 3.2rem;
      color: ${TEXT_COLOR};
      font-weight: 300;
      margin-left: 5.5rem;
    }
  }

  .demo {
    margin: 5rem 0;

    > div {
      width: 100%;
      height: 100%;
    }
  
    div {
      margin: 0;
    }

    h1 {
      text-align: center;
      margin: 1em 0 0;
    }
  }
`

const Project: React.FC<ProjectProps> = ({ selectedProject, onGoBack }) => {
  const projectComponents = {
    vesselTrackerProject: <VesselTrackerContent onGoBack={onGoBack} />,
    vt_PrototypeProject: <VTPrototypeContent onGoBack={onGoBack} />,
    hd_internalFramework: <InternalFramework onGoBack={onGoBack} />
  }

  return (
    <ProjectContainer>
      {projectComponents[selectedProject as keyof typeof projectComponents] || null}
    </ProjectContainer>
  )
}

export default Project; 