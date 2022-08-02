import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  BrandView,
  CardTitle,
  FormGrid,
  Tr,
} from "./styles";
import { SwitchComponent } from "../../../components/atomos/Switch";
import { Table } from "../../../components/molecules/Table";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { StatusEnum, TypeUserEnum } from "../../../services/enums";

import {
  onGetAllUsers,
  onUpdateUser,
} from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import { colors } from "../../../common/types/IColors";
import Swal from "sweetalert2";

const ListUserPage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [users, setUsers] = useState();

  const onGetUsers = useCallback(async () => {
    if (user.permissionType === TypeUserEnum.ADMIN) {
      await onGetAllUsers().then((res) => {
        setUsers(res);
      });
    }
  }, [user]);

  const onHandleBolsistaType = ({ userId, userType }) => {
    const payload = {
      userType: userType ? TypeUserEnum.BOLSISTA : TypeUserEnum.CLIENTE,
    };
    onUpdateUser(payload, userId).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        onGetUsers();
      });
    });
  };

  const onHandleUserStatus = ({ userId, status }) => {
    const payload = {
      status: status ? StatusEnum.ATIVO : StatusEnum.INATIVO,
    };
    onUpdateUser(payload, userId).then((res) => {
      Swal.fire({
        title: "Sucesso!",
        text: "Usuário editado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        onGetUsers();
      });
    });
  };

  useEffect(() => {
    if (user.permissionType === TypeUserEnum.ADMIN) {
      onGetUsers();
    } else {
      setUsers([]);
    }
  }, [user]);

  return (
    <Container>
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
              <CardTitle>Lista de usuários</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th style={{ width: 150 }}>Bolsista</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users ? (
                users?.map(
                  (
                    { id, name, email, phoneNumber, status, userPermission },
                    key
                  ) => {
                    let isBolsista = false;
                    if (userPermission?.userType === TypeUserEnum.BOLSISTA) {
                      isBolsista = true;
                    } else {
                      isBolsista = false;
                    }
                    return (
                      <Tr key={key}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phoneNumber}</td>
                        <td>
                          <SwitchComponent
                            type="submit"
                            fullWidth
                            color="cyan"
                            customLabel="bolsista"
                            checked={isBolsista}
                            onChange={(e) =>
                              onHandleBolsistaType({
                                userId: id,
                                userType: e.target.checked,
                              })
                            }
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                        </td>
                        <td>
                          <SwitchComponent
                            type="submit"
                            fullWidth
                            color="cyan"
                            customLabel="status"
                            checked={status}
                            onChange={(e) =>
                              onHandleUserStatus({
                                userId: id,
                                status: e.target.checked,
                              })
                            }
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                        </td>
                      </Tr>
                    );
                  }
                )
              ) : (
                <></>
              )}
            </tbody>
            {!users && (
              <tfoot>
                <tr>
                  <td
                    colspan="5"
                    style={{
                      fontSize: 24,
                      backgroundColor: `${colors.lightGray}`,
                    }}
                  >
                    Sem registros disponíveis na tabela de usuários
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

export { ListUserPage };
