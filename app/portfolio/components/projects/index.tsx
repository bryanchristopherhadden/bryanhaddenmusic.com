import React from 'react';
import VesselTrackerContent from './vessel-tracker-content'
import VTPrototypeContent from './vt-prototype-content'
import InternalFramework from './internal-framework'

interface ProjectProps {
  selectedProject: string;
  onGoBack?: () => void;
}

const Project: React.FC<ProjectProps> = ({ selectedProject, onGoBack }) => {
    let ComponentToShow

    switch (selectedProject) {
        case "vesselTrackerProject":
            ComponentToShow = <VesselTrackerContent onGoBack={onGoBack} />
            break;
        case "vt_PrototypeProject":
            ComponentToShow = <VTPrototypeContent onGoBack={onGoBack} />
            break;
        case "hd_internalFramework":
            ComponentToShow = <InternalFramework onGoBack={onGoBack} />
            break;
        default:
            ComponentToShow = "none"
            break;
    }

    return (
        <div className="project">
            {ComponentToShow}
        </div>
    )
}

export default Project; 