import React from 'react';
import { Upload, User, DollarSign } from 'lucide-react';

interface FormSectionProps {
  fullName: string;
  price: number;
  recordNumber: number;
  customText: string;
  photoFile: File | null;
  onFullNameChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onRecordNumberChange: (value: number) => void;
  onCustomTextChange: (value: string) => void;
  onPhotoChange: (file: File | null) => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  fullName,
  price,
  recordNumber,
  customText,
  photoFile,
  onFullNameChange,
  onPriceChange,
  onRecordNumberChange,
  onCustomTextChange,
  onPhotoChange,
}) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onPhotoChange(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" />
        Information
      </h2>

      <div className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Entrez votre nom complet"
          />
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            Prix (FCFA)
          </label>
          <input
            type="number"
            value={price || ''}
            onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="0.00"
          />
        </div>

        {/* Record Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro d'enregistrement
          </label>
          <input
            type="number"
            value={recordNumber || ''}
            onChange={(e) =>
              onRecordNumberChange(parseInt(e.target.value) || 1)
            }
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="1"
          />
        </div>

        {/* Custom Text Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Droit à
          </label>
          <textarea
            value={customText}
            onChange={(e) => onCustomTextChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
            placeholder="4 mètre de pagne"
          />
          <p className="mt-1 text-xs text-gray-500">
            Appuyez sur Entrée pour créer une nouvelle ligne
          </p>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Upload className="w-4 h-4" />
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {photoFile && (
            <p className="mt-2 text-sm text-gray-600">{photoFile.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};
