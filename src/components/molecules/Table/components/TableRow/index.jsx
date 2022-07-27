// import { useField } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'

// import {
//   arrowUp,
//   arrowDown,
//   // selectRed
// } from '../../../../../common/images/imports'
import Input from './Input'
import { BoxSelection } from './styles'
function TableRow({
  columnName,
  displayName,
  clickable,
  onColumnClick,
  theadIsInputable,
  actualSort,
  orderBy,
  isSelected,
  onSelect,
  actualPageForSelection,
  breakDisplayNameLine
}) {
  const [tableRowRef, setState] = useState({
    value: actualSort?.order || 'asc'
  })

  const onHandleSelectClick = useCallback(() => {
    onSelect({ value: !isSelected, page: actualPageForSelection })
  }, [isSelected, actualPageForSelection])

  const onToggleOrderType = useCallback(
    column => {
      // const { value } = tableRowRef.current

      const order = tableRowRef.value === 'asc' ? 'desc' : 'asc'

      onColumnClick({
        columnName: column,
        orderType: order
      })

      setState({ value: order })
    },
    [onColumnClick, tableRowRef]
  )

  return (
    <th>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: 'fit-content'
        }}
      >
        {columnName === 'isSelection' ? (
          <BoxSelection
            isSelected={isSelected}
            onClick={() => onHandleSelectClick()}
          >
            {/* {isSelected && (
              <img src={selectRed} width={20} height={20} alt="" srcset="" />
            )} */}
          </BoxSelection>
        ) : (
          <div>
            <span
              style={{
                cursor: clickable ? 'pointer' : 'default',
                marginRight: 15,
                whiteSpace: breakDisplayNameLine ? 'pre-line' : null
              }}
              onClick={() =>
                clickable ? onToggleOrderType(columnName) : e => e
              }
            >
              {displayName}
            </span>
            {theadIsInputable ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  width: 'fit-content',
                  height: 25
                }}
              >
                {clickable ? (
                  <Input label={displayName} name={columnName} />
                ) : (
                  <React.Fragment />
                )}
              </div>
            ) : (
              <React.Fragment />
            )}
          </div>
        )}
        {/* {columnName === orderBy && clickable && (
          <span style={{ position: 'absolute', right: 0 }}>
            {tableRowRef.value !== 'asc' ? (
              <img alt="" src={arrowUp} style={{ width: 12 }} />
            ) : (
              <img alt="" src={arrowDown} style={{ width: 12 }} />
            )}
          </span>
        )} */}
      </div>
    </th>
  )
}

TableRow.defaultProps = {
  onClick: e => e,
  columnName: 'columnName',
  breakDisplayNameLine: false
}

export { TableRow }
