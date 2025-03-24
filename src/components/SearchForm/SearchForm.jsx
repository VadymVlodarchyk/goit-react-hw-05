import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
        style={{ padding: '8px', width: '250px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
    </form>
  );
};

export default SearchForm;
