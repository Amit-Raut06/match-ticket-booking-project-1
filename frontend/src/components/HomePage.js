import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMatches } from "../api-helpers/api-helpers";
import MatchItem from "./Matches/MatchItem";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    getAllMatches()
      .then((data) => setMatches(data.matches))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
      <AliceCarousel autoPlay autoPlayInterval="3000" disableButtonsControls>
        <center>
        <img
          src="https://images.pexels.com/photos/9828007/pexels-photo-9828007.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Brahmastra"
          width={"1000px"}
          height={"300px"}
        />
        </center>
         <center>
        <img
          src="https://images.pexels.com/photos/16062158/pexels-photo-16062158/free-photo-of-man-playing-cricket.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Brahmastra"
          width={"1000px"}
          height={"300px"}
        />
        </center>
        <center>
        <img
          src="https://images.pexels.com/photos/7702229/pexels-photo-7702229.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Brahmastra"
          width={"1000px"}
          height={"300px"}
        />
        </center>
        </AliceCarousel>
      </Box>
      <br/>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Matches
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {matches &&
          matches
            .slice(0, 4)
            .map((match, index) => (
              <MatchItem
                id={match._id}
                title={match.title}
                posterUrl={match.posterUrl}
                releaseDate={match.releaseDate}
                key={index}
                
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/matches"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Matches
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
