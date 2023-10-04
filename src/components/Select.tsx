import styled from '@emotion/styled';

/**
 * Select component.
 * @example
 * <Select
 *   value="1"
 *   onChange={(e) => console.log(e.target.value)}
 * >
 *   <option value="0">Zero</option>
 *   <option value="1">One</option>
 * </Select>;
 */
const Select = styled.select`
  background: transparent;
  display: flex;
  height: 30px;
  margin: 10px 0;
  padding: 0 6px;
  width: 100%;
  color: ${(props) => props.color};
  border-width: 2px;
  border-style: inset;
  outline: none;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
`;

export default Select;
