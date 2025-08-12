import React from 'react';
import { Container, Img } from './shared-client.styles';

interface PorschePortfolioProps {
  handleCardClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const PorschePortfolio: React.FC<PorschePortfolioProps> = ({ handleCardClick }) => {
    return (
        <Container $marginBottom="5em">
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
        </Container>
    )
}

export default PorschePortfolio 