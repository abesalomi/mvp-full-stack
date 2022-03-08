import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { addDeposit, getDeposit, resetDeposit, selectDeposit, selectDepositErrors } from './depositSlice';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import Confirm from '../../components/confirm/Confirm';


const ALLOWED_DEPOSIT = [5, 10, 20, 50, 100]
const DepositFeature = () => {

  const dispatch = useAppDispatch();
  const deposit = useAppSelector(selectDeposit);
  const {isError, errorMessages} = useAppSelector(selectDepositErrors);

  const [confirmDeposit, setConfirmDeposit] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDeposit())
  }, [])

  return (
    <>
      {
        (isError) && <Alert variant={'danger'} >
            <ul>
              {
                errorMessages.map(e=> <li>{e}</li>)
              }
            </ul>
        </Alert>
      }
      <Row>
        <Col className="w-100 bg-light text-center" xs={12}>
          <h1 className="display-1 fw-bolder">{deposit.toString()}</h1>
        </Col>

        {
          ALLOWED_DEPOSIT.map(amount => (
            <Col  className="p-2" key={amount} xs={2} lg={12}>
              <Button className="w-100 p-4" onClick={() => setConfirmDeposit(amount)}>
                Add <br className="d-lg-none"/> {amount}
              </Button>
            </Col>
          ))

        }

        <Col className="p-2" xs={2} lg={12}>
          <Button disabled={!deposit} variant="danger" className="w-100 h-100 p-4" onClick={() => setConfirmReset(true)}>
            Reset
          </Button>
        </Col>

      </Row>

      {
        confirmDeposit && (
          <Confirm onConfirm={() => { dispatch(addDeposit(confirmDeposit)) }} onClose={() => setConfirmDeposit(null)}>
            Adding <span className="fw-bold">{confirmDeposit}</span> to your deposit.
          </Confirm>
        )
      }

      {
        confirmReset && (
          <Confirm onConfirm={() => { dispatch(resetDeposit()) }} onClose={() => setConfirmReset(false)}>
            You are resetting your deposit.
          </Confirm>
        )
      }
    </>
  )
}

export default DepositFeature;
