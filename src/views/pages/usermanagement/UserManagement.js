import { CFormGroup, CInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton, CCard, CCardBody,  CCardHeader, CCardText, CCol, CContainer, CDataTable, CRow } from "@coreui/react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './UserManagement.css'

export default function UserManagement() {
  const dataUser = ["id", "name", "username"]

    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [view, isView] = useState(false);
    const [found, isFound] = useState(false);

    const readDataUsers = () => {
        axios.get('http://localhost:2000/user/read')
        .then(res => {
            setData(res.data.data)

        })
    }

    const deleteDataUser = () => {
      axios.delete('http://localhost:2000/user/'+id)
      .then(res => {
          if (res.status === 200) {
              isFound(true)
          }
      })
  }


    useEffect(() => {
      readDataUsers()
    })

    useEffect(() => {
      if (found) {
        isView(false)
    }

    })

    return(
        <div className="c-app c-default-layout flex-row align-items-center" >
            <CContainer>
                <CRow className='justify-content-center'>
                <CCol md="9" lg="7" xl="6">
                  <CCard>
                    <CCardHeader>
                      <CCardText className='text-center' style={{fontWeight: 'bold' }}>USER-MANAGEMENT</CCardText>
                    </CCardHeader>
                      <CCardBody>
                        <CCardText className='text-center'>List Users</CCardText>
                          <CDataTable
                            items={data}
                            fields={dataUser}
                            itemsPerPage={5}
                            pagination>
                          </CDataTable>
                            <CRow className="justify-content-end">
                              <CButton color='info'
                                        onClick={() => isView(true)}>
                                        Delete User
                              </CButton>
                            </CRow>
                              <div><br></br></div>
                            <Link to="/pages/formcreate" style={{ textDecoration: 'none' }}>
                              <CRow className="justify-content-end" >
                                <CButton color='success'>
                                  Create User
                               </CButton>
                              </CRow>
                            </Link>
                     </CCardBody>
                    </CCard>
                </CCol>
                <CModal show={view} onDismiss={() => isView(false)}>
                    <CModalHeader onDismiss={() => isView(false)}>
                      <CModalTitle>DELETE USER</CModalTitle>
                        </CModalHeader>
                          <CModalBody>
                            <CFormGroup>
                              <CInput
                                placeholder="Input your ID"
                                onChange={(e) => setId(e.target.value)}
                                required
                                type='number' />
                            </CFormGroup>
                          </CModalBody>
                            <CModalFooter>
                                <CButton color="danger" onClick={() => isView(false)}>
                                  Close
                                </CButton>
                                <CButton color="info" onClick={() => deleteDataUser()}  >
                                  Delete
                                </CButton>
                            </CModalFooter>
                </CModal>
              </CRow>
            </CContainer>
        </div>
    )
}
