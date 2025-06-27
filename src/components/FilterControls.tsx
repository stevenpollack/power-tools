import React, { useState } from 'react';

interface FilterControlsProps {
  onFilterChange: (filters: {
    author?: string;
    tool?: string;
    mood?: string;
    category?: string;
  }) => void;
  availableAuthors: string[];
  availableTools: string[];
  availableCategories: string[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  onFilterChange,
  availableAuthors,
  availableTools,
  availableCategories
}) => {
  const [filters, setFilters] = useState({
    author: '',
    tool: '',
    mood: '',
    category: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Remove empty filters
    const cleanFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v !== '')
    );
    
    onFilterChange(cleanFilters);
  };

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="author-filter">Author:</label>
        <select
          id="author-filter"
          value={filters.author}
          onChange={(e) => handleFilterChange('author', e.target.value)}
        >
          <option value="">All Authors</option>
          {availableAuthors.map((author) => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="tool-filter">Tool:</label>
        <select
          id="tool-filter"
          value={filters.tool}
          onChange={(e) => handleFilterChange('tool', e.target.value)}
        >
          <option value="">All Tools</option>
          {availableTools.map((tool) => (
            <option key={tool} value={tool}>{tool}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="mood-filter">Mood:</label>
        <select
          id="mood-filter"
          value={filters.mood}
          onChange={(e) => handleFilterChange('mood', e.target.value)}
        >
          <option value="">All Moods</option>
          <option value="humorous">Humorous</option>
          <option value="dramatic">Dramatic</option>
          <option value="technical">Technical</option>
          <option value="philosophical">Philosophical</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={() => {
          setFilters({ author: '', tool: '', mood: '', category: '' });
          onFilterChange({});
        }}
        className="clear-filters"
      >
        Clear All Filters
      </button>
    </div>
  );
}; 