import React from "react";
import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from "./styles";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface IPieChartComponentProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[];
}

const PieChartComponentBox: React.FC<IPieChartComponentProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        {data ? (
          data.map((indicator) => 
              <Legend key={indicator.name} color={indicator.color}>
                <div>{indicator.percent}</div>
                <span>{indicator.name}</span>
              </Legend>            
          )
        ) : (
          <Legend color="f7931b">Sem dados</Legend>
        )}
      </LegendContainer>
    </SideLeft>
    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="percent" data={data}>
            {data.map((indicator) => <Cell key={indicator.name} fill={indicator.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartComponentBox;
