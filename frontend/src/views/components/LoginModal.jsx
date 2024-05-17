import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { MailIcon } from "./MailIcon";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios";

// console.log("Login component loaded");

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegister, setIsRegister] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const response = await axios.post(
        "http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", response);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const response = await axios.post(
        "http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/register",
        { username, email, password, confirmPassword },
        { withCredentials: true }
      );
      console.log("Register response:", response);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      console.log("Register error:", error.response.data)
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
    }
  };
  const navigate = useNavigate();

  const handleSwitchForm = () => {
    setIsRegister(!isRegister);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="flat">
        Join Us Now!
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isRegister ? "Register" : "Log in"}
              </ModalHeader>
              <ModalBody>
                {isRegister && (
                  <Input
                    radius="lg"
                    type="text"
                    label="Username"
                    className="max-w"
                    labelPlacement="inside"
                    isRequired={true}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
                <Input
                  radius="lg"
                  type="email"
                  label="Email"
                  className="max-w"
                  labelPlacement="inside"
                  isRequired={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input
                  radius="lg"
                  label="Password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  isRequired={true}
                  labelPlacement="inside"
                  className="max-w"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister && (
                  <Input
                    radius="lg"
                    label="Confirm Password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    isRequired={true}
                    labelPlacement="inside"
                    className="max-w"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                )}
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={isRegister ? handleRegister : handleLogin}
                  isLoading={isLoading}
                >
                  {isRegister ? "Register" : "Sign in"}
                </Button>
              </ModalFooter>
              <div className="flex justify-center mt-4">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleSwitchForm}
                  className="max-w"
                  style={{ margin: 10, padding: 10 }}
                >
                  {isRegister ? "Have an account?" : "Don't have an account?"}
                </Button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
