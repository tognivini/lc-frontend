import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Content, BrandView, CardTitle, FormGrid } from "./styles";
import { Button } from "../../../components/atomos/Button";
import { Table } from "../../../components/molecules/Table";
import { useAuth, AuthProvider } from "../../../contexts/auth.context";
import { TypeUserEnum } from "../../../services/enums";

import { onGetAllLaundrys } from "../../../services/api-services/index";

import { routesType } from "../../../resources/routesTypes";
import { colors } from "../../../common/types/IColors";

const ListLaundryPage = ({ ...props }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [laundrys, setLaundrys] = useState();

  const onGetLaundry = useCallback(async () => {
    if (user) {
      const userId = user.userId;
      await onGetAllLaundrys({ userId }).then((res) => {
        setLaundrys(res?.data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user.permissionType === TypeUserEnum.ADMIN) {
      onGetLaundry();
    } else {
      setLaundrys([]);
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
              <CardTitle>Editar lavanderias</CardTitle>
            </BrandView>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th style={{ width: 370 }}>Endereço</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {laundrys ? (
                laundrys?.map(({ name, address, responsible }, key) => (
                  <tr key={key}>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{responsible?.name ? responsible?.name : "-"}</td>
                    <td>
                      <Button
                        type="submit"
                        fullWidth
                        color="cyan"
                        // smallBotton
                        style={{ height: 40, fontSize: 22, with: 10 }}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
            {!laundrys && (
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

export { ListLaundryPage };
