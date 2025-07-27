import React from 'react';
import VesselTrackerContent from './vessel-tracker-content'
import VTPrototypeContent from './vt-prototype-content'
import InternalFramework from './internal-framework'
import { ProjectContainer } from '../../styles'

interface ProjectProps {
  selectedProject: string;
  onGoBack?: () => void;
}

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