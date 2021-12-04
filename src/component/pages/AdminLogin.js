import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import logo from "../../asset/images/logo2.svg";
import { postApi } from "../Functions/ApiFunc";
export default function AdminLogin() {
  const [name, setName] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: name,
      password: pass,
    };
    postApi("/api/admin/auth/login", data, false).then((response) => {
      if (response.data.message === "Logged in successfully") {
        localStorage.setItem("token", response.data.access_token);
        // history.push(`/admin/types`);
        window.location.reload()
        console.log("types")
      }else{
        setError(true)
      }
    });
  };

  return (
    <>
      <section className="h-login">
        <div className="container">
          <Grid container alignItems="center">
            <Grid
              md={6}
              sm={12}
              align="center"
              mx={"auto"}
              sx={{ mt: { xs: 10, md: 0 } }}
            >
              <Container>
                <img src={logo} alt={logo} width="150" />
                <h2>تسجيل الدخول</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="h-input form-control big "
                      name="name"
                      required
                      placeholder="اسم المستخدم"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setError(false)
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="h-input form-control big "
                      name="pass"
                      required
                      placeholder=" كلمة المرور"
                      value={pass}
                      onChange={(event) => {
                        setPass(event.target.value);
                        setError(false)

                      }}
                    />
                  </div>
                  {error && <h6 className="text-danger text-center my-2">اسم المستخدم او كلمة المرور خاطئة</h6>}
                  <button className="btn h-button d-block mx-auto big mt-5">
                    تسجيل الدخول
                  </button>
                </form>
              </Container>
            </Grid>
            <Grid md={6} sm={12} sx={{ mt: { xs: 5, md: 0 } }}>
              {/* <img src={earth} alt={earth} className="h-login-earth" /> */}
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
}
