import React from 'react';
import { Container, Img, ImgLink } from '../styles/content.styles'

interface ContentProps {
  handleCardClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Content: React.FC<ContentProps> = ({ handleCardClick }) => {
  return (
    <Container>
      <div
        id="vesselTrackerProject"
        onClick={handleCardClick}
      >
        <Img src='https://clicktex.com/public/images/clients/porsche.png' />
        <h2>Vessel Tracker App</h2>
      </div>
      <div 
        id="vt_PrototypeProject"
        onClick={handleCardClick}
      >
        <Img src='https://clicktex.com/public/images/clients/porsche.png' />
        <h2>Vehicle Tracker Entrypoint</h2>
      </div>
      <div
        id="hd_internalFramework"
        onClick={handleCardClick}
      >
        <Img src={ImgLink} />
        <h2>Internal Framework</h2>
      </div>
    </Container>
  )
}

export default Content; 