import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Contentbutton from "./Contentbutton"
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';




export default function BasicCard({job}) {
  return (
    <Card sx={{height: '100%' ,display:"flex",flexDirection:"column",justifyContent: "space-between"}} >
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {job.city}
        </Typography>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Divider />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Experience Required : {job.yrsXPExpected}
        </Typography>
          {/* add chip component on skills array*/}
          {job.skills.map((skill) => 
          ( <Chip variant="outlined" color="warning" label = {skill} key = {skill}/> ) ) }
        <Typography variant="body2"  sx={{ mt: 2 }}>
          {job.description}

        </Typography>
      </CardContent>
      <CardActions >
        <Contentbutton />
      </CardActions>
    </Card>
  );
}
