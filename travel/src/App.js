import "./App.css";
import React, { useState } from "react";
import Logo from "./Logo.js";

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

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(3);

  function handleSubmit(e) {
    setDescription(e.target.value);
    e.preventDefault();
    if (description === "") {
      return;
    }
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
          <option value={number} key={number}>
            {number}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItem, onDeleteItemsAll }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  console.log(sortedItems);
  return (
    <>
      <ul className="list">
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={item.id}
            onDeleteAll={onDeleteItemsAll}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input oder</option>
          <option value="description"> Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteItemsAll}> Delet all</button>
      </div>
    </>
  );
}

function Item({ item, packed, onDeleteItems, onToggleItem, onDeleteAll }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItems(item.id)}> ❌</button>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "You got everything ! Ready to go ✈️"
          : `You have ${numItems} item on your list, and you already packed
        ${numPacked} (${percent}%)`}
      </em>
    </footer>
  );
}
