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

const SkeletonBox = styled.div<{ width?: string; height?: string; margin?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin: ${props => props.margin || '0'};
`

const SkeletonHeader = styled.div`
  box-shadow: 0 1px 2px 0 rgba(11, 11, 11, 0.1);
  background-color: #2098D1;
  color: white;
  display: grid;
  padding: 2rem 0;
`

const SkeletonIntro = styled.div`
  font-size: 1.25em;
  text-align: left;
  line-height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15rem;
  padding: 0 0 2em;
`

const SkeletonContent = styled.div`
  background: white;
  padding: 5em 25em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  justify-items: center;
`

const SkeletonCard = styled.div`
  display: grid;
  width: 46vw;
  height: 65vh;
  padding: 2em 2em;
  margin: 5em 0 5em;
  border-radius: 7px;
  justify-self: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 3px 3px 0 rgba(11, 11, 11, 0.1);
`

export default function PortfolioSkeleton() {
  return (
    <div style={{ textAlign: 'center', display: 'grid', fontFamily: '"Maison Neue", Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      <SkeletonHeader>
        <SkeletonIntro>
          <SkeletonBox height="3rem" margin="0 0 1rem 0" />
          <SkeletonBox height="2rem" margin="0 0 0.5rem 0" width="80%" />
          <SkeletonBox height="2rem" margin="0 0 0.5rem 0" width="70%" />
          <SkeletonBox height="2rem" margin="0 0 0.5rem 0" width="60%" />
        </SkeletonIntro>
      </SkeletonHeader>
      
      <SkeletonContent>
        <SkeletonCard>
          <SkeletonBox height="2rem" margin="0 0 1rem 0" />
          <SkeletonBox height="1.5rem" margin="0 0 0.5rem 0" width="90%" />
          <SkeletonBox height="1.5rem" margin="0 0 0.5rem 0" width="85%" />
          <SkeletonBox height="1.5rem" margin="0 0 0.5rem 0" width="80%" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', marginTop: '2em' }}>
            <SkeletonBox height="8rem" />
            <SkeletonBox height="8rem" />
          </div>
        </SkeletonCard>
        
        <SkeletonCard>
          <SkeletonBox height="2rem" margin="0 0 1rem 0" />
          <SkeletonBox height="1.5rem" margin="0 0 0.5rem 0" width="90%" />
          <SkeletonBox height="1.5rem" margin="0 0 0.5rem 0" width="85%" />
          <SkeletonBox height="1.5rem" margin="0 0 0.5rem 0" width="80%" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', marginTop: '2em' }}>
            <SkeletonBox height="8rem" />
            <SkeletonBox height="8rem" />
          </div>
        </SkeletonCard>
      </SkeletonContent>
    </div>
  )
} 