import React from "react";
import { FormattedMessage } from "react-intl";
import "./Home.scss";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { ImageMap } from "../../assets/images/ImageMap";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Page from "../Page/Page";
import Grow from '@mui/material/Grow';

class Home extends Page {
  renderPageContent(): JSX.Element {
    return       <div className="Home">
    <Grid
      container
      spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
      columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
    >
      {Array.from(this.getNavigationItems()).map((item, index) => (
        <Grow in={true} timeout={1000 + (index * 300)}>
        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
          <Box className={"NavItem"}>
            <Link to={item.path}>
              <Card className="Card" >
                <CardMedia
                  component="img"
                  height="194"
                  src={ImageMap[item.imageId]}
                />
                <CardHeader
                  title={
                    <FormattedMessage
                      id={item.name}
                      defaultMessage={item.name}
                    />
                  }
                />
              </Card>
            </Link>
          </Box>
        </Grid>
        </Grow>
      ))}
    </Grid>

    
  </div>
  }
}

export default Home;
