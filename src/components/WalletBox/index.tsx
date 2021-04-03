import React from "react";
import { Container } from "./styles";
import dolarImg from "../../assets/dollar.svg";
import arrowUpImg from "../../assets/arrow-up.svg";
import arrowDownImg from "../../assets/arrow-down.svg";
import CountUp from "react-countup";

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: "dolar" | "arrowUp" | "arrowDown";
  color: string;
}

const Content: React.FC<IWalletBoxProps> = ({
  title,
  amount,
  footerLabel,
  icon,
  color,
}) => {
  const iconSelected = React.useMemo(() => {
    if (icon === "dolar") {
      return dolarImg;
    } else if (icon === "arrowUp") {
      return arrowUpImg;
    } else {
      return arrowDownImg;
    }
  }, [icon]);

  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>
        <CountUp
          end={amount}
          prefix={"R$ "}
          separator="."
          decimal=","
          decimals={2}
        />
      </h1>
      <small>{footerLabel}</small>
      <img src={iconSelected} alt={title} />
    </Container>
  );
};

export default Content;
