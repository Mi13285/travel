import React, { useState } from "react";
import Logo from "./Logo.js";
import Stats from "./Stats.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";

export default function App() {
  const [items, setItems] = useState([]);

  function handleDeleteALL() {
    setItems([]);
    alert("do you want delete");
  }
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((items) => items.id !== id));
  }

  function handleToggleItem(id) {
    setItems((item) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItems={handleDelete}
        onToggleItem={handleToggleItem}
        onDeleteItemsAll={handleDeleteALL}
      />
      <Stats items={items} />
    </div>
  );
}
