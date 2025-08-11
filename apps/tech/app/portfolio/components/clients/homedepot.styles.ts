import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    div {
        cursor: pointer;
        flex: 1;
        padding: 4em 0 1em;
        
        &:hover {
            border-radius: 3px;
            box-shadow: 0 3px 3px 3px rgba(11, 11, 11, 0.1);
        }
    }
`

export const Img = styled.img`
    background-repeat: no-repeat;
    background-position: center;
    color: black;
` 