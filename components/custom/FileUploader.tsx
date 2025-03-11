"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, Trash2, ImageIcon, Video } from "lucide-react";
import React, { useState, useCallback, useRef, type JSX } from "react";
import { toast } from "sonner";

import { Button } from "@/components/extendui/button";
import { Input } from "@/components/extendui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

type FileUploadProps = {
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
  onUploadComplete?: (file: File) => void;
  onUploadError?: (error: string) => void;
  onDelete?: (file: string) => void;
  multiple?: boolean;
  label: string;
  subLabel?: string;
  showUploader?: boolean;
  uploaded?: string[];
  isUploading?: boolean;
};

type FileType =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "default"
  | "video/mp4"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/msword";

type UploadedFile = {
  id: number;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
};
const fileTypeDetails: Record<
  FileType,
  { icon: JSX.Element; color: string; darkColor: string }
> = {
  "application/pdf": {
    icon: <File className="size-4 text-gray-600 dark:text-white" />,
    color: "bg-gray-50",
    darkColor: "dark:bg-gray-800",
  },

  "image/jpeg": {
    icon: <ImageIcon className="size-4 text-gray-600 dark:text-white" />,
    color: "bg-gray-50",
    darkColor: "dark:bg-gray-800",
  },
  "image/png": {
    icon: <ImageIcon className="size-4 text-gray-600 dark:text-white" />,
    color: "bg-gray-50",
    darkColor: "dark:bg-gray-800",
  },
  "video/mp4": {
    icon: <Video className="size-4 text-gray-600 dark:text-white" />,
    color: "bg-gray-50",
    darkColor: "dark:bg-gray-800",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: <File className="size-4 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50",
    darkColor: "dark:bg-blue-900",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: <File className="size-4 text-green-600 dark:text-green-400" />,
    color: "bg-green-50",
    darkColor: "dark:bg-green-900",
  },
  "application/msword": {
    icon: <File className="size-4 text-blue-600 dark:text-blue-400" />,
    color: "bg-blue-50",
    darkColor: "dark:bg-blue-900",
  },
  default: {
    icon: <File className="size-4 text-gray-600 dark:text-white" />,
    color: "bg-gray-50",
    darkColor: "dark:bg-gray-800",
  },
};

// const formatFileSize = (bytes: number) => {
//   if (bytes === 0) return "0 Bytes";
//   const k = 1024;
//   const sizes = ["Bytes", "KB", "MB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
// };

export default function FileUpload({
  maxSizeInMB = 5,
  acceptedFileTypes = ["application/pdf"],
  onUploadComplete = () => {
    toast.success("File uploaded successfully!");
  },
  onUploadError = (text: string) => {
    toast.error(text);
  },
  onDelete = () => {
    toast.success("File deleted successfully!");
  },
  multiple = false,
  label,
  subLabel,
  showUploader = true,
  uploaded,
  isUploading,
}: FileUploadProps) {
  const [currentUpload, setCurrentUpload] = useState<{
    id: number;
    file: File;
    status: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    ...(uploaded
      ? uploaded.map((file) => ({
          id: Math.random(),
          name: file,
          size: 0,
          type: "application/pdf",
          uploadedAt: new Date(),
        }))
      : []),
  ]);
  console.log(progress);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTimeout = useRef<NodeJS.Timeout | null>(null);

  const getFileTypeDetails = (fileType: string) =>
    fileTypeDetails[fileType as FileType] || fileTypeDetails.default;

  const isFileDuplicate = useCallback(
    (file: File) => {
      return uploadedFiles.some(
        (uploadedFile) =>
          uploadedFile.name === file.name &&
          uploadedFile.size === file.size &&
          uploadedFile.type === file.type
      );
    },
    [uploadedFiles]
  );

  const simulateUpload = useCallback(
    (file: File) => {
      onUploadComplete(file);
      if (uploadTimeout.current) {
        clearTimeout(uploadTimeout.current);
      }

      setProgress(0);
      setCurrentUpload({
        id: Date.now(),
        file,
        status: "uploading",
      });

      let currentProgress = 0;
      const totalSteps = 100;
      const timePerStep = 30;

      const incrementProgress = () => {
        currentProgress++;
        const newProgress = (currentProgress / totalSteps) * 100;

        setProgress((prevProgress) => {
          return Math.max(prevProgress + 1, newProgress);
        });

        if (currentProgress < totalSteps) {
          uploadTimeout.current = setTimeout(incrementProgress, timePerStep);
        } else {
          const uploadedFile = {
            id: Date.now(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
          };

          if (!isUploading) {
            setUploadedFiles((prev) => [...prev, uploadedFile]);
            setCurrentUpload(null);
            setProgress(0);
          }

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      };

      uploadTimeout.current = setTimeout(incrementProgress, timePerStep);
    },
    [onUploadComplete]
  );

  const handleDragEvents = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const filesToUpload = multiple ? Array.from(files) : [files[0]];

      filesToUpload.forEach((file) => {
        console.log(file.type);
        if (!acceptedFileTypes.includes(file.type)) {
          onUploadError(
            `Invalid file type. Please upload: ${acceptedFileTypes.join(", ")}`
          );
          return;
        }

        if (file.size > maxSizeInMB * 1024 * 1024) {
          onUploadError(`File size must be less than ${maxSizeInMB}MB`);
          return;
        }

        if (isFileDuplicate(file)) {
          onUploadError(
            `File "${file.name}" has already been uploaded. Please choose a different file.`
          );
          return;
        }

        simulateUpload(file);
      });
    },
    [
      acceptedFileTypes,
      maxSizeInMB,
      isFileDuplicate,
      simulateUpload,
      onUploadError,
      multiple,
    ]
  );

  const handleDeleteFile = useCallback(
    (fileId: number) => {
      const fileToDelete = uploadedFiles.find((f) => f.id === fileId);
      if (fileToDelete) {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
        onDelete(fileToDelete.name);
      }
    },
    [uploadedFiles, onDelete]
  );

  // const handleCancel = useCallback(() => {
  //   if (uploadTimeout.current) {
  //     clearTimeout(uploadTimeout.current);
  //   }
  //   setCurrentUpload(null);
  //   setProgress(0);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // }, []);

  const renderUploadArea = () => (
    <div className="text-center">
      <Upload className="mx-auto size-6  text-muted-foreground" />
      <div className="mt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="mx-auto text-xs !bg-green-50 border border-primary  hover:bg-green-600 "
        >
          {subLabel}
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypes.join(",")}
          onChange={(e) => handleFiles(e.target.files)}
          multiple={multiple}
        />

        <p className="mt-1 text-xs text-muted-foreground">
          {acceptedFileTypes.join(", ")} up to {maxSizeInMB}MB
        </p>
      </div>
    </div>
  );

  const renderUploadProgress = () => (
    <motion.div
      className="w-full rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentUpload && (
        <Skeleton className="flex h-14 animate-pulse items-center justify-between p-2 sm:p-3 bg-muted rounded-lg overflow-hidden">
          {/* <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div
              className={`flex-shrink-0 flex size-6 sm:size-8 p-1 sm:p-2 items-center justify-center rounded bg-background`}
            >
              {getFileTypeDetails(currentUpload!.file.type).icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-medium truncate">
                {currentUpload!.file.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {formatFileSize(currentUpload!.file.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            <div className="text-xs font-medium whitespace-nowrap w-12 text-right">
              {Math.round(progress)}%
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </div> */}
        </Skeleton>
      )}
      {/* <div className="mt-2 h-1 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div> */}
    </motion.div>
  );

  const renderUploadedFiles = () => (
    <AnimatePresence mode="popLayout">
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="shadow-none border-2 border-dashed border-muted-foreground/50 ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
              <CardTitle className="ml-1 text-start text-sm text-black/70 font-semibold">
                Uploaded Files
              </CardTitle>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {uploadedFiles.length}{" "}
                {uploadedFiles.length === 1 ? "file" : "files"}
              </span>
            </CardHeader>
            <CardContent className="w-full px-3 pb-3">
              <div className="flex flex-col space-y-2 mx-auto overflow-hidden">
                {uploadedFiles.map((file) => (
                  <div className="w-full" key={file.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-2 p-2 rounded-lg bg-muted"
                    >
                      <div
                        className={`flex-shrink-0 flex size-6 sm:size-8 p-1 sm:p-2 items-center justify-center rounded bg-background`}
                      >
                        {getFileTypeDetails(file.type).icon}
                      </div>
                      <div className="flex-1 min-w-0 max-w-[calc(100%-3rem)]">
                        <h3 className="text-xs sm:text-sm font-medium truncate">
                          {file.name}
                        </h3>
                        {/* <p className="text-xs text-muted-foreground truncate">
                          {formatFileSize(file.size)}
                        </p> */}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </motion.div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full mx-auto space-y-4 sm:!px-0 pt-2.5 ">
      {showUploader && (
        <Card className="border-none shadow-none !px-0 bg-transparent ">
          <CardHeader className="px-0 py-3">
            <CardTitle className="ml-1 text-start text-sm text-black/70 font-semibold">
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full mx-auto p-0">
            <div
              className={`relative border-2 !bg-white ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-dashed border-muted-foreground/50"
              } rounded-lg p-4 sm:p-4 transition-colors duration-200 ease-in-out hover:border-muted-foreground`}
              onDragEnter={handleDragEvents}
              onDragLeave={handleDragEvents}
              onDragOver={handleDragEvents}
              onDrop={(e) => {
                handleDragEvents(e);
                handleFiles(e.dataTransfer.files);
              }}
            >
              {!currentUpload && !isUploading
                ? renderUploadArea()
                : renderUploadProgress()}
            </div>
          </CardContent>
        </Card>
      )}
      {renderUploadedFiles()}
    </div>
  );
}
