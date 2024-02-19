import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import { mockTransactions } from "./components/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "./components/Header";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import StatBox from "./components/StatBox";
import ProgressCircle1 from "./components/ProgressCircle1";
import ProgressCircle2 from "./components/ProgressCircle2";
import ProgressCircle3 from "./components/ProgressCircle3";
import PieChart from "./components/PieChart";
import ProgressCircle4 from "./components/ProgressCircle4";
import ProgressCircle5 from "./components/ProgressCircle5";
import ProgressCircle6 from "./components/ProgressCircle6";

const Report = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="REPORT" />

        <Box>
          <Button
            style={{
              backgroundColor: "#1976d2",
              color: "#141414",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Player Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor="#f2f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="244 M"
            subtitle="Distance Covered"
            progress="0.85"
            increase="+2.2%"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f2f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="Passing Accuracy"
            progress="0.95"
            increase="+0.1%"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f2f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1"
            subtitle="Shots on Target"
            progress="0.45"
            increase="-3.6%"
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f2f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Corners Won"
            progress="1.0"
            increase="+0%"
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor="#f2f0f0"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color="#141414"
                style={{ fontFamily: "Source Sans Pro", fontSize: "16px" }}
              >
                Distance Covered
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="#4cceac"
                style={{ fontFamily: "Source Sans Pro", fontSize: "24px" }}
              >
                Total distance covered by a player during the match
              </Typography>
            </Box>
            <Box>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isReport={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="#f2f0f0"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid $"#4cceac"`}
            colors="#141414"
            p="15px"
          >
            <Typography color="#141414" variant="h5" fontWeight="600">
              Team Players
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid $"#4cceac"`}
              p="15px"
            >
              <Box>
                <Typography
                  color="#4cceac"
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color="#141414">
                  {transaction.user}
                </Typography>
              </Box>
              <Box color="#141414">{transaction.date}</Box>
              <Box
                backgroundColor="#4cceac"
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

<Box
  gridColumn="span 8"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
>
  <Box
    mt="25px"
    p="0 30px"
    display="flex "
    justifyContent="space-between"
    alignItems="center"
  >
    <Box>
      <Typography
        variant="h5"
        fontWeight="600"
        color="#141414"
        style={{ fontFamily: "Source Sans Pro", fontSize: "16px" }}
      >
        Possession
      </Typography>
      <Typography
        variant="h3"
        fontWeight="bold"
        color="#4cceac"
        style={{ fontFamily: "Source Sans Pro", fontSize: "24px" }}
      >
        Percentage of time the team has the ball
      </Typography>
    </Box>
    <Box>
    </Box>
  </Box>
  <Box height="250px" m="-20px 0 0 0">
    <PieChart isReport={true} />
  </Box>
</Box>

{/* ROW 3 */}
<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Passing Accuracy
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle1 size="125" />
    <Typography
      variant="h5"
      color="#3333ff"
      style={{ fontFamily: "Source Sans Pro", fontSize: "14px", marginTop: "15px" }}
    >
      Percentage of successful passes completed by a player
    </Typography>
    <Typography style={{ fontFamily: "Source Sans Pro", fontSize: "14px" }}>
      Bruno Fernandes's Passing Accuracy
    </Typography>
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Shots on Target
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle2 size="125" />
    <Typography
      variant="h5"
      color="#3333ff"
      style={{ fontFamily: "Source Sans Pro", fontSize: "14px", marginTop: "15px" }}
    >
      Number of shots that are on target per player.
    </Typography>
    <Typography style={{ fontFamily: "Source Sans Pro", fontSize: "14px" }}>
      Bruno Fernandes's Shots on Target
    </Typography>
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Aerial Duels Won
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle3 size="125" />
    <Typography
      variant="h5"
      color="#3333ff"
      style={{ fontFamily: "Source Sans Pro", fontSize: "14px", marginTop: "15px" }}
    >
      Number of aerial duels won by a player.
    </Typography>
    <Typography style={{ fontFamily: "Source Sans Pro", fontSize: "14px" }}>
      Bruno Fernandes's Aerial Duels Won
    </Typography>
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Passing Accuracy by Team
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle4 size="125" />
    <Typography
      variant="h5"
      color="#3333ff"
      style={{ fontFamily: "Source Sans Pro", fontSize: "14px", marginTop: "15px" }}
    >
      Overall passing accuracy of the team.
    </Typography>
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Shots Taken
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle5 size="125" />
    <Typography
      variant="h5"
      color="#3333ff"
      style={{ fontFamily: "Source Sans Pro", fontSize: "14px", marginTop: "15px" }}
    >
      Total number of shots taken by the team.
    </Typography>
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    sx={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Goals Scored Vs Goals Conceded
  </Typography>
  <Box height="250px" mt="-20px">
    <BarChart isReport={true} />
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  backgroundColor="#f2f0f0"
  p="30px"
>
  <Typography
    variant="h5"
    fontWeight="600"
    style={{ fontFamily: "Source Sans Pro", fontSize: "20px" }}
  >
    Corners Won
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle6 size="125" />
    <Typography
      variant="h5"
      color="#3333ff"
      style={{ fontFamily: "Source Sans Pro", fontSize: "14px", marginTop: "15px" }}
    >
      Number of corners won by the team.
    </Typography>
  </Box>
</Box>
</Box>
    </Box>
  );
};

export default Report;
