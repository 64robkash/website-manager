import React, { useState, useEffect } from 'react';
import { Site } from '../types';
import { Modal } from './Modal';
import { inputField, buttonSecondary, buttonPrimary, textSecondary } from '../styles/designSystem';

interface SiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (site: Omit<Site, 'id' | 'createdAt'>) => void;
  site?: Site;
}

export const SiteModal: React.FC<SiteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  site,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    platform: '',
  });

  useEffect(() => {
    if (site) {
      setFormData({
        name: site.name,
        url: site.url,
        platform: site.platform,
      });
    } else {
      setFormData({
        name: '',
        url: '',
        platform: '',
      });
    }
  }, [site, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.url && formData.platform) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={site ? 'Edit Site' : 'Add New Site'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block ${textSecondary} text-sm font-medium mb-2`}>
            Site Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputField}
            placeholder="My Website"
            required
          />
        </div>
        
        <div>
          <label className={`block ${textSecondary} text-sm font-medium mb-2`}>
            URL
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className={inputField}
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div>
          <label className={`block ${textSecondary} text-sm font-medium mb-2`}>
            Platform
          </label>
          <input
            type="text"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className={inputField}
            placeholder="WordPress, Shopify, React, etc."
            required
          />
        </div>
        
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={buttonSecondary + " flex-1"}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={buttonPrimary + " flex-1"}
          >
            {site ? 'Update' : 'Add Site'}
          </button>
        </div>
      </form>
    </Modal>
  );
};