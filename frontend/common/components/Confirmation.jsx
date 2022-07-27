import React from 'react';
import styled from 'styled-components';
import { colors, FontSizes } from 'common';
import { Text, Button } from 'common/components';
import ReactDOM from 'react-dom';
import { DeviceMediaQueries } from 'common/device';

const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 700;
  background: rgba(0, 0, 0, 0.75);
`;

const Container = styled.div`
  position: absolute;
  padding-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: ${colors.white};
  z-index: 900;
  padding: 20px 20px;
  border-radius: 10px;
  gap: 1.5rem;
  text-align: center;

  @media ${DeviceMediaQueries.laptop} {
    width: 40%;
  }
`;

const ModalOverlay = ({ text, onConfirm, onCancel }) => {
  return (
    <Container>
      <Modal>
        <Text fontSize={FontSizes.Small}>{text}</Text>
        <Buttons>
          <Button onClick={() => onConfirm()} primary>
            Yes
          </Button>
          <Button onClick={() => onCancel()} tertiary>
            No
          </Button>
        </Buttons>
      </Modal>
    </Container>
  );
};

const Backdrop = ({ onClose }) => {
  return <BackdropContainer onClick={onClose} />;
};

export const Confirmation = ({ onClose, onCancel, onConfirm, ...props }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...props} onCancel={onCancel} onConfirm={onConfirm} />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};
