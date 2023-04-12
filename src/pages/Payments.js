import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PaymentList from "../components/PaymentList";
import Table from "react-bootstrap/Table";
import { AiOutlineSearch } from "react-icons/ai";
import Connection from "../constants/Connections";
import Empty from "../assets/Empty.png";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";



const Payments = () => {
    const navigate = useNavigate();
  const [chapa, setChapa] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [notFound, setNotFound] = useState("No customer with this status!");

  const [paging, setPaging] = useState([]);

  // onchange in the search input field
  const SearchText = (event) => {
    setSearch(event.target.value);
  };

//   const FindCustomer = (currentPage) => {
//     if (search !== "") {
//       var Api =
//         Connection.api +
//         Connection.search +
//         `?reference=${search}&page=${currentPage}`;
//       var headers = {
//         accept: "application/json",
//         "Content-Type": "application/json",
//       };
//       fetch(Api, {
//         method: "GET",
//         headers: headers,
//       })
//         .then((response) => response.json())
//         .then((response) => {
//           if ([response].length > 0) {
//             setCustomers(response);
//           } else {
//             setNotFound("No result found");
//           }
//         })
//         .catch((e) => {
//           setNotFound("No result found");
//         });
//     } else {
//       fetchCustomer();
//     }
//   };

//   //fetch customer while use clicked the next button every time
//   const fetchCustomer = async (currentPage) => {
//     var Api = Connection.api + Connection.customers + `?page=${currentPage}`; // update this line of code to the something like 'http://localhost:3000/customers?_page=${currentPage}&_limit=${limit}
//     var headers = {
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     };

//     const data = await fetch(Api, {
//       method: "GET",
//       headers: headers,
//     });
//     const response = await data.json();
//     return response.data;
//   };

//   //pagination buttons onclick handler
//   const handlePageClick = async (data) => {
//     let currentPage = data.selected + 1;
//     const customerFromServer = await fetchCustomer(currentPage);
//     // the line of code below will be uncommmented and the next will be cleaned
//     setCustomers(customerFromServer);
//     // setCustomers(customers);
//   };

  //use effect function
  //when the functional component cames to life we will getcustomers by deafult
  useEffect(() => {

    
    const getChapaPayment = async () => {
        setLoading(false);
      var Api = Connection.api + Connection.chapa;

      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      fetch(Api, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((response) => {
            setChapa(response.data);
            setPaging(response);
            setLoading(true);
        })
        .catch((e) => {
            setLoading(true);
        });
    };
    getChapaPayment();

    return () => {};
  }, []);
  return (
    <Container className="bg-white rounded shadow-sm my-4">
      <Row className="d-flex justify-content-between align-items-center px-2">
        <Col sm={4} className="">
          <p className="font-link fs-5 fw-semibold">Payments</p>
        </Col>
        <Col sm={5} className="">
          <div className="input-group mb-4 mt-4">
            <input
              type="text"
              className="form-control small ps-3 "
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              defaultValue={search}
              onChange={SearchText}
            />
            <div className="input-group-append">
              <Button
             
                variant="light"
                className=" border rounded-0 rounded-end bg-light text-center pb-2 "
              >
                <AiOutlineSearch size={20} color="#10a698" />
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row className="d-flex justify-content-start align-items-center">
        
      </Row> */}
      {loading ? (
        <>
          <Row>
            <Col className="bg-white">
              {chapa.length >= 1 ? (
                <Table hover responsive  className="align-middle">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Customer Name</th>
                      <th>Email</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {chapa.map((item, index) => (
                      <PaymentList
                        key={index}
                        id={item.id}
                        reference={item.txn_id}
                        name={item.first_name + " " + item.last_name}
                        email={item.email}
                        amount={item.amount}
                        currency={item.currency}
                        date={item.created_at}
                        status={item.status}
                        rowPressed={() =>
                            navigate("/chapadetail", {
                              state: { ...item },
                            })
                          }
                      />
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="d-flex align-items-center justify-content-center m-auto m-4 p-4">
                  <div className="d-flex align-items-center justify-content-center m-auto m-4 p-4">
                    <img
                      src={Empty}
                      alt="No Customers"
                      className="w-25 h-25 "
                    />
                    <h5>{notFound}</h5>
                  </div>
                </div>
              )}
              {/* Bottom Pagination */}

              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={Math.ceil(paging.last_page)}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                // onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-end"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </Col>
          </Row>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center m-auto h-100 w-100 p-5 bg-opacity-10">
          <div
            class="spinner-border primary-text spinner-border-sm"
            role="status"
          ></div>
          <p className="m-1 text-center">Loading...</p>
        </div>
      )}
    </Container>
  );
};

export default Payments;
