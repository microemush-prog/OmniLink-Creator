
import React, { useRef } from 'react';
import type { Link } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { nanoid } from 'nanoid';
import { PlusIcon } from './icons/PlusIcon';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { DragHandleIcon, TrashIcon } from './icons/EditorIcons';

interface LinksEditorProps {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
}

interface DraggableLinkItemProps {
  link: Link;
  index: number;
  handleLinkChange: (id: string, key: keyof Link, value: string | boolean) => void;
  removeLink: (id: string) => void;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableLinkItem: React.FC<DraggableLinkItemProps> = ({ link, index, handleLinkChange, removeLink, moveLink }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    { index: number; id: string },
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'link',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveLink(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'link',
    item: () => ({ id: link.id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  
  drag(drop(ref));

  return (
    <div ref={preview} style={{ opacity: isDragging ? 0.5 : 1 }} data-handler-id={handlerId} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <div ref={ref} className="cursor-move pt-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
          <DragHandleIcon />
        </div>
        <div className="flex-grow space-y-2">
          <Input 
            type="text" 
            placeholder="Title" 
            value={link.title} 
            onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)}
          />
          <Input 
            type="text" 
            placeholder="https://example.com" 
            value={link.url}
            onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <button 
            onClick={() => removeLink(link.id)} 
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Remove link"
          >
            <TrashIcon />
          </button>
          <label htmlFor={`toggle-${link.id}`} className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id={`toggle-${link.id}`} className="sr-only" checked={link.active} onChange={(e) => handleLinkChange(link.id, 'active', e.target.checked)} />
              <div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${link.active ? 'transform translate-x-full bg-indigo-500' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};


export const LinksEditor: React.FC<LinksEditorProps> = ({ links, setLinks, moveLink }) => {
  const addLink = () => {
    const newLink: Link = { id: nanoid(), title: '', url: '', active: true };
    setLinks(prev => [newLink, ...prev]);
  };
  
  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };
  
  const handleLinkChange = (id: string, key: keyof Link, value: string | boolean) => {
    setLinks(prev => prev.map(link => link.id === id ? { ...link, [key]: value } : link));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Links</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add, edit, and reorder your links.</p>
        </div>
        <Button onClick={addLink} variant="primary">
          <PlusIcon />
          Add Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.length > 0 ? (
          links.map((link, index) => (
            <DraggableLinkItem 
              key={link.id}
              link={link}
              index={index}
              handleLinkChange={handleLinkChange}
              removeLink={removeLink}
              moveLink={moveLink}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">No links yet. Add one to get started!</p>
        )}
      </div>
    </div>
  );
};
