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
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
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