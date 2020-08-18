import React from "react";
import styled from "styled-components";
const DivNoResult = styled.div`
  color: white;
  margin: 3em auto;
  font-weight: 300;
  text-align: center;
`;
function NoResults() {
  return <DivNoResult>No se encontraron resultados, intentalo mas tarde</DivNoResult>;
}

export default NoResults;
