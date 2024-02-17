import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

interface Annotation {
  id: number;
  time: string;
  category: string;
  descriptors: string[];
  notes: string;
}

const AnnotationComponent: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState<number | null>(null);
  const [selectedDescriptorIndex, setSelectedDescriptorIndex] = useState<number | null>(null);
  const videoRef = useRef<ReactPlayer>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

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

  return (
    <div className="p-4">
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
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Categorical Buttons:</h2>
        <div className="flex space-x-4">
          <button onClick={() => handleCategoricalButtonClick('Shot')} className="bg-blue-500 text-white px-4 py-2 rounded">Shot</button>
          <button onClick={() => handleCategoricalButtonClick('Pass')} className="bg-blue-500 text-white px-4 py-2 rounded">Pass</button>
          {/* Add more categorical buttons as needed */}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Descriptor Buttons:</h2>
        <div className="flex space-x-4">
          <button onClick={() => handleDescriptorButtonClick('On Target')} className="bg-blue-500 text-white px-4 py-2 rounded">On Target</button>
          <button onClick={() => handleDescriptorButtonClick('Off Target')} className="bg-blue-500 text-white px-4 py-2 rounded">Off Target</button>
          <button onClick={() => handleDescriptorButtonClick('Blocked')} className="bg-blue-500 text-white px-4 py-2 rounded">Blocked</button>
          {/* Add more descriptor buttons as needed */}
        </div>
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
    </div>
  );
};

export default AnnotationComponent;
