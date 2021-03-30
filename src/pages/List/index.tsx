import React from "react";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";
import gains from "../../repositories/gains"; /* entradas */
import expenses from "../../repositories/expenses"; /* saídas */
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import ListOfTheMonths from "../../utils/months";
import { uuid } from "uuidv4";
import emojis from "../../utils/emojis";

import { Content, Filters, EmptyData } from "./styles";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = React.useState<IData[]>([]);
  const yearNow = new Date().getFullYear();
  const monthNow = new Date().getMonth() + 1;
  const [monthSelected, setMonthSelected] = React.useState<number>(monthNow);
  const [yearSelected, setYearSelected] = React.useState<number>(yearNow);

  const [frequencyFilterSelected, setFrequencyFilterSelected] = React.useState<
    string[]
  >([]);

  const [sizeOfData, setSizeOfData] = React.useState<number>(0);

  const movimentType = match.params.type;

  const ContentHeaderProps = React.useMemo(() => {
    return movimentType === "entry-balance"
      ? { title: "Entradas", lineColor: "#f7931b", listData: gains }
      : { title: "Saídas", lineColor: "#e44c4e", listData: expenses };
  }, [movimentType]);

  const years = React.useMemo(() => {
    let uniqueYear: number[] = [];

    ContentHeaderProps.listData.forEach((item) => {
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
  }, [ContentHeaderProps.listData]);

  const months = React.useMemo(() => {
    return ListOfTheMonths.map((month, index) => {
      return { value: index + 1, label: month };
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      );
      setFrequencyFilterSelected(filtered);
    } else {
      setFrequencyFilterSelected([...frequencyFilterSelected, frequency]);
    }
  };

  React.useEffect(() => {
    const filteredData = ContentHeaderProps.listData.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const showFilteredData =
        month === monthSelected &&
        year === yearSelected &&
        frequencyFilterSelected.includes(item.frequency);

      return showFilteredData;
    });

    setSizeOfData(filteredData.length);

    const FormattedData = filteredData.map((item) => {
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });

    setData(FormattedData);
  }, [
    data?.length,
    ContentHeaderProps.listData,
    monthSelected,
    yearSelected,
    frequencyFilterSelected,
  ]);

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
      throw new Error("Invalid month value. Its only accepted 0 to 24");
    }
  };

  return (
    <>
      <ContentHeader
        title={ContentHeaderProps.title}
        lineColor={ContentHeaderProps.lineColor}
      >
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            frequencyFilterSelected.includes("recorrente") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            frequencyFilterSelected.includes("eventual") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {sizeOfData > 0 && frequencyFilterSelected.length > 0 && data ? (
          data.map((item) => (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subTitle={item.dateFormatted}
              amount={item.amountFormatted}
            />
          ))
        ) : (
          <EmptyData>Não há nada aqui {emojis[4]}</EmptyData>
        )}
      </Content>
    </>
  );
};

export default List;
