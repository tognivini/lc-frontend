import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SwitchComponent } from "../../../components/atomos/Switch";

import {
  Container,
  Content,
  // HeaderTitle,
  BrandView,
  CardTitle,
  // SubTitle,
  FormGrid,
  // TitleGrid,
  InputCustom,
  // PasswordInput,
  ContainerButton,
  SelectInput,
} from "./styles";
import { Button } from "../../../components/atomos/Button";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { useParams } from "react-router";
import { colors } from "../../../common/types/IColors";

import {
  onGetAllLaundrys,
  onUpdateUser,
} from "../../../services/api-services/index";
import Swal from "sweetalert2";

import { routesType } from "../../../resources/routesTypes";
import { useEffect } from "react";
import { Table } from "@material-ui/core";

const LaundryEditPage = ({ ...props }) => {
  const { user } = useAuth();
  const params = useParams();

  const navigate = useNavigate();

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


  const handleWashMachineActivation = useCallback(() => {
    
  }) 

  


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
      <FormGrid smallHeight>
        <Content>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <BrandView>
              <CardTitle>Adicionar máquinas</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Modelo</th>
                <th>Número</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {washMachines ? (
                washMachines?.map(({ id, number, model, inOpperation }, key) => {
                  return (
                    <tr key={key}>
                      <td>id</td>
                      <td>{model}</td>
                      <td>{number}</td>
                      <td>
                      {/* <SwitchComponent
                            customLabel="inOpperation"
                            value={inOpperation}
                            onChange={handleWashMachineActivation}
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent> */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
              <tr>
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
                  add
                </td>
              </tr>
            </tbody>
            {!washMachines && (
              <tfoot>
                <tr>
                  <td
                    colspan="3"
                    style={{
                      fontSize: 24,
                      backgroundColor: `${colors.lightGray}`,
                    }}
                  >
                    Sem registros disponíveis na tabela de lavanderias
                  </td>
                </tr>
              </tfoot>
            )}
          </Table>
        </Content>
      </FormGrid>
    </Container>
  );
};

export { LaundryEditPage };
