export default function Stats({ items }) {
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
