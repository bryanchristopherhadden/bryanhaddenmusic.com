'use client'

import React from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const SkeletonBox = styled.div<{ width?: string; height?: string; margin?: string; borderRadius?: string }>`
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${props => props.borderRadius || '4px'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin: ${props => props.margin || '0'};
`

const SkeletonHero = styled.div`
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%);
  color: white;
  padding: 100px 0 80px;
  margin-top: 60px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 80px 0 60px;
    margin-top: 40px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.03"><circle cx="30" cy="30" r="1"/></g></g></svg>');
    opacity: 0.4;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`

const SkeletonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`

const SkeletonHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
`

const SkeletonAvatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
`

const SkeletonButton = styled.div`
  height: 48px;
  border-radius: 8px;
  width: 200px;
`

const SkeletonWorkSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`

const SkeletonProjectCard = styled.div`
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: #1a1a1a;
`

const SkeletonProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const SkeletonCTASection = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 60px 40px;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  margin-top: 3rem;
  text-align: center;
`

const SkeletonCTAContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 520px;
  margin: 0 auto;
`

export default function PortfolioSkeleton() {
  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      {/* Hero Section */}
      <SkeletonHero>
        <SkeletonContainer>
          <SkeletonHeroContent>
            <SkeletonBox 
              as={SkeletonAvatar}
              width="140px" 
              height="140px" 
              borderRadius="50%"
            />
            <SkeletonBox 
              height="4rem" 
              width="400px" 
              margin="0 0 1rem 0"
              borderRadius="8px"
            />
            <SkeletonBox 
              height="1.5rem" 
              width="600px" 
              margin="0 0 0.5rem 0"
              borderRadius="4px"
            />
            <SkeletonBox 
              height="1.5rem" 
              width="500px" 
              margin="0 0 2rem 0"
              borderRadius="4px"
            />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <SkeletonBox as={SkeletonButton} />
              <SkeletonBox as={SkeletonButton} />
            </div>
          </SkeletonHeroContent>
        </SkeletonContainer>
      </SkeletonHero>

      {/* Work Section */}
      <SkeletonWorkSection>
        <SkeletonContainer>
          {/* Section Description */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SkeletonBox 
              height="1.5rem" 
              width="500px" 
              margin="0 auto 1rem auto"
              borderRadius="4px"
            />
            <SkeletonBox 
              height="1.2rem" 
              width="400px" 
              margin="0 auto"
              borderRadius="4px"
            />
          </div>

          {/* Projects Grid */}
          <SkeletonProjectGrid>
            <SkeletonBox as={SkeletonProjectCard} />
            <SkeletonBox as={SkeletonProjectCard} />
            <SkeletonBox as={SkeletonProjectCard} />
          </SkeletonProjectGrid>

          {/* CTA Section */}
          <SkeletonCTASection>
            <SkeletonCTAContent>
              <SkeletonBox 
                height="2.5rem" 
                width="300px" 
                margin="0 0 1rem 0"
                borderRadius="8px"
              />
              <SkeletonBox 
                height="1.2rem" 
                width="400px" 
                margin="0 0 0.5rem 0"
                borderRadius="4px"
              />
              <SkeletonBox 
                height="1.2rem" 
                width="350px" 
                margin="0 0 1.5rem 0"
                borderRadius="4px"
              />
              <SkeletonBox 
                height="48px" 
                width="200px" 
                borderRadius="8px"
              />
            </SkeletonCTAContent>
          </SkeletonCTASection>
        </SkeletonContainer>
      </SkeletonWorkSection>
    </div>
  )
} 