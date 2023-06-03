import React, { useState } from "react"
import PropTypes from 'prop-types';
import { Typography, Box} from "@mui/material";
import { TabPanel } from "../components/TabPanel";
import { TabHeader } from "../components/TabHeader";
import { EventsMetrics } from "../components/EventsMetrics";

export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  
  export const options = {
    title: "My Daily Activities",
    is3D: true,
  };

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

export const Metrics = () =>{
  
    const [tabValue, setTabValue] = useState(0);


    return (
        <>
            <Typography  variant="h3" align="left">
                Metricas
            </Typography>
            <Box sx={{ width: '100%' }}>
                <TabHeader 
                    value={tabValue}
                    setValue={setTabValue}
                    items={['Eventos', 'Denuncias']}
                />
                <TabPanel value={tabValue} index={0}>
                    <EventsMetrics/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    Denuncias
                </TabPanel>
            </Box>

        </>
    );
}