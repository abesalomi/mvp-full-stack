import { Button, Modal } from 'react-bootstrap';

interface Props {
  children: any,
  onConfirm: () => void;
  onClose: () => void;
  show?: boolean;
}

const Confirm = ({children, onClose, onConfirm, show}: Props) => {

  const handleClose = () => {
    onClose()
  };

  const handleOk = () => {
    onConfirm();
    onClose();
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
        <Button variant="primary" onClick={handleOk}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


export default Confirm;
