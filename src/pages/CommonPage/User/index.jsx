import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Content, BrandView, CardTitle, FormGrid } from "./styles";
import { SwitchComponent } from "../../../components/atomos/Switch";
import { Table } from "../../../components/molecules/Table";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { TypeUserEnum } from "../../../services/enums";

import { onGetAllUsers } from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import { colors } from "../../../common/types/IColors";

const ListUserPage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [users, setUsers] = useState();

  const onGetLaundry = useCallback(async () => {
    if (user.permissionType === "ADMIN") {
      await onGetAllUsers().then((res) => {
        setUsers(res);
        console.log(res);
      });
    }
  }, [user]);

  const onHandleBolsistaType = useCallback(async ()=>{


  })

  useEffect(() => {
    if (user.permissionType === TypeUserEnum.ADMIN) {
      onGetLaundry();
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
              <CardTitle>Editar usuários</CardTitle>
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
                    { name, email, phoneNumber, status, userPermission },
                    key
                  ) => {
                    let isBolsista = false;
                    if (userPermission?.type === TypeUserEnum.BOLSISTA) {
                      isBolsista = true;
                    } else {
                      isBolsista = false;
                    }
                    return (
                      <tr key={key}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phoneNumber}</td>
                        <td>
                          <SwitchComponent
                            type="submit"
                            fullWidth
                            color="cyan"
                            customLabel="bolsista"
                            value={isBolsista}
                            onChange={onHandleBolsistaType}
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                        </td>
                        <td>
                          <SwitchComponent
                            type="submit"
                            fullWidth
                            color="cyan"
                            customLabel="status"
                            value={status}
                            // onChange={handleChange}
                            style={{ height: 40, fontSize: 22, with: 10 }}
                          ></SwitchComponent>
                        </td>
                      </tr>
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
