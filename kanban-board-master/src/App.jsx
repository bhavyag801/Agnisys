import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../components/Navbar/Navbar";
import Board from "../components/Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "../components/Editable/Editable";
import OrganizationPageSelector from "../components/Organizationselection/Organizationselection";
import SmallNavbar from "../components/SmallNavbar/SmallNavbar"; // Import SmallNavbar
import "../bootstrap.css";

function App() {
  const [boards, setBoards] = useState(
    localStorage.getItem("kanban-boards")
      ? JSON.parse(localStorage.getItem("kanban-boards"))
      : {}
  );

  const [organization, setOrganization] = useState(""); // State for selected organization
  const [page, setPage] = useState(""); // State for selected page

  const getPageBoards = () => boards[page] || [];

  const setName = (title, bid) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    const index = pageBoards.findIndex((item) => item.id === bid);
    if (index >= 0) {
      pageBoards[index].boardName = title;
      updatedBoards[page] = pageBoards;
      setBoards(updatedBoards);
    }
  };

  const dragCardInBoard = (source, destination) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    const destinationBoardIdx = pageBoards.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = pageBoards.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    pageBoards[destinationBoardIdx].card.splice(
      destination.index,
      0,
      pageBoards[sourceBoardIdx].card[source.index]
    );
    pageBoards[sourceBoardIdx].card.splice(source.index, 1);

    updatedBoards[page] = pageBoards;
    return updatedBoards;
  };

  const addCard = (title, bid) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    const index = pageBoards.findIndex((item) => item.id === bid);
    if (index >= 0) {
      pageBoards[index].card.push({
        id: uuidv4(),
        title: title,
        tags: [],
        task: [],
      });
      updatedBoards[page] = pageBoards;
      setBoards(updatedBoards);
    }
  };

  const removeCard = (boardId, cardId) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    const index = pageBoards.findIndex((item) => item.id === boardId);
    if (index >= 0) {
      const cardIndex = pageBoards[index].card.findIndex(
        (item) => item.id === cardId
      );
      pageBoards[index].card.splice(cardIndex, 1);
      updatedBoards[page] = pageBoards;
      setBoards(updatedBoards);
    }
  };

  const addBoard = (title) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    pageBoards.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    updatedBoards[page] = pageBoards;
    setBoards(updatedBoards);
  };

  const removeBoard = (bid) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    const index = pageBoards.findIndex((item) => item.id === bid);
    if (index >= 0) {
      pageBoards.splice(index, 1);
      updatedBoards[page] = pageBoards;
      setBoards(updatedBoards);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const updateBoards={ ...boards}
    const pageBoards= updatedBoards[page] || [];
    const index = pageBoards.findIndex((item) => item.id === bid)

    if (source.droppableId === destination.droppableId) return;

    setBoards(dragCardInBoard(source, destination));
  };

  const updateCard = (bid, cid, card) => {
    const updatedBoards = { ...boards };
    const pageBoards = updatedBoards[page] || [];
    const index = pageBoards.findIndex((item) => item.id === bid);
    if (index >= 0) {
      const cards = pageBoards[index].card;
      const cardIndex = cards.findIndex((item) => item.id === cid);
      if (cardIndex >= 0) {
        pageBoards[index].card[cardIndex] = card;
        updatedBoards[page] = pageBoards;
        setBoards(updatedBoards);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("kanban-boards", JSON.stringify(boards));
  }, [boards]);

  const goBack = () => {
    setOrganization("");
    setPage("");
  };

  return (
    <div className="App" data-theme="dark">
      <Navbar /> {/* Always show Navbar */}
      <SmallNavbar pageName={organization || page} /> {/* Always show SmallNavbar below Navbar */}
      <div className="main-layout">
        <OrganizationPageSelector
          organization={organization}
          setOrganization={setOrganization}
          setPage={setPage}
        />
        <div className="main-content-container"> {/* Add main content container */}
          {organization && page && (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="app_outer">
                <div className="app_boards">
                  {getPageBoards().map((item) => (
                    <Board
                      key={item.id}
                      id={item.id}
                      name={item.boardName}
                      card={item.card}
                      setName={setName}
                      addCard={addCard}
                      removeCard={removeCard}
                      removeBoard={removeBoard}
                      updateCard={updateCard}
                    />
                  ))}
                  <Editable
                    class={"add__board"}
                    name={"Add Board"}
                    btnName={"Add Board"}
                    onSubmit={addBoard}
                    placeholder={"Enter Board Title"}
                  />
                </div>
              </div>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
