import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { FlexRow } from '../FlexRow'

// import { Container } from './styles';

function ShowMaxLength({ ...props }, ref) {
  const [inputedLenght, setInputedlength] = useState(0)

  const onSetInputedLength = useCallback(value => {
    setInputedlength(value)
  }, [])

  useEffect(() => {
    onSetInputedLength(String(props.initialValue || '').length)
  }, [onSetInputedLength, props.initialValue])

  useImperativeHandle(ref, () => ({ onSetInputedLength }))

  return (
    <FlexRow style={{ fontSize: 11 }}>
      {inputedLenght}/<strong>{props.maxLength}</strong>
    </FlexRow>
  )
}

export default forwardRef(ShowMaxLength)
