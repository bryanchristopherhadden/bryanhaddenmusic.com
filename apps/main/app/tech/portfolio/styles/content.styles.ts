import styled from 'styled-components'

export const Container = styled.div`
    background: white;
    padding: 5em 25em;

    .developer {
        display: grid;
        width: 46vw;
        height: 65vh;
        padding: 2em 2em;
        margin: 5em 0 5em;
        border-radius: 7px;
        justify-self: center;
        transition-duration: .35s;
        background-color: rgb(255, 255, 255);
        transition-timing-function: ease-in-out;
        box-shadow: 0 3px 3px 0 rgba(11, 11, 11, 0.1);

        &:hover {
            box-shadow: 0 3px 3px 3px rgba(11, 11, 11, 0.2);
            width: 47vw;
        }

        .cards-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            grid-gap: 1em;
            margin-top: 2em;
        }
    }
` 