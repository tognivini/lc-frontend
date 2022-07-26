import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  BrandView,
  CardTitle,
  FormGrid,
  Tr,
  InputCustom,
  ContainerButton,
  SelectInput,
} from "./styles";
import { Table } from "../../../components/molecules/Table";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { TypeUserEnum } from "../../../services/enums";

import { SwitchComponent } from "../../../components/atomos/Switch";
import { useParams } from "react-router";

import { routesType } from "../../../resources/routesTypes";
import { colors } from "../../../common/types/IColors";

import {
  onGetAllLaundrys,
  onUpdateUser,
} from "../../../services/api-services/index";

import Swal from "sweetalert2";
import { Button } from "../../../components/atomos/Button";

const LaundryEditPage = ({ ...props }) => {
  const { user } = useAuth();
  const params = useParams();

  const navigate = useNavigate();

  const [users, setUsers] = useState();

  const [name, setName] = useState();
  const [errorName, setErrorName] = useState(false);
  const [address, setAddress] = useState();
  const [selectedResponsible, setSelectedResponsible] = useState({});
  const [washMachines, setWashMachines] = useState([]);
  const [errorEmail, setErrorEmail] = useState(false);
  const [arrayResponsibles, setArrayResponsibles] = useState([
    {
      label: "Sem responsável",
    },
    {
      value: "aa",
      label: "aa",
    },
    {
      value: "bb",
      label: "bb",
    },
  ]);

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const setUser = useCallback(async () => {
    if (params?.id) {
      const laundryId = params.id;
      await onGetAllLaundrys({ laundryId }).then((res) => {
        setName(res?.data[0]?.name);
        setAddress(res?.data[0]?.address);
        setWashMachines(res?.data[0]?.washMachines);
        // setPhoneNumber(res?.data[0]?.responsible);
      });
    }
  }, [params]);

  useEffect(() => {
    if (user) {
      setUser();
    }
  }, [user]);

  // const onGetLaundry = useCallback(async () => {
  //   if (user.permissionType === "ADMIN") {
  //     await onGetAllLaundrys().then((res) => {
  //       setUsers(res);
  //     });
  //   }
  // }, [user]);

  const onHandleBolsistaType = useCallback(async () => {});

  // useEffect(() => {
  //   if (user.permissionType === TypeUserEnum.ADMIN) {
  //     onGetLaundry();
  //   } else {
  //     setUsers([]);
  //   }
  // }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name,
      address,
      phoneNumber,
    };
    const userId = user.userId;
    onUpdateUser(payload, userId).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    });
  };

  const handleWashMachineActivation = useCallback(() => {});

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
              <CardTitle>Editar lavanderia</CardTitle>
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
                error={errorName}
              />
              <InputCustom
                label="Endereço"
                placeholder="E-mail"
                name="email"
                value={address}
                onChange={(e) => {
                  setAddress(e?.target?.value);
                }}
                error={errorEmail}
              />
              <SelectInput
                style={{ marginBottom: 25 }}
                label="Selecionar bolsista responsável"
                options={arrayResponsibles}
                displayValue="label"
                value={selectedResponsible}
                name="selectedResponsible"
                initialValue={arrayResponsibles[1]}
                onSelect={(selected) => {
                  setSelectedResponsible(selected);
                }}
              />
            </div>
            <ContainerButton>
              <Button
                disabled={disabled}
                type="submit"
                color="blueGreenLight"
                style={{ height: 40, fontSize: 20, with: 50 }}
              >
                Salvar
              </Button>
            </ContainerButton>
          </form>
        </Content>
      </FormGrid>

      <FormGrid>
        <Content>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <BrandView>
              <CardTitle>Editar lavanderias</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Modelo</th>
                <th>Número</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {washMachines &&
                washMachines?.map(
                  ({ id, number, model, inOpperation }, key) => {
                    return (
                      <Tr key={key}>
                        <td>{id}</td>
                        <td>{model}</td>
                        <td>{number}</td>
                        <td>
                          <SwitchComponent
                            customLabel="inOpperation"
                            checked={inOpperation}
                            onChange={handleWashMachineActivation}
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                        </td>
                      </Tr>
                    );
                  }
                )}
                <Tr>
                  <td>
                    add
                  </td>
                  <td>
                    add
                  </td>
                  <td>
                    add
                  </td>
                  <td>
                  <SwitchComponent
                            customLabel="inOpperation"
                            // checked={inOpperation}
                            onChange={handleWashMachineActivation}
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                  </td>
                </Tr>
            </tbody>
          </Table>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { LaundryEditPage };
