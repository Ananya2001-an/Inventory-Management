import React from 'react'
import {Toast, ToastContainer,  Button, Container, Table, Modal, Form} from 'react-bootstrap'
import axios from 'axios'
import { useState, useRef } from 'react'
import {PlusCircle} from 'react-bootstrap-icons'
import { useEffect } from 'react'

export default function Categories() {
    const [showSuccess, setShowSuccess] = useState(false)
    const [showFailure, setShowFailure] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [categories, setCategories] = useState([])
    const nameRef = useRef()
    const descRef = useRef()

    useEffect(()=>{
        axios.get('http://localhost:5000/showcategory')
        .then(res=>{
            setCategories(res.data)
        })
    }, [])
    
    const createCategory = (e)=>{
    e.preventDefault()
    setShowModal(false)
    const details ={
        name: nameRef.current.value,
        desc: descRef.current.value
    }
    axios.post('http://localhost:5000/createcategory', details)
    .then(res=>{
        if (res.data == "Created Category")
        {
            setShowSuccess(true)
            setCategories(prev => [...prev, details])
        }else{
            setShowFailure(true)
        }
    })
  }  

  return (
    <div>
    <ToastContainer className='p-3' position='top-end'>
    <Toast show={showSuccess} onClose={()=> setShowSuccess(false)} bg="success">
        <Toast.Header>
            <strong className='me-auto'>Success</strong>
        </Toast.Header>
        <Toast.Body  className='text-white'>
            You successfully created a new category!
        </Toast.Body>
    </Toast>
    <Toast show={showFailure} onClose={()=> setShowFailure(false)} bg="danger">
        <Toast.Header>
        <strong className='me-auto'>Failure</strong>
        </Toast.Header>
        <Toast.Body  className='text-white'>
            Couldn't create new category, try again.
        </Toast.Body>
    </Toast>
    </ToastContainer>
    <Container className='p-4'>
        <div className='d-flex mb-2' style={{justifyContent:"flex-end"}}>
            <Button variant='dark' className='rounded border-0'
             onClick={()=> setShowModal(true)}><PlusCircle color='white' size="25px"/></Button>
        </div>

        <Table>
        <thead>
        <tr>
        <th>Index</th>
        <th>Category Name</th>
        <th>Description</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody>
            {
                categories.map((category, index)=>{
                    return <tr>
                    <td>{index}</td>
                    <td>{category.name}</td>
                    <td>{category.desc}</td>
                    <td><a href='#'>Delete</a></td>
                    </tr>
                })
            }
           
        </tbody>
        </Table>
    </Container>
    <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
            Create New Category
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={createCategory}>
                <Form.Group className='mb-2'>
                <Form.Label>Enter Category Name:</Form.Label>
                <Form.Control ref={nameRef} type="text" required/>
                </Form.Group>
                <Form.Group className='mb-2'>
                <Form.Label>Enter Category Description:</Form.Label>
                <Form.Control ref={descRef} type="text" required/>
                </Form.Group>
                <div className='text-center'>
                <Button type="submit" variant='dark'>Submit</Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
    </div>
  )
}
