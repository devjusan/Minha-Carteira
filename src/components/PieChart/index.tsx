import React from "react";
import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from "./styles";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PieChartComponent: React.FC = ({ children }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        <Legend color="#f7931b">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#e44c4e">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#f7931b">
          <div>5%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#e44c4e">
          <div>95%</div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="percent"
            labelLine={false}
            data={[{ amount: 30, percent: 95 }]}
          />
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartComponent;
