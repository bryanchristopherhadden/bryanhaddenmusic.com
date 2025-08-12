import styled from 'styled-components'

interface ContainerProps {
  $marginBottom?: string;
  $divPadding?: string;
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    ${props => props.$marginBottom && `margin-bottom: ${props.$marginBottom};`}

    div {
        cursor: pointer;
        flex: 1;
        ${props => props.$divPadding && `padding: ${props.$divPadding};`}
        
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
