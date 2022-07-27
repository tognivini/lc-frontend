import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  BrandView,
  CardTitle,
  FormGrid,
  InputCustom,
  ContainerButton,
  SelectInput,
  SpacedView,
  InputMasked,
} from "./styles";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";

import { useParams } from "react-router";

import { routesType } from "../../../resources/routesTypes";

import {
  onCreateLaundry,
  onGetAllLaundrys,
  onGetAllUsers,
} from "../../../services/api-services/index";

import Swal from "sweetalert2";
import { Button } from "../../../components/atomos/Button";
import { TypeUserEnum } from "../../../services/enums";

const LaundryCreatePage = ({ ...props }) => {
  const { user } = useAuth();
  const params = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [cep, setCep] = useState();
  const [selectedResponsible, setSelectedResponsible] = useState({});
  const [arrayResponsibles, setArrayResponsibles] = useState([]);

  const [disabled, setDisabled] = useState(false);

  const onGetLaundrys = useCallback(async () => {
    if (params?.id) {
      const laundryId = params.id;
      await onGetAllLaundrys({ laundryId }).then((res) => {
        setName(res?.data[0]?.name);
        setAddress(res?.data[0]?.address);
        setCep(res?.data[0]?.cep);
      });
    }
  }, [params]);

  const onGetResponsibles = useCallback(async () => {
    const payload = {
      permissionType: TypeUserEnum.BOLSISTA,
    };
    await onGetAllUsers(payload).then((res) => {
      const arr = [];
      res?.map((thisResponsible) => {
        return arr.push({
          label: thisResponsible?.name,
          value: thisResponsible?.id,
        });
      });
      setArrayResponsibles(arr);
    });
  }, []);

  useEffect(() => {
    if (user?.permissionType === "ADMIN") {
      onGetLaundrys();
      onGetResponsibles();
    }
  }, [user]);

  useEffect(() => {
    if (name && address && cep &&selectedResponsible) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, address, cep, selectedResponsible]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name,
      address,
      cep,
      responsible: {
        id: selectedResponsible.value
      }
    };
    onCreateLaundry(payload).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Lavanderia cadastrada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate(`${routesType.LAUNDRY_LIST}`);
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
              <CardTitle>Cadastrar nova lavanderia</CardTitle>
            </BrandView>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div style={{ width: "100%" }}>
              <InputCustom
                label="Nome"
                placeholder="Nome"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e?.target?.value);
                }}
              />
              <InputCustom
                label="Endereço"
                placeholder="E-mail"
                name="email"
                value={address}
                onChange={(e) => {
                  setAddress(e?.target?.value);
                }}
              />
              <SpacedView>
                <SelectInput
                  style={{ marginBottom: 25 }}
                  label="Selecionar bolsista responsável"
                  options={arrayResponsibles}
                  displayValue="label"
                  value={selectedResponsible}
                  name="selectedResponsible"
                  initialValue={null}
                  onSelect={(selected) => {
                    setSelectedResponsible(selected);
                  }}
                />
                <div style={{ width: "100%", marginLeft: "5%" }}>
                  <InputMasked
                    label="CEP"
                    mask="cep"
                    placeholder="99999-999"
                    name="cep"
                    controlledValue={cep}
                    onChange={(e) => {
                      setCep(e?.target?.value);
                    }}
                  />
                </div>
              </SpacedView>
            </div>
            <ContainerButton>
              <Button
                disabled={disabled}
                type="submit"
                color="blueGreenLight"
                fullWidth
                style={{ height: 50, fontSize: 25 }}
              >
                Salvar
              </Button>
            </ContainerButton>
          </form>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { LaundryCreatePage };
