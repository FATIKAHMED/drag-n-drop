import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./Card.js";
import { useDrop } from "react-dnd";
import { cloneDeep } from "lodash";
const style = {
  width: 400,
  height: "500px",
  border: "1px solid black",
  overflowY: "auto",
};
export const Container = () => {
  {
    const [cards, setCards] = useState([
      // {
      //   id: 1,
      //   text: "Write a cool JS library",
      // },
      // {
      //   id: 2,
      //   text: "Make it generic enough",
      // },
      // {
      //   id: 3,
      //   text: "Write README",
      // },
      // {
      //   id: 4,
      //   text: "Create some examples",
      // },
      // {
      //   id: 5,
      //   text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
      // },
      // {
      //   id: 6,
      //   text: "???",
      // },
      // {
      //   id: 7,
      //   text: "PROFIT",
      // },
    ]);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "input",
      drop: (item, monitor) => {
        console.log(item);

        setCards((prevCards) =>
          update(prevCards, {
            $splice: [[prevCards.length, 1, item]],
          })
        );
      },
    }));

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          card={cards}
        />
      );
    }, []);
    return (
      <>
        {/* <div style={style} ref={drop}>
          {cards.map((card, i) => renderCard(card, i))}
        </div> */}
      </>
    );
  }
};
