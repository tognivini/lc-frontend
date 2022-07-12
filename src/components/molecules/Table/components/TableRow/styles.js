import styled from 'styled-components'

export const TdForSelection = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 2px solid ${props => (props.isSelected ? '#D03438' : '#b0bac9')};
  border-radius: 3px;
`
