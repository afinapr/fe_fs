import {  CButton, CCard, CCardBody, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow, CModal, CModalBody, CModalFooter,} from "@coreui/react";
import axios from "axios";
import CIcon from '@coreui/icons-react'
import { useEffect } from "react";
import { useState } from "react";

export default function FormCreate() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [view, isView] = useState(false)
    const [found, isFound] = useState(false);

    const createNewUser = () => {

        const data = {
            name: name,
            username: username,
            password: password
        }
        axios.post('http://localhost:2000/user', data)
        .then(res => {
          console.log(res)
        })
        isFound(true)
    }

    const check = () => {
        window.location.assign("/")
    }

    useEffect(() => {
            createNewUser()
    })

    useEffect(() => {
      if (found){
        isView(false)
      }
    })

    return(
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm>
                      <h1>Create User</h1>
                      <p className="text-muted">Fill in the blanks!</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                          </CInputGroupPrepend>
                            <CInput type="text"
                                    placeholder="Enter your Name"
                                    autoComplete="username"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                            />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password"
                                placeholder="Enter your Password"
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                             />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text"
                                placeholder="Enter your Username"
                                autoComplete="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}

                        />
                      </CInputGroup>
                    </CForm>
              <CCol>
                <CButton block
                         type="submit"
                         color="success"
                         onClick={() => isView(true)}>
                         Create
                </CButton>
              </CCol>
            </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <CModal show={view} onDismiss={() => isView(false)}>
        <CModalBody>
           Succes
        </CModalBody>
        <CModalFooter>
          <CButton color="primary"
                    onClick={() => check()}>
                      OK
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
    )
}
