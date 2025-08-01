import React, { useState, useEffect, useRef } from 'react';
import { Save, Download, Image, FileText } from 'lucide-react';
import { FormSection } from './components/FormSection';
import { ElementControls } from './components/ElementControls';
import { CompositionCanvas } from './components/CompositionCanvas';
import { saveUserData, getUserDataCount, uploadPhoto } from './lib/supabase';
import { exportAsPNG, exportAsPDF } from './utils/export';
import { CompositionElements } from './types';

function App() {
  const [fullName, setFullName] = useState('');
  const [price, setPrice] = useState(0);
  const [recordNumber, setRecordNumber] = useState(1);
  const [customText, setCustomText] = useState('4 mètre de pagne');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [elements, setElements] = useState<CompositionElements>({
    photo: { x: 79, y: 47, size: 260 },
    name: { x: 80, y: 63, size: 20 },
    price: { x: 30, y: 68, size: 40 },
    recordNumber: { x: 89, y: 5, size: 30 },
    customText: { x: 25, y: 73, size: 25 },
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLDivElement>(null);

  // Fixed canvas size - always 500px regardless of screen resolution
  const [displaySize] = useState(500);

  useEffect(() => {
    loadRecordCount();
  }, []);

  useEffect(() => {
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  const loadRecordCount = async () => {
    try {
      const count = await getUserDataCount();
      const nextNumber = count + 1;
      setRecordNumber(nextNumber);
    } catch (error) {
      console.warn('Could not load record count, using default:', error);
      setRecordNumber(1);
    }
  };

  const moveElement = (
    elementType: keyof CompositionElements,
    direction: 'up' | 'down' | 'left' | 'right'
  ) => {
    setElements((prev) => {
      const element = prev[elementType];
      let newX = element.x;
      let newY = element.y;

      switch (direction) {
        case 'up':
          newY = Math.max(5, element.y - 1);
          break;
        case 'down':
          newY = Math.min(95, element.y + 1);
          break;
        case 'left':
          newX = Math.max(5, element.x - 1);
          break;
        case 'right':
          newX = Math.min(95, element.x + 1);
          break;
      }

      return {
        ...prev,
        [elementType]: { ...element, x: newX, y: newY },
      };
    });
  };

  const resizeElement = (
    elementType: keyof CompositionElements,
    direction: 'increase' | 'decrease'
  ) => {
    setElements((prev) => {
      const element = prev[elementType];
      const change = elementType === 'photo' ? 5 : 1;
      const minSize = elementType === 'photo' ? 50 : 12;
      const maxSize = elementType === 'photo' ? 300 : 60;

      let newSize = element.size;
      if (direction === 'increase') {
        newSize = Math.min(maxSize, element.size + change);
      } else {
        newSize = Math.max(minSize, element.size - change);
      }

      return {
        ...prev,
        [elementType]: { ...element, size: newSize },
      };
    });
  };

  const handleSave = async () => {
    if (!fullName || !photoFile || price <= 0) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const uploadedPhotoUrl = await uploadPhoto(photoFile);

      await saveUserData({
        full_name: fullName,
        photo_url: uploadedPhotoUrl,
        price,
        record_number: recordNumber,
        custom_text: customText,
        photo_x: elements.photo.x,
        photo_y: elements.photo.y,
        photo_size: elements.photo.size,
        name_x: elements.name.x,
        name_y: elements.name.y,
        name_size: elements.name.size,
        price_x: elements.price.x,
        price_y: elements.price.y,
        price_size: elements.price.size,
        record_number_x: elements.recordNumber.x,
        record_number_y: elements.recordNumber.y,
        record_number_size: elements.recordNumber.size,
        custom_text_x: elements.customText.x,
        custom_text_y: elements.customText.y,
        custom_text_size: elements.customText.size,
      });

      alert('Information enregistrer avec Succès');
      await loadRecordCount();
    } catch (error) {
      console.error("Erreur d'enregistrement");
      alert("Erreur d'enregistrement. Veuillez réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPNG = async () => {
    if (!canvasRef.current) return;
    try {
      await exportAsPNG(canvasRef.current, `badge-${recordNumber}.png`);
    } catch (error) {
      alert('Erreur de téléchargement. Veuillez réessayez');
    }
  };

  const handleExportPDF = async () => {
    if (!canvasRef.current) return;
    try {
      await exportAsPDF(canvasRef.current, `badge-${recordNumber}.pdf`);
    } catch (error) {
      alert('Erreur de téléchargement. Veuillez réessayez');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            RETROUVAILLE DES FILS ET FILLES DE SOKOUHOUE
          </h1>
          <p className="text-gray-600">
            Ensemble, célébrons nos racines et renforçons nos liens familiaux
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-1">
            <FormSection
              fullName={fullName}
              price={price}
              recordNumber={recordNumber}
              customText={customText}
              photoFile={photoFile}
              onFullNameChange={setFullName}
              onPriceChange={setPrice}
              onRecordNumberChange={setRecordNumber}
              onCustomTextChange={setCustomText}
              onPhotoChange={setPhotoFile}
            />

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              {/* <button
                onClick={handleSave}
                disabled={isLoading || !fullName || !photoFile || price <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isLoading ? 'En cours...' : 'Sauvegarder'}
              </button> */}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportPNG}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Image className="w-4 h-4" />
                  PNG
                </button>
                <button
                  onClick={handleExportPDF}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </button>
              </div>
            </div>

            {/* Debug Info */}
            {/* <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm">
              <p className="font-semibold text-gray-700">Résolution Canvas:</p>
              <p className="text-gray-600">
                {displaySize}px × {displaySize}px (Fixe)
              </p>
            </div> */}
          </div>

          {/* Canvas Section */}
          <div className="xl:col-span-2">
            <div className="overflow-auto">
              <CompositionCanvas
                ref={canvasRef}
                fullName={fullName}
                price={price}
                recordNumber={recordNumber}
                customText={customText}
                photoUrl={photoUrl}
                elements={elements}
                displaySize={displaySize}
                className=""
              />
            </div>

            {/* Element Controls */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <ElementControls
                label="Photo"
                position={elements.photo}
                onMove={(direction) => moveElement('photo', direction)}
                onResize={(direction) => resizeElement('photo', direction)}
              />
              <ElementControls
                label="Nom"
                position={elements.name}
                onMove={(direction) => moveElement('name', direction)}
                onResize={(direction) => resizeElement('name', direction)}
              />
              <ElementControls
                label="Prix"
                position={elements.price}
                onMove={(direction) => moveElement('price', direction)}
                onResize={(direction) => resizeElement('price', direction)}
              />
              <ElementControls
                label="Numéro d'enregistrement"
                position={elements.recordNumber}
                onMove={(direction) => moveElement('recordNumber', direction)}
                onResize={(direction) =>
                  resizeElement('recordNumber', direction)
                }
              />
              <ElementControls
                label="Droit à"
                position={elements.customText}
                onMove={(direction) => moveElement('customText', direction)}
                onResize={(direction) => resizeElement('customText', direction)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Copywriting */}
      <footer className="mt-16 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Créez Votre Badge Personnalisé
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Créez votre badge personnalisé en quelques clics et participez à
              cette magnifique retrouvaille qui nous unit tous.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📸</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Simple & Rapide
                </h4>
                <p className="text-gray-600 text-sm">
                  Ajoutez votre photo, vos informations et créez votre badge en
                  moins de 2 minutes
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Personnalisable
                </h4>
                <p className="text-gray-600 text-sm">
                  Ajustez la position et la taille de chaque élément selon vos
                  préférences
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💾</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Téléchargeable
                </h4>
                <p className="text-gray-600 text-sm">
                  Exportez votre badge en PNG ou PDF pour l'imprimer ou le
                  partager
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-500 text-sm mb-2">
                © 2025 Retrouvaille des Fils et Filles de Sokouhoué
              </p>
              <p className="text-gray-400 text-xs">
                Designed by Expéra AKAKPO &nbsp;
                <a href="esperaakakpo6@gmail.com">esperaakakpo6@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
