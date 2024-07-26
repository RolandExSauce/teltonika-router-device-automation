import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./notFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <Typography
                    className="heading_404"
                    variant="h1"
                    sx={{
                      fontFamily: "Lilita One",
                      padding: "0px 0px 0px 250px",
                      color: "#0555A4",
                    }}
                  >
                    404
                  </Typography>
                </div>
                <div className="contant_box_404">
                  <Typography
                    className="h3_404"
                    sx={{
                      fontFamily: "Lilita One",
                      marginTop: 5,
                      color: "#0555A4",
                    }}
                    variant="h3"
                  >
                    Oops, your request couldn't be processed🤔🤔
                  </Typography>
                  <Typography
                    className="h4_404"
                    sx={{
                      fontFamily: "Lilita One",
                      marginTop: 5,
                      marginBottom: 5,
                      color: "#0555A4",
                    }}
                    variant="h4"
                  >
                    This page doesn't exist, go back
                  </Typography>
                  <Button
                    variant="contained"
                    type="submit"
                    className="btn_404"
                    sx={{
                      marginTop: 3,
                      height: 60,
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "Lilita One",
                      backgroundColor: "#0284c7",
                      ":hover": {
                        bgcolor: "#003366",
                        color: "white",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    <KeyboardBackspaceIcon fontSize="large" />
                    <span
                      className="ml-"
                      style={{ marginRight: 3, marginLeft: 20 }}
                    >
                      Back to Login
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
}
export default NotFound;
