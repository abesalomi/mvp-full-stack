import { Button, Modal } from 'react-bootstrap';

interface Props {
  children: any,
  onConfirm: () => void;
  onClose: () => void;
  show?: boolean;
  closeOnOk?: boolean;
  disabledOk?: boolean;
}

const Confirm = ({children, onClose, onConfirm, show, closeOnOk = true, disabledOk = false}: Props) => {

  const handleClose = () => {
    onClose()
  };

  const handleOk = () => {
    onConfirm();
    if (closeOnOk) {
      onClose();
    }
  }

  return (
    <Modal show={show !== undefined ? show : true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button disabled={disabledOk} variant="primary" onClick={handleOk}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


export default Confirm;
