import React from 'react'

import {
  Container,
  MainContainer,
  Header,
  Content,
  TitleDiv,
  Title,
  ContentContainer
} from './styles'
import { colors } from '../../../common/types/IColors'
// import { closeIconRed } from '../../../common/images'

const Modal = ({ children, defaultPadding, setModalIsOpen, ...props }) => {
  const handleChange = async () => {
    props.onClose()
  }

  if (!props.show) {
    return null
  }

  return (
    <Container>
      <Content>
        <MainContainer style={{ gridArea: 'content' }}>
          <Header>
            <TitleDiv>
              {props.img ? <img alt="" src={props.img} /> : null}
              <Title
                color={props.color || colors.red}
                weight={props.weight}
                // style={{ fontSize: 2 }}
              >
                {props.title}
              </Title>
            </TitleDiv>

            {!props.onClose ? (
              <React.Fragment />
            ) : (
              <></>
              // <img src={closeIconRed} alt="" srcset="" onClick={handleChange} />
            )}
          </Header>

          <ContentContainer defaultPadding={defaultPadding}>
            {children}
          </ContentContainer>
        </MainContainer>
      </Content>
    </Container>
  )
}

Modal.defaultProps = {
  defaultPadding: false,
  setModalIsOpen: () => {}
}

export { Modal }
