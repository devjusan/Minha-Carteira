import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import { Container } from "./styled";

const Dashboard: React.FC = () => {

  const options = [
    { value: 'junior', label: 'Junior' },
    { value: 'leo', label: 'Léo' },
  ]

  return (<Container>
    <ContentHeader title="Dashboard" lineColor="#f7931b">
      <SelectInput options={options} />
    </ContentHeader>
  </Container>)
}

export default Dashboard