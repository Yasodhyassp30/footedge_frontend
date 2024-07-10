import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Modal from 'react-modal';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Spinner } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';

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

interface AnalysisSummary {
  id: string;
  created_at: string;
  video_path: string;
  snapshot_count: number;
  annotation_count: number;
}

const AnnotationComponent: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState<number | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [customButtons, setCustomButtons] = useState<CustomButton[]>([]);
  const [showAddButtonWindow, setShowAddButtonWindow] = useState<boolean>(false);
  const [newButtonName, setNewButtonName] = useState<string>('');
  const [isCategorical, setIsCategorical] = useState<boolean>(true);
  const [newButtonNotes, setNewButtonNotes] = useState<string>('');
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('red');
  const [brushSize, setBrushSize] = useState<number>(4);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysesList, setAnalysesList] = useState<AnalysisSummary[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const videoRef = useRef<ReactPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<ReactSketchCanvasRef>(null);

  useEffect(() => {
    fetchAnalysesList();
  }, []);

  const fetchAnalysesList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/list_analyses');
      setAnalysesList(response.data);
    } catch (error) {
      console.error('Error fetching analyses list:', error);
    }
  };

  const handleAnalysisChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const analysisId = e.target.value;
    setSelectedAnalysis(analysisId);
    if (analysisId) {
      await loadAnalysis(analysisId);
    }
  };


  const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};


const loadAnalysis = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/retrieve_analysis/${id}`);
    const analysis = response.data;

    setAnnotations(analysis.annotations);
    setCustomButtons(analysis.customButtons);
    
    // Convert base64 snapshots to object URLs
    const snapshotURLs = analysis.snapshot_base64.map((base64:string) => {
      const blob = base64ToBlob(base64, 'image/png');
      return URL.createObjectURL(blob);
    });
    setSnapshots(snapshotURLs);

    // Convert base64 video to Blob and then to object URL
    const videoBlob = base64ToBlob(analysis.video_base64, 'video/mp4');
    const videoURL = URL.createObjectURL(videoBlob);
    setVideoSrc(videoURL);

    setAnalysisResult(analysis.analysis_result);
    // setSelectedAnalysis(analysisId);
  } catch (error) {
    console.error('Error loading analysis:', error);
  }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
      analyzeVideo(file);
    }
  };

  const analyzeVideo = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:5000/api/event-detection/analyze_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error('Error analyzing video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoricalButtonClick = (category: string, team: string) => {
    const currentTime = videoRef.current?.getCurrentTime()?.toFixed(2);
    if (!currentTime) return;

    const newAnnotation: Annotation = {
      id: Date.now(),
      time: currentTime,
      category: `${category} - ${team}`,
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
    if (!videoSrc) {
      toast.error('Please upload a video before analyzing.');
      return;
    }

    // Get the video file from the video URL
    const response = await fetch(videoSrc);
    const blob = await response.blob();
    const file = new File([blob], 'video.mp4', { type: 'video/mp4' });

    const formData = new FormData();
    formData.append('video', file);
    formData.append('annotations', JSON.stringify(annotations));
    // formData.append('customButtons', JSON.stringify(customButtons));

    setLoading(true);
    const analyzeResponse = await axios.post('http://localhost:5000/api/event-detection/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setAnalysisReport(analyzeResponse.data.analysis);
    toast.success('Analysis complete');
    console.log('Analysis complete:', analyzeResponse.data);
  } catch (error) {
    toast.error('Error analyzing video');
    console.error('Error analyzing:', error);
  } finally {
    setLoading(false);
  }
};


const handleSave = async () => {
  try {
    const dataToSend = {
      annotations: annotations,
      customButtons: customButtons,
      videoSrc: videoSrc,
      snapshots: snapshots,
      analysisResult: analysisResult  // Include the analysis result in the save request
    };

    const response = await axios.post('http://localhost:5000/api/save_annotations', dataToSend);

    toast.success('Save complete');
    console.log('Save complete:', response.data);
  } catch (error) {
    toast.error('Error saving');
    console.error('Error saving:', error);
  }
};


  const handleSnap = () => {
    const currentVideo = videoRef.current?.getInternalPlayer() as HTMLVideoElement;
    const canvas = canvasRef.current;
    if (currentVideo && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(currentVideo, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        setSnapshots(prevSnapshots => [...prevSnapshots, dataURL]);
      }
    }
  };

  const handleSnapshotClick = (snapshot: string) => {
    setSelectedSnapshot(snapshot);
    setIsModalOpen(true);
  };

  const handleSaveSnapshot = async () => {
    if (drawRef.current) {
      const editedSnapshot = await drawRef.current.exportImage('png');
      const updatedSnapshots = snapshots.map(snapshot =>
        snapshot === selectedSnapshot ? editedSnapshot : snapshot
      );
      setSnapshots(updatedSnapshots);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4 flex flex-col space-y-4 pt-24">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Video Annotation Tool</h2>
        <select onChange={handleAnalysisChange} className="border p-2 rounded">
          <option value="">Select a previous analysis</option>
          {analysesList.map((analysis) => (
            <option key={analysis.id} value={analysis.id}>
              {analysis.created_at} - {analysis.snapshot_count} snaps, {analysis.annotation_count} annotations
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex">
        <div className="w-1/3 pr-4">
          <h2 className="text-xl font-semibold mb-2">Upload your Video</h2>
          <input type="file" accept="video/*" onChange={handleFileChange} className="border p-2 w-full mb-4" />
          {videoSrc && (
            <ReactPlayer
              ref={videoRef}
              controls
              width="100%"
              url={videoSrc}
            />
          )}
          <button onClick={handleSnap} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Snap</button>
        </div>
        <div className="w-1/3 px-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader">
                <Spinner />
              </div>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">AI Analysis</h2>
              {analysisResult && <ReactMarkdown>{analysisResult}</ReactMarkdown>}
            </div>
          )}
        </div>
        <div className="w-1/3 pl-4">
          <button onClick={() => setShowAddButtonWindow(true)} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Button</button>
          <div className="bg-gray-800 text-white p-4 rounded-lg h-4/5">
            <h2 className="text-xl font-semibold mb-2">Tagging Window</h2>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4 overflow-y-auto h-32">
                <div>
                  {customButtons
                    .filter(button => button.isCategorical)
                    .map(button => (
                      <div key={`${button.id}-home`} className="relative">
                        <button
                          onClick={() => handleCategoricalButtonClick(button.name, 'Home')}
                          className="bg-red-800 text-white px-4 rounded-xl mb-2"
                        >
                          {`${button.name} - Home`}
                        </button>
                        <button
                          onClick={() => handleRemoveButton(button.id)}
                          className="absolute top-0 right-0 text-white"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                </div>
                <div>
                  {customButtons
                    .filter(button => button.isCategorical)
                    .map(button => (
                      <div key={`${button.id}-away`} className="relative">
                        <button
                          onClick={() => handleCategoricalButtonClick(button.name, 'Away')}
                          className="bg-blue-800 text-white px-4 rounded-xl mb-2"
                        >
                          {`${button.name} - Away`}
                        </button>
                        <button
                          onClick={() => handleRemoveButton(button.id)}
                          className="absolute top-0 right-0 text-white"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto h-32">
                {customButtons
                  .filter(button => !button.isCategorical)
                  .map(button => (
                    <div className="relative" key={button.id}>
                      <button
                        onClick={() => handleDescriptorButtonClick(button.name)}
                        className="bg-cyan-800 text-white px-4 rounded-xl"
                      >
                        {button.name}
                      </button>
                      <button
                        onClick={() => handleRemoveButton(button.id)}
                        className="absolute top-0 right-0 text-white"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-2">Snapshots</h2>
          <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
            {snapshots.map((snapshot, index) => (
              <img
                key={index}
                src={snapshot}
                alt={`Snapshot ${index}`}
                className="border p-2 rounded cursor-pointer"
                onClick={() => handleSnapshotClick(snapshot)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-2">Annotations Table</h2>
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
          <div className="flex justify-end space-x-4 mt-4">
            <button onClick={handleAnalyze} className="bg-green-500 text-white px-4 py-2 rounded">
              Analyze
            </button>
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto px-4">
          {/* {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader">
                <Spinner />
              </div>
            </div>
          ) : ( */}
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">Analysis Report</h2>
              {analysisReport && <ReactMarkdown>{analysisReport}</ReactMarkdown>}
            </div>
          {/* )} */}
        </div>
      <canvas ref={canvasRef} className="hidden pt-24" width="640" height="600"></canvas>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} ariaHideApp={false}>
        <div className="bg-white p-4 rounded shadow-lg w-3/4 h-full flex flex-col pt-24">
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <span>Brush Color:</span>
              <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
            </label>
            <label className="flex items-center space-x-2">
              <span>Brush Size:</span>
              <input
                type="number"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                min={1}
                max={50}
                className="w-16 p-1 border rounded"
              />
            </label>
            <button onClick={() => setIsErasing(!isErasing)} className={`px-4 py-2 rounded ${isErasing ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
              {isErasing ? 'Eraser Mode' : 'Brush Mode'}
            </button>
          </div>
          <ReactSketchCanvas
            ref={drawRef}
            backgroundImage={selectedSnapshot!}
            width="100%"
            height="100%"
            strokeWidth={brushSize}
            strokeColor={isErasing ? "rgba(0,0,0,0)" : brushColor}
            eraserWidth={brushSize}
          />
          <button onClick={handleSaveSnapshot} className="bg-green-500 text-white px-4 py-2 rounded mt-4 self-end">
            Save
          </button>
        </div>
      </Modal>
      {showAddButtonWindow && (
        <Modal isOpen={showAddButtonWindow} onRequestClose={() => setShowAddButtonWindow(false)} ariaHideApp={false}>
          <div className="p-4 bg-white shadow rounded-lg w-1/2 mx-auto mt-24">
            <div className="mb-4">
              <label htmlFor="buttonName" className="block text-sm font-medium text-gray-700">Button Name:</label>
              <input type="text" id="buttonName" value={newButtonName} onChange={(e) => setNewButtonName(e.target.value)} className="border p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Is Categorical:
                <input type="checkbox" checked={isCategorical} onChange={() => setIsCategorical(!isCategorical)} className="ml-2" />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="buttonNotes" className="block text-sm font-medium text-gray-700">Notes:</label>
              <input type="text" id="buttonNotes" value={newButtonNotes} onChange={(e) => setNewButtonNotes(e.target.value)} className="border p-2 w-full rounded" />
            </div>
            <button onClick={handleAddButton} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </div>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default AnnotationComponent;
