import React from "react";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container } from "./styled";
import expenses from "../../repositories/expenses";
import gains from "../../repositories/expenses";
import ListOfTheMonths from "../../utils/months";

const Dashboard: React.FC = () => {
  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth() + 1;
  const [monthSelected, setMonthSelected] = React.useState<number>(monthNow);
  const [yearSelected, setYearSelected] = React.useState<number>(yearNow);
  const options = [
    { value: "junior", label: "Junior" },
    { value: "leo", label: "Léo" },
  ];

  const years = React.useMemo(() => {
    let uniqueYear: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYear.includes(year)) {
        uniqueYear.push(year);
      }
    });

    return uniqueYear.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, []);

  const months = React.useMemo(() => {
    return ListOfTheMonths.map((month, index) => {
      return { value: index + 1, label: month };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (err) {
      throw new Error("Invalid month value. Its only accepted 0 to 24");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch (err) {
      throw new Error("Invalid year value. Its only accepted integer numbers.");
    }
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          onChange={({ target }) => handleMonthSelected(target.value)}
          options={months}
          defaultValue={monthSelected}
        />
        <SelectInput
          onChange={({ target }) => handleYearSelected(target.value)}
          options={years}
          defaultValue={yearSelected}
        />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
