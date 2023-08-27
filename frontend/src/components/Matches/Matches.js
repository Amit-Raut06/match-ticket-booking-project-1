import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../api-helpers/api-helpers";
import MatchItem from "./MatchItem";

const Matches = () => {
  const [matches, setMatches] = useState();
  useEffect(() => {
    getAllMatches()
      .then((data) => setMatches(data.matches))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Matches
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {matches &&
          matches.map((match, index) => (
            <MatchItem
              key={index}
              id={match._id}
              posterUrl={match.posterUrl}
              releaseDate={match.releaseDate}
              title={match.title}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Matches;
