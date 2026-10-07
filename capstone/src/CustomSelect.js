import { useState } from 'react';

export default function CustomSelect({ items, selectedItem, onItemChange, itemType, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = selectedItem ?? items[0] ?? '';
  const normalizedType = itemType?.trim();
  const accessibleLabel = normalizedType ? `Select ${normalizedType}` : 'Select option';

  const handleSelect = (item) => {
    onItemChange(item);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="custom-select__trigger"
        aria-label={accessibleLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="custom-select__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="custom-select__value">{activeItem}</span>
        <span className={`custom-select__caret ${isOpen ? 'up' : 'down'}`} aria-hidden="true">
          ⌃
        </span>
      </button>

      {isOpen && (
        <div className="custom-select__menu" role="listbox" aria-label={accessibleLabel}>
          {items.map((item) => (
            <button
              key={item}
              type="button"
              className={`custom-select__option ${item === activeItem ? 'selected' : ''}`}
              onClick={() => handleSelect(item)}
              role="option"
              aria-selected={item === activeItem}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}