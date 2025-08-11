import React from 'react';
import { Container } from '../styles/logo.styles'

const Logo: React.FC = () => {
    return (
        <Container>
            <a className="icon" href="/">
                <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><title></title><g fill="#fff"><path d="M6.188 26c0-10.938 8.875-19.813 19.813-19.813 10.938 0 19.813 8.875 19.813 19.813 0 10.938-8.875 19.813-19.813 19.813-10.938 0-19.813-8.875-19.813-19.813zm-5.188 0c0 13.813 11.188 25 25 25 13.813 0 25-11.188 25-25 0-13.813-11.188-25-25-25-13.813 0-25 11.188-25 25z"></path><path d="M15.438 22.125h8.625v15.375h-8.625v-15.375zM27.938 14.438h8.625v23.063h-8.625v-23.063z"></path></g></svg>
            </a>
            <div className="text">
                <h2>Bryan Hadden</h2>
                <h3>Fullstack Designer & Developer</h3>
            </div>
        </Container>
    )
}

export default Logo 