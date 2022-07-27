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
  SpacedView,
  InputMasked,
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
  onGetAllUsers,
  onUpdateLaundry,
  onUpdateUser,
} from "../../../services/api-services/index";

import Swal from "sweetalert2";
import { Button } from "../../../components/atomos/Button";

const LaundryEditPage = ({ ...props }) => {
  const { user } = useAuth();
  const params = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [cep, setCep] = useState();
  const [selectedResponsible, setSelectedResponsible] = useState({});
  const [washMachines, setWashMachines] = useState([]);
  const [responsible, setResponsible] = useState({});
  const [arrayResponsibles, setArrayResponsibles] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const onGetLaundrys = useCallback(async () => {
    if (params?.id) {
      const laundryId = params.id;
      await onGetAllLaundrys({ laundryId }).then((res) => {
        setName(res?.data[0]?.name);
        setAddress(res?.data[0]?.address);
        setWashMachines(res?.data[0]?.washMachines);
        setCep(res?.data[0]?.cep);
        setResponsible({
          value: res?.data[0]?.responsible?.id,
          label: res?.data[0]?.responsible?.name,
        });
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
      onGetResponsibles().then(onGetLaundrys());
    }
  }, [user]);

  // const onGetLaundry = useCallback(async () => {
  //   if (user.permissionType === "ADMIN") {
  //     await onGetAllLaundrys().then((res) => {
  //       onGets(res);
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
      cep,
      responsible: {
        id: selectedResponsible?.value
          ? selectedResponsible?.value
          : responsible?.value,
      },
    };
    onUpdateLaundry(payload, params.id).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Lavanderia editada com sucesso!",
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
                  initialValue={responsible}
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
                <td>add</td>
                <td>
                  <InputCustom
                    label="Modelo"
                    placeholder="Preencha com o modelo"
                    name="newModel"
                    // value={newModel}
                    onChange={(e) => {
                      // setNewModel(e?.target?.value);
                    }}
                    // error={errorEmail}
                  />
                </td>
                <td>add</td>
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
