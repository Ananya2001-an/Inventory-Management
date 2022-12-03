import React, {useState} from 'react'
import { Container, Toast, ToastContainer, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {AuthUse} from '../contexts/AuthContext'
import Categories from './Categories'

export default function HomePage() {
  const {currentUser, logout, email} = AuthUse()
  const navigate = useNavigate()
  const [showError, setShowError] = useState(false)
  
  async function handleLogOut(){
    try{
        await logout(currentUser.multiFactor.user.email)
        navigate("/login")
     }catch{
        setShowError(true)
     }
     
  }

  if(currentUser != undefined){
    return (
      <div className='position-relative'>
        <ToastContainer className="p-3" position='top-end'>
          <Toast bg='light' show={showError} onClose={()=> setShowError(false)}>
          <Toast.Header>
              <strong className="me-auto">Try Again</strong>
              <small className='text-muted'>just now</small>
          </Toast.Header>
          <Toast.Body>Failed to Log Out!</Toast.Body>
          </Toast>
        </ToastContainer>
        
        <header className='bg-dark'>
        <Container className='d-flex p-3' style={{justifyContent:"space-between",
        alignItems:"center"}}>
        <h3 style={{color:"white"}}>Manage Your Inventory</h3>
        {email && <Button variant='dark' onClick={handleLogOut}>LogOut</Button>}
        </Container>
        </header>

        <Container>
          <Categories />
        </Container>
      </div>
    )
  }else{
    navigate('/login')
  }
}
