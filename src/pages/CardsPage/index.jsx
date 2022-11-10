import React from 'react';
import {Box} from "@mui/material";
import PageTitle from "../../UI/PageTitle";

const CardsPage = () => {
  return (
    <Box
      sx={{height: '100vh', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', pt: 6, position: 'relative'}}>
      <Box pl={2}>
        <PageTitle title='Карты'/>
      </Box>
    </Box>
  );
};

export default CardsPage;