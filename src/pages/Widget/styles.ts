import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const TextLine = styled.div`
  display: flex;
  background: #fff;
  width: 24em;
  height: 2em;
  border-radius: 1em;
  margin-top: 1em;
  justify-content: center;
`;

export const WidgetContainer = styled.div`
  display: flex;
  background: #ebebeb;
  justify-content: space-evenly;
  border-radius: 15px;
  width: 450px;
  height: 600px;
`;
