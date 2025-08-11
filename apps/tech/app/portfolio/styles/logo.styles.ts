import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: #2098D1;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(32, 152, 209, 0.3);
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    h3 {
      font-size: 0.875rem;
      font-weight: 400;
      color: #666;
      margin: 0;
    }
  }
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
` 