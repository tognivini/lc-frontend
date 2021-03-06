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
import { useAuth } from "../../../contexts/auth.context";
import { TypeUserEnum } from "../../../services/enums";

import { SwitchComponent } from "../../../components/atomos/Switch";
import { useParams } from "react-router";

import {
  onCreateWashMachine,
  onGetAllLaundrys,
  onGetAllUsers,
  onUpdateLaundry,
  onUpdateWashMachine,
} from "../../../services/api-services/index";

import Swal from "sweetalert2";
import { Button } from "../../../components/atomos/Button";

const LaundryEditPage = ({ ...props }) => {
  const { user } = useAuth();
  const params = useParams();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [cep, setCep] = useState();
  const [selectedResponsible, setSelectedResponsible] = useState({});
  const [washMachines, setWashMachines] = useState([]);
  const [responsible, setResponsible] = useState({});
  const [arrayResponsibles, setArrayResponsibles] = useState([]);

  const [newStateModel, setNewStateModel] = useState("");
  const [newStateNumber, setNewStateNumber] = useState("");
  const [newStateInOpperation, setNewStateInOpperation] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [newStateDisabled, setNewStateDisabled] = useState(false);

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

  useEffect(() => {
    if (name && address && cep && selectedResponsible) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, address, cep, selectedResponsible]);

  useEffect(() => {
    if (newStateModel && newStateNumber) {
      setNewStateDisabled(false);
    } else {
      setNewStateDisabled(true);
    }
  }, [newStateModel, newStateNumber]);

  const handleWashMachineActivation = ({ washMachineId, inOpperation }) => {
    const payload = {
      inOpperation: inOpperation,
    };
    onUpdateWashMachine(payload, washMachineId).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "M??quina de lavar editada com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        onGetLaundrys();
      });
    });
  };

  const handleWashMachineCreate = useCallback(
    (event) => {
      event.preventDefault();

      if (newStateModel && newStateNumber) {
        const payload = {
          model: newStateModel,
          number: newStateNumber,
          inOpperation: newStateInOpperation,
          laundry: {
            id: params?.id,
          },
        };
        onCreateWashMachine(payload).then((res) => {
          Swal.fire({
            title: "Sucesso!",
            text: "M??quina de lavar cadastrada com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            setNewStateDisabled(true);
            setNewStateModel("");
            setNewStateNumber("");
            onGetLaundrys();
          });
        });
      }
    },
    [params, newStateModel, newStateNumber, newStateInOpperation]
  );

  return (
    <Container>
      <FormGrid smallHeight>
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
                label="Endere??o"
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
                  label="Selecionar bolsista respons??vel"
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
                fullWidth
                color="blueGreenLight"
                style={{ height: 45, fontSize: 25, with: 70 }}
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
              <CardTitle>Editar M??quinas de lavar</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Modelo</th>
                <th>N??mero</th>
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
                            onChange={(e) =>
                              handleWashMachineActivation({
                                washMachineId: id,
                                inOpperation: e.target.checked,
                              })
                            }
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                        </td>
                      </Tr>
                    );
                  }
                )}
              <Tr>
                <td>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={newStateDisabled}
                    color="blueGreenLight"
                    smallButton
                    onClick={handleWashMachineCreate}
                    style={{ height: 40, fontSize: 22, with: 10 }}
                  >
                    Cadastrar
                  </Button>
                </td>
                <td>
                  <InputCustom
                    label="Modelo"
                    placeholder="Preencha com o modelo"
                    name="newStateModel"
                    value={newStateModel}
                    onChange={(e) => {
                      setNewStateModel(e?.target?.value);
                    }}
                  />
                </td>
                <td>
                  <InputCustom
                    label="N??mero"
                    placeholder="Preencha com o numera????o"
                    name="newStateNumber"
                    value={newStateNumber}
                    onChange={(e) => {
                      setNewStateNumber(e?.target?.value);
                    }}
                  />
                </td>
                <td>
                  <SwitchComponent
                    customLabel="inOpperation"
                    // checked={inOpperation}
                    onChange={(e) => setNewStateInOpperation(e.target.checked)}
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
