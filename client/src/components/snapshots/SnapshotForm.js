import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const SnapshotForm = ({ onSubmit, nextOrder, initialData, onCancel }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [order, setOrder] = useState(initialData?.order || nextOrder);
  const [links, setLinks] = useState(initialData?.links || []);
  const [newLink, setNewLink] = useState({ url: '', title: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, order, links });
  };

  const addLink = () => {
    if (newLink.url) {
      setLinks([...links, { ...newLink, type: 'other' }]);
      setNewLink({ url: '', title: '' });
    }
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
      <Form.Group className="mb-3">
        <Form.Label>Event Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Order</Form.Label>
        <Form.Control
          type="number"
          min="0"
          value={order}
          onChange={(e) => setOrder(parseInt(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Links</Form.Label>
        <div className="d-flex mb-2">
          <Form.Control
            type="url"
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({...newLink, url: e.target.value})}
            className="me-2"
          />
          <Form.Control
            type="text"
            placeholder="Title (optional)"
            value={newLink.title}
            onChange={(e) => setNewLink({...newLink, title: e.target.value})}
            className="me-2"
          />
          <Button variant="secondary" onClick={addLink}>
            Add Link
          </Button>
        </div>

        {links.length > 0 && (
          <ul className="list-group">
            {links.map((link, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title || link.url}
                </a>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeLink(index)}
                >
                  ×
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Form.Group>

      <div className="d-flex justify-content-end">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} className="me-2">
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit">
          {initialData ? 'Update' : 'Add'} Snapshot
        </Button>
      </div>
    </Form>
  );
};

export default SnapshotForm;