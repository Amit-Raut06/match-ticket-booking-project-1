import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMatches } from "../../helpers/api-helpers";
import CradLayout from "../HomePage/CradLayout";

const AllMatches = () => {
  const [matches, setMatches] = useState();
  useEffect(() => {
    getAllMatches()
      .then((data) => setMatches(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4}>
      <Typography variant="h4" padding={2} textAlign="center">
        All Matches
      </Typography>
      <Box
        margin="auto"
        width="100%"
        display={"flex"}
        justifyContent="center"
        flexWrap={"wrap"}
        gap={4}
      >
        {matches &&
          matches.map((match, index) => (
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
    </Box>

  );
};

export default AllMatches;
