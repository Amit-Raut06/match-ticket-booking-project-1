import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMatches } from "../../api-helpers/api-helpers";
import CradLayout from "./CradLayout";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";

const HomeLayout = () => {
  const [matches, setMatches] = useState();
  console.log(matches);
  useEffect(() => {
    getAllMatches()
      .then((data) => {console.log(data); setMatches(data.matches)})
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <Box width="100%" height="100vh" marginTop={2} margin="auto">
      <Box margin={"auto"} width="80%" height="40%" padding={2} display="flex">
      <img
          src="https://www.timesofsports.com/wp-content/uploads/2023/07/WI-vs-IND-2023-1st-ODI-Probable-Playing-11.png"
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        gap={5}
        margin="auto"
        width="80%"
        flexWrap={"wrap"}
        display="flex"
        justifyContent={"center"}
      >
        {matches &&
          matches
            .slice(0, 4)
            .map((match, index) => (
              <CradLayout
                id={match._id}
                title={match.title}
                releaseDate={match.releaseDate}
                posterUrl={match.posterUrl}
                description={match.description}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          variant="outlined"
          LinkComponent={Link}
          to="/matches"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Matches
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;
