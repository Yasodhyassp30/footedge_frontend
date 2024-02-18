import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

interface Annotation {
  id: number;
  time: string;
  category: string;
  descriptors: string[];
  notes: string;
}

interface CustomButton {
  id: number;
  name: string;
  isCategorical: boolean;
  notes: string;
}

const AnnotationComponent: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState<number | null>(null);
  const [selectedDescriptorIndex, setSelectedDescriptorIndex] = useState<number | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);
  const [showAddButtonWindow, setShowAddButtonWindow] = useState<boolean>(false);
  const [newButtonName, setNewButtonName] = useState<string>('');
  const [isCategorical, setIsCategorical] = useState<boolean>(true);
  const [newButtonNotes, setNewButtonNotes] = useState<string>('');

  const videoRef = useRef<ReactPlayer>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  const handleCategoricalButtonClick = (category: string) => {
    const currentTime = videoRef.current?.getCurrentTime()?.toFixed(2);
    if (!currentTime) return;

    const newAnnotation: Annotation = {
      id: Date.now(),
      time: currentTime,
      category: category,
      descriptors: [],
      notes: '',
    };

    setAnnotations([...annotations, newAnnotation]);
  };

  const handleDescriptorButtonClick = (descriptor: string) => {
    if (selectedAnnotationIndex === null) return;

    const updatedAnnotations = [...annotations];
    updatedAnnotations[selectedAnnotationIndex].descriptors.push(descriptor);
    setAnnotations(updatedAnnotations);
  };

  const handleRemoveAnnotation = (id: number) => {
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== id);
    setAnnotations(updatedAnnotations);
    setSelectedAnnotationIndex(null);
  };

  const handleRemoveDescriptor = (descriptorIndex: number) => {
    if (selectedAnnotationIndex === null) return;

    const updatedAnnotations = [...annotations];
    updatedAnnotations[selectedAnnotationIndex].descriptors.splice(descriptorIndex, 1);
    setAnnotations(updatedAnnotations);
  };

  const handleAddButton = () => {
    const newId = Date.now();
    const newButton: CustomButton = {
      id: newId,
      name: newButtonName,
      isCategorical: isCategorical,
      notes: newButtonNotes,
    };
    setCustomButtons([...customButtons, newButton]);
    setShowAddButtonWindow(false);
    setNewButtonName('');
    setNewButtonNotes('');
  };

  const handleRemoveButton = (id: number) => {
    const updatedButtons = customButtons.filter(button => button.id !== id);
    setCustomButtons(updatedButtons);
  };

  const handleAnalyze = async () => {
    try {
      const dataToSend = {
        annotations: annotations,
        customButtons: customButtons,
        videoSrc: videoSrc,
      };

      // Send data to backend
      const response = await axios.post('/analyze', dataToSend);

      // Handle response from backend if needed
      console.log('Analysis complete:', response.data);
    } catch (error) {
      console.error('Error analyzing:', error);
    }
  };

  return (
    <div className="p-4 flex">
      <div className="flex-1 mr-4">
        <h1 className="text-2xl font-bold mb-4">Video Annotation</h1>
        <div className="mb-4">
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
        <div className="mb-4">
          {videoSrc && (
            <ReactPlayer
              ref={videoRef}
              controls
              width="100%"
              url={videoSrc}
            />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Annotations:</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Time</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Descriptors</th>
                <th className="border p-2">Notes</th>
                <th className="border p-2"></th>
              </tr>
            </thead>
            <tbody>
              {annotations.map((annotation, index) => (
                <tr key={annotation.id} onClick={() => setSelectedAnnotationIndex(index)} className={selectedAnnotationIndex === index ? 'bg-gray-100' : ''}>
                  <td className="border p-2">{annotation.time}</td>
                  <td className="border p-2">{annotation.category}</td>
                  <td className="border p-2">
                    {annotation.descriptors.map((descriptor, descriptorIndex) => (
                      <div key={descriptorIndex} className="inline-block bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2">
                        {descriptor}
                        <button onClick={(e) => { e.stopPropagation(); handleRemoveDescriptor(descriptorIndex); }} className="ml-2">&times;</button>
                      </div>
                    ))}
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={annotation.notes}
                      onChange={(e) => {
                        const updatedAnnotations = [...annotations];
                        updatedAnnotations[index].notes = e.target.value;
                        setAnnotations(updatedAnnotations);
                      }}
                      className="border p-2 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <button onClick={(e) => { e.stopPropagation(); handleRemoveAnnotation(annotation.id); }}>&times;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         <button onClick={handleAnalyze} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Analyze
        </button>
      </div>
      <div className="flex-1">
         <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Categorical Buttons:</h2>
        <div className="flex flex-wrap space-y-2 space-x-2 px-2">
          {customButtons
            .filter(button => button.isCategorical)
            .map(button => (
              <button key={button.id} onClick={() => handleCategoricalButtonClick(button.name)} className="bg-sky-800 text-white h-12 px-4 py-2 my-auto rounded">{button.name}</button>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Descriptor Buttons:</h2>
        <div className="flex flex-wrap space-y-2 space-x-2">
          {customButtons
            .filter(button => !button.isCategorical)
            .map(button => (
              <button key={button.id} onClick={() => handleDescriptorButtonClick(button.name)} className="bg-cyan-800 text-white px-4 py-2 rounded">{button.name}</button>
            ))}
        </div>
      </div>
        <h2 className="text-xl font-semibold mb-2">Custom Buttons:</h2>
        <div className="mb-4">
          <button onClick={() => setShowAddButtonWindow(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Button</button>
        </div>
        {showAddButtonWindow && (
          <div>
           
            <div className="mb-4">
              <label htmlFor="buttonName">Button Name:</label>
              <input type="text" id="buttonName" value={newButtonName} onChange={(e) => setNewButtonName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label>
                Is Categorical:
                <input type="checkbox" checked={isCategorical} onChange={() => setIsCategorical(!isCategorical)} />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="buttonNotes">Notes:</label>
              <input type="text" id="buttonNotes" value={newButtonNotes} onChange={(e) => setNewButtonNotes(e.target.value)} />
            </div>
            <button onClick={handleAddButton} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </div>
        )}
        {/* <div>
          {customButtons.map(button => (
            <div key={button.id} className="flex items-center justify-between bg-gray-200 rounded-full px-4 py-2 mb-2">
              <span>{button.name}</span>
              <button onClick={() => handleRemoveButton(button.id)}>&times;</button>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AnnotationComponent;
