import styled from '@emotion/styled';

export const DayButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #e3e3e3;
  background-color: ${props => props.active ? '#f91f15' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  font-size: 12px;
  border-radius: 2px;
`;