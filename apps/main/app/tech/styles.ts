import styled from 'styled-components'

// Constants to eliminate duplication
export const FONT_FAMILY = '"Maison Neue", Helvetica Neue, Helvetica, Arial, sans-serif'
export const PRIMARY_COLOR = '#2098D1'
export const PRIMARY_DARK = '#045F8C'
export const TEXT_COLOR = '#3b3a3a'
export const SHADOW_LIGHT = '0 1px 2px 0 rgba(11, 11, 11, 0.1)'
export const SHADOW_MEDIUM = '0 1px 1px 1px rgba(11, 11, 11, 0.04)'

export const Column = styled.div`
  justify-self: center;
`

export const Description = styled.div`
  display: grid;

  h3 {
    width: 25vw;
  }
` 