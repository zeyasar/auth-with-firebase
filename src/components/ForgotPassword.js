import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function ForgotPassword() {

  const emailRef = useRef()
  
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  const {resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

   

    try {
      setMessage('')
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError("Failed to sign in")
    }

    setLoading(false)
  }

  return (
    <>
        <Card>
          <Card.Body>
            <h2 className='w-100 text-center mt-2'>Password Reset </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='danger'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required/>
              </Form.Group>

              <Button disabled={loading} type='submit' className='w-100 mt-4'>Reset Password</Button>

            </Form>
            <div className="w-100 text-center mt-3">
              <Link to='/login'>Log In</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account?  <Link to='/signup'>Sign Up</Link>
        </div>
    </>
  )
}

