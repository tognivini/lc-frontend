import styled from 'styled-components'

export const InputComponent = styled.input`
  background: white;
  border: solid 1px ${({ error }) => (error ? 'red' : 'rgba(200, 200, 200, 1)')};
  border-radius: 3px;
  outline: none;
  transition: 0.3s;
  min-width: 100px;
  box-sizing: border-box;

  padding: 8px;
  font-size: 10px;
  height: 25px;

  /* font-size: 20px; */

  ::placeholder {
    transition: 0.3s;
    color: rgba(200, 200, 200, 1);
  }

  :focus {
    border-color: rgba(150, 150, 150, 0.8);
    ::placeholder {
      color: rgba(200, 200, 200, 0.5);
    }
  }

  :disabled {
    background: #eeeeee;
  }
`
