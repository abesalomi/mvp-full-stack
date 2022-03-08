import { useAsync, useAsyncFn } from 'react-use';
import { httpAllSession, httpLogoutAll } from '../../services/auth';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


const LogoutAllFeature = () => {
  const {loading, value, error} = useAsync(httpAllSession);
  const [{loading: logoutLoading, value: logoutValue}, logoutAll] = useAsyncFn(httpLogoutAll);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (value?.count! > 1) {
      setShowWarning(true);
    }
  }, [value])

  useEffect(() => {
    if(value) {
      setShowWarning(false);
    }
  }, [logoutValue])

  return showWarning ? (
    <Modal show={true}>
      <Modal.Header>Attention!</Modal.Header>
      <Modal.Body>
        There are another {value?.count! - 1} active session.
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} variant="danger" onClick={() => logoutAll()}>Logout Others</Button>
        <Button onClick={() => setShowWarning(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  ) : null;

}

export default LogoutAllFeature;
