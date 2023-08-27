import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchDetails, newBooking } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const handleOpenRazorpay = async (data) => {

  const { data: { key } } = await axios.get("/api/getkey")

  const options = {
    key,
    amount: data.amount,
    currency: "INR",
    name: "Cricket Match",
    description: "Tutorial of RazorPay",
    image: "https://t3.ftcdn.net/jpg/05/13/39/96/360_F_513399651_7X6aDPItRkVK4RtrysnGF8A88Gyfes3T.jpg",
    order_id: data.id,
    
    handler: function (response) {
      console.log(response, "34")
      axios.post('http://localhost:5002/api/paymentVerification', { response: response })
          .then(res => {
              console.log(res, "37")
              // your orders
              swal("Payment Successful!", "Good Job", "success").then(()=>{
                window.location.href = "http://localhost:3000/matches";  
              })
              
          })
          .catch(err => {
              console.log(err)
          })
  },
    prefill: {
        name: "Amit Raut",
        email: "amit.raut@example.com",
        contact: "9999999999"
    },
    notes: {
        "address": "Razorpay Corporate Office"
    },
    theme: {
        "color": "#121212"
    }
};

console.log(options);
const razor = new window.Razorpay(options);
razor.open();

};


const checkoutHandler = async (amount) => {

  // const { data: { order } } = await axios.post("/api/checkout", {
  //     amount
  // })
  const _data = { amount: amount }
        axios.post('http://localhost:5002/api/orders', _data)
            .then(res => {
                console.log(res.data, "29")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })

  
  // console.log(order);

}

//component
const Booking = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [match, setMatch] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMatchDetails(id)
      .then((res) => setMatch(res.match))
      .catch((err) => console.log(err));
  }, [id]);
  
  
  const handleChange = (e) => {
    // console.log(new Date(e.target.value).toDateString());
    // console.log(new Date(match.releaseDate).toDateString());

    if(typeof(e.target.value) !== 'number' && e.target.value >100){
      alert('Please enter a number below 100')
      setValue("");
      return;
    }
    // else{
    //         // new Date(e.target.value).toDateString() >new Date(match.releaseDate).toDateString()
    //   if(new Date(e.target.value) instanceof Date ){
    //   //  const year= e.target.value.getYear();
    //   //  const month= e.target.value.getMonth();
    //   //  const day= e.target.value.getDate();
    //   //  console.log(year);
    //     alert('Please enter a date before the release date')
    //     setValue("");
    //     return;
    //   }  
  
    // }

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, match: match._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      checkoutHandler(5000);
      // navigate(`/matches`);  

  };
  return (
    <div>
      {match && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book Tickets Of Match: {match.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={match.posterUrl}
                alt={match.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{match.description}</Typography>
                {/* <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer:
                  {match.actors.map((actor) => " " + actor + " ")}
                </Typography> */}
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(match.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={ handleSubmit }>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={ handleChange }  
                    type={"number"}
                    margin="normal"
                    variant="standard"
                    required={true}
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                    required={true}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
