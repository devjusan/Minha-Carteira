import React from "react";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import SelectInput from "../../components/SelectInput";
import { Container, Content, Filters, EmptyData } from "./styles";
import gains from "../../repositories/gains"; /* entradas */
import expenses from "../../repositories/expenses"; /* saídas */
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import ListOfTheMonths from "../../utils/months";
import { uuid } from "uuidv4";
import emojis from "../../utils/emojis";

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
  const [monthSelected, setMonthSelected] = React.useState<string>(
    String(monthNow)
  );
  const [yearSelected, setYearSelected] = React.useState<string>(
    String(yearNow)
  );
  const [selectedFrequency, setSelectedFrequency] = React.useState<string[]>(
    []
  );

  const [sizeOfData, setSizeOfData] = React.useState<number>(0);

  const { type } = match.params;

  const ContentHeaderProps = React.useMemo(() => {
    return type === "entry-balance"
      ? { title: "Entradas", lineColor: "#f7931b" }
      : { title: "Saídas", lineColor: "#e44c4e" };
  }, [type]);

  const listData = React.useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]);

  const years = React.useMemo(() => {
    let uniqueYear: number[] = [];

    listData.forEach((item) => {
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
  }, [listData]);

  const months = React.useMemo(() => {
    return ListOfTheMonths.map((month, index) => {
      return { value: index + 1, label: month };
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency([...selectedFrequency, frequency]);
    }
  };

  React.useEffect(() => {
    const filteredData = listData.filter((item) => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      const showFilteredData =
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency);

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
  }, [data?.length, listData, monthSelected, yearSelected, selectedFrequency]);

  return (
    <Container>
      <ContentHeader
        title={ContentHeaderProps.title}
        lineColor={ContentHeaderProps.lineColor}
      >
        <SelectInput
          onChange={({ target }) => setMonthSelected(target.value)}
          options={months}
          defaultValue={monthSelected}
        />
        <SelectInput
          onChange={({ target }) => setYearSelected(target.value)}
          options={years}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent ${
            selectedFrequency.includes("recorrente") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual ${
            selectedFrequency.includes("eventual") && "tag-actived"
          }`}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {sizeOfData > 0 && selectedFrequency.length > 0 && data ? (
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
    </Container>
  );
};

export default List;
