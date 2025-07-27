import styled from 'styled-components'

export const AppContainer = styled.div`
    text-align: center;
    display: grid;
    font-family: "Maison Neue", Helvetica Neue, Helvetica, Arial, sans-serif; 
`

export const Header = styled.div`
    box-shadow: 0 1px 2px 0 rgba(11, 11, 11, 0.1);
    background-color: #2098D1;
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
    padding: 0em 0 2em;

    span {
        text-decoration: line-through;
        opacity: .4;
    }

    a {
        color: #045F8C;
        opacity: .8;
        font-weight: 800;
        text-decoration: none;
    }

    h2 {
        font-weight: 350;
    }
` 