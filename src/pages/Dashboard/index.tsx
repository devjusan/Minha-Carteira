import React from "react";
import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import MessageBox from "../../components/MessageBox";
import PieChart from "../../components/PieChart";

import { Container, Content } from "./styled";
import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import ListOfTheMonths from "../../utils/months";
import WalletBox from "../../components/WalletBox";

const Dashboard: React.FC = () => {
  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth() + 1;
  const [monthSelected, setMonthSelected] = React.useState<number>(monthNow);
  const [yearSelected, setYearSelected] = React.useState<number>(yearNow);

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

  const TotalExpenses = React.useMemo(() => {
    let total: number = 0;
    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. Amount must be a number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const TotalGains = React.useMemo(() => {
    let total: number = 0;
    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. Amount must be a number");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = React.useMemo(() => {
    return TotalGains - TotalExpenses;
  }, [TotalGains, TotalExpenses]);

  const message = React.useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês você gastou mais do que deveria.",
        footerText:
          "Verifique os seus gastos e tente cortar algumas coisas desnecessárias",
        icon: sadImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: "Ufaaa!",
        description: "Neste mês você gastou exatamente o que ganhou.",
        footerText:
          "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
        icon: grinningImg,
      };
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva.",
        footerText: "Continua assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    }
  }, [totalBalance]);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error("Invalid month value. Its only accepted 0 to 24");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
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
      <Content>
        <WalletBox
          title="saldo"
          amount={totalBalance}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="dolar"
          color="#4e41f0"
        />
        <WalletBox
          title="entradas"
          amount={TotalGains}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#f7931b"
        />
        <WalletBox
          title="saídas"
          amount={TotalExpenses}
          footerLabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#e44c4e"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
        <PieChart />
      </Content>
    </Container>
  );
};

export default Dashboard;
