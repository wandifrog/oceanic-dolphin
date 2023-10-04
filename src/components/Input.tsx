import styled from '@emotion/styled';

/**
 * Input component.
 * @example
 * <Input
 *  placeholder="Hello"
 *  value="World"
 *  onChange={(e) => console.log(e.target.value)
 * />
 */
const Input = styled.input`
  background: transparent;
  display: flex;
  height: 30px;
  margin: 10px 0;
  padding: 0 10px;
  width: 100%;
  color: ${(props) => props.color};
  outline: none;

  &::placeholder {
    color: ${(props) => props.color};
  }
`;

export default Input;
