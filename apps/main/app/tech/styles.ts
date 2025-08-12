import styled from 'styled-components'

// Constants to eliminate duplication
const FONT_FAMILY = '"Maison Neue", Helvetica Neue, Helvetica, Arial, sans-serif'
const PRIMARY_COLOR = '#2098D1'
const PRIMARY_DARK = '#045F8C'
const TEXT_COLOR = '#3b3a3a'
const SHADOW_LIGHT = '0 1px 2px 0 rgba(11, 11, 11, 0.1)'
const SHADOW_MEDIUM = '0 1px 1px 1px rgba(11, 11, 11, 0.04)'

export const AppContainer = styled.div`
  text-align: center;
  display: grid;
  font-family: ${FONT_FAMILY};
`

export const Header = styled.div`
  box-shadow: ${SHADOW_LIGHT};
  background-color: ${PRIMARY_COLOR};
  color: white;
  display: grid;
`

export const Intro = styled.div`
  font-size: 1.25em;
  text-align: left;
  line-height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15rem;
  padding: 0 0 2em;

  span {
    text-decoration: line-through;
    opacity: 0.4;
  }

  a {
    color: ${PRIMARY_DARK};
    opacity: 0.8;
    font-weight: 800;
    text-decoration: none;
  }

  h2 {
    font-weight: 350;
  }
`

export const ProjectContainer = styled.div`
  background: white;
  padding: 0 10%;

  .description {
    font-family: ${FONT_FAMILY};
    font-size: 1.15em;
    text-align: left;
    line-height: 3rem;

    span {
      font-weight: 900;
    }

    h2 {
      font-weight: 400;
      text-align: center;
    }

    .img {
      min-height: 15em;
      font-weight: 800;
      justify-self: center;
      transition: all 0.4s ease-in-out;
      text-decoration: none;
      background-color: white;
      cursor: pointer;
      padding-top: 5em;

      h2 {
        color: grey;
        margin-top: 6em;
      }
    }

    .tech-stack {
      font-weight: 400;
      color: black;
      margin: 5rem 0 1rem;back

      span {
        font-weight: 900;
        color: black;
        opacity: 1;
      }
    }

    .back {
      font-weight: 900;
      box-shadow: ${SHADOW_MEDIUM};
      top: 50.5rem;
      font-size: 0.9em;
      padding: 1em 2em;
      cursor: pointer;
      color: ${PRIMARY_COLOR};
      position: absolute;
    }

    .text {
      text-align: left;
      font-size: 2rem;
      line-height: 3.2rem;
      color: ${TEXT_COLOR};
      font-weight: 300;
      margin-left: 5.5rem;
    }
  }

  .demo {
    margin: 5rem 0;

    > div {
      width: 100%;
      height: 100%;
    }
  
    div {
      margin: 0;
    }

    h1 {
      text-align: center;
      margin: 1em 0 0;
    }
  }
`

export const Column = styled.div`
  justify-self: center;
`

export const Description = styled.div`
  display: grid;

  h3 {
    width: 25vw;
  }
` 