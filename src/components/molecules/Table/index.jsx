import React, {
  useRef,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'

import { Container, MainContainer, Parent } from './styles'

import { TableRow } from './components/TableRow'

const TableComponent = (
  {
    columns,
    children,
    onColumnClick,
    theadIsInputable,
    actualSort,
    actualPage,
    propsActualPageForSelection,
    selectedItems,
    onSelectAllByPage,
    ...props
  },
  ref
) => {
 
  const paginationRef = useRef(null)

  const [orderBy, setOrderBy] = useState(actualSort?.sort || '')

  const columnClick = useCallback(
    sortParams => {
      paginationRef.current && paginationRef.current.resetPagination()
      setOrderBy(sortParams.columnName)
      onColumnClick(sortParams)
    },
    [onColumnClick]
  )

  useImperativeHandle(ref, () => ({
    resetPagination: () =>
      paginationRef.current && paginationRef.current.resetPagination()
  }))
  return (
    <Parent>
      <MainContainer className="main-container-table">
        <div id="table-wrap">
          <Container {...props}>
            {(columns || []).length ? (
              <thead>
                <tr>
                  {(columns || [])
                    .filter(item => item)
                    .map(
                      (
                        {
                          displayName,
                          columnName,
                          clickable,
                          breakDisplayNameLine
                        },
                        key
                      ) => {
                        if (columnName === 'isSelection') {
                          return (
                            <TableRow
                              theadIsInputable={theadIsInputable}
                              key={key}
                              columnName={columnName}
                              onColumnClick={columnClick}
                              clickable={clickable}
                              isSelected={selectedItems}
                              onSelect={onSelectAllByPage}
                              actualPageForSelection={
                                propsActualPageForSelection
                              }
                            />
                          )
                        } else {
                          return (
                            <TableRow
                              theadIsInputable={theadIsInputable}
                              key={key}
                              columnName={columnName}
                              displayName={displayName}
                              onColumnClick={columnClick}
                              clickable={clickable}
                              orderBy={orderBy}
                              actualSort={actualSort}
                              breakDisplayNameLine={Boolean(
                                breakDisplayNameLine
                              )}
                            />
                          )
                        }
                      }
                    )}
                </tr>
              </thead>
            ) : (
              <></>
            )}

            {children}
          </Container>
        </div>
      </MainContainer>
    </Parent>
  )
}

TableComponent.defaultProps = {
  paginationProps: { totalPages: 0, paginate: () => {} },
  onColumnClick: e => e,
  actualPage: 1,
  columns: [],
  theadIsInputable: false
}

const Table = forwardRef(TableComponent)

export { Table }
