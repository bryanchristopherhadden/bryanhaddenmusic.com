import React from 'react';
import { Container } from '../styles/content.styles'
import PorschePortfolio from './clients/porsche'
import HomedepotPortfolio from './clients/homedepot'

interface ContentProps {
  handleCardClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Content: React.FC<ContentProps> = ({ handleCardClick }) => {
  return (
    <Container>
      <PorschePortfolio handleCardClick={handleCardClick} />
      <HomedepotPortfolio handleCardClick={handleCardClick} />
    </Container>
  )
}

export default Content; 