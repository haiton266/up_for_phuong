import React, { useEffect, useState } from "react";
import { GetConversationById } from "../../../Services/MessServices";
import { baseURL } from "../../../Services/axios-customize";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
function StoreCustomer() {
  const [listConversation, setListConversation] = useState([]);
  const id666 = localStorage.getItem("id666");
  useEffect(() => {
    getConversation();
  }, []);
  const getConversation = async () => {
    try {
      let res = await GetConversationById(id666);
      if (res && res.data) {
        setListConversation(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">
              Member
            </h5>
            <MDBCard>
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  {listConversation.map((conversation, index) => (
                    <li
                      key={index}
                      className="p-2 border-bottom"
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#eee" : "transparent",
                      }}
                    >
                      {conversation.users.map((user, index) => (
                        <a
                          key={index}
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          {user.id !== id666 && (
                            <>
                              <div className="d-flex flex-row">
                                <img
                                  src={`${baseURL}${user.image}`}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                  width="60"
                                />
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">{user.name}</p>
                                  <p className="small text-muted">
                                    {conversation.mess_text}
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Just now
                                </p>
                                {conversation.unRead > 0 && (
                                  <span className="badge bg-danger float-end">
                                    {conversation.unRead}
                                  </span>
                                )}
                              </div>
                            </>
                          )}
                        </a>
                      ))}
                    </li>
                  ))}
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard>
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li class="d-flex justify-content-between mb-4">
                <MDBCard className="w-100">
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p class="fw-bold mb-0">Lara Croft</p>
                    <p class="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard>
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">Brad Pitt</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="bg-white mb-3">
                <MDBTextArea label="Message" id="textAreaExample" rows={4} />
              </li>
              <MDBBtn color="info" rounded className="float-end">
                Send
              </MDBBtn>
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default StoreCustomer;
