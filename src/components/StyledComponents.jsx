import styled from "@emotion/styled";

// BasketballButton - styled button component with animation effects
export const BasketballButton = styled.button`
  background-color: #6372ff;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    background-color: #4a59e8;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 114, 255, 0.3);
  }
  
  span {
    margin-left: 8px;
    font-weight: 500;
  }
`;

// DropdownDiv - container for dropdown content with animation
export const DropdownDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
  animation: slideDown 0.3s ease-out forwards;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

