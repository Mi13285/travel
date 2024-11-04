import React, { useState } from "react";

import Item from "./Item.js";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onDeleteItemsAll,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  return (
    <div className="list">
      <ul className="list">
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            key={item.id}
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
    </div>
  );
}
