import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeCredentials } from "../../reducers/credentials/credentialsSlice";
import { useNavigate } from "react-router-dom";
import { selectCredentials } from "../../reducers/credentials/credentialsSlice";
import { ethereumAddressRegex } from "../../helperFunctions";
const defaultTheme = createTheme();

const Credentials = () => {
  const [infuraId, setInfuraId] = useState("");
  const [pairAddress, setPairAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const credentials = useSelector(selectCredentials);

  useEffect(() => {
    setInfuraId(credentials.infuraId);
    setPairAddress(credentials.pairAddress);
  }, [credentials]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      storeCredentials({
        infuraId: data.get("infuraId"),
        pairAddress: data.get("pairAddress"),
      })
    );
    navigate("/chart");
  };

  const isDisabled = () => {
    if (infuraId && pairAddress && ethereumAddressRegex.test(pairAddress)) {
      return false;
    }
    return true;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Credentials
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="infuraId"
              label="Infura Id"
              name="infuraId"
              autoComplete="infuraId"
              autoFocus
              onChange={(e) => setInfuraId(e.target.value)}
              value={infuraId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="pairAddress"
              label="Pair Address"
              name="pairAddress"
              autoComplete="pairAddress"
              autoFocus
              onChange={(e) => setPairAddress(e.target.value)}
              value={pairAddress}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isDisabled()}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Credentials;
