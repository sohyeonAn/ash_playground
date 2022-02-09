import { Row, Col, Input, Button } from "antd";
import { useRef } from "react";
import { LoginReqType } from "../types";
import "./Signin.css";

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  return (
    <Row align="middle" className="signin_row">
      <Col span={24}>
        <Row className="signin_contents">
          <Col span={12}>
            <img src="/bg_signin.png" alt="Signin" className="signin_bg" />
          </Col>
          <Col span={12}>
            <div className="signin_title">My Books</div>
            <div className="signin_subtitle">Please Note Your Opinion.</div>
            <div className="signin_underline" />
            <div className="email_title">
              Email
              <span className="required"> *</span>
            </div>
            <div className="input_area">
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className="input"
                ref={emailRef}
              />
            </div>
            <div className="password_title">
              Password
              <span className="required"> *</span>
            </div>
            <div className="input_area">
              <Input
                type="password"
                autoComplete="current-password"
                name="password"
                className="input"
                ref={passwordRef}
              />
            </div>
            <div className="button_area">
              <Button size="large" className="button" onClick={click}>
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  function click() {
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    login({ email, password });
  }
};

export default Signin;
