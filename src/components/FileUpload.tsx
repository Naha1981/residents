import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Camera, Video, X, AlertCircle, StopCircle, Loader, FlipHorizontal, Settings2 } from 'lucide-react';
import { ReportMedia } from '../types/report';
import { motion, AnimatePresence } from 'framer-motion';

// Constants for file limitations
const MAX_VIDEO_SIZE_MB = 50;
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGES_ALLOWED = 5;
const MB_IN_BYTES = 1024 * 1024;

interface FileUploadProps {
  onFileSelect: (files: ReportMedia[]) => void;
  value?: ReportMedia[];
}

interface CameraSettings {
  deviceId: string;
  resolution: {
    width: number;
    height: number;
  };
}

const RESOLUTIONS = [
  { label: '640x480', width: 640, height: 480 },
  { label: '1280x720', width: 1280, height: 720 },
  { label: '1920x1080', width: 1920, height: 1080 }
];

export default function FileUpload({ onFileSelect, value = [] }: FileUploadProps) {
  const [media, setMedia] = useState<ReportMedia[]>(value);
  const [error, setError] = useState<string>('');
  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaType, setMediaType] = useState<'photo' | 'video' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [showSettings, setShowSettings] = useState(false);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedResolution, setSelectedResolution] = useState(RESOLUTIONS[1]);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const recordingTimerRef = useRef<number>();

  const validateFile = (file: File): boolean => {
    if (file.type.startsWith('image/')) {
      if (file.size > MAX_IMAGE_SIZE_MB * MB_IN_BYTES) {
        setError(`Image size should not exceed ${MAX_IMAGE_SIZE_MB}MB`);
        return false;
      }
    } else if (file.type.startsWith('video/')) {
      if (file.size > MAX_VIDEO_SIZE_MB * MB_IN_BYTES) {
        setError(`Video size should not exceed ${MAX_VIDEO_SIZE_MB}MB`);
        return false;
      }
    }
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault(); // Prevent form submission
    const files = event.target.files;
    if (!files) return;

    setError('');
    const newMedia: ReportMedia[] = [];

    for (const file of files) {
      if (!validateFile(file)) return;

      const preview = URL.createObjectURL(file);
      newMedia.push({
        file,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        preview
      });
    }

    const updatedMedia = [...media, ...newMedia];
    setMedia(updatedMedia);
    onFileSelect(updatedMedia);
  };

  const stopMediaStream = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setMediaType(null);
    setIsRecording(false);
    setRecordingDuration(0);
    if (recordingTimerRef.current) {
      window.clearInterval(recordingTimerRef.current);
    }
  }, []);

  const startCamera = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: selectedResolution.width,
          height: selectedResolution.height
        },
        audio: mediaType === 'video'
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Failed to access camera');
      console.error(err);
    }
  };

  const handleCameraStart = async (type: 'photo' | 'video', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
    }
    setMediaType(type);
    setShowCamera(true);
    await startCamera();
  };

  const handleFlipCamera = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
    stopMediaStream();
    await startCamera();
  };

  const capturePhoto = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!videoRef.current || !mediaStreamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(blob => {
      if (!blob) return;

      const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
      const preview = URL.createObjectURL(blob);
      
      const newMedia = [...media, { file, type: 'image', preview }];
      setMedia(newMedia);
      onFileSelect(newMedia);
      stopMediaStream();
    }, 'image/jpeg');
  };

  const startRecording = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!mediaStreamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(mediaStreamRef.current);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const file = new File([blob], `video_${Date.now()}.webm`, { type: 'video/webm' });
      const preview = URL.createObjectURL(blob);

      const newMedia = [...media, { file, type: 'video', preview }];
      setMedia(newMedia);
      onFileSelect(newMedia);
      stopMediaStream();
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    
    let duration = 0;
    recordingTimerRef.current = window.setInterval(() => {
      duration += 1;
      setRecordingDuration(duration);
    }, 1000);
  };

  const stopRecording = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(cameras);
        if (cameras.length > 0) {
          setSelectedCamera(cameras[0].deviceId);
        }
      });

    return () => {
      stopMediaStream();
    };
  }, [stopMediaStream]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const removeMedia = (index: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);
    onFileSelect(newMedia);
  };

  return (
    <div className="space-y-4" onClick={e => e.stopPropagation()}>
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {media.map((item, index) => (
          <div key={index} className="relative">
            {item.type === 'image' ? (
              <img 
                src={item.preview} 
                alt={`Upload ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ) : (
              <video 
                src={item.preview}
                className="w-32 h-32 object-cover rounded-lg"
                controls
              />
            )}
            <button
              onClick={(e) => removeMedia(index, e)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showCamera ? (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            {mediaType === 'photo' ? (
              <button
                onClick={capturePhoto}
                className="bg-indigo-600 text-white p-3 rounded-full"
              >
                <Camera className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`${
                  isRecording ? 'bg-red-500' : 'bg-indigo-600'
                } text-white p-3 rounded-full`}
              >
                {isRecording ? (
                  <StopCircle className="w-6 h-6" />
                ) : (
                  <Video className="w-6 h-6" />
                )}
              </button>
            )}
            
            <button
              onClick={handleFlipCamera}
              className="bg-gray-800 text-white p-3 rounded-full"
            >
              <FlipHorizontal className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowSettings(!showSettings);
              }}
              className="bg-gray-800 text-white p-3 rounded-full"
            >
              <Settings2 className="w-6 h-6" />
            </button>
            
            <button
              onClick={stopMediaStream}
              className="bg-gray-800 text-white p-3 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              {formatDuration(recordingDuration)}
            </div>
          )}

          {showSettings && (
            <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resolution</label>
                  <select
                    value={`${selectedResolution.width}x${selectedResolution.height}`}
                    onChange={(e) => {
                      e.preventDefault();
                      const [width, height] = e.target.value.split('x').map(Number);
                      setSelectedResolution({ width, height });
                      stopMediaStream();
                      startCamera();
                    }}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2"
                  >
                    {RESOLUTIONS.map((res) => (
                      <option key={res.label} value={`${res.width}x${res.height}`}>
                        {res.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            multiple
            className="hidden"
          />
          
          <button
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <Upload className="w-5 h-5" />
            Upload Files
          </button>
          
          <button
            onClick={(e) => handleCameraStart('photo', e)}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <Camera className="w-5 h-5" />
            Take Photo
          </button>
          
          <button
            onClick={(e) => handleCameraStart('video', e)}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <Video className="w-5 h-5" />
            Record Video
          </button>
        </div>
      )}
    </div>
  );
}