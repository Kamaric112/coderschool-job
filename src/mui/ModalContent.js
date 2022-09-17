import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import { AuthContext } from "./LoginPage";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./ModalLogin";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ job }) {
  const [open, setOpen] = React.useState(false);
  let auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpen = () => {
    if ((!auth.user && !auth.password) || !auth.user || !auth.password) {
      setOpen(false);
      navigate("/login");
    } else {
      setOpen(true);
      navigate(`/jobs/${job.id}`);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {auth?.user ? (
        <>
          <Button onClick={handleOpen} variant="contained">
            Learn More
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {job.title}
              </Typography>
              {/* add chip component on skills array*/}
              {job.skills.map((skill) => (
                <Chip
                  variant="outlined"
                  color="warning"
                  label={skill}
                  key={skill}
                />
              ))}

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {job.description}
              </Typography>
            </Box>
          </Modal>
        </>
      ) : (
        <ModalLogin Title={"Learn More"} />
      )}
    </div>
  );
}
