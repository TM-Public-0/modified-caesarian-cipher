"use client"

import React, { useState } from "react"
import {
  AlertCircleIcon,
  DownloadIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  Trash2Icon,
  UploadCloudIcon,
  UploadIcon,
  VideoIcon,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shad-components/ui/table.jsx"

import {
  formatBytes,
  useFileUpload,
} from "../shad-components/hooks/use-file-upload.ts"
import { Button } from "../shad-components/ui/button.jsx"

const getFileIcon = (fileName, fileType) => {
  // const fileType = file.file instanceof File ? file.file.type : file.file.type
  // const fileName = file.file instanceof File ? file.file.name : file.file.name

  if (
    fileType.includes("pdf") ||
    fileName.endsWith(".pdf") ||
    fileType.includes("word") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileTextIcon className="size-4 opacity-60" />
  } else if (
    fileType.includes("zip") ||
    fileType.includes("archive") ||
    fileName.endsWith(".zip") ||
    fileName.endsWith(".rar")
  ) {
    return <FileArchiveIcon className="size-4 opacity-60" />
  } else if (
    fileType.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx")
  ) {
    return <FileSpreadsheetIcon className="size-4 opacity-60" />
  } else if (fileType.includes("video/")) {
    return <VideoIcon className="size-4 opacity-60" />
  } else if (fileType.includes("audio/")) {
    return <HeadphonesIcon className="size-4 opacity-60" />
  } else if (fileType.startsWith("image/")) {
    return <ImageIcon className="size-4 opacity-60" />
  }
  return <FileIcon className="size-4 opacity-60" />
}

// Create some dummy initial files
const initialFiles = [
  {
    name: "document.pdf",
    size: 528737,
    type: "application/pdf",
    url: "https://example.com/document.pdf",
    id: "document.pdf-1744638436563-8u5xuls",
  },
  {
    name: "intro.zip",
    size: 252873,
    type: "application/zip",
    url: "https://example.com/intro.zip",
    id: "intro.zip-1744638436563-8u5xuls",
  },
  {
    name: "conclusion.xlsx",
    size: 352873,
    type: "application/xlsx",
    url: "https://example.com/conclusion.xlsx",
    id: "conclusion.xlsx-1744638436563-8u5xuls",
  },
]

export default function FileUploadPreview({fileMetadata, setEncryptedOutputLink, setFileDataToEncrypt, setFiles}) {
  const maxSize = 10 * 1024 * 1024 // 10MB default
  const maxFiles = 10

  const {fileName, description, url, size, type, errors} = fileMetadata;

  const [
    // { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles,
  })

  console.log('fileName', fileName, 'type', type, 'url', url)

  function handleResetEncryptedInput() {
    setFileDataToEncrypt('');
    setFiles(undefined);
    setEncryptedOutputLink(undefined);

  };

  return (
    <div className="flex flex-col gap-2 text-white">
      
        <div className="bg-background overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="text-xs">
              <TableRow className="bg-muted/50">
                <TableHead className="h-9 py-2">Name</TableHead>
                <TableHead className="h-9 py-2">Type</TableHead>
                <TableHead className="h-9 py-2">Size</TableHead>
                <TableHead className="h-9 w-0 py-2 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-[13px]">
              <TableRow>
                <TableCell className="max-w-48 py-2 font-medium">
                  <span className="flex items-center gap-2">
                    <span className="shrink-0">{getFileIcon(fileName, type)}</span>{" "}
                    <span className="truncate">{fileName}</span>
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground py-2">
                  {type.includes('text/plain') ? 'TXT' :type.split("/")[1]?.toUpperCase() || "UNKNOWN"}
                </TableCell>
                <TableCell className="text-muted-foreground py-2">
                  {formatBytes(size)}
                </TableCell>
                <TableCell className="py-2 text-right whitespace-nowrap">
                  <Button
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
                      aria-label={`Download ${fileName}`}
                      // onClick={() => window.open(file.preview, "_blank")}
                      // onClick={() => window.open(link, "_blank")}
                    >
                    <a href={url} download={fileName}>
                      <DownloadIcon className="size-4" />
                    </a>

                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
                    aria-label={`Remove ${fileName}`}
                    // onClick={() => removeFile(file.id)}
                    onClick={handleResetEncryptedInput}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

      {errors && errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

    </div>
  )
}

export function EncryptedFileInput({ handleFileChange, inputStates, files }) {
  const maxSize = 10 * 1024 * 1024 // 10MB default
  const maxFiles = 1

  const { stateKeyA, stateKeyB } = inputStates;

  const [
    { isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles,
    maxSize,
    initialFiles,
  })

  // console.log("Rendered EncryptedFileInput");

  return (
    <div className="flex flex-row gap-2 text-white items-start">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files && files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex flex-row items-start rounded-xl transition-colors not-data-[files]:justify-evenly has-[input:focus]:ring-[3px]  " 
        // data-[files]:hidden min-h-56   p-4
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
          accept=".doc,.docx, .json, .pdf, .txt, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          disabled={stateKeyA === '' || stateKeyB === '' ? true : false}


          />
        <div className="flex flex-row items-start justify-evenly text-center">
          <div className="flex flex-col items-start justify-evenly text-center gap-1">
            <Button variant="outline" className="mt-4" onClick={openFileDialog} disabled={stateKeyA === '' || stateKeyB === '' ? true : false}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              {
                stateKeyA === '' || stateKeyB === '' ?
                'Enter your private keys'
                :
                stateKeyA !== '' && stateKeyB !== '' && !files ? 
                'Upload file'
                :
                files && files.length > 0 && (
                  <u className="text-muted-foreground text-xs">
                    {files[0].name}
                  </u>
                )
              }
            </Button>
            <p className="text-muted-foreground text-xs">
              File size up to {formatBytes(maxSize)}
            </p>

          </div>
        </div>
      </div>
    </div>
    );
}