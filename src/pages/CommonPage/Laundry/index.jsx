import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  // HeaderTitle,
  BrandView,
  CardTitle,
  // SubTitle,
  FormGrid,
  // TitleGrid,
  InputC,
  SelectInput,
  // PasswordInput,
  InputMasked,
  DateInputC,
  ContainerButton,
  NextScheduleGrid,
  ArrowForwardIosIcon,
  ArrowForwardIosIconDown,
  SpacedView,
  NextScheduleContent,
  CardTitleNextSchedule,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";

import {
  onGetAllUsers,
  onUpdateUser,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import { LaundryEnum } from "../../../services/enums";

const LaundryPage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [laundry, setLaundry] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();

  const [washMachine, setWashMachine] = useState();

  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [oppenedView, setOppenedView] = useState(false);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (laundry && washMachine) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [laundry, washMachine]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const d = new Date(date).toISOString();
    console.log(d, "d");

    // const userId = user.userId;
    // onUpdateUser(payload, userId).then((res) => {
    //   Swal.fire({
    //     title: "Sucesso!",
    //     text: "Usuário editado com sucesso!",
    //     icon: "success",
    //     confirmButtonText: "Ok",
    //   });
    // });
  };

  return (
    <Container>
      <FormGrid>
        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <BrandView>
              <CardTitle>Lavanderias</CardTitle>
            </BrandView>
          </div>
     
              <Button
                disabled={disabled}
                type="submit"
                fullWidth
                color="blueGreenLight"
                style={{ height: 40, fontSize: 25, with: 30 }}
              >
                Agendar
              </Button>
        </Content>

        {/* <Content>
              <Button
                disabled={disabled}
                type="submit"
                fullWidth
                color="blueGreenLight"
                style={{ height: 40, fontSize: 25, with: 30 }}
              >
                Agendar
              </Button>
        </Content> */}
      </FormGrid>
    </Container>
  );
};

export { LaundryPage };
