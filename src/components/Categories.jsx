import React from 'react'
import {Toast, ToastContainer,  Button, Container, Table, Modal, Form} from 'react-bootstrap'
import axios from 'axios'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {PlusCircle} from 'react-bootstrap-icons'
import { useEffect } from 'react'
import {AuthUse} from '../contexts/AuthContext'

export default function Categories() {
    const {email} = AuthUse()
    const [showSuccess, setShowSuccess] = useState({bool:false, msg:''})
    const [showFailure, setShowFailure] = useState({bool:false, msg:''})
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [categories, setCategories] = useState([])
    const nameRef = useRef()
    const descRef = useRef()

    useEffect(()=>{
        axios.get('http://localhost:5000/showcategory/' + email)
        .then(res=>{
            setCategories(res.data)
        })
    }, [])
    
    const createCategory = (e)=>{
    e.preventDefault()
    setShowModal(false)
    const details ={
        name: nameRef.current.value,
        desc: descRef.current.value,
        id: email
    }
    axios.post('http://localhost:5000/createcategory', details)
    .then(res=>{
        if (res.data == "Created Category")
        {
            setShowSuccess({bool:true, msg:`Successfully created new category ${details.name}!`})
            setCategories(prev => [...prev, details])
        }else{
            setShowFailure({bool:true, msg:`Couldn't create new category ${details.name}, try again.`})
        }
    })
  }  

  const deleteCategory = (name)=>{
    axios.post('http://localhost:5000/deletecategory/', {id: email, name: name})
    .then(res=>{
       if(res.data == "Deleted Category"){
        setCategories(categories.filter(cat => cat.name !== name))
        setShowSuccess({bool:true, msg:`Deleted category ${name}!`})
       }else{
        setShowFailure({bool:true, msg:`Couldn't delete category ${name}, try again.`})
       }
    })
  }

  const updateCategory = (e)=>{
  }

  const addProduct = () =>{

  }

  return (
    <div>
    <ToastContainer className='p-3' position='top-end'>
    <Toast show={showSuccess.bool} onClose={()=> setShowSuccess({bool:false, msg:''})} bg="success">
        <Toast.Header>
            <strong className='me-auto'>Success</strong>
        </Toast.Header>
        <Toast.Body  className='text-white'>
            {showSuccess.msg}
        </Toast.Body>
    </Toast> 
    <Toast show={showFailure.bool} onClose={()=> setShowFailure({bool:false, msg:''})} bg="danger">
        <Toast.Header>
        <strong className='me-auto'>Failure</strong>
        </Toast.Header>
        <Toast.Body  className='text-white'>
            {showFailure.msg}
        </Toast.Body>
    </Toast>
    </ToastContainer>
    <Container className='p-4'>
        <h1>All Categories</h1>
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
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.desc}</td>
                    <td>
                    <Link onClick={()=>deleteCategory(category.name)}>Delete</Link>/
                    <Link>Update</Link>/
                    <Link onClick={addProduct}>Add Product</Link></td>
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
