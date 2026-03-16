'use client';

import React, { forwardRef, InputHTMLAttributes, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  onFileSelect?: (file: File) => void;
  preview?: string;
  onRemove?: () => void;
  accept?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, description, error, onFileSelect, preview, onRemove, accept = 'image/*', className, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    };

    const handleRemove = () => {
      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onRemove?.();
    };

    const displayPreview = preview || (selectedFile && URL.createObjectURL(selectedFile));

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        {!displayPreview ? (
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer',
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
              error ? 'border-destructive' : ''
            )}
            whileHover={{ scale: 1.01 }}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="sr-only"
              {...props}
            />
            <div
              className="flex flex-col items-center justify-center gap-2 text-center"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Clique ou arraste uma imagem</p>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1">{description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-lg overflow-hidden border border-border bg-background-light"
          >
            <img
              src={displayPreview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
