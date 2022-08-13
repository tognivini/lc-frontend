import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  BrandView,
  CardTitle,
  FormGrid,
  InputCustom,
  ContainerButton,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { useParams } from "react-router";

import {
  onGetWashMachine,
  onUpdateWashMachine,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import { useEffect } from "react";
import { SwitchComponent } from "../../../components/atomos/Switch";

const WashMachineEditPage = ({ ...props }) => {
  const { user } = useAuth();
  const params = useParams();

  const navigate = useNavigate();

  const setWashMachine = useCallback(async () => {
    if (params?.id) {
      const washMachineId = params.id;
      await onGetWashMachine({ washMachineId }).then((res) => {
        setModel(res[0]?.model);
        setNumber(res[0]?.number);
        setInOpperation(res[0]?.inOpperation);
        setLaundry(res[0]?.laundry);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setWashMachine();
    }
  }, [user]);

  const [model, setModel] = useState();
  const [number, setNumber] = useState();
  const [inOpperation, setInOpperation] = useState();
  const [laundry, setLaundry] = useState({});

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (model && number && laundry?.id) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [model, number, laundry]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      model,
      number,
      inOpperation,
    };
    const id = params?.id;
    onUpdateWashMachine(payload, id).then(() => {
      Swal.fire({
        title: "Sucesso!",
        text: "Máquina de lavar editada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(()=>{
        navigate(`${routesType.LAUNDRY_LIST}/${laundry.id}`)
      });
    });
  };

  return (
    <Container>
      <FormGrid>
        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <BrandView>
              <CardTitle>Editar Máquina de lavar</CardTitle>
            </BrandView>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div style={{ width: "100%" }}>
              <InputCustom
                label="Modelo"
                placeholder="Modelo"
                name="model"
                value={model}
                onChange={(e) => {
                  setModel(e?.target?.value);
                }}
              />
              <InputCustom
                label="Número"
                placeholder="Número"
                name="number"
                type="number"
                value={number}
                onChange={(e) => {
                  setNumber(e?.target?.value);
                }}
              />
              <SwitchComponent
                customLabel="inOpperation"
                checked={inOpperation}
                onChange={(e) =>
                  setInOpperation(e.target.checked)
                }
                style={{ height: 40, fontSize: 22, with: 10 }}
              ></SwitchComponent>
            </div>
            <ContainerButton>
              <Button
                disabled={disabled}
                type="submit"
                fullWidth
                color="blueGreenLight"
                style={{ height: 45, fontSize: 25, with: 50 }}
              >
                Editar
              </Button>
            </ContainerButton>
          </form>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { WashMachineEditPage };
