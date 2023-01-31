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
  BoxIconScrollPage,
  ArrowForwardIcon,
} from "./styles";
import { Table } from "../../../components/molecules/Table";
import { useAuth } from "../../../contexts/auth.context";
import { TypeUserEnum } from "../../../services/enums";

import { SwitchComponent } from "../../../components/atomos/Switch";
import { useParams } from "react-router";

import {
  onCreateWashMachine,
  onGetAllLaundrys,
  onGetResponsibles,
  onUpdateLaundry,
  onUpdateWashMachine,
} from "../../../services/api-services/index";

import Swal from "sweetalert2";
import { Button } from "../../../components/atomos/Button";
import { routesType } from "../../../resources/routesTypes";

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

  const [newStateModel, setNewStateModel] = useState("");
  const [newStateNumber, setNewStateNumber] = useState("");
  const [newStateInOpperation, setNewStateInOpperation] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [newStateDisabled, setNewStateDisabled] = useState(false);

  const [visibilityScrollButton, setVisibilityScrollButton] = useState(true);

  const toggleVisisbilityScrollButton = () => {
    if (window.pageYOffset > 150) {
      setVisibilityScrollButton(false);
    } else {
      setVisibilityScrollButton(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisisbilityScrollButton);
    return () => {
      window.removeEventListener("scroll", toggleVisisbilityScrollButton);
    };
  }, []);

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

  const onGetAvailableResponsibles = useCallback(async () => {
    const payload = {
      permissionType: TypeUserEnum.BOLSISTA,
      onlyAvailableResponsibles: true,
    };
    await onGetResponsibles(payload).then((res) => {
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
    if (responsible?.value && arrayResponsibles.length) {
      setArrayResponsibles([responsible, ...arrayResponsibles]);
    }
  }, [responsible]);

  useEffect(() => {
    if (user?.permissionType === TypeUserEnum.ADMIN) {
      onGetLaundrys().then(onGetAvailableResponsibles());
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
    console.log("check", name, address, cep, responsible, selectedResponsible);
    const thereIsResponsible = selectedResponsible?.value
      ? selectedResponsible?.value
      : responsible?.value;
    if (name && address && cep && thereIsResponsible) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, address, cep, responsible, selectedResponsible]);

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
        text: "Máquina de lavar editada com sucesso!",
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
            text: "Máquina de lavar cadastrada com sucesso!",
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
                fullWidth
                color="blueGreenLight"
                style={{ height: 45, fontSize: 25, with: 70 }}
              >
                Salvar
              </Button>
            </ContainerButton>
          </form>
        </Content>
        <BoxIconScrollPage
          isVisible={visibilityScrollButton}
          className="transition-opacity"
          onClick={() =>
            document.getElementById("secBottom").scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          <ArrowForwardIcon />
        </BoxIconScrollPage>
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
              <CardTitle>Editar Máquinas de lavar</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Número</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {washMachines &&
                washMachines?.map(
                  ({ id, number, model, inOpperation }, key) => {
                    return (
                      <Tr key={key}>
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
                        <td>
                          <Button
                            type="submit"
                            fullWidth
                            // disabled={newStateDisabled}
                            color="blueGreenLight"
                            smallButton
                            onClick={() =>
                              navigate(`${routesType.WASH_MACHINE_BASE}/${id}`)
                            }
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          >
                            Editar
                          </Button>
                        </td>
                      </Tr>
                    );
                  }
                )}
              <Tr>
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
                    label="Número"
                    placeholder="Preencha com o numeração"
                    name="newStateNumber"
                    type="number"
                    value={newStateNumber}
                    onChange={(e) => {
                      setNewStateNumber(e?.target?.value);
                    }}
                  />
                </td>
                <td>
                  <SwitchComponent
                    customLabel="inOpperation"
                    onChange={(e) => setNewStateInOpperation(e.target.checked)}
                    style={{ height: 40, fontSize: 22, with: 10 }}
                  ></SwitchComponent>
                </td>
                <td>
                  <Button
                    id="secBottom"
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
              </Tr>
            </tbody>
          </Table>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { LaundryEditPage };
