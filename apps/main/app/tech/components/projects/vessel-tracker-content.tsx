import React from 'react';
import dynamic from 'next/dynamic'
import { Container } from '../../styles/content.styles'

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
    loading: () => <div>Loading video player...</div>
})

interface VesselTrackerContentProps {
    onGoBack?: () => void;
}

const VesselTrackerContent: React.FC<VesselTrackerContentProps> = ({ onGoBack }) => {
    const handleGoHomeClick = () => {
        if (onGoBack) {
            onGoBack();
        }
    }

    const PorscheShieldIcon = 'https://clicktex.com/public/images/clients/porsche.png'

    const PorscheShieldImg = {
        backgroundRepeat: "no-repeat" as const,
        backgroundPosition: "center" as const,
        backgroundImage: `url(${PorscheShieldIcon})`,
        color: "black"
    };

    return (
        <div className="description">
            <div
                id="vesselTrackerProject"
                className="img"
                style={PorscheShieldImg}
            >
                <h2><span>Vessel Tracker App</span></h2>
            </div>
            <button className="back" onClick={handleGoHomeClick}>Go Back</button>
            <h2 className="tech-stack"><span>Tech Stack: </span>React, Node, AWS, Redux, Jest, JWT Tokens, Google Maps API</h2>
            <h2 className="text">
                Currently in use at every port in the world that accepts Porsche Cars, this<br />
                app needed to be friendly for mobile, tablet, desktop & huge port screens.
            </h2>
            <h2 className="text">
                The users base was diverse: port managers, logistics, finance, technicians, and even C suite.
                Porsche completely replaced their old vessel tracking application with my implementation.
            </h2>
            <div className="demo">
                <ReactPlayer url="/videos/vesseltracker-app.mp4" playing={true} loop={true} width="100%" height="100%" />
            </div>
        </div>
    )
}

export default VesselTrackerContent 